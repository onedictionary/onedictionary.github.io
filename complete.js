var result=[];
var minCharToAutocomplete = 1;
var resultNumber = 5;
var liselected = -1;
var ul = document.getElementById("autolist");
var searchelement = document.getElementById("search");


function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

function place() {
	var x_pos = getOffset( document.getElementById('search') ).left;
	var y_pos = getOffset( document.getElementById('search') ).top+32;
	var d = document.getElementById('autolist');
	d.style.position = "absolute";
	d.style.left = x_pos+'px';
	d.style.top = y_pos+'px';
}

place();


function createlist(userinput) {
	
	var firstLetter = userinput[0];
	var x = userinput.charCodeAt(0); //firstLetterCharCode
	liselected = -1;
	ul.style.display="none";

	if(userinput.length >= minCharToAutocomplete &&((x>64&&x<91)||(x>96&&x<123))) {

		var filterrule = new RegExp("\\b" + userinput);
		result=this["list"+firstLetter].filter(function(a){return filterrule.test(a);});
		sortnslice();
	
		ul.innerHTML = "";
		for (var i=0; i < result.length ; i++) {
			var li = document.createElement("li");
			li.addEventListener("click", function(){
				document.getElementById("search").value = this.innerHTML;
				document.activeElement.blur();
				choosewebsite(document.getElementById("search").value);
				if(firstTime){firstTimeHide();}
				ul.style.display="none";
				ul.innerHTML="";
			});
			li.addEventListener("mouseover",function(){
				var a=document.getElementsByClassName("liselected")[0];
				if(a){a.classList.remove("liselected");}
				this.classList.add("liselected");
				liselected=index(this);
			});
			li.appendChild(document.createTextNode(result[i]));
			ul.appendChild(li);
		};

		if(result.length){
			ul.style.display = "block";
		}
	}
	if(!userinput){
		ul.innerHTML = "";
	}
	
}

function sortnslice() {result=result.sort(function (a,b) {return a.length-b.length;});result=result.slice(0,resultNumber);}

document.addEventListener("keydown", function(e){
	if(document.getElementsByTagName("li")[0]){
		if(e.keyCode==40) { //Down
			if(liselected>-1) {
				document.getElementsByTagName("li")[liselected].classList.remove("liselected");
				if(liselected===result.length-1){
					liselected=-1;
				} else {
					liselected++;
					document.getElementsByTagName("li")[liselected].classList.add("liselected");
				}
			} else {
				liselected=0;
				document.getElementsByTagName("li")[liselected].classList.add("liselected");
			}
		} else if(e.keyCode==38) { //Up
			if(liselected>-1) {
				document.getElementsByTagName("li")[liselected].classList.remove("liselected");
				if(liselected===0){
					liselected=-1;
				} else {
					liselected--;
					document.getElementsByTagName("li")[liselected].classList.add("liselected");
				}
			} else {
				liselected=result.length-1;
				document.getElementsByTagName("li")[liselected].classList.add("liselected");
			}
		} else if(e.keyCode==27) {
			ul.style.display="none";
			ul.innerHTML="";
		}
	}
});

searchelement.addEventListener("focus",function(){ul.style.display="none";ul.innerHTML="";});
searchelement.addEventListener("input", function(){if(canautocomplete)createlist(document.getElementById("search").value);});
document.getElementsByTagName("main")[0].addEventListener("click",function(){ul.style.display="none";});

function index(element){
    var sib=element.parentNode.childNodes;
    var n=0;
    for (var i=0; i<sib.length; i++) {
         if(sib[i]==element) return n;
         if(sib[i].nodeType==1) n++;
    }
    return -1; 
}