import { useState, useRef, memo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  ZoomableGroup
} from "react-simple-maps";
import SimpleMapGeography from './SimpleMapGeography';
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectHighlightCountryCode, setHighlightCountryCode } from "../../state/appSlice";
import getUserLocale from 'get-user-locale';
import "./SimpleMap.css";
/**
 * GeoJSON file downloaded from:
 * https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
 */
import geoJSON from "./ne_50m_admin_0_countries.json"


const localePart = getUserLocale().split('-')[0].toUpperCase() || "EN";

const getPosition = (e) => { return { left: e.nativeEvent.pageX + 10, top: e.nativeEvent.pageY + 10 }};

const SimpleMap = memo(() => {
  const tooltipRef = useRef();
  const appDispatch = useAppDispatch();
  const highlightCountryCode = useAppSelector(selectHighlightCountryCode); 
  const [ tooltipPosition, setTooltipPosition ] = useState({ left: 0, top: 0 });
  const [ tooltipText, setTooltipText] = useState("");
  const geographyProps = {
    onMouseEnter: useCallback((e, geo) => {
      setTooltipPosition(getPosition(e));
      setTooltipText(geo.properties[`NAME_${localePart}`] || geo.properties.NAME_EN);
      appDispatch(setHighlightCountryCode(geo.properties.SU_A3));
    }, [appDispatch]), 
    onMouseLeave: useCallback(() => {
      setTooltipText("");
      appDispatch(setHighlightCountryCode(null));
    },[appDispatch]), 
    onMouseMove: useCallback((e) => setTooltipPosition(getPosition(e)), [])
  };
  return (
    <>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={ [0, 0] } zoom={ 1 }>
          <Geographies geography={ geoJSON }>
            {({ geographies }) => geographies.map(geo => 
                <SimpleMapGeography 
                  key={ geo.rsmKey }
                  geo={ geo }
                  color={ geo.properties.SU_A3 === highlightCountryCode ? "#F53" : "#D6D6DA" }
                  { ...geographyProps }
                />
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div ref={tooltipRef} style={tooltipPosition} className={tooltipText?"Tooltip":"Hidden"}>{tooltipText}</div>
    </>
  );
})

export default SimpleMap;