var canvas= document.querySelector('canvas');
canvas.width= "1030";
canvas.height= "430";
const c = canvas.getContext('2d');

function linemaker()
{
	// When true, moving the mouse draws on the canvas
	let isDrawing = false;
	let x = 0;
	let y = 0;
	const line = document.querySelector('canvas');
	const ctxLine = line.getContext('2d');

	// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

	// Add the event listeners for mousedown, mousemove, and mouseup
	line.addEventListener('mousedown', e => {
		x = e.offsetX;
		y = e.offsetY;
		isDrawing = true;
	});

	line.addEventListener('mousemove', e => {
		if (isDrawing === true) {
			drawLine(ctxLine, x, y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
	});

	window.addEventListener('mouseup', e => {
		if (isDrawing === true) {
			drawLine(ctxLine, x, y, e.offsetX, e.offsetY);
			x = 0;
			y = 0;
			isDrawing = false;
		}
	});
	

	function drawLine(ctxLine, x1, y1, x2, y2) {
		ctxLine.beginPath();
		ctxLine.strokeStyle = 'black';
		ctxLine.lineWidth = 1;
		ctxLine.moveTo(x1, y1);
		ctxLine.lineTo(x2, y2);
		ctxLine.stroke();
		ctxLine.closePath();
	}
}

function clearcanvas()
{
	c.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById("radiusinput").value="";
}

var radius = 0;
function circlemaker()
{
	radius = document.getElementById("radiusinput").value;
	let x = 0;
	let y = 0;
	const circle = document.querySelector('canvas');
	const ctxCircle = circle.getContext('2d');

	circle.addEventListener('click', e => {
		x = e.offsetX;
		y = e.offsetY;
		ctxCircle.beginPath();
		ctxCircle.arc(x, y, radius, 0, 2 * Math.PI);
		ctxCircle.stroke();
	});
	
}