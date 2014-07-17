// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var address = 'Metro Balderas, Calle de Balderas, Centro, Cuauhtémoc, Mexico City, Mexico';
var marker = null;
var target = {};
var watchID;
var directionsChanged = _.once(directionsChangedInit);
var geocoder;
var geoLoc;
var zoom_option = 16;
var map;
var glblWS = 'ws://localhost:8080';
var AutoCompleteMarker = {};

function betweenTarget(target, arrival) {
	
	//19.427165435251197 19.4269982 -99.1389545889549 -99.13898589999997
	//19.427166664748817 19.4269982 -99.13896465828378 -99.13898589999997
	
	var conversor = 1000;
	var radial = 0.2;
	
	var targetdmin = ((target[0]*conversor)-radial)/conversor;
	var targetdmax = ((target[0]*conversor)+radial)/conversor;
	var targetemin = ((target[1]*conversor)-radial)/conversor;
	var targetemax = ((target[1]*conversor)+radial)/conversor;
	
	console.log('CURRENT: ', target[0], target[1]);
	//console.log('d: ', targetdmin, targetdmax)
	//console.log('e: ', targetemin, targetemax)
	
	return (arrival.d >= targetdmin && arrival.d <= targetdmax) && (arrival.e >= targetemin && arrival.e <= targetemax);
};

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

function customMarker(image, lng, lat) {
	//var image = 'images/beachflag.png';
	var myLatLng = new google.maps.LatLng(lat, lng);
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

function calcRouteWayPoint(start, end, wypts, map, ObjView) {
	
	//console.log('Destination: ', end, 'Waypoint: ', wypts);
	
	var xplodeWpts = wypts.split('/');
	var xplodeEnd = end.split('/');
	var waypts = [{
        location: new google.maps.LatLng(xplodeEnd[0], xplodeEnd[1]),
        stopover:true}];
	
	var request = {
			origin:start,
			destination: new google.maps.LatLng(xplodeWpts[0], xplodeWpts[1]),
			waypoints: waypts,
		    optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(response, status) {
		//console.log('status: ',status)
		//console.log('response: ',response)
		if (status == google.maps.DirectionsStatus.OK) {
				
			directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
			directionsDisplay.setMap(map);
			directionsDisplay.setDirections(response);
			directionsChangedInit(directionsDisplay, xplodeEnd, ObjView);
			if(ObjView.routeMarkers !=undefined){
				ObjView.routeMarkers.add(directionsDisplay.getDirections().Tb);
			}
			
		}
	});
	
};

function calcRoute(start, end, map, ObjView) {
	
	var xplodeEnd = end.split('/');
	
	var request = {
			origin:start,
			destination: new google.maps.LatLng(xplodeEnd[0], xplodeEnd[1]),
			travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(response, status) {
		//console.log('status: ',status)
		//console.log('response: ',response)
		if (status == google.maps.DirectionsStatus.OK) {
				
			directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
			directionsDisplay.setMap(map);
			directionsDisplay.setDirections(response);
			directionsChangedInit(directionsDisplay, xplodeEnd, ObjView);
			if(ObjView.routeMarkers !=undefined){
				ObjView.routeMarkers.add(directionsDisplay.getDirections().Tb);
			}
			
		}
	});
	
};

function directionsChangedInit(directionsDisplay, address, ObjView) {
	
	google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
		//GET MY POSITION
		var pos = directionsDisplay.getDirections().Tb.origin;
		map.setCenter(pos);
		zoom_option = map.getZoom();
		
		//GET TARGET POSITION @target
		//getCoordAddress(address, function(target) {

			// IF TARGET MOVED
			// REMOVED: CONFLICT WITH WAYPOINT
			//if(directionsDisplay.getDirections().Tb.destination.d != undefined) {
			//	target = directionsDisplay.getDirections().Tb.destination;
			//}
			
			//console.log('pos: ', pos);
			//console.log('target: ', address);
			ObjView.conn.send('CurrentPosition:'+pos);
			if(pos && address) {
				//watchDirection(pos, target);
				watchDirectionFunction(pos, address);
			}
			
		//});
	});
} 

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