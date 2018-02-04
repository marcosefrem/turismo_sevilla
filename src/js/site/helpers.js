/*	----------------------------------------------------------------------------------------------------
	 Helpers Bootstrap SITE criticos
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Funciones y variables globales helpers
-------------------------------------------------- */
windowWidth = $(window).width();
$(window).resize(function(){ windowWidth = $(window).width(); } );
xsBreak = 767;
smBreak = 991;
mdBreak = 1199;

/*--------------------------------------------------
	domTransplant: Movemos bloques según vista responsive
	v:1.0		
-------------------------------------------------- */


function domTransplant(){

	$('[data-transplant-id][data-transplant]').each(function(){
		
		elementID = $(this).attr('data-transplant-id');
		elementObject = $(this);
		
		//Determinamos el destino del transplante

		if (windowWidth > mdBreak){
			elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-lg]');
		}
		
		if (windowWidth <= mdBreak){
			elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-md]');
		}
		
		if (windowWidth <= smBreak){
			elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-sm]');
		}
		
		if (windowWidth <= xsBreak){
			elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-xs]');
		}

		//Lo transplantamos		
		elementObject.appendTo(elementDestination);	
		
	});
	
}


/*	--------------------------------------------------
	isRetina : Detecta si el device tiene soporte retina
-------------------------------------------------- */
function is_retina_device() {
   return  window.devicePixelRatio > 1;
}

/*	--------------------------------------------------
	SameHeight : Iguala altura de elementos
	v:1.0		
-------------------------------------------------- */
function sameHeight(){
	
	$('.js-same-height').each(function(){
		
		//Reset de altura
		var maxHeight = 0;
		
		//Cual es la altura más alta?		
		$(this).find('.js-same').each(function(){
			
			$(this).removeAttr('style');
			
			maxHeightNew = $(this).outerHeight(true);
			
			
			if (maxHeight < maxHeightNew){
				maxHeight = maxHeightNew;
			}
			
		});
		
		//Ponemos la altura segun los cortes
		if($(this).hasClass('no-xs') && windowWidth < 767){							
			$(this).find('.js-same').css('min-height','0px');		
		}else if($(this).hasClass('no-sm') && windowWidth < 991 ){
			$(this).find('.js-same').css('min-height','0px');
		}else{
			$(this).find('.js-same').css('min-height',maxHeight);
			
		}
	
		
		//Llamamos funciones que dependen de esta para poder funcionar
		
	});
	
	
}
	
/*	--------------------------------------------------
	makeSquare: Crea cuadrados perfectos
	v:1.0		
-------------------------------------------------- */
function makeSquare(){
	
	$('.js-square').each(function(){
		
		$(this).css('height',$(this).width());
		
	});

}


/*	—————————————————————————
	autoHeigh: Calcula la altura, muy util para hacer absolutos centrados
————————————————————————— */
function autoHeight(){
	
	$('.js-auto-height').each(function(){
		
		$(this).css('height',$(this).height());
	});

}

/*--------------------------------------------------
	insertBG: Inserta imágenes como background
	v:1.0		
-------------------------------------------------- */
function insertBG(){
	
	$('[data-background]').each(function (){

		if (is_retina_device() === true){
			backgroundBox = $(this).attr('data-background-2x'); 
		}else{
			backgroundBox = $(this).attr('data-background'); 
		}
		
		$(this).css('background-image','url('+ backgroundBox +')');
			
	});	
	
}


/*	--------------------------------------------------
	Iniciliación de Helpers		
-------------------------------------------------- */
//Si hacemos una llamada AJAX lanzaremos esta función para recargar los plugins
function initHelpers(){

	//Transplantamos bloques
	domTransplant();	
	//Igualamos alturas
	sameHeight();
	//Creamos cuadrados
	makeSquare();		
	//Calculamos alturas
	autoHeight();
	//Añadimos fondos BG
	insertBG();
	
	
}

/*	--------------------------------------------------
	jQuery Ready
-------------------------------------------------- */

$(function() { // DOM Ready

	/*	--------------------------------------------------
		Grid visible
	-------------------------------------------------- */

	$(window).load(function() { $('#grid .bg').height($('body').height());});			

	/*	--------------------------------------------------
		fixJumpyAffix: Arregla saltos de los afixes
		v:1.0		
	-------------------------------------------------- */
	
	$(window).load(function(){
		//Si hay affixes...
		if ( $('[data-spy="affix"]').length !== 0 ){
	
			// Vamos uno por uno creando contenedores para evitar saltos al hacer scroll
			$('[data-spy="affix"]').each(function(){
				
				//Aplicamos altura al holder con ID construido segun el ID original
				affixHolderHeight = $(this).outerHeight();
				affixID = $(this).attr('id');	
				$(this).wrap('<div id="'+affixID+'-holder" class="affix-holder"></div>');
				$(this).parent().height(affixHolderHeight);

				//Determinamos la altura a la que se hará fixed y se la indicamos
				affixHolderOffset = $(this).offset().top - affixHolderHeight;				
				$(this).attr('data-offset-top',affixHolderOffset);
				
			});
		}
		
	});
	
	
	/*	--------------------------------------------------
		placeholdersIE
		v:1.0		
	-------------------------------------------------- */
	
	$('html.legacy-ie [placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
		    input.val('');
		    input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() === '' || input.val() == input.attr('placeholder')) {
		    input.addClass('placeholder');
		    input.val(input.attr('placeholder'));
		  }
		}).blur().parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
		    var input = $(this);
		    if (input.val() == input.attr('placeholder')) {
		      input.val('');
	    }
	  });
	});
		
		
	/*--------------------------------------------------
		inputNumberButtons: Botones + - para input number y pattern para forzar numérico (tiene código async)
		v:1.0		
	-------------------------------------------------- */

    $('input[type=number]').each(function(){
	    //Forzamos en movil el teclado numérico
	  //  $(this).attr('pattern',"\d");
	    
	    //Le ponemos controles si asi se indica
	    if( $(this).attr('data-controls') == "true" ){
	        $(this).after('<button class="more" title="Aumentar">+</button>');
	        $(this).before('<button class="less" title="Reducir">-</button>');
	    }
	    
    });
    
	/*--------------------------------------------------
		pageTransitions: Animaciones en el cambio de paginas
		v:1.0		
	-------------------------------------------------- */
	
	//Activamos las animaciones si hay al menos alguna animación de salida
	if($('[data-animation-out]').length > 0 ){
	
		$('body').addClass('page-transitions');	
		
			
	    //Añadimos clases para animacions de entrada.
		$('[data-animation-in]').each(function(){
		  animationIn = $(this).attr('data-animation-in');
		  $(this).addClass('animated '+animationIn+'');
		});
		
		//Animamos la página al salir por un enlace
	    $('body.page-transitions a').on('click',function(e){
		   
			//Cogemos el destino del link
			href = $(this).attr('href');
			
			//Añadimos clase para animar elementos al salir de la página		
			$('[data-animation-out]').each(function(){
				animationOut = $(this).attr('data-animation-out');
				$(this).addClass('animated '+animationOut+'');
			});
		   	
		   	//Una vez terminada la animación 	
			$('[data-animation-out]').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
				function(e) {
					//Cambiamos la URL
					history.pushState({}, null, href);
					//Cargamos el href
					$('body').load(href);
					
				}
			);
		  
		  //Evitamos que el enlace se haga.
		  e.preventDefault();
	    });
		
		
		
	}
    
	    
	
	
	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */
	initHelpers();
	
	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {

		initHelpers();

	});	

}); // Cierre DOM Ready abierto al inicio de la página