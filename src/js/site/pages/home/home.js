/*	----------------------------------------------------------------------------------------------------
	 JS para página home
------------------------------------------------------------------------------------------------------ */
;(function($, win) {
  $.fn.inViewport = function(cb) {
     return this.each(function(i,el){
       function visPx(){
         var H = $(this).height(),
             r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
         return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));  
       } visPx();
       $(win).on("resize scroll", visPx);
     });
  };
}(jQuery, window));


$(".box").inViewport(function(px){
    if(px) {
	    
	    $(this).addClass("in-canvas");
	    $(this).removeClass("out-canvas");
    }else{
	   	 $(this).removeClass("in-canvas");
	   	 $(this).addClass("out-canvas");
	};
});



$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
     //>=, not <=
    if (scroll >= 10) {
        //clearHeader, not clearheader - caps H
        $("body").addClass("scrolled");
    }else{
        $("body").removeClass("scrolled");
	    
    }
}); //missing );


/*	--------------------------------------------------
	Declaración de funciones
-------------------------------------------------- */


/*	--------------------------------------------------
	Lógica de scripts
-------------------------------------------------- */
$(function() {
	

	/*	--------------------------------------------------
		Ejemplo : Descripción de script.
		indicar siempre descripcion y documentar el script
		segun se vaya ejecutando.
	-------------------------------------------------- */
	$( window ).on('load', function() {
		
		var anchoVentana = $(window).width();
		
		$("[data-size]").each(function(){
			
			size=$(this).attr('data-size');
			$(this).css('width', size+"px");
			
			
		})

		
		
		if(anchoVentana<991){
			$("[data-left-sm]").each(function(){
				toleft=$(this).attr('data-left-sm');
				$(this).css('left', toleft+"px");
				
			});				
		}else{
			$("[data-left]").each(function(){
				
				toleft=$(this).attr('data-left');
				$(this).css('left', toleft+"px");
				
			});			
			
		}
		
	
		$("[data-top]").each(function(){
			
			totop=$(this).attr('data-top');
			$(this).css('margin-top', totop+"px");
			
		});




		$("[data-show]").click(function(){

			$("[data-show]").removeClass('active');
			$(this).addClass('active');
			layertoShow=$(this).attr('data-show');
			$('.toshow').removeClass('visible');
			$(layertoShow).addClass('visible');
			
			$('html, body').animate({
		        scrollTop: $(layertoShow).offset().top
		    }, 2000);			
				
		
		});

	});



	
	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */


	
	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {
		
		if(anchoVentana<991){
			$("[data-left-sm]").each(function(){
				toleft=$(this).attr('data-left-sm');
				$(this).css('left', toleft+"px");
				
			});				
		}else{
			$("[data-left]").each(function(){
				
				toleft=$(this).attr('data-left');
				$(this).css('left', toleft+"px");
				
			});			
			
		}


	});

});
