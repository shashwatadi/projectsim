var t =1;
var timer;
var value = 100;
var num = new Array();

var initialize = function(){
var i;
for(i=0; i<100; i++){
if(i<50)
	num[i]=0;
else
	num[i]=1;
}
updateRes();
};

var func = function(){
updateRes();
timer = setInterval(newFunc, 30);
};
var newFunc = function(){
var size = value;

var TIMES=10000;
var i, dx = 0.01, dt=0.000000001;
var numUpdate = new Array();

for(i=0; i<TIMES; i++){
	for(j=1; j<size-1; j++)
		numUpdate[j] = num[j] + t*(dt*(num[j+1]+num[j-1]-2*num[j])/(dx*dx));
	numUpdate[0] = numUpdate[1];
	numUpdate[size-1] = numUpdate[size-2];
	num = numUpdate;
}
updateRes();
};

var updateRes= function(){
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var color, no;
console.log("Update");
var width=c.width,height=c.height,i;
for(i=0;i<value;i++){
	no=Math.floor(num[i]*238);
	//alert("COL num,no: "+num[i]+", "+no);

	
	color="#"+(no+16).toString(16)+(no+16).toString(16)+(no+16).toString(16);
	ctx.fillStyle=color;
    ctx.fillRect(i*width/value,0,width/value,height);
}
loader();
};
/*
var showValue = function(){
var D = document.getElementById("sliderValue").value;
document.getElementById("theValue").innerHTML = D;

if(D>value)
	for(i=value; i<D-1; i++){
		num[i] = Math.round(Math.random()* (maxT-minT))+ minT;
	//	console.log(i+"; "+value+"; "+num[i]);
		}
else if(D<value)
	for(i=value-1; i>D-1;i--)
		num.splice(i,1);
if(choice==1)
	num[D-1] = fixedT;
else
	num[D-1] = Math.round(Math.random()* (maxT-minT))+ minT;
value=D;
updateRes();
//return num;
};
var diffVal = function(){
var Dif = document.getElementById("diffValue").value;
document.getElementById("diff").innerHTML = Dif;
};
var changeCondition = function(local){
if(local == 2){
num[0] = Math.round(Math.random()* (maxT-minT))+ minT;
num[value-1] = Math.round(Math.random()* (maxT-minT))+ minT;}
else{
num[0] = num[value-1] = fixedT;}
choice = local;
console.log("Condition changed to choice "+choice);
updateRes();

};*/
//alert("Beginning initialization");
initialize();
updateRes();

var stop = function(){ clearInterval(timer);};
initialize();
//changeCondition(choice);
var refresh = function(){
window.location.reload(false); 
};
function exitCoords(event){
 document.getElementById("temp").innerHTML = "";
}

function runCoord(event){
	event = event || window.event
    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
    }
	var theNum = 0;
	var can = document.getElementById("canvas");
	var el = getOffset(can); 
	var maxVal = el.right - el.left;
	var divSize = maxVal/ value;
	var index = Math.floor((event.pageX - el.left)/divSize);
	theNum = parseFloat(num[index]);
	if(theNum.toFixed(0) == num[index])
		document.getElementById("temp").innerHTML = ": "+ theNum;
	else
		document.getElementById("temp").innerHTML = ": "+ theNum.toFixed(2);
}
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem);
    } else { // old browser
        return getOffsetSum(elem);
    }
}
function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var left = box.left;
	var right = box.right;
    return { right: Math.round(right), left: Math.round(left) }
}
function loader(){
var graph = document.getElementById("graph");
var size = value;
var width = graph.width;
var height = graph.height;
var unitScaleX = width/(size+1);
if(graph.getContext){
	var content = graph.getContext("2d");
	drawAxes(content, unitScaleX, height, width);
	content.beginPath();
	for(i=0; i<size-1; i++){
	content.moveTo(unitScaleX*(i+2), (1-num[i])*height);
	content.lineTo(unitScaleX*(i+3), (1-num[i+1])*height);
}
content.closePath();
}
}
 function drawAxes(elem, unit, ht, wd){
 elem.beginPath();
	elem.moveTo(unit, 0);
	elem.lineTo(unit, ht);
	elem.moveTo(0, ht);
	elem.lineTo(wd, ht);
 elem.closePath();
 }