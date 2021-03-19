var canvas= document.querySelector('canvas'); 
canvas.width= "1030";
canvas.height= "430";
const c = canvas.getContext('2d');

window.onload=function() {covercanvas()};

function covercanvas()
{
	c.fillStyle="#f5f7cd";
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
	//location.reload();
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

//flood fill functions ----------------------------------------------------------------

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
  

  return "rgba(" + +r + "," + +g + "," + +b + "," + +a + ")";
}

function floodscanline()
{
	let x=0;
	let y=0;
	
	canvas.addEventListener('click', e => {
		x = e.offsetX;
		y = e.offsetY;
		
		var basecolor = c.getImageData(x, y, 1, 1).data;
		var base = hexAToRGBA(basecolor);
		var fillcolor = document.getElementById("colorinput").value;
		var fill = hexAToRGBA(fillcolor);
		
		floodscan(c, x, y, base, fillcolor, fill);
	});
}

function floodscan(c, x, y, base, fillcolor, fill)
{
	var x1;
	x1 = x;
	while(x1<canvas.width && getpixelcolor(c, x1, y) === base)
	{
		putpixel(c, x1, y, fillcolor);
		x1+=1;
	}
	
	x1 = x-1;
	while(x1>=0 && getpixelcolor(c, x1, y) === base)
	{
		putpixel(c, x1, y, fillcolor);
		x1-=1;
	}
	
	x1 = x;
	alert(getpixelcolor(c, x1, y) + " " + fill);
	while(x1<canvas.width && getpixelcolor(c, x1, y) === fill)
	{
		alert("inside the 3rd one");
		if(y>0 && getpixelcolor(c, x1, y-1) === base)
		{
			floodscan(c, x1, y-1, base, fillcolor, fill);
		}
		x1+=1;
	}
	
	x1 = x-1;
	while(x1>=0 && getpixelcolor(c, x1, y) === fill)
	{
		if(y>0 && getpixelcolor(c, x1, y-1) === base)
		{
			floodscan(c, x1, y-1, base, fillcolor, fill);
		}
		x1-=1;
	}
	
	x1 = x;
	while(x1<canvas.width && getpixelcolor(c, x1, y) === fill)
	{
		if(y<canvas.height - 1 && getpixelcolor(c, x1, y+1) === base)
		{
			floodscan(c, x1, y+1, base, fillcolor, fill);
		}
		x1+=1;
	}
	
	x1 = x-1;
	while(x1>=0 && getpixelcolor(c, x1, y) === fill)
	{
		if(y<canvas.height - 1 && getpixelcolor(c, x1, y+1) === base)
		{
			floodscan(c, x1, y+1, base, fillcolor, fill);
		}
		x1-=1;
	}
}

function getpixelcolor(c, x, y)
{
	var pixeldata = c.getImageData(x, y, 1, 1).data;
	var pixelcolor = hexAToRGBA(pixeldata);
	return pixelcolor;
}



//boundary functions -----------------------------------------------------------------------

function boundaryrecursive()
{
	let x=0;
	let y=0;
	
	canvas.addEventListener('click', e => {
		x = e.offsetX;
		y = e.offsetY;
		
		var fillcolor = document.getElementById("colorinput").value;
		var fill = hexAToRGBA(fillcolor);
		var boundarycolor = document.getElementById("blackboundary");
		var bound_color = hexAToRGBA(window.getComputedStyle(boundarycolor, null).getPropertyValue("background"));
		//alert(bound_color);
		boundary(c, x, y, fill, bound_color, fillcolor);
	});
}

function boundary(c, x, y, fill, bound_color, fillcolor)
{
	var currentpixel = c.getImageData(x, y, 1, 1).data;
	var currentpix = hexAToRGBA(currentpixel);
	if (currentpix != fill && currentpix != bound_color)
	{
		putpixel(c, x, y, fillcolor);
		boundary(c, x+1, y, fill, bound_color, fillcolor);
		boundary(c, x-1, y, fill, bound_color, fillcolor);
		boundary(c, x, y+1, fill, bound_color, fillcolor);
		boundary(c, x, y-1, fill, bound_color, fillcolor);
	}
}