import { memo } from "react";
import { Geography } from "react-simple-maps";

const SimpleMapGeography = memo(({ geo, onMouseEnter, onMouseMove, onMouseLeave, color}) => {
  return (
    <Geography
      geography={ geo }
      stroke="#FFF"
      onMouseEnter={ (e) => onMouseEnter(e, geo) }
      onMouseMove={ (e) => onMouseMove(e) }
      onMouseLeave={ (e) => onMouseLeave() }
      style={ {
        default: {
          fill: color,
          outline: "none"
        },
        hover: {
          fill: "#F53",
          outline: "none"
        },
        pressed: {
          fill: "#E42",
          outline: "none"
        }
      } }
    />
  )}
);

export default SimpleMapGeography;