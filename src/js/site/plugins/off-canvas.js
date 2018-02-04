/*	--------------------------------------------------
	Navegación offcanvas 1.1
-------------------------------------------------- */

//Ocultamos la navegación al pulsar fuera de ella
function closeCanvas(){

	if ($('body').hasClass('in')){
	
		//Cerramos todos los que haya abiertos
		$('.off-canvas').removeClass('out');
		
		//Abrimos el seleccionado.
		$('body').removeClass('in').addClass('out')
		$('html').removeClass('in').addClass('out')

		
		$('.canvas-wrap').hide()
		
		setTimeout(function () {
			$('body').removeClass('out left right');
			$('html').removeClass('out left right');
		}, 500);			
		
		
	}
	
	
}

/*	--------------------------------------------------
	jQuery Ready
-------------------------------------------------- */
$(function() {


	$('button.navbar-toggle').click(function(){
		
		canvasTarget = $(this).attr('data-target');
		dataSide = $(this).attr('data-side');
		
		//Indicamos en la capa la dirección para cerrarla después
		$('.canvas-wrap').addClass(dataSide);
		
		//Si el target tiene .out esta abierto, asi que lo cerramos...
		if ( $(canvasTarget).hasClass('out') ){

			closeCanvas();
			$('[data-option]').removeClass('active');
			$('.content-nav').removeClass('opacity');
			$('.nav-site').removeClass('opacity');			
		}else{
			//Cerramos todos los que haya abiertos
			$('.off-canvas').removeClass('out');
			
			//Abrimos el seleccionado.
			$('body').addClass('in').removeClass('left right').addClass(dataSide);	
			$('html').addClass('in').removeClass('left right').addClass(dataSide);
			$(canvasTarget).addClass('out');
			
			$('.canvas-wrap').show().css('height', '100%');
			
			
			
		}
		
		
	})
	
	//Cierre pulsando fuera del menu
	$('.canvas-wrap').click('click', function(){
		closeCanvas();		
	});
	
	//Cierre pulsando en botón de cerrar
	$('.off-canvas [data-toggle="close"]').click('click', function(){
		closeCanvas();		
	});
	
	
	//Control con swipes, requiere jquery.touchSwipe
	//$(".canvas-wrap").swipe( {
	//	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	//		if ( $(this).hasClass('left') && direction == 'left'){
	//			 closeCanvas();
	//		}
	//		if ( $(this).hasClass('right') && direction == 'right'){
	//			 closeCanvas();
	//		}
	//		
	//	}
	//});	
	
});