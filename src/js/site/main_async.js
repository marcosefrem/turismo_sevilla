/*	----------------------------------------------------------------------------------------------------
	 JS SITE global para todo el proyecto de carga asíncrona
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Declaración de funciones
-------------------------------------------------- */

//Si hacemos una llamada AJAX lanzaremos esta función para recargar los plugins
function initAsync(){
	
	if( windowWidth >= xsBreak ){$('.selectpicker').selectpicker();}
	
	//Dropdowns
	$('.dropdown-toggle').dropdown();
	
	//Form slider
	$('.js-input-slider').slider();
	
	//Date Picker
	$('.js-datepicker').datepicker({

		autoclose: true,
		locale: 'es'
	});
	
	//Tooltips
	$('[data-toggle="tooltip"]').tooltip({
	    animated: 'fade',
	    html: true
	});
	
	//Popovers
	$('[data-toggle="popover"]').popover({ html : true});
	
	//Tabs responsive
	$('.nav-tabs.tab-drop').tabdrop();
	
	//Validaciones formularios
	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
		{
			filter: function () {
				return $(this).is(":visible");
			}
		}		
	);	
	
}
function goToURL(URL) {
  location.href = URL;

}
/*	--------------------------------------------------
	Lógica de scripts
-------------------------------------------------- */
$(function() {
	

	/*	--------------------------------------------------
		Hacemos fixed el header para mobile
	-------------------------------------------------- */	
	
	
	var anchoVentana =$(window).width();
	if(anchoVentana<767){

		$('#header').affix({
		  offset: {
		    top: 0,
		    bottom: function () {
		      //return (this.bottom = $('.footer').outerHeight(true));
		    }
		  }
		});	

	}

	/*	--------------------------------------------------
		Ejemplo : Descripción de script.
		indicar siempre descripcion y documentar el script
		segun se vaya ejecutando.
	-------------------------------------------------- */
    $('.menu-canvas a + .caret').on('click',function(e){
	   
		$(this).next().toggleClass('in');
		$(this).toggleClass('opened');
    });



	$('header a#search').mouseenter(function() {

		$(this).parent().prev().removeClass('hidden');
	});
	$('header .input-group').mouseleave(function() {

		//$(this).find('input').addClass('hidden');
	});
	
	$('html').click(function() {
		//$('header .input-group input').addClass('hidden');
	});
	
	$('header .input-group').click(function(event){
	    //event.stopPropagation();
	});	
	
	
	
	$('#off-canvas-right a#search-canvas').click(function() {
		$(this).parent().prev().toggleClass('hidden');
	});
	
	
	
	$('.has-submenu').mouseenter(function() {
		$(this).next().next().addClass('in');
		$(this).parent().find('.caret').addClass('opened');
	});
	
	
	$('.has-submenu + .padding-caret + .collapse').mouseleave(function() {
		setTimeout(function(){
			 
			
			//$(this).removeClass('in');
			//$(this).prev().removeClass('opened');		  
			$('.caret.opened').removeClass( "opened" );
			$('.collapse.in').removeClass( "in" );	

		}, 5000);		
				

	});
	
	
	
	$('header .main-nav .dropdown-menu').mouseleave(function() {
	

	
		setTimeout(function(){
			$('.main-nav li.open a.js-trigger').trigger( "click" );
	
		}, 10000);		
				
			//$('nav li.open').removeClass( "open" );
			
	});

	
		
	$('.main-nav li a.js-trigger').mouseenter(function() {

		$(this).trigger( "click" );
		
	});
	
	$('.dropdown-menu .padding-caret').click(function() {
		$(this).next().removeClass('in');

		$(this).parent().parent().parent().addClass('opened');

		
		$(this).find('.caret').removeClass('opened');
	});
	

	
	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */
	initAsync();

	
	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {



	});

});

