var minT = document.getElementById("minT").value;
var maxT = document.getElementById("maxT").value;
minT = parseInt(minT);
maxT = parseInt(maxT);
var firstrun = true;
console.log("Why 1?");
var grad = 255/(maxT-minT);//Exception for 0
var fixedT = Math.round((minT+maxT)/2);
//alert("minT: "+minT+"\nmaxT: "+maxT+"\ngrad: "+grad);
if(document.getElementById("rdic").checked)
	choice = 1;
else
	choice = 2;
var num = new Array();
var value = document.getElementById("sliderValue").value;
document.getElementById("theValue").innerHTML = value;
var t = document.getElementById("diffValue").value;
document.getElementById("diff").innerHTML = t;
var timer;

var initialize = function(){
num[0]=fixedT;
var i;
for(i=1; i<value-1; i++){
	num[i] = Math.round(Math.random()* (maxT-minT))+ minT;
	//console.log(num[i]+";");
}
num[i]=fixedT;
updateRes();
};
var func = function(){
maxT = Math.round(document.getElementById("maxT").value) ;
minT = Math.round(document.getElementById("minT").value);
grad = (maxT-minT)/255;
updateRes();
timer = setInterval(newFunc, 30);
};
var newFunc = function(){
var size = value;
var radio = choice;
t = document.getElementById("diffValue").value;
var TIMES=10000;
var i, dx = 0.5, dt=0.000000001;
//var num= new Array();
var numUpdate = new Array();
/*for(i=0; i<size; i++){
	num[i] = Math.random()*100+100;
}*/
for(i=0; i<TIMES; i++){
	for(j=1; j<size-1; j++)
		numUpdate[j] = num[j] + t*(dt*(num[j+1]+num[j-1]-2*num[j])/(dx*dx));
	if(radio == 1)
		numUpdate[0] = numUpdate[size-1] = fixedT;
	else{
		numUpdate[0] = numUpdate[1];
		numUpdate[size-1] = numUpdate[size-2];
	}
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
for(i=0;i<value;i++)
{ no=Math.floor((num[i]-minT)*grad);
	
  color="#"+(no-1).toString(16)+(no-1).toString(16)+(no-1).toString(16);
  ctx.fillStyle=color;
  //alert((no-1+ "; num: "+ num[i]+"; color: "+color));
  ctx.fillRect(i*width/value,0,width/value,height);
}
//return num;
};

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

};
//alert("Beginning initialization");
initialize();
updateRes();

var stop = function(){ clearInterval(timer);};
initialize();
changeCondition(choice);
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
    