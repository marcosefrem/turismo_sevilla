/*	----------------------------------------------------------------------------------------------------
	 Formularios con ajax
------------------------------------------------------------------------------------------------------ */

$(function() {
		
			
	/*	--------------------------------------------------
		Envío de formularios con respuesta AJAX
	-------------------------------------------------- */

	$('form[data-ajax-form=true]').not('[no-validate]').submit(function(){
		
		//Variables del form
		var formID = $(this).attr('id');	
		var actionForm= $(this).attr('action');
		var dataForm = $(this).serialize();

		//Variables de feedback, éxito, error y posibles JS de fallback
		var htmlFeedback = $(this).attr("data-html-feedback");
		var htmlResponse= $(this).attr("data-html-response");		
		var htmlSuccessID = $(this).attr("data-id-success");
		var htmlErrorID = $(this).attr("data-id-error");
		var callbackSuccess = $(this).attr("data-js-callback-success");
		var callbackError = $(this).attr("data-js-callback-error");
		var idToHide = $(this).attr("data-id-hide");
		
		
		
		//Si hay algun campo de error no hacemos nada y dejamos que las validaciones hagan su trabajo
		if ($(this).find('.has-error').find('input').length){
			//mostramos el campo de error
			$(htmlErrorID).show();
			return false;
		}else{
			$(htmlErrorID).hide();
			
		}
		
		//No hay errores? seguimos
		
		//Enviamos por post el formulario
		$.ajax({
			type: 'POST',
			url: actionForm,
			context: document.body,
			data : dataForm
		}).done(function(data) {
			//Hemos definido algun callback?
			if(callbackSuccess){
				//pasamos el attr de string a función
			}

			//Si hay feedback html devuelto por el form, lo pintamos
			if(htmlResponse){
				
				$('.'+formID+'-feedback').html($(data)).removeClass('hidden');
				$(htmlSuccessID).removeClass('hidden');				
				
				return false;
				
			}

			$(idToHide).hide();

			//Si hay feedback html, lo pintamos
			if(htmlFeedback){
				
			  	$('.'+formID+'-feedback').html($(htmlSuccessID)).removeClass('hidden');
			  	$(htmlSuccessID).removeClass('hidden');		
			  	return false;	
			  		
		  	}
			
		}).fail(function() {
			
			//Hemos definido algun callback?
			if(callbackError){
				//pasamos el attr de string a función
				
				
			}
			
			//Si hay feedback html devuelto por el form, lo pintamos
			if(htmlResponse){
				$('.'+formID+'-feedback').html($(htmlErrorID)).removeClass('hidden');
				$(htmlErrorID).removeClass('hidden');				
			}
			
			//Si hay feedback html, lo pintamos
			if(htmlFeedback){
				$('.'+formID+'-feedback').html($(htmlErrorID)).removeClass('hidden');
				$(htmlErrorID).removeClass('hidden');				
			}

		});		
		
		//Evitamos el redirect hhtp
		return false;
		
	});
		

});