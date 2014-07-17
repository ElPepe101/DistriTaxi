jQuery(document).ready(function($){
	var Item = Backbone.Model.extend({
		//url: './taxista'
		urlRoot: './cliente/new'
	});
	
	var Markers = Backbone.Collection.extend({});
	
	var List = Backbone.Collection.extend({
		model: Item
		//,url: './clients/requests'
	});
	
	var Reports = Backbone.Collection.extend({
		url: './cliente/reportes'
	});
	
	var View = Backbone.View.extend({
		el: $('.wrapper'), // attaches `this.el` to an existing element.
		events: {
			"click input#addItem": "addItem",
			"click input#traceRoute": "traceRoute"
		},
		conn: {},
		counter: 1,
		reports: {},
		addresses: {},
		currentPosition: {},
		
		initialize: function() {
			
			var _self = this
			_.bindAll(this, 'render', 'addItem', 'googleMapsInit', 'initWSConn', 'traceRoute', 'getAutoComplete'); // fixes loss of context for 'this' within methods
			
			_self.reports = new Reports();
			_self.reports.fetch({
				success: function() {
					_.each(_self.reports.models, function(proto, key){
						//console.log(proto.toJSON());
						var data = proto.toJSON();
						
						var motivo = data.motivo.split('-');
						var image = 'images/'+motivo[0].replace(' ', '')+'.png';
						customMarker(image, data.lng, data.lat);
					});
				}
			});
			
			this.collection = new List();
			this.collection.bind('add', this.appendItemListener);
			this.handleCollection();
			
			this.initWSConn();
		},
		
		handleCollection: function() {
			
			var _self = this;
			_self.addresses = _self.collection.models;
			_self.render(); // not all views are self-rendering. This one is.
			_self.renderMaps();
			
			
		},
		
		initWSConn: function() {
			
			var _self = this;
			_self.conn = new WebSocket(glblWS);
			_self.conn.onopen = function(){
				console.log("Connection established!");
			};
			_self.conn.onmessage = function(e) {
				_self.handleCollection();
			};
		},
		
		render: function() {
			
			$(this.el).append("<div id='map-canvas'></div>");
			$(this.el).append("<input id='pac-input' />");
			//$(this.el).append("<input type='button' id='traceRoute' value='Trazar Ruta' />");
			$(this.el).append("<input type='button' id='addItem' value='Solicitar Servicio' />");
			$(this.el).append("<div id='initApp' class='wrapper'></div>");
			
			
			_.delay(function(){
				$('#initApp').hide();
			},3500);
			
			
			
			//this.addItem();
		},
		
		renderMaps: function() {
			
			this.googleMapsInit();
		},
		
		addItem: function() {
			
			var _self = this;
			geoLoc.getCurrentPosition(function(position) {
				_self.currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				_self.addresses.direction = _self.currentPosition.d+'/'+_self.currentPosition.e;
				_self.addresses.destiny = AutoCompleteMarker.getPosition().d+'/'+AutoCompleteMarker.getPosition().e;
			
				Cliente = new Item({id: _self.counter});
				var dataSave = {'direction':_self.addresses.direction,
								'status':1,
								'destiny':_self.addresses.destiny}; 
				
				Cliente.save(dataSave,{
					wait:true,
					success:function(model, response) {
						console.log(response);
						_self.conn.send('RequestNumber:'+_self.counter);
						_self.counter++;
					},
					
					error: function(model, error) {
						console.log('Error: ', model.toJSON(), error.responseText);
					}
				});
			});
		},
		
		googleMapsInit: function() {
			
			var _self = this;
			var mapOptions = {
    			zoom: zoom_option
    			//,mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
    		
    		geocoder = new google.maps.Geocoder();
    		map = new google.maps.Map($('#map-canvas')[0], mapOptions);
    		
    		this.getAutoComplete();
    		
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
				
				var marker = new google.maps.Marker({
					map: map
				});
				
				directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
				directionsDisplay.setMap(map);
			
			}, function() {
				handleNoGeolocation(true);
			});
		},
		
		traceRoute: function() {
			
			this.addresses.direction = this.currentPosition.d+'/'+this.currentPosition.e;
			this.addresses.destiny = AutoCompleteMarker.getPosition().d+'/'+AutoCompleteMarker.getPosition().e;
			
			calcRoute(this.currentPosition, this.addresses.destiny, map, this);
		},
		
		confirmRoute: function() {
			
		},
		
		getAutoComplete: function() {
			
			var _self = this;
			var input = /** @type {HTMLInputElement} */(
				      document.getElementById('pac-input'));
			map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.bindTo('bounds', map);
			
			var infowindow = new google.maps.InfoWindow();
			AutoCompleteMarker = new google.maps.Marker({
				map: map
			});
			
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				infowindow.close();
				AutoCompleteMarker.setVisible(false);
				var place = autocomplete.getPlace();
				if (!place.geometry) {
					return;
				}

				// If the place has a geometry, then present it on a map.
				if (place.geometry.viewport) {
					map.fitBounds(place.geometry.viewport);
				} else {
					map.setCenter(place.geometry.location);
					map.setZoom(17);  // Why 17? Because it looks good.
			    }
				/*AutoCompleteMarker.setIcon(/** @type {google.maps.Icon} /({
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(35, 35)
			    }));*/
				AutoCompleteMarker.setPosition(place.geometry.location);
				//AutoCompleteMarker.setVisible(true);
				
				_self.traceRoute();

				var address = '';
				if (place.address_components) {
					address = [
					           (place.address_components[0] && place.address_components[0].short_name || ''),
					           (place.address_components[1] && place.address_components[1].short_name || ''),
					           (place.address_components[2] && place.address_components[2].short_name || '')
					           ].join(' ');
			    }

				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
				infowindow.open(map, AutoCompleteMarker);
			});
		}
		
	});
	
	var View = new View();
	
});