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
	
	
	//JS script
	$('#owl-options a').on('click', function(e){
	  e.preventDefault();
	  url = $(this).attr('href');
	 // urlFinal = url + "&output=embed";
	 $('#options').modal('show').find('.modal-body').html('<iframe width="100%" frameborder="0" allowtransparency="true" src="'+ url +'"></iframe>');
	  //$('#options').modal('show').find('.modal-body').html('<object data="'+url+'&output=embed">');

	});	
		
	
	
	
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
	  
	    
	 $('#owl-multimedia a').click(function(e){
		 e.preventDefault();
		 url = $(this).attr('href');
		 $('#mainVideo source').attr('src', url + '.mp4')
	 }) 
	  
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
	
	$( window ).on('load', function() {

		$('.item a[data-id="video1"]').trigger('click');

	});

	function placeVideo(){
	
		windowWidth =$(window).width();
		windowHeight =$(window).height();
		
		
		$('#video-home').css('width', windowWidth);
		$('#video-home').css('height', windowHeight);
		
	}		

	// Añade un id a cada uno de los videos
	var n=0;
	$('.item a').each(function(){
		n ++;
		$(this).attr('data-id', 'video'+ n);
		
	});
	

	// Funcionalidad ver vídeos
	$('.item a').on('click', function(e){
		e.preventDefault();
		
		$('.item a').removeClass('active');
		$(this).addClass('active');
		
		
		var URL = $(this).attr('href');
		var source = $(this).attr('data-source');
		var item = $(this).attr('data-id');
		
		if (source =='youtube'){
			//var htm = '<iframe src="http://www.youtube.com/embed/' + URL + '?&autoplay=1" frameborder="0" allowfullscreen ></iframe>';

		  	onYouTubePlayerAPIReady(URL) ;	    
	      // create youtube player

	
			   
		}else{
			//var htm = '<iframe src="https://player.vimeo.com/video/' + URL + '?autoplay=1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		   // $('#video_container').html(htm);
		    
		    loadVimeo (URL);
		}
			
		return false;
	});
	
	function loadVimeo(URL){
	    	$('#video_container').remove();
	    	var videoContainer = '<div id="video_container"></div>';
	    	$(videoContainer).appendTo('#video');		
	
			var htm = '<iframe id="iframeVimeo" src="https://player.vimeo.com/video/' + URL + '?autoplay=1" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			
		    $('#video_container').html(htm);	
		    
		    
		    
			var iframe = document.querySelector('#iframeVimeo');
		    var player = new Vimeo.Player(iframe);



		    player.on('play', function() {
		       //alert('played the video!');
		    });
		
		    player.getVideoTitle().then(function(title) {
		        //alert('title:', title);
		    });		    
			   
			player.getEnded().then(function() {
		        //alert('end the video!');
		    });			    
			player.on('timeupdate', function(data) {
			  if (data.percent === 1) {
			    //alert('end the video!');
				$('.item a.active').closest('.owl-item').next().find('.item a').trigger('click');
			  }
		  	});	    
		    
		
	}
    function onYouTubePlayerAPIReady(URL) {
	    	//eliminamos la capoa contenedora y volvemos a crearla
	    	$('#video_container').remove();
	    	var videoContainer = '<div id="video_container"></div>';
	    	$(videoContainer).appendTo('#video');

	        player = new YT.Player('video_container', {
	        videoId: URL,
	        events: {
	            onReady: onPlayerReady,
	            onStateChange: onPlayerStateChange
	          }
	        });
	    }
	
    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {          	                
            $('.item a.active').closest('.owl-item').next().find('.item a').trigger('click');
            
        }
    }	


	

});
		


