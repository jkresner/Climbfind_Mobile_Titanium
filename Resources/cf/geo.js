Ti.Geolocation.preferredProvider = "gps";
if (lib.isIPhone3_2_Plus())
{
	//NOTE: starting in 3.2+, you'll need to set the applications purpose property for using Location services on iPhone
	Ti.Geolocation.purpose = "To Suggests nearby climbing locations & partners. *THIS APP WILL NOT WORK WITHOUT LOCATION ENABLED.";
}

// SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF //
if (Titanium.Geolocation.locationServicesEnabled === false)
{
	Titanium.UI.createAlertDialog({title:'Climbfind', message:'Your device has geo turned off - turn it on.'}).show();
}
else
{
	if (Titanium.Platform.name != 'android') {
		var authorization = Titanium.Geolocation.locationServicesAuthorization;
		Ti.API.info('Authorization: '+authorization);
		if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
			Ti.UI.createAlertDialog({
				title:'Climbfind',
				message:'You have disallowed Climbfind from running geolocation services.'
			}).show();
		}
		else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
			Ti.UI.createAlertDialog({
				title:'Climbfind',
				message:'Your system has disallowed Climbfind from running geolocation services.'
			}).show();
		}
	}

	//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	// Titanium.Geolocation.ACCURACY_BEST
	// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
	// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
	// Titanium.Geolocation.ACCURACY_KILOMETER
	// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	Titanium.Geolocation.distanceFilter = 10;
}

(function() {
	cf.geo = {};
	
	cf.geo.TranslateErrorCode = function (code) {
		if (code == null) { return null; }
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	};


	cf.geo.GetCurrentPosition = function (callback)
	{	
		//GET CURRENT POSITION - THIS FIRES ONCE
		Titanium.Geolocation.getCurrentPosition(function(e)
		{
			if (!e.success || e.error)
			{
				//currentLocation.text = 'error: ' + JSON.stringify(e.error);
				Ti.API.info("Code translation: "+cf.geo.TranslateErrorCode(e.code));
				alert('Connection error, unable to triangulate position. Please try again in a moment.');
				return;
			}
	
			//var longitude = e.coords.longitude;
			//var latitude = e.coords.latitude;
			//var altitude = e.coords.altitude;
			//var heading = e.coords.heading;
			//var accuracy = e.coords.accuracy;
			//var speed = e.coords.speed;
			//var timestamp = e.coords.timestamp;
			//var altitudeAccuracy = e.coords.altitudeAccuracy;
			//Ti.API.info('speed ' + speed);
			//currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;
	
			//Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		  
			callback(e);
		});
	};
})();

