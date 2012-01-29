(function() {
	cf.ui.Map = function(win, _args) {
		var view = Ti.UI.createView();
		
		view.titleOptionButton = cf.ui.AddTitleButton(win, $c($jss.RefreshButton,{visible:false}), 'right', function() { cf.ui.updateMainWindowMap(view); });   
		
		cf.ui.addMainWindowMap(view);
		
		view.addEventListener("visible", function() { view.titleOptionButton.visible = true; });
		
		info('return map tab');
		return view; 
	};	
	
	cf.ui.MapView = null;
	
	cf.ui.addMainWindowMap = function(view)
	{	
		cf.geo.GetCurrentPosition(function(e)
		{
		    var lon = e.coords.longitude;
		    var lat = e.coords.latitude;
			if (cf.ui.MapView == null)
			{
				cf.ui.MapView = Titanium.Map.createView($c($jss.Stretch, { region: { latitude:lat, longitude:lon, latitudeDelta:0.18, longitudeDelta:0.18 }, regionFit:true, userLocation:true, annotations: [] })); 
				cf.ui.MapView.addEventListener('click',function(evt)
				{
					if (evt.clicksource == 'rightButton')
					{
						var pid = (evt.annotation)?evt.annotation.pid:-1;
						var type = (evt.annotation)?evt.annotation.type:-1;
						cf.ui.Place(pid, type).open();
					}
				});
				view.add(cf.ui.MapView);
				cf.ui.addMapAnotations(view);
			} else {
				view.add(cf.ui.MapView);
				cf.ui.updateMainWindowMap(view);
			} 		
		});		
	};
	
	cf.ui.updateMainWindowMap = function(view)
	{
		cf.geo.GetCurrentPosition(function(e) { 
			cf.ui.MapView.removeAllAnnotations();
			cf.ui.MapView.setLocation({ latitude:e.coords.latitude, longitude:e.coords.longitude, latitudeDelta:0.18, longitudeDelta:0.18 });
						
			cf.ui.addMapAnotations(view);		
			
			cf.ui.ShowMessageOverlay(view, 290, 160, 5500, 'Most up to date location\n(according to your device is) \n\n'+e.coords.latitude.toFixed(6)+','+e.coords.longitude.toFixed(6)+'\r\r* bad network connectivity may degrade locatation accuracy.'); 	
		});
	};
	
	cf.ui.addMapAnotations = function(view, callback)
	{
		var geoannotations = [];

		cf.v1.dataSvc.GetNearestLocations(view, function(results) {
			for (var i = 0, l = results.length; i < l; i++) {
	        	var r = results[i];   	
	        	
	        	var kmDistance = r.Distance/1000;
			    var miDistance = kmDistance*0.621;
			    var kmText = Math.round(kmDistance*10)/10; //-- Round up to 1 decimal place
			    var miText = Math.round(miDistance*10)/10;	
			    var detailText = kmText+'km / '+miText+' miles'; 
	        	
	        	var pin = Titanium.Map.createAnnotation({
				    latitude:r.Lat,
				    longitude:r.Lon,
				    title:r.Name,
				    subtitle:detailText,
				    pincolor: cf.PlatformAndroid ? "orange" : Titanium.Map.ANNOTATION_RED,
				    animate:true,
				    pid:r.ID,
				    type:r.Type
				});
	        	
	        	if (cf.PlatformAndroid) { pin.pinImage = "/img/map-pin.png"; cf.ui.MapView.addAnnotation(pin); }
	        	else { pin.rightButton = Titanium.UI.iPhone.SystemButton.DISCLOSURE; } 
	        	
	        	geoannotations.push(pin);
	    	}
	    	if (!cf.PlatformAndroid) { cf.ui.MapView.annotations = geoannotations; }
	  });
	}
})();