let script = ()=>{	   		  
	let canvas;	  		 	 
	let ctx;	  			  
	let interval;	   	 		
	let bouncies = [];	  		  	
	let logo = new Image();	    	  
	logo.src='se.png';		  			 
	let init = ()=>{	  	   	
		bouncies.push(new Logo(),new Logo(),	   	  	
			new Logo(),new Logo(),new Logo(),		  			 
			new Logo(),new Logo(),new Logo(),	   		  
			new Logo(),new Logo(),new Logo(),		  			 
			new Logo(),new Logo(),new Logo(),	  			 	
			new Logo(),new Logo(),new Logo());	  	  		
		canvas = document.getElementById('canvas');	  		 	 
		canvas.width = innerWidth;	 	     
		canvas.height = innerHeight;	  			  
		ctx = canvas.getContext('2d');		  				
		interval = setInterval(()=>{	  		 		
			render();		  		  
		},1000/60);	 	     
		  	   
	}	 	     
	let render = ()=>{		  		  
		ctx.clearRect(0,0,canvas.width,canvas.height);	  	   	
		bouncies.forEach(b=>{	 	     
			b.move();	   	   
			ctx.drawImage(logo,b.x,b.y,b.width,b.height);		  			 
		});		  	   
	}	  	 			
	class Logo{	 	     
		constructor(){		  		  
			this.x = Math.floor(Math.random()*innerWidth);	    		 
			this.y = Math.floor(Math.random()*innerHeight);		  		  
			this.width = 50;		  	 	 
			this.height = 50;	     	 
			this.xSign = (Math.random()>0.5)?-1:1;
			this.ySign = (Math.random()>0.5)?-1:1;
		}
		move(){
			this.x+= 3*this.xSign;
			this.y+= 3*this.ySign;
			if(this.x < 0) this.xSign = 1;
			if(this.y < 0) this.ySign = 1;
			if(this.x + this.width> innerWidth) this.xSign = -1;
			if(this.y + this.height > innerHeight) this.ySign = -1;
		}
	}
	window.addEventListener('load',()=>{
		//init();
	});
}
script();
