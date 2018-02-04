	/*	--------------------------------------------------
		geoLocation 1.0 //Necesita cargar el API DE google antes
	--------------------------------------------------- */

	$('.js-google-autocomplete').on('click',function(){
		
		var placeSearch, autocomplete;
		var componentForm = {
		  street_number: 'short_name',
		  route: 'long_name',
		  locality: 'long_name',
		  administrative_area_level_1: 'short_name',
		  country: 'long_name',
		  postal_code: 'short_name'
		};
		
		// [START region_fillform]
		function fillInAddress() {
		  // Get the place details from the autocomplete object.
		  var place = autocomplete.getPlace();
		
		  for (var component in componentForm) {
		    document.getElementById(component).value = '';
		    document.getElementById(component).disabled = false;
		  }
		
		  // Get each component of the address from the place details
		  // and fill the corresponding field on the form.
		  for (var i = 0; i < place.address_components.length; i++) {
		    var addressType = place.address_components[i].types[0];
		    if (componentForm[addressType]) {
		      var val = place.address_components[i][componentForm[addressType]];
		      document.getElementById(addressType).value = val;
		    }
		  }
		}
	
		 // Create the autocomplete object, restricting the search
		 // to geographical location types.
		 autocomplete = new google.maps.places.Autocomplete(
		     /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
		     { types: ['geocode'] });
		 // When the user selects an address from the dropdown,
		 // populate the address fields in the form.
		 google.maps.event.addListener(autocomplete, 'place_changed', function() {
		   fillInAddress();
		 });
		
		
	});
	
	
	$('.js-geolocate').on('click',function(){
				
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		} 
		
		//Get latitude and longitude;
		function successFunction(position) {
		   
		   dataInput = $('.js-geolocate').attr('data-input');
		   
		   var lat = position.coords.latitude;
		   var long = position.coords.longitude;
		    
		   var geocoder = new google.maps.Geocoder();
		   var latLng = new google.maps.LatLng(lat,long);
		
		   if (geocoder) {
		      geocoder.geocode({ 'latLng': latLng}, function (results, status) {
		         if (status == google.maps.GeocoderStatus.OK) {
		            locationString = results[0].formatted_address;
		            
		            $(dataInput).val(locationString);
		            
		         }
		         else {
		            console.log("Geocoding failed: " + status);
		         }
		         
		         
		         
		      });
		      
		   }    
		    
		}
		
		function errorFunction(position) {
		    console.log('no geolocalizas');
		}	
		
			
		
	});
