//AIzaSyBiGoPtYsIK9_ICnWW02Z47aw7efTSJaoE

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var address = 'Metro Balderas, Calle de Balderas, Centro, Cuauhtémoc, Mexico City, Mexico';
var marker = null;
var target = {};
var watchID;
var watchDirection = _.once(watchDirectionFunction);
var geocoder;
var geoLoc;
var map;

function initialize() {
	var mapOptions = {
		zoom: 16/*,
		mapTypeId: google.maps.MapTypeId.ROADMAP*/
	};
	
	directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	// Try HTML5 geolocation
	if(navigator.geolocation) {
		
		geoLoc = navigator.geolocation;
		
		geoLoc.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Location found using HTML5.'
			});

			map.setCenter(pos);
			directionsDisplay.setMap(map);
			
			calcRoute(pos, address);
		
		}, function() {
			handleNoGeolocation(true);
		});
		
		google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
			//GET MY POSITION
			var pos = directionsDisplay.getDirections().Tb.origin;
			map.setCenter(pos);
			
			//GET TARGET POSITION @target
			getCoordAddress(address, function(target) {

				//IF TARGET MOVED
				if(directionsDisplay.getDirections().Tb.destination.d != undefined) {
					target = directionsDisplay.getDirections().Tb.destination;
					//console.log(directionsDisplay.getDirections().Tb.destination.d, directionsDisplay.getDirections().Tb.destination.e);
				}
				
				//console.log('pos: ', pos);
				//console.log('target: ', target);
				if(pos && target) {
					//clearInterval(intervalID);
					//watchDirection(pos, target);
					watchDirectionFunction(pos, target);
				}
				
			});
		});
	
	} else {
		
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
  	}
};

function betweenTarget(target, arrival) {
	
	//19.427165435251197 19.4269982 -99.1389545889549 -99.13898589999997
	//19.427166664748817 19.4269982 -99.13896465828378 -99.13898589999997
	
	var conversor = 1000;
	var radial = 0.1;
	
	var targetdmin = ((target.d*conversor)-radial)/conversor;
	var targetdmax = ((target.d*conversor)+radial)/conversor;
	var targetemin = ((target.e*conversor)-radial)/conversor;
	var targetemax = ((target.e*conversor)+radial)/conversor;
	
	console.log('CURRENT: ', target.d, target.e)
	//console.log('d: ', targetdmin, targetdmax)
	//console.log('e: ', targetemin, targetemax)
	
	return (arrival.d >= targetdmin && arrival.d <= targetdmax) && (arrival.e >= targetemin && arrival.e <= targetemax);
}

function watchDirectionFunction(pos, target) {
	var options = {
			enableHighAccuracy: false,
			timeout: 5000,
			maximumAge: 0
	}
	
	//watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
	//watchID = geoLoc.watchPosition(function reachDestiny() {

		if (betweenTarget(target, pos)) {
			console.log('Congratulation, you reach the target');
			//navigator.geolocation.clearWatch(watchID);
		} else {
			console.log('WHERE: ',pos.d, pos.e)
			//console.log('CHECKER: ', diffD, diffE);
		}
	//}, watchPositionErrorHandler, options);
};

function customMarker(image, lat, lng) {
	//var image = 'images/beachflag.png';
	var myLatLng = new google.maps.LatLng(-33.890542, 151.274856);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});
};

function getCoordAddress(address, callback) {
    //var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			//map.setCenter(results[0].geometry.location);
			//var marker = new google.maps.Marker({
			//	map: map,
			//	position: results[0].geometry.location,
			//	draggable: true
			//});
			//console.log('geolocate: ', results[0].geometry.location);
			callback(results[0].geometry.location);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
};

function calcRoute(start, end) {
	
	var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.TravelMode.DRIVING
	  };
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
};

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
};

google.maps.event.addDomListener(window, 'load', initialize);
