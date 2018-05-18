var life=3;
var n=0;

document.onkeydown = function(event){
	if(event.keyCode==37){
		t1.direction="left";
		t1.move();
	}else if(event.keyCode==39){
			t1.direction = "right";
			t1.move();
	}else if(event.keyCode==40){
			t1.direction = "down";
			t1.move();
	}else if(event.keyCode==38){
			t1.direction = "up";
			t1.move();			
	}else if(event.keyCode==32){
			t1.shot();
	}
}

var tanks= new Array();

function Tank(){
	var tank=new Object();
	tank.id="";
	tank.top="";
	tank.left="";
	tank.direction="up";
	tank.type="";
	tank.autointerval = null;
	tank.init=function(){
		var tank1=document.createElement("div");
		if(tank.type=="E"){
			tank1.className="army";
		}
		else{
			
			tank1.className="tank";
		}
		
		tank1.id=this.id;
		tank1.style.top=this.top;
		tank1.style.left=this.left;
		var element=document.getElementById("BB");
		element.appendChild(tank1);
		tanks.push(tank);
	}
	tank.shot=function(){
		var bullet = new Bullet();
		bullet.id=tank.id+"bullet";
		bullet.type=tank.type;
		bullet.direction=tank.direction;
		if(bullet.direction=="left"){
			bullet.top=parseInt(tank.top)+12.5;
			bullet.left=tank.left-5;
		}
		else if(bullet.direction=="up"){
			bullet.top=tank.top-5;
			bullet.left=parseInt(tank.left)+12.5;
		}
		else if(bullet.direction=="right"){
			bullet.top=parseInt(tank.top)+12.5;
			bullet.left=parseInt(tank.left)+30;
		}
		else if(bullet.direction=="down"){
			bullet.top=parseInt(tank.top)+30;
			bullet.left=parseInt(tank.left)+12.5;
		}
		bullet.init();
	}
	tank.move=function(){
		tank.change();
		var div=document.getElementById(this.id);
		if(this.direction=="left"){
			for(var i=0;i<walls.length;i++){
				var w = walls[i];
				if((parseInt(tank.left)>parseInt(w.left))&&(parseInt(tank.left)<=parseInt(w.left)+15)){
					if(parseInt(tank.top)>parseInt(w.top)-30&&parseInt(tank.top)<parseInt(w.top)+15){
						return;
					}
				}
			}
			this.left=this.left-5;
			if(this.left<=0){
				this.left=0;	
			}
		}else if(this.direction=="right"){
				for(var i=0;i<walls.length;i++){
					var w = walls[i];
					if((parseInt(tank.left)+30>=parseInt(w.left))&&(parseInt(tank.left)+15<parseInt(w.left))){
						if(parseInt(tank.top)>parseInt(w.top)-30&&parseInt(tank.top)<parseInt(w.top)+15){
						return;
						}
					}
				}
			this.left=parseInt(this.left)+5;
			if(parseInt(this.left)+30>=600){
				this.left=570;
			}
		}else if(this.direction=="down"){
				for(var i=0;i<walls.length;i++){
					var w = walls[i];
					if((parseInt(tank.top)+30>=parseInt(w.top))&&(parseInt(tank.top)+15<parseInt(w.top))){
						if(parseInt(tank.left)>parseInt(w.left)-30&&parseInt(tank.left)<parseInt(w.left)+15){
						return;
						}
					}
				}
			this.top=parseInt(this.top)+5;
			if(parseInt(this.top)+30>=600){
				this.top=570;
			}
		}else if(this.direction=="up"){
				for(var i=0;i<walls.length;i++){
					var w = walls[i];
					if((parseInt(tank.top)<=parseInt(w.top)+15)&&(parseInt(tank.top)>parseInt(w.top))){
						if(parseInt(tank.left)>parseInt(w.left)-30&&parseInt(tank.left)<parseInt(w.left)+15){
						return;
						}
					}
				}
			this.top=parseInt(this.top)-5;
			if(parseInt(this.top)<=0){
				this.top=0;
			}
		}

		div.style.top=this.top+"px";
		div.style.left=this.left+"px";
	}	
	tank.startauto=function(){
		tank.autointerval = setInterval(tank.auto,200);
	}
	tank.auto=function(){
		var randomnum = Math.random();
		if(randomnum >=0 && randomnum < 0.1){
			tank.move();
			tank.shot();
		}else if(randomnum >=0.1 && randomnum < 0.2){
			tank.move();
			tank.shot();
		}else if(randomnum >=0.2 && randomnum < 0.25){
			tank.direction = "left";
			tank.move();
			tank.shot();
		}else if(randomnum >=0.3 && randomnum < 0.35){
			tank.direction = "right";
			tank.move();
			tank.shot();
		}else if(randomnum >=0.4 && randomnum < 0.45){
			tank.direction = "up";
			tank.move();
			tank.shot();
		}else if(randomnum >=0.5 && randomnum < 0.65){
			tank.direction = "down";
			tank.move();
			tank.shot();
		}else{
			tank.shot();
			tank.move();
		}
	}
	tank.dead=function(){
		window.clearInterval(tank.autointerval); 
		var div=document.getElementById(tank.id);
		if(tank.type=="E"){
			div.style.backgroundImage="url(boom.gif)";
			setTimeout(boom,1000);
			n=n+1;
			if(n==5){
				initETank();
			}
			if(n==10){
				alert("Enemy Removal");
				history.go(0);
			}
		}else if(tank.type=="F") {
			life=life-1;
			div.style.backgroundImage="url(boom.gif)";
			setTimeout(boom2,1000);
		}
		function boom(){
			div.parentNode.removeChild(div);
		}
		function boom2(){
			if(life==0){
				alert("Game Over");
				history.go(0);
			}
			else {
				tank.top="575";
				tank.left="240";
				tank.direction="up"; 
				div.style.top=this.top+"px";
				div.style.left=this.left+"px";
				tank.move();
			}
		}
	}
	tank.change=function(){
		var img=document.getElementById(tank.id);
		if(tank.type=="F"){
			img.style.backgroundImage="url("+tank.direction+".gif)";
		}else {
			img.style.backgroundImage="url(army"+tank.direction+".gif)";
		}
	}

	return tank;
}


function Bullet(){
	var bullet = new Object();
	bullet.id="";
	bullet.top="";
	bullet.left="";
	bullet.direction="";
	bullet.type="";
	bullet.interval = null;
	bullet.init=function(){
		var bullet1 = document.getElementById(bullet.id);
		if(bullet1!=null){
			return;
		}	
		var bullet1=document.createElement("div");
		bullet1.className="bullet";
		bullet1.id=this.id;
		bullet1.style.top=this.top;
		bullet1.style.left=this.left;
		var element=document.getElementById("BB");
		element.appendChild(bullet1);
		bullet.interval =setInterval(bullet.move,80);	
	}
	bullet.move=function(){
		var div=document.getElementById(bullet.id);
		if(bullet.direction=="left"){
			for(var i=0;i<walls.length;i++){
				var w = walls[i];
				if((parseInt(bullet.left)+5>=parseInt(w.left))&&(parseInt(bullet.left)<=parseInt(w.left)+10)){
					if(parseInt(bullet.top)>parseInt(w.top)-5&&parseInt(bullet.top)<parseInt(w.top)+15){
						bullet.remove();
						var boxRemove=document.getElementById(w.id);
						boxRemove.parentNode.removeChild(boxRemove);
						walls.splice(i,1);
					}
				}
			}
			bullet.left=bullet.left-10;
			if(bullet.left<=0){
				bullet.remove();
			}
		}else if(bullet.direction=="right"){
			for(var i=0;i<walls.length;i++){
				var w = walls[i];
				if((parseInt(bullet.left)>parseInt(w.left))&&(parseInt(bullet.left)<=parseInt(w.left)+15)){
					if(parseInt(bullet.top)>parseInt(w.top)-5&&parseInt(bullet.top)<parseInt(w.top)+15){
						bullet.remove();
						var boxRemove=document.getElementById(w.id);
						boxRemove.parentNode.removeChild(boxRemove);
						walls.splice(i,1);
					}
				}
			}
			bullet.left=parseInt(bullet.left)+10;
			if(bullet.left>=600){
				bullet.remove();
			}
		}else if(bullet.direction=="up"){
			for(var i=0;i<walls.length;i++){
				var w = walls[i];
				if((parseInt(bullet.top)>parseInt(w.top))&&(parseInt(bullet.top)<=parseInt(w.top)+15)){
					if(parseInt(bullet.left)>parseInt(w.left)-5&&parseInt(bullet.left)<parseInt(w.left)+15){
						bullet.remove();
						var boxRemove=document.getElementById(w.id);
						boxRemove.parentNode.removeChild(boxRemove);
						walls.splice(i,1);
					}
				}
			}
			bullet.top=bullet.top-10;
			if(bullet.top<=0){
				bullet.remove();
			}
		}else if(bullet.direction=="down"){
			for(var i=0;i<walls.length;i++){
				var w = walls[i];
				if((parseInt(bullet.top)>=parseInt(w.top)-5)&&(parseInt(bullet.top)<parseInt(w.top)+10)){
					if(parseInt(bullet.left)>parseInt(w.left)-5&&parseInt(bullet.left)<parseInt(w.left)+15){
						bullet.remove();
						var boxRemove=document.getElementById(w.id);
						boxRemove.parentNode.removeChild(boxRemove);
						walls.splice(i,1);
					}
				}
			}
			bullet.top=parseInt(bullet.top)+10;		
			if(bullet.top>=600){
				bullet.remove();
			}			
		}
		if(bullet.type=="E"){
			if((parseInt(bullet.top)>parseInt(t1.top)-10&&parseInt(bullet.top)<parseInt(t1.top)+30)&&parseInt(bullet.left)<parseInt(t1.left)+30&&parseInt(bullet.left)>parseInt(t1.left)-10){			
				bullet.remove();
				t1.dead();

			}
		}else if(bullet.type=="F") {
			for(var i=0;i<tanks.length;i++){
				if((parseInt(bullet.top)>parseInt(tanks[i].top)-10&&parseInt(bullet.top)<parseInt(tanks[i].top)+30)&&parseInt(bullet.left)<parseInt(tanks[i].left)+30&&parseInt(bullet.left)>parseInt(tanks[i].left)-10){
					bullet.remove();
					tanks[i].dead();
					tanks.splice(i,1);
				}
			}	
		}
		if(parseInt(bullet.top)>555&&parseInt(bullet.top)<595&&parseInt(bullet.left)>282&&parseInt(bullet.left)<322){	
			//div.style.backgroundImage="url("+'boom'+".gif)";
			alert("Home Done");
			history.go(0);
		}
		div.style.backgroundImage="url("+'bullet'+".gif)";
		div.style.top=bullet.top+"px";
		div.style.left=bullet.left+"px";
	}
	
	bullet.remove=function(){
		window.clearInterval(bullet.interval); 
		var div=document.getElementById(bullet.id);
		div.parentNode.removeChild(div);
		bullet = null;
	}
	return bullet;
}

var walls=new Array();

function Box(){
		var box=new Object();
		box.id="";
		box.top="0";
		box.left="0";
		box.type="a";
		box.init=function(){
			var box1=document.createElement("div");
			box1.className = "wall"; 
			box1.style.top = this.top;
			box1.style.left = this.left;
			box1.id = this.id;
			var element=document.getElementById("BB");
			element.appendChild(box1);   
			walls.push(box);
		}
	    box.change=function(){
			var div=document.getElementById(this.id);
				if(this.type=="a"){
					div.style.backgroundImage="url(wall1.gif)";
				}else if(this.type=="b"){
					div.style.backgroundImage="url(wall2.gif)";
				}
		}
		return box;
	}

function Wall(){
	var wall = new Object();
	wall.width="";
	wall.length="";
	wall.type="";
	wall.init=function(){
		for(var i=0;i<wall.width;i++){
			for(var j=0;j<wall.length;j++){
				var wll=new Box();
				wll.top=parseInt(wall.top)+15*j;
				wll.left=parseInt(wall.left)+15*i;
				wll.id="wall-"+wll.top+"-"+wll.left;
				wll.type=this.type;
				wll.init();
				wll.change();
			}
		}
	}
	return wall;
}

function Home(){
	var home = new Object();
	home.id="";
	home.left="";
	home.top="";
	home.type="";
	home.init=function(){
			var home=document.createElement("div");
			home.className="home";
			home.id=this.id;
			home.style.top=this.top;
			home.style.left=this.left;
			var element=document.getElementById("BB");
			element.appendChild(home);
		}
		return home;
}

function delay(){
	var i=0;
}

var ETankArr = new Array();

var t1=new Tank();
t1.id="tank1";
t1.top="570";
t1.left="240";
t1.type="F";
t1.init();
initETank();
function initETank(){
	for(var i=0;i<5;i++){
		var t2=new Tank();
		t2.id="tankE"+i;
		t2.top="0";
		t2.left=120*i;
		t2.type="E";
		t2.init();
		t2.startauto();
	}		
}

var w1=new Wall();
w1.id="wall1";
w1.top="30";
w1.left="30";
w1.width="2";
w1.length="14";
w1.type="a";
w1.init();
initWall();
function initWall(){
	for(var i=0;i<9;i++){
		var w2=new Wall();
		w2.id="walla"+i;
		w2.top="30";
		w2.left=30+60*(i+1);
		w2.width="2";
		if(i>=2&&i<=5){
			w2.length="12";
			w2.type="b";
		}else{
			w2.length="14";
			w2.type="a";
		}
		w2.init();
		
	}
}

var home1=new Wall();
home1.id="home1";
home1.top="540";
home1.left="270";
home1.width="1";
home1.length="4";
home1.type="a";
home1.init();

var home2= new Wall();
home2.id="home2";
home2.top="540";
home2.left="285";
home2.width="3";
home2.length="1";
home2.type="a";
home2.init();

var home3=new Wall();
home3.id="home3";
home3.top="540";
home3.left="330";
home3.width="1";
home3.length="4";
home3.type="a";
home3.init();

var home4=new Home();
home4.id="home";
home4.top="555";
home4.left="288";
home4.init();

var w3=new Wall();
w3.id="wall3";
w3.top="290";
w3.left="0";
w3.width="2";
w3.length="2";
w3.type="b";
w3.init();

var w4=new Wall();
w4.id="wall4";
w4.top="270";
w4.left="60";
w4.width="6";
w4.length="2";
w4.type="a";
w4.init();

var w5=new Wall();
w5.id="wall5";
w5.top="290";
w5.left="180";
w5.width="6";
w5.length="2";
w5.type="a";
w5.init();

var w6=new Wall();
w6.id="wall6";
w6.top="270";
w6.left="300";
w6.width="6";
w6.length="2";
w6.type="a";
w6.init();

var w7=new Wall();
w7.id="wall7";
w7.top="290";
w7.left="420";
w7.width="6";
w7.length="2";
w7.type="a";
w7.init();

var w8=new Wall();
w8.id="wall8";
w8.top="270";
w8.left="570";
w8.width="2";
w8.length="2";
w8.type="b";
w8.init();

var w9=new Wall();
w9.id="wall9";
w9.top="350";
w9.left="60";
w9.width="10";
w9.length="10";
w9.type="a";
w9.init();

var w10=new Wall();
w10.id="w10";
w10.top="350";
w10.left="390";
w10.width="10";
w10.length="10";
w10.type="a";
w10.init();