import {Canvas} from "./lib/canvas.js";
import {Ray} from "./lib/ray.js";
import {Boundary} from "./lib/boundary.js"

////////////////////////////////////////////////////////////////////////
document.onmousedown = (event) => {
    if(event.button == 2){
        instantiateBoundary(event);
    }
    else if(event.button == 0){
        toggleRaycast(event);
    }
};
document.onmousemove = (event) => {
    if(raycast){
        rayCastFromMouse(event);
    }
    else{
        drawUnfinishedBoundary(event);
    }
};
document.onkeypress = function (e) {
    e = e || window.event;
    if (e.key == "r") {
        Boundary.boundaries = [];
        canvas.fillScreen();
        if(mousePos !== null && raycast){
            rayCastFromMouse(mousePos,true);
        }
    }
};
document.oncontextmenu = function () {
    return false;
}
////////////////////////////////////////////////////////////////////////

var canvas = new Canvas();

let firstBoundaryPoint = null;
let raycast = true;
let mousePos = null;

function instantiateBoundary(event){
    let mousePosition = canvas.pointToWorld(event);
    if (firstBoundaryPoint === null)
        firstBoundaryPoint = mousePosition;
    else {
        new Boundary(firstBoundaryPoint, mousePosition).show(canvas);
        firstBoundaryPoint = null;
    }
}

function toggleRaycast(event) {

    firstBoundaryPoint = null;
    raycast = !raycast;
    canvas.fillScreen();

    for (let b of Boundary.boundaries) {
        b.show(canvas);
    }

    if (raycast) {
        rayCastFromMouse({
            clientX: event.pageX,
            clientY: event.pageY
        });
    }

}

function drawUnfinishedBoundary(event){
    if (firstBoundaryPoint != null) {
        canvas.fillScreen();
        for (let b of Boundary.boundaries) {
            b.show(canvas);
        }
        canvas.drawLine(firstBoundaryPoint, canvas.pointToWorld(event));
    }
}

function rayCastFromMouse(event, pointTransformed=false) {

    let mousePosition;
    if(!pointTransformed)
        mousePosition = canvas.pointToWorld(event);
    else
        mousePosition = event;

    mousePos = mousePosition;

    canvas.fillScreen();
    for (let b of Boundary.boundaries) {
        b.show(canvas);
    }

    for (let i = 0; i < 2 * Math.PI; i += 0.025) {
        let ray = new Ray(mousePosition, i);
        ray.show(canvas, Boundary.boundaries);
    }

}