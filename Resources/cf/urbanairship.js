//-- Responsible for delivering push notification
var UrbanAirship = {		 
    getToken: function() { return Ti.Network.remoteDeviceUUID; },
    //-- Send http request to UrbanAirship to register the device
    register: function(params, lambda, lambdaerror) {
        var method = 'PUT';
        var token = UrbanAirship.getToken();
        var url = UrbanAirship.baseurl+'/api/device_tokens/'+token;
        payload = (params) ? JSON.stringify(params) : '';
        //Ti.API.info('sending registration with params '+payload);
        UrbanAirship.helper(url, method, payload, function(data,status){
            //Ti.API.log('completed registration: '+JSON.stringify(status));
            if (status == 200) { lambda({action:"updated",success:true}); }
            else if (status == 201) { lambda({action:"created",success:true}); }
            else { Ti.API.log('error registration: '+JSON.stringify(status)); }
        },function(xhr,error) {
          Ti.API.log('xhr error registration: '+JSON.stringify(error));
        });
    },
    unregister: function(lambda) {
        var method = 'DELETE';
        var token = UrbanAirship.getToken();
        var url = UrbanAirship.baseurl+'/api/device_tokens/'+token;
        UrbanAirship.helper(url, method, null, function(data,status){
            if (status == 204) { lambda({status:status}); }
            else { lambda({status: status}); }
        },function(xhr,error) {
          lambda({success:false,xhr:xhr.status,error:error});
        });
    },
    getAlias: function(lambda) {
        var method = 'GET';
        var token = UrbanAirship.getToken();
        var url= UrbanAirship.baseurl+'/api/device_tokens/'+token;
        UrbanAirship.helper(url, method, null, function(data,status) {
            lambda(data);
        },function(xhr,e) {
          lambda({status:xhr.status,e:e});
        });
    },
    helper: function(url, method, params, lambda, lambdaerror) {
      var xhr = Ti.Network.createHTTPClient();
      xhr.setTimeout(60000);
      xhr.onerror = function(e) { lambdaerror(this,e); };
      xhr.onload = function() {
        var results = this.responseText;
        lambda(results, this.status);
      };
      // open the client
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type','application/json');
      xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(UrbanAirship.key + ":" + UrbanAirship.master_secret));
      // send the data
      xhr.send(params);
    },
    registeriOSForPushNotifications: function(aliasValue)
    {
    	Ti.Network.registerForPushNotifications({
		    types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
		    success:function(e) {
		      var deviceToken = e.deviceToken;
		      //alert('successfully registered for apple device token with '+e.deviceToken);
		      var params = { tags: ['version'+Ti.App.getVersion()], alias: aliasValue };
		      UrbanAirship.register(params, function(data) 
		      { 
		      	//alert("registerUrban success: " + JSON.stringify(data));
		      	//-- Tell Climbfind server which type of device + client app,
		      	//-- user is running on so alerts server knows how (if) to send alert
		      	var clientTypeAndAppID =  Ti.Platform.osname+'-'+cf.Stgs.CfClientAppID;
		      	
		      	cf.v1.dataSvc.UpdateUserDeviceType(cf.app.mainWindow, clientTypeAndAppID, function(){});
		     }, function(errorregistration) { Ti.API.warn("Couldn't register for Urban Airship"); });
		    },
		    error:function(e) { Ti.API.warn("push notifications disabled: "+e); },
		    callback:function(e) {
		      var openDelegate = function() { alert('openDelegate'); };
		      var a = Ti.UI.createAlertDialog({title:'Climbfind', message:e.data.alert });
		      a.buttonNames = ['Yes', 'No'];
   
		      if (e.data.type != null)
		      {
			      if (e.data.type == "m") { a.message = 'Open messages to read new message?'; openDelegate = function() { cf.ui.MessagesWindow().open(); } }
			      else if (e.data.type == "c") { a.message = 'Open post to see comment?'; openDelegate = function() { cf.ui.PostDetailOpen(cf.app.mainWindow, e.data.postID, true); } }
			      //else if (e.data.type == "p") { a.message = 'Open partner calls?'; openDelegate = function() { Ti.App.fireEvent('app:setMainActiveTab', { index: 1 }); } }
		      }
		      
		      a.addEventListener('click', function(e) { if (e.index == 0) { openDelegate(); } });    
		      a.show();
		    }
		  });  
		//alert('registeriOSForPushNotifications:' + aliasValue);
    },
    unregisteriOSForPushNotifications: function()
    {
    	UrbanAirship.unregister(function(data) {
		    //Ti.UI.createAlertDialog({
		    //  title:'Successfully unregistered',
		    //  message: JSON.stringify(data)
		    //}).show();
		  }, function(errorregistration) {
		    Ti.API.warn("Couldn't unregister for Urban Airship");
		  });
	},
	decrementAppBadge: function()
	{
		if (cf.PlatformIphone)
		{
			if (Titanium.UI.iPhone.appBadge > 0)
			{ 
				Titanium.UI.iPhone.appBadge = Titanium.UI.iPhone.appBadge-1; 
			}
		}
	}
};
		
UrbanAirship.key = cf.Stgs.UrbanAirshipkey;
UrbanAirship.secret = cf.Stgs.UrbanAirshipsecret;
UrbanAirship.master_secret = cf.Stgs.UrbanAirshipmaster_secret;
UrbanAirship.baseurl = cf.Stgs.UrbanAirshipbaseurl;