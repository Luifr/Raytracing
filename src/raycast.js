import {Canvas} from "./lib/canvas.js";
import {Ray} from "./lib/ray.js";
import {Boundary, boundaries} from "./lib/boundary.js"

////////////////////////////////////////////////////////////////////////
document.addEventListener("mousedown", (event) => {
	if(event.button == 2){
		instantiateBoundary(event);
	}
	else if(event.button == 0){
		toggleRaycast(event);
	}
});
document.addEventListener("mousemove", (event) => {
	if(raycast){
		rayCastFromMouse(event);
	}
	else{
		drawUnfinishedBoundary(event);
	}
});
document.addEventListener("keypress", (e) => {
	e = e || window.event;
	if (e.key == "r") {
		Boundary.emptyBoundaries();
		canvas.fillScreen();
		if(mousePos !== null && raycast){
			rayCastFromMouse(mousePos,true);
		}
	}
});
document.addEventListener("wheel", (event) => {
	if(!raycast)
		return;
	numberOfRays -= event.deltaY/50;
	if(numberOfRays < 1.2){
		numberOfRays = 1.2;
	}
	rayCastFromMouse(mousePos,true);
})
document.oncontextmenu = function () {
	return false;
}
////////////////////////////////////////////////////////////////////////

var canvas = new Canvas();

let firstBoundaryPoint = null;
let raycast = true;
let mousePos = null;
let numberOfRays = 40;

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

	for (let b of boundaries) {
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
		for (let b of boundaries) {
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
	for (let b of boundaries) {
		b.show(canvas);
	}

	for (let i = 0; i < 2 * Math.PI; i += 1/numberOfRays) {
		let ray = new Ray(mousePosition, i);
		ray.show(canvas, boundaries);
	}

}