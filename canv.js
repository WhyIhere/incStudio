$('document').ready(function(){

		//conect canvas
		var
			canv = document.getElementById('canvas'),
			ctx  = canv.getContext('2d');
			isMouseDown = false;
			cords = [];
			sizeMouse = 5;
			speedReplaing = 25;
			isMouseMove = false;


		canv.width = 900;
		canv.height = 500;
		
		//code
		canv.addEventListener("mousedown", function(){
			isMouseDown = true;
		});

		canv.addEventListener("mouseup", function(){
			isMouseDown = false;
			ctx.beginPath();
			
			cords.push('mouseup');
		});

		$('canvas').mouseenter(function(e){
			isMouseMove = true;
		});
		$('canvas').mouseleave(function(e){isMouseMove = false;});	

		canv.addEventListener("mousemove", function(e) {

			if(isMouseMove && isMouseDown){
			
				cords.push([e.clientX - 251, e.clientY - 101]);
				ctx.lineWidth = sizeMouse * 2;
				ctx.lineTo(e.clientX - 251, e.clientY - 101);
				ctx.stroke();
				ctx.beginPath();	
				
				ctx.arc(e.clientX - 251, e.clientY - 101, sizeMouse, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.moveTo(e.clientX - 251, e.clientY - 101);
			}

		});
	
		//save pikch
		function save() {
			localStorage.setItem('cords', JSON.stringify(cords));
		}
		//clear sheet
		 function clear() {

		 	ctx.fillStyle = 'white';
		 	ctx.fillRect(0, 0, canv.width, canv.height);

		 	ctx.beginPath();
		 	ctx.fillStyle = 'black';

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
		 				crd = cords.shift(),
		 				e = {
		 					clientX: crd["0"],
		 					clientY: crd["1"]
		 				};

		 		
		 		//cords.push([e.clientX, e.clientY]);
				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();
				ctx.beginPath();

				ctx.arc(e.clientX, e.clientY, sizeMouse, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.moveTo(e.clientX, e.clientY);
		 		}, speedReplaing);
		 }

		document.addEventListener("keydown", function(e){

			// console.log( e.keyCode );

			switch( e.keyCode ){
				//clear
				case 67:
					clear();
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
			
					cords = JSON.parse(localStorage.getItem('cords'));

					clear();
					replay();
					break;
				//increase sizeMouse
				case 38:
					sizeMouse++;
					break;
				//reduce sizeMouse
				case 40:
				
					if(sizeMouse > 1){
						sizeMouse--;
					}
				
					break;
				//increase speed replaing
				case 37:
				
					if(speedReplaing <= 100){
						speedReplaing++;
					}
				
					break;
				//reduce speed repaling
				case 39:

					if(speedReplaing > 1){
						speedReplaing--;
					}

					break;
			}


		});
});