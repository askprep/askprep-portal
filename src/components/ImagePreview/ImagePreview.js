import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

/* Component */
const ImagePreview = ({imageUrl, contour, setContour} ) => {
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
         passes. In this case it will hold our component's SVG DOM element. It's
         initialized null and React will assign it later (see the return statement) */
  // const d3Container = useRef(null);

  var svgCanvas = d3.select('svg');
  var polyCoordinates  = contour;
  // [
  //   [10, 10],
  //   [200, 150],
  //   [240, 240],
  //   [15, 250],
  // ];
  function Polygon(polyPoints) {
    if (!polyPoints)
      return;

    var dragBehavior = d3.drag().on('drag', alterPolygon);

    //Called on mousedown if mousedown point if a polygon handle
    function completePolygon() {
      d3.select('g.polygon').remove();

      let gPoly = svgCanvas.append('g').classed('polygon', true);
      gPoly.append('polygon').attr('points', polyPoints);

      for (var i = 0; i < polyPoints.length; i++) {
        gPoly
          .append('circle')
          .attr('cx', polyPoints[i][0])
          .attr('cy', polyPoints[i][1])
          .attr('r', 5)
          .call(dragBehavior);
      }

      // isDrawing = false;
      // isDragging = true;

    }


    function checkConvexPolygon(polyPoints) {
      let prevZComponent = 0;
      let zcomponent = 0;
      for (let k = 0; k < polyPoints.length; k++) {
          prevZComponent = zcomponent;
          zcomponent = zcompnentTriplet(polyPoints[k % polyPoints.length],
              polyPoints[(k + 1) % polyPoints.length],
              polyPoints[(k + 2) % polyPoints.length]
          );
          if( Math.abs(zcomponent) < 0.3 ) return false;
          if (k > 0) {
              if (Math.sign(zcomponent) != Math.sign(prevZComponent)) {
                  return false;
              }
          }
      }
      return true;
    }

    function zcompnentTriplet(p1, p2, p3) {
      let dx1 = p2[0] - p1[0];
      let dy1 = p2[1] - p1[1];
      let dx2 = p3[0] - p2[0];
      let dy2 = p3[1] - p2[1];
      return (dx1 * dy2 - dy1 * dx2)/(Math.sqrt(dx1*dx1+dy1*dy1)*Math.sqrt(dx2*dx2+dy2*dy2));
    }

    //Altering polygon coordinates based on handle drag
    function alterPolygon() {

      var alteredPoints = [];
      var selectedP = d3.select(this);
      var parentNode = d3.select(this.parentNode);

      //select only the elements belonging to the parent <g> of the selected circle
      var circles = d3.select(this.parentNode).selectAll('circle');
      var polygon = d3.select(this.parentNode).select('polygon');

      var prevSelectedP = [selectedP.attr("cx"), selectedP.attr("cy")];

      var pointCX = d3.event.x;
      var pointCY = d3.event.y;

      //rendering selected circle on drag
      selectedP.attr("cx", pointCX).attr("cy", pointCY);

      //loop through the group of circle handles attatched to the polygon and push to new array
      for (var i = 0; i < polyPoints.length; i++) {
          var circleCoord = d3.select(circles._groups[0][i]);
          var pointCoord = [circleCoord.attr("cx"), circleCoord.attr("cy")];
          alteredPoints[i] = pointCoord;
      }

      if(!checkConvexPolygon(alteredPoints)){
          selectedP.attr("cx", prevSelectedP[0]).attr("cy", prevSelectedP[1]);
          return;
      }

      //re-rendering polygon attributes to fit the handles
      setContour(alteredPoints);
      polygon.attr("points", alteredPoints);
      
      // var alteredPoints = [];
      // var selectedP = d3.select(this);
      // var parentNode = d3.select(this.parentNode);

      // //select only the elements belonging to the parent <g> of the selected circle
      // var circles = d3.select(this.parentNode).selectAll('circle');
      // var polygon = d3.select(this.parentNode).select('polygon');

      // var pointCX = d3.event.x;
      // var pointCY = d3.event.y;

      // //rendering selected circle on drag
      // selectedP.attr('cx', pointCX).attr('cy', pointCY);

      // //loop through the group of circle handles attatched to the polygon and push to new array
      // for (var i = 0; i < polyPoints.length; i++) {
      //   var circleCoord = d3.select(circles._groups[0][i]);
      //   var pointCoord = [circleCoord.attr('cx'), circleCoord.attr('cy')];
      //   alteredPoints[i] = pointCoord;
      // }

      // //re-rendering polygon attributes to fit the handles
      // polygon.attr('points', alteredPoints);
      
    }

    completePolygon();

  }

  /* The useEffect Hook is for running side effects outside of React,
         for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      // if (d3Container.current) {
        Polygon(polyCoordinates);
      // }
    }, [],

    /*
                useEffect has a dependency array (below). It's a list of dependency
                variables for this useEffect block. The block will run after mount
                and whenever any of these variables change. We still have to check
                if the variables are valid, but we do not have to compare old props
                to next props to decide whether to rerender.
            */
  );
  
 
  return (
    // <svg
    //     className="d3-component"
    //     width={400}
    //     height={200}
    //     ref={d3Container}
    // />
    <>
      
        {/* <image
          href={imageUrl}
          style={{width: '100%', height: 'auto',}}
          ref={d3Container}
        /> */}
        {/* <rect width="590" height="490" style={{fill:'#6666ff', 'fill-rule':'evenodd',}} /> */}
    </>
  );
};

export default ImagePreview;

// /* App */
// export const MyApp = () => {
//     return (
//         <div className="my-app">
//             <MyD3Component data={[1,2,3]}/>
//         </div>
//     )
// }
