
	document.onkeydown = function(event){
		if(event.keyCode==37){
			t1.direction = "left";
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
		}
	}
	
	function Box(){
		var box=new Object();
		box.id="";
		box.top="0";
		box.left="0";
		box.direction="";
		box.move=function(){
			box.change();
			if(this.direction==""){
				return;
			}
			var div = document.getElementById(this.id);
			if(this.direction=="left"){
				this.left=this.left-10;
				if(this.left<0){
				this.left=0;
				}
				div.style.left=this.left+"px";
			}else if(this.direction=="right"){
				this.left=parseInt(this.left)+30;
				if(this.left>=570){
				this.left=570;
				}
				div.style.left=this.left+"px";
			}else if(this.direction=="down"){
				if(parseInt(this.top)+30>570){
					this.top=570;
				}else{
				this.top=parseInt(this.top)+10;
				}
				div.style.top=this.top+"px";
			}else if(this.direction=="up"){
				if(this.top<0){
					this.top=0;
				}else{
					this.top=this.top-10;
				}
				div.style.top=this.top+"px";
			}
		}
		
		box.init=function(){
			var box=document.createElement("div");
			box.className = "tank";  
			box.style.top = this.top;
			box.style.left = this.left;
			box.id = this.id;
			var element=document.getElementById("BB");
			element.appendChild(box);		
		}
		
		box.change=function(){
			var img=document.getElementById(box.id);
			img.style.backgroundImage="url("+box.direction+".gif)";
		}
		return box; 
	}
	
	var t1=new Box();
	t1.id="tank1";
	t1.direction="up";
	t1.init();
	document.getElementById("tank1").className="tank";