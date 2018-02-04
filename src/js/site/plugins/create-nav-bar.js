/*	--------------------------------------------------
	Navegación data-spy entre sections automática 
-------------------------------------------------- */


$.fn.createNavBar = function() {

	//Creamos el array
	sectionArray = [];
	
	$('main').children('section').each(function(){

		//Metemos al array los IDs de secciones
		sectionArray.push($(this).attr('id'));
		
	});
	
	// Creamos la navegación
	var navBar = this.children('ul');
	
	$.each(sectionArray,function(index, value){
		navBar.append('<li><a href="#'+value+'" data-id-scroll="#'+value+'" data-pixel-fix="108">'+value+'</a></li>');
	});
	
};

