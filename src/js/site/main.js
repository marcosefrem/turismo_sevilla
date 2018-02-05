/*	----------------------------------------------------------------------------------------------------
	 JS Global
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Declaración de funciones y variables globales
-------------------------------------------------- */

/*	--------------------------------------------------
	Lógica de scripts
-------------------------------------------------- */
$(function() {
	placeVideo();	
	
	/*	--------------------------------------------------
		Funcionalidad buscador
	-------------------------------------------------- */

	$('#search-header + .input-group-addon').mouseenter(function() {
		$(this).prev().addClass('active');
	  });
	$('html').click(function() {
		$('header .input-group input[type="text"]').removeClass('active');
	});
	
	$('header .input-group').click(function(event){
		event.stopPropagation();
	});	

	/*	--------------------------------------------------
		Caja contacto
	-------------------------------------------------- */

	$('.contact-options a').click(function(){
		$('.contact-options').find('.info-hidden').hide();
		$(this).next().fadeIn(300);
		
	});	



	$('.js-close-parent').click(function(){
		$(this).parent().fadeOut(500);
		
	});	

	/*	--------------------------------------------------
		Carrusel facebook
	-------------------------------------------------- */
	 $("#owl-facebook").owlCarousel({
	 		autoplay:true,
		    loop:true,
			nav:true,		    
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:false
		        },
		        600:{
		            items:1,
		            nav:false
		        },
		        1000:{
		            items:1,
		            nav:false,
		            loop:true
		        }
		    }
	 
	  });
	/*	--------------------------------------------------
		Carrusel twitter
	-------------------------------------------------- */
	 $("#owl-tweet").owlCarousel({
	 		autoplay:true,
		    loop:true,
			nav:true,		    
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:false
		        },
		        600:{
		            items:1,
		            nav:false
		        },
		        1000:{
		            items:1,
		            nav:false,
		            loop:true
		        }
		    }
	 
	  });

	/*	--------------------------------------------------
		Carrusel opciones
	-------------------------------------------------- */
	if(windowWidth >1080){
		
		 $("#owl-options").owlCarousel({
	 		autoplay:true,
		    loop:true,
			nav:true,		    
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:4,
		            nav:true
		        },
		        600:{
		            items:7,
		            nav:true
		        },
		        1000:{
		            items:7,
		            nav:true,
		            loop:true
		        }
		    }
	 
	  });
	}
	/*	--------------------------------------------------
		Carrusel videos
	-------------------------------------------------- */
	 $("#owl-multimedia").owlCarousel({
	 		autoplay:true,
		    loop:true,
			nav:true,		    
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:4,
		            nav:true
		        },
		        600:{
		            items:6,
		            nav:true
		        },
		        1000:{
		            items:6,
		            nav:true,
		            loop:true
		        }
		    }
	 
	  });
	  
	    
	  
	  
	/*	--------------------------------------------------
		Carrusel logos
	-------------------------------------------------- */

	 $("#owl-partners").owlCarousel({
	 		autoplay:true,
			nav:true,	 		
		    loop:true,
		    margin:10,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        600:{
		            items:1,
		            nav:true
		        },
		        1000:{
		            items:1,
		            nav:true,
		            loop:false
		        }
		    }
	 
	  });


	/*	--------------------------------------------------
		Empresas Alumnos
	-------------------------------------------------- */	
	
	$('.js-open-next').click(function(){
		
		$(this).next().toggleClass('hide');
		$(this).parent().toggleClass('opened');
	}); 	
	

	if(windowWidth >= 1920){
		$('#js-banners').insertBefore('#hacer .fluid-container.options');
		$('#last').insertBefore('#hacer');
	}
	if(windowHeight >= 1920){
		$('#last').insertBefore('#hacer');
		$('#js-banners').insertAfter('#hacer');
	}
	
	
	
	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */

	/*	--------------------------------------------------
		Averiguamos el núemro de pestañas y le damos un ancho
	-------------------------------------------------- */

	var numTabs= $('.nav-tabs.auto-size li').length;
	var sizeTab=  100 / numTabs;

	$('.nav-tabs li').css('width', sizeTab+'%' );
	
	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {

		placeVideo();

	});
	



});
		

function placeVideo(){

	windowWidth =$(window).width();
	windowHeight =$(window).height();
	
	
	$('#video-home').css('width', windowWidth);
	$('#video-home').css('height', windowHeight);
	
}		
