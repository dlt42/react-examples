import * as d3 from "d3";

const PI2 = 2 * Math.PI;

//const getColor = (data) => d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
//const getColor = (data) => d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.total));
//const getColor = (data) =>  d3.scaleLinear().range([0, data.total]).range(["red","green"]);

export default class ChartController {
  constructor(data, width, height, ref) {
    this.height = height;
    this.width = width;
    this.data = data;
    this.ref = ref;
    this.radius = (Math.min(width, height) / 6) - 10;
    this.arc = null;
    this.color = null;
    this.format = d3.format(",d");
    this.root = null;
    this.svg = null;
    this.g = null;
    this.path = null;
    this.label = null;
    this.parent = null;
    this.title = null;
    this._init();
  }

  _init() {
    this._setRoot();
    this._setArc();
    this._setColor();
    this.svg = d3.select(this.ref.current)
      .attr("viewBox", [0, 0, this.width, this.height])
      .style("font", "2px sans-serif");
    this.g = this.svg.append("g")
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
    this._setPath();
    this._setLabel();
    this.path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join(" / ")}\n${this.format(d.value)}`);
    this.parent = this.g.append("circle")
      .datum(this.root)
      .attr("r", this.radius)
      .attr("fill", "none")
      .style("cursor", "pointer")
      .attr("pointer-events", "all");
    this.title = this.parent.append("title");
    this.title.text(d => this._getTitleText(d));
    this.path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", (e, p) => this._clicked(e, p));
    this.parent.on("click", (e, p) => this._clickedBack(e, p));
  }

  _setPathFillAndOpacity() {
    //.attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.value); })
    this.path
      .attr("fill", d => { return this.color(d.data.total); })
      .attr("fill-opacity", d => .9 - (d.depth * .1) )
  }

  _setPath() {
    this.path = this.g.append("g")
      .selectAll("path")
      .data(this.root.descendants().slice())
      .join("path")
      .attr("pointer-events", d => "auto")
      .attr("d", d => this.arc(d.current));
    this._setPathFillAndOpacity();
  }

  _setLabel() {
    this.label = this.g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(this.root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +this._labelVisible(d.current))
      .attr("transform", d => this._labelTransform(d.current))
      .attr("fill", "white")
      .attr("stroke", "none")
      .text(d => d.data.shortName || d.data.name);
  }

  _setRoot() {
    const hierarchy = d3.hierarchy(this.data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    const size = [2*Math.PI, this.radius/6]
    const parition = d3.partition().size(size);
    this.root = parition(hierarchy);
    this.root.each(d => d.current = d);
  }

  _setArc() {
    const r = this.radius;
    this.arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(r * 1.5)
      .innerRadius(d => d.y0 * r)
      .outerRadius(d => Math.max(d.y0 * r, d.y1 * r - 1));
  }

  _setColor() {
    let min = this.data.total;
    this.root.each(d => {
      if (min > d.data.total && d.data.total > 10000000) min = d.data.total;
    })
    this.color = d3.scaleLog().domain([ min, this.data.total ]).range([ 'blue', 'red' ]); 
  }

  _labelVisible(d) {
    return (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  _labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * this.radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  _clickTween() {
    const t = this.g.transition().duration(1500);
    this.path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .attr("pointer-events", d => "auto" )
        .attrTween("d", d => () => this.arc(d.current));
    this.label.filter(d => {
        return +this.label.attr("fill-opacity") || this._labelVisible(d.target);
      })
      .transition(t)
      .attr("fill-opacity", d => +this._labelVisible(d.target))
      .attrTween("transform", d => () => this._labelTransform(d.current));
  }

  _setTarget(found, d, p) {
    if (found) {
      d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * PI2,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * PI2,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      }
    } else {
      d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * PI2,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * PI2,
        y0: Math.max(0, d.y0 - p.depth) * 2,
        y1: Math.max(0, d.y1 - p.depth) * 2
      }
    }
  }
  
  _clicked(event, p) {
    this.parent.datum(p.parent || this.root);
    this.title.text(d => this._getTitleText(p));
    this.root.each(d => {
      let found = false;
      if (d.ancestors) {
        d.ancestors().forEach((item) => {
          if (item === p) {
            found = true;
          }
        });
      }
      this._setTarget(found, d, p);
    });
    this._clickTween()
  }
  
  _clickedBack(event, p) {
    this.parent.datum(p.parent || this.root);
    this.title.text(d => this._getTitleText(p));
    this.root.each(d => {
      let found = false;
      if (p.descendants) {
        p.descendants().forEach((item) => {
          if (item === d) {
            found = true;
          }
        });
      }
      this._setTarget(found, d, p);
    });
    this._clickTween()
  }

  _getTitleText(p) {
    return`${p.ancestors().map(d => d.data.name).reverse().join(" / ")}\n${this.format(p.value)}`;
  }

  cleanup() {
    d3.select(this.ref.current).selectChildren().remove();
  }
}