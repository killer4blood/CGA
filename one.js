var canvas= document.querySelector('canvas'); 
canvas.width= "1030";
canvas.height= "430";
const c = canvas.getContext('2d');

window.onload=function() {covercanvas()};

function covercanvas()
{
	c.fillStyle="plum";
	c.fillRect(0, 0, 1030, 430);
}

function linemaker()
{
	// When true, moving the mouse draws on the canvas
	let isDrawing = false;
	let x = 0;
	let y = 0;

	// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

	// Add the event listeners for mousedown, mousemove, and mouseup
	canvas.addEventListener('mousedown', e => {
		x = e.offsetX;
		y = e.offsetY;
		isDrawing = true;
	});

	canvas.addEventListener('mousemove', e => {
		if (isDrawing === true) {
			drawLine(c, x, y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
	});

	window.addEventListener('mouseup', e => {
		if (isDrawing === true) {
			drawLine(c, x, y, e.offsetX, e.offsetY);
			x = 0;
			y = 0;
			isDrawing = false;
		}
	});
	

	function drawLine(c, x1, y1, x2, y2) {
		c.beginPath();
		c.strokeStyle = 'black';
		c.lineWidth = 1;
		c.moveTo(x1, y1);
		c.lineTo(x2, y2);
		c.stroke();
		c.closePath();
	}
}

function clearcanvas()
{
	c.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById("radiusinput").value="";
	document.getElementById("colorinput").value="";
	covercanvas();
}

var radius = 0;
function circlemaker()
{
	radius = document.getElementById("radiusinput").value;
	let x = 0;
	let y = 0;

	canvas.addEventListener('click', e => {
		x = e.offsetX;
		y = e.offsetY;
		c.beginPath();
		c.arc(x, y, radius, 0, 2 * Math.PI);
		c.stroke();
	});
}

//var fillcolor = 0;
function floodrecursive()
{
	let x=0;
	let y=0;
	
	canvas.addEventListener('click', e => {
		x = e.offsetX;
		y = e.offsetY;
		
		//this gives the color of the pixel in RGBA format
		var basecolor = c.getImageData(x, y, 1, 1).data;
		var base = hexAToRGBA(basecolor);
		//alert(basecolor);
		var fillcolor = document.getElementById("colorinput").value;
		//var currentpixel = c.getImageData(x, y, 1, 1).data;
		//putpixel(c, x, y, fillcolor);
		//var currentpixel;
		
		flood(c, x, y, base, fillcolor);
	});
//try putting the functions outside
}
	
function flood(c, x, y, base, fillcolor)
{
	//try adding var again here
	var currentpixel = c.getImageData(x, y, 1, 1).data;
	var currentpix = hexAToRGBA(currentpixel);
	if (currentpix === base)
	{
		putpixel(c, x, y, fillcolor);
		flood(c, x+1, y, base, fillcolor);
		flood(c, x-1, y, base, fillcolor);
		flood(c, x, y+1, base, fillcolor);
		flood(c, x, y-1, base, fillcolor);
	}
}

function putpixel(c, x, y, fillcolor)
{
	c.fillStyle = "#" + fillcolor;
	c.fillRect(x, y, 1, 1);
}

function hexAToRGBA(h) {
  let r = 0, g = 0, b = 0, a = 1;

  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    a = "0x" + h[4] + h[4];

  } else if (h.length == 8) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  a = +(a / 255).toFixed(3);

  return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
}