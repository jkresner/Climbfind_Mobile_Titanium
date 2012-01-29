(function() {
	cf.http = {};
			
	// Invoke mobile v1 service with appropriate headers (access token and lat\lon if includeGeo = true)
	cf.http.InvokeCfMobileSvcV1 = function(win, geturl, successCallback, loadMsg, includeGeo)
	{		
		if (Ti.Network.online == false) { cf.ui.Alert('Connection Failure', 'It appears you\'re in no man\'s land!\r\rFeel free to try again in a bit!', null); return; }
		
		var tryAgainDelegate = function() { cf.http.InvokeCfMobileSvcV1(win, geturl, successCallback, loadMsg, includeGeo); };
		
		var accessToken = cf.app.AccessToken();
		if (accessToken == null) { return cf.ui.LoginWindow(win, tryAgainDelegate); }

		var processRequest = function()
		{
			var authHeaderValue = "cfST="+accessToken;
			//info(geturl);
			//info(authHeaderValue);
			xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader("cf-Authorization", authHeaderValue);	
			
			xhr.setTimeout(30000);
		    xhr.onerror = function(e) { 
		    	info('==== [Error] '+geturl+'==========================================================================================================');				
		    	cf.ui.RemoveFloatingLoader(win); 
		    	cf.http.handelError(win, geturl, this, tryAgainDelegate); };
			xhr.onload = function(){
				//-- TODO consider the idea of a failedCallback function?
				if (this.status != 200) { cf.http.handelError(win, geturl, this, tryAgainDelegate); }
				else
				{
					info('==== [Got response] '+geturl+'==========================================================================================================');
					info(this.responseText);
					var resp = JSON.parse(this.responseText);
					successCallback(resp);
			    }	 
				cf.ui.RemoveFloatingLoader(win); 
			}
			
			xhr.send();
			
			if (loadMsg != null) { cf.ui.SetFloatingLoaderMessage(fLoader, loadMsg); }
		}

		var processGeoRequest = function(loc) {
			var latlonHeaerValue = loc.coords.latitude+","+loc.coords.longitude;
			xhr.setRequestHeader('latlon', latlonHeaerValue);		
		    processRequest();
		} 
		
		//-- Check here because we don't want to show the loader if loadMsg is null
		var fLoader;
		if (loadMsg != null) { fLoader = cf.ui.AddFloatingLoader(win, "Connecting..."); }
		
		var xhr = Titanium.Network.createHTTPClient();
		xhr.open('GET', geturl);
		
		if (includeGeo) { cf.geo.GetCurrentPosition(processGeoRequest); }
		else { processRequest(); }
	};
	
	// Invoke mobile v1 service with appropriate headers (lat long and access tokens)
	cf.http.InvokeCfSearchSvcV1 = function(win, geturl, callback, loadMsg)
	{
		info(geturl);
		var xhr = Titanium.Network.createHTTPClient();	
		xhr.open('GET', geturl); 		
		xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setTimeout(30000);
		xhr.onerror = function(e) { cf.http.handelError(win, geturl, this, function() { cf.http.InvokeCfSearchSvcV1(win, geturl, callback); } ); };
		xhr.onload = function(){
			//-- TODO consider the idea of a failedCallback function?
			if (this.status != 200) { cf.http.handelError(win, geturl, this, null); }
			else
			{
				info('==== [Got response] '+geturl+'==========================================================================================================');
				info(this.responseText);
				var resp = JSON.parse(this.responseText);
				callback(resp);
		    }	 
			cf.ui.RemoveFloatingLoader(win); 
		}
		
		cf.ui.AddFloatingLoader(win, loadMsg);
		xhr.send();	
	};
	
	// Invoke mobile v1 service with appropriate headers (lat long and access tokens)
	cf.http.InvokeCfUploadSvcV1 = function(win, posturl, theImage, callback)
	{
		var authHeaderValue = "cfST="+cf.app.AccessToken();
		
		var xhr = Titanium.Network.createHTTPClient(); //{enableKeepAlive:false}	
		xhr.open('POST', posturl); 		
		
		if (cf.PlatformIphone) {
			xhr.setRequestHeader("Content-Type", "image/jpg");
		} 
		else 
		{
			//xhr.setRequestHeader("Content-Type", "multipart/form-data");
	     	//xhr.onsendstream = function(e) { Ti.API.info(e); }		
		}
		
		xhr.setRequestHeader("cf-Authorization", authHeaderValue);
		xhr.setTimeout(90000);			
	    xhr.onerror = function(e) { 	
	    	if (e.error.indexOf('Code=2 "The request timed out') != -1)
	    	{ 	
				//-- This sucks... but hey it works on the server....
				setTimeout(function() { cf.ui.RemoveFloatingLoader(win); callback(null); }, 1800);	    		
	    	} 
	    	else
	    	{	
		    	info('==== [Error] '+posturl+'==========================================================================================================');
		    	Ti.API.info('IN ERROR ' + e.error);
		    	cf.ui.Alert(this.status+' Response', e.error, null);
				cf.ui.RemoveFloatingLoader(win); 
	    	}
	    };
		xhr.onload = function(){
			cf.ui.RemoveFloatingLoader(win); 
			//alert(this.responseText);
			//alert(this.status);
			//-- TODO consider the idea of a failedCallback function?
			if (this.status != 200) { cf.http.handelError(win, posturl, this, null); }
			else
			{
				info('==== [Got response] '+posturl+'==========================================================================================================');
				//alert(this.responseText);
				var resp = JSON.parse(this.responseText);
				callback(resp);
		    }	 			
		};
	
		var fLoader = cf.ui.AddFloatingLoader(win, " Uploading ...");
		
		// open the client
		var resizedIView = Ti.UI.createImageView({ image:theImage, width:420, height:420 });
				
		cf.os({ 
			iphone: function() { xhr.send( resizedIView.toImage() ); },
			android: function() { 
					var contents = resizedIView.toBlob();
					//var tempFile = Titanium.Filesystem.createTempFile();
					//tempFile.write(image);
					//var contents = tempFile.read();
					 	
				//var resizedImage = resizedIView.toImage();
		        //var blob = resizedIView.toBlob();
		        
				// send the data
				//setTimeout( function() { 
					
					xhr.send({media:contents});
				//	xhr.send( theImage );
					
				//}, 1000);		
		
				//resizedBinary = theImage; } 
				//resizedIView.toBlob(); }
				}
		});
	};
	
	//-- Custom logic to handel different types of response codes and error messages
	//-- (This function will grow over time!)
	cf.http.handelError = function(win, url, resp, retryCallback)
	{
	    info('==== [Non 200 response] '+url+'==========================================================================================================');
	    
	    if (resp.responseText)
		{		
			if (resp.responseText == 'Token expired') 
			{ 
				info('Access token expired, trying to get a new one');
				cf.accounts.setFreshAccessToken(retryCallback, function() { cf.ui.LoginWindow(win, retryCallback).open(); }); 
			}
			else if (resp.responseText == 'Token required') { 
				cf.accounts.setFreshAccessToken(retryCallback, function() { cf.ui.LoginWindow(win, retryCallback).open(); });
			}
			else
			{
				cf.ui.Alert(resp.status+' Response', resp.responseText , null);
			}
		}
		else
		{
			cf.http.createErrorRetryDialogue(resp, retryCallback);
		}
	};
	
	//-- In case it's a bad internet connection or the error warrent a retry we give the user a dialogue
	cf.http.createErrorRetryDialogue = function(resp, retryCallback)
	{	
		var a = Titanium.UI.createAlertDialog({ title:'Well, this is awkward...',
		        message: 'For one reason or another we cant get what we want from the climbfind servers - maybe try again?' });
		        
		a.buttonNames = ['Try Reload', 'Cancel'];
		a.show();
		a.addEventListener('click', function(e) {
				if (e.index == 0) { retryCallback(); }
				a.hide();
			});
	};
	
})();