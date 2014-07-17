
jQuery(document).ready(function($){
	
	var Item = Backbone.Model.extend({
		//url: './taxista'
		urlRoot: './taxista'
	});
	
	var Markers = Backbone.Collection.extend({});
	
	var List = Backbone.Collection.extend({
		model: Item,
		url: './clients/requests'
	});
	
	var View = Backbone.View.extend({
		el: $('.wrapper'), // attaches `this.el` to an existing element.
		events: {
			"click input#trackMarker": "trackMarker"
		},
		conn: {},
		counter: 1,
		addresses: {},
		routeMarkers: {},
		currentPosition: {},
		trackMarkerInit: {},
		//trackMarker: _.once(this.trackMarkerInit),

		initialize: function() {
			
			_.bindAll(this, 'render', 'googleMapsInit', 'initWSConn', 'trackMarker', 'appendMarkerListener'); // fixes loss of context for 'this' within methods
			
			this.collection = new List();
			this.handleCollection();
			
			this.routeMarkers = new Markers();
			this.routeMarkers.bind('add', this.appendMarkerListener);
			
			this.initWSConn();
		},
		
		handleCollection: function() {
			
			var _self = this;
			_self.collection.fetch({
				success: function() {
					_self.addresses = _self.collection.models;
					_self.trackMarkerInit = _.after(_self.addresses.length, _self.trackMarker);
					_self.render(); // not all views are self-rendering. This one is.
					_self.renderMaps();
				}
			});
		},
		
		trackMarker: function() {
			
			var _self = this;
			//console.log(_self.routeMarkers);
			//_.each( _self.routeMarkers.models, function(profile, key) {
			//	console.log(profile.toJSON());
			//}, this);
			_self.collection.reset();
			_self.collection.fetch({
				success: function() {
					_self.addresses = _self.collection.models;
					_.each(_self.addresses,function(profile, key) {
						var address = profile.toJSON();
						//if(key==0){
							calcRouteWayPoint(_self.currentPosition, address.direction, address.destiny, map, _self);
						//}
					});
					google.maps.event.trigger(map, 'resize');
				}
			});
			
			//_self.routeMarkers.setPosition();
		},
		
		initWSConn: function() {
			
			var _self = this;
			_self.conn = new WebSocket(glblWS);
			_self.conn.onopen = function(){
				console.log("Connection established!");
			};
			_self.conn.onmessage = function(e) {
				//_self.handleCollection();
				var msg = e.data.split(':');
				console.log(msg);
				if(msg[0]=='RequestNumber'){
					_self.trackMarker();
				}
			};
		},

		render: function() {
			
			$(this.el).append("<div id='map-canvas'></div>");
			$(this.el).append("<input type='button' id='trackMarker' value='trackMarker' />");
			$(this.el).append("<div id='initApp' class='wrapper'></div>");
			
			_.delay(function(){
				$('#initApp').addClass('greets');
				_.delay(function(){
					$('#initApp').hide();
				},2000);
			},2500);
			
			
			//this.addItem();
		},
    
		renderMaps: function() {
			
			this.googleMapsInit();
		},
		
		appendMarkerListener: function(marker) {
			
			//console.log('Marker added: ', this.routeMarkers, this.addresses.length)
			//this.trackMarkerInit();
		},
		
		googleMapsInit: function() {
			
			var mapOptions = {
    			zoom: zoom_option
    			//,mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
    		
    		geocoder = new google.maps.Geocoder();
    		map = new google.maps.Map($('#map-canvas')[0], mapOptions);
    		
    		// Try HTML5 geolocation
    		if(navigator.geolocation) {
    			
    			geoLoc = navigator.geolocation;
    			this.getCurrentPosition();
    		} else {
    			
    			// Browser doesn't support Geolocation
    			handleNoGeolocation(false);
    	  	}
		},
		
		getCurrentPosition: function() {
			
			var _self = this;
			geoLoc.getCurrentPosition(function(position) {
				_self.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: _self.currentPosition,
					content: 'Location found using HTML5.'
				});
	
				map.setCenter(_self.currentPosition);
				
				//http://clokey2k.com/blog/2012/04/25-displaying-multiple-routes-using-google-maps-api/
				//http://stackoverflow.com/questions/9043160/displaying-multiple-routes-on-a-google-map
				_.each(_self.addresses,function(profile, key) {
					var address = profile.toJSON();
					//if(key==0){
						calcRouteWayPoint(_self.currentPosition, address.direction, address.destiny, map, _self);
					//}
				});
				
			}, function() {
				handleNoGeolocation(true);
			});
		}
	});

  var View = new View();
});

