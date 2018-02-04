/*	--------------------------------------------------
	Parallax
-------------------------------------------------- */

function parallax(){

	$('.js-parallax').each(function(){
		
		eTop = $(this).offset().top;
		altura = eTop - $(window).scrollTop();
		speed = 8;
		//más rápido para grandes
		if ( $(this).hasClass('hero') ){
			speed = speed /2;
			
		}
		altura = altura/speed*-1;
		$(this).children().css('transform','translate3d(0,'+altura+'px,0)');
	});	
}

parallax();

$(window).scroll(function(){

	parallax();	
	
});





