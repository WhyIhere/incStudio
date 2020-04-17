$('document').ready(function(){

		//conect canvas
		var
			canv = document.getElementById('canvas'),
			ctx  = canv.getContext('2d');
			isMouseDown = false;
			cords = [];
			sizeMouse = 5;
			speedReplaing = 30;
			isMouseMove = false;
			x = 7;
			y = 110;
			colors = [];
			nowColor = colors[19];
			inputHEX = document.getElementById('input');

		canv.width = window.innerWidth * 0.99;
		canv.height = window.innerHeight * 0.835;
		
		//code
		function sort(a){
			 
			let b;

			for (var i = 0; i < 21; i++) {
				b = document.getElementById('CB' + i);
				a[i] = b.getAttribute('style').slice(18);
			}

			return a;
		}

		sort(colors);


		//trigers on down
		canv.addEventListener("mousedown", function(){
			isMouseDown = true;
			
			
		});

		canv.addEventListener("mouseup", function(){
			isMouseDown = false;
			ctx.beginPath();
			
			cords.push('mouseup');
		});
		//trigers on that mouse is located in canvas 
		$('canvas').mouseenter(function(e){
			isMouseMove = true;
		});
		$('canvas').mouseleave(function(e){
			isMouseMove = false;
			isMouseDown = false;
			ctx.beginPath();
		});	
		//daraw
		canv.addEventListener("mousemove", function(e) {

			if(isMouseMove && isMouseDown){

				sizeMouse = inSM.value;
				cords.push([e.clientX - x, e.clientY - y]);
				ctx.strokeStyle = nowColor;
				ctx.lineWidth = sizeMouse * 2;
				ctx.lineTo(e.clientX - x, e.clientY - y);
				ctx.stroke();
				ctx.beginPath();	
				
				ctx.fillStyle = nowColor;
				ctx.arc(e.clientX - x, e.clientY - y, sizeMouse, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.moveTo(e.clientX - x, e.clientY - y);
			}

		});
	
		//save pikch
		function save() {
			localStorage.setItem( 'cords', JSON.stringify(cords) );
			// localStorage.setItem('colorCords', JSON.stringify(buttonTriger));

		}
		//clear sheet
		 function clear(a) {

		 	ctx.fillStyle = 'white';
		 	ctx.fillRect(0, 0, canv.width, canv.height);

		 	ctx.beginPath();
		 	ctx.fillStyle = 'black';

		 	if( a ){
		 		cords = [];
		 	}

		 }
		 //replay img
		 function replay() {
		 	var
		 		timer = setInterval( function() {

		 			if( !cords.length ){
		 				
		 				clearInterval(timer);
		 				ctx.beginPath();
		 				return;
		 			}

		 			var 
		 				crd = cords.shift();
		 				e = {
		 					clientX: crd["0"],
		 					clientY: crd["1"]
		 				};

		 		
		 		//cords.push([e.clientX, e.clientY]);
				isMouseDown = false;
				isMouseMove = false;
				ctx.strokeStyle = 'black';
				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();
				ctx.beginPath();

				ctx.arc(e.clientX, e.clientY, sizeMouse, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.moveTo(e.clientX, e.clientY);
		 		}, speedReplaing);
		 }

		
		 var 
		 	BClear = document.getElementById('crearButton');
		 	BReplay = document.getElementById('repalayButton');
		 	BCopy = document.getElementById('copyButton');
		 	inSM = document.getElementById('inputSM');
		 	range = document.getElementById('range');
		 	erasure = document.getElementById('Erasure');

		 	range.addEventListener('mousemove', function(){
		 		inSM.value = range.value - 1;
		 		who = false;
		 	});

		 	inSM.addEventListener('mousemove', function(){
		 		range.value = inSM.value;
		 		who = false;
		 		
		 	});

		document.addEventListener("keydown", function(e){

			// console.log( e.keyCode );

			switch( e.keyCode ){
				//clear
				case 67:
					clear(true);
					console.log("Cleared");
					break;
				//save
				case 83:
					save();
					console.log("saved");
					break;
				//replay
				case 82:
					console.log("Repalaing...");
			
					cords = JSON.parse( localStorage.getItem('cords') );
					
					clear();
					replay();
					break;
				//get value HEX
				case 13:
					let i = inputHEX.value;
					
					colors.push( i );
					nowColor = i;

			}
		});


		erasure.addEventListener('mousedown', function(){
			nowColor = 'white';
		});

		BReplay.addEventListener('mouseup', function(){

					cords = JSON.parse( localStorage.getItem('cords') );
					
					clear();
					replay();
		
		});

		BCopy.addEventListener('mouseup', function(){
			save();
		});
		
		BClear.addEventListener('mouseup', function(){
			clear( true );
		});
});
