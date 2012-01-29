//Use the UI namespace for all UI component creation.  A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)
(function() {
	cf.ui = {};
	cf.ui.rows = {};
	
	cf.ui.Window = function(_args) {
		var win = Ti.UI.createWindow($c(_args, $jss.Window));	
		win.orientationModes = [Ti.UI.PORTRAIT];
		
		win.navBarHidden = true;
		
		var bar = Ti.UI.createView($jss.TitleBar);  
	    win.add(bar);
	    win.bar = bar;
	    return win;
	};

	cf.ui.Add = function(parent, controls) { if (controls != null && parent != null) { for (var i=0;i<controls.length;i++) { parent.add(controls[i]); } } return parent; };
		
	cf.ui.AddTitleButton = function(win, args, position, callback)
	{
		if (win.bar == null) { return null; } 
		var btn = Ti.UI.createButton(args);
	    btn.addEventListener('click', function() { callback(); });
	    btn[position] = 5;   
	    win.bar.add(btn);
	    return btn;  
	};		
	cf.ui.AddBackButton = function(w) { return cf.ui.AddTitleButton(w, $jss.BackButton, 'left', function() { w.close(); }); };
	cf.ui.AddHomeButton = function(w) { return cf.ui.AddTitleButton(w, $jss.HomeButton, 'left', function() { 
		cf.ui.HomeSelect().open();
	}); };
		
    //create a film strip like view 
	cf.ui.FilmStripView = function(_args) {
		
		var root = Ti.UI.createView($c($jss.Stretch,_args)),
		container = Ti.UI.createView({ top:0, left:0, bottom:0, width:cf.PlatformWidth*_args.views.length });
		
		for (var i = 0, l = _args.views.length; i<l; i++) {
			var newView = Ti.UI.createView({ top:0, bottom:0, left:cf.PlatformWidth*i, width:cf.PlatformWidth });
			newView.add(_args.views[i]);
			container.add(newView);
		}
		
		root.add(container);
		
		//set the currently visible index
		root.addEventListener('changeIndex', function(e) {	
			var leftValue = cf.PlatformWidth*e.idx*-1;
			container.animate({duration:200,left:leftValue});
			_args.views[e.idx].fireEvent("visible");
		});
		
		//-- fire our visible event to cause the default view to load
		root.fireEvent('changeIndex',{idx:0});
	
		return root;
	};
	
	cf.ui.CreateTab = function(_icon,_cb,_on,tabWidth) {
		var view = Ti.UI.createView({width:tabWidth}),
		off_path = 'img/tabs/'+_icon+'.png',
		on_path = 'img/tabs/'+_icon+'_on.png',
		dimension = $jss.TabXY.width,
		image = Ti.UI.createImageView({ height:dimension, width:dimension, image:(_on) ? on_path : off_path, bottom:2 });
		
		view.on = _on||false; 
		
		//assemble view
		view.add(image);
		view.addEventListener('click',_cb);
		
		//'instance' method
		view.toggle = function() {
			view.on = !view.on;
			image.image = (view.on) ? on_path : off_path;
		};
		
		return view;
	};
	
	//toggle view state of application to the relevant tab
	cf.ui.SetActiveTab = function(filmStrip, tabs, _idx) { //tabWidth,
		for (var i = 0, l = tabs.length; i<l; i++) {
			
			if (filmStrip.views[i].titleOptionButton != null) { filmStrip.views[i].titleOptionButton.visible = false; }
			
			//select the tab and move the tab 'cursor'
			if (_idx === i) {
				//if the tab is already selected, do nothing
				//if (!tabs[i].on) {
					//Ti.API.info('selecting tab index: '+_idx);
					//animate the tab
					//tab.animate({ duration:500, left:tabWidth*i, bottom:0 }, function(idx) { //use closure to retain value of i in idx
					//	return function() {
							if (!tabs[_idx].on) {
								tabs[_idx].toggle();
							}
					//	};
					//}(i));
					
					//set the current film strip index
					filmStrip.fireEvent('changeIndex',{idx:i});
				//}
			}
			else if (tabs[i].on && (_idx !== i)) {
				tabs[i].toggle();
			}
		}
	};
	
	cf.ui.TabsViewTitleOptionButton = function(win, jssclass, clickDelegate) {
		return cf.ui.AddTitleButton(win, $c(jssclass,{visible:false}), 'right', clickDelegate);
	}
	
	cf.ui.TabsViewWithTable = function(win, model, noRowsFunction, buildRowsFunction, dataFunction, clickFunction, titleOptionButton) {										
		var view = Ti.UI.createView($c($jss.Stretch,{dirty:true,isTab:true}));
		var table = null;
				
		//-- Button for action up the top right
		if (titleOptionButton != null) { view.titleOptionButton = titleOptionButton; }

		view.addEventListener("visible", function() { 
			if (titleOptionButton != null) { view.titleOptionButton.visible = true; }
			if (view.dirty) {
				if (table == null)
				{
					//info('adding table');
					table = cf.ui.AddPullRefreshTable(view, function(callback) { dataFunction(callback); }, 
							buildRowsFunction, noRowsFunction, clickFunction); 	
				 	view.table = table;	
		 		}
		 		else
		 		{
		 			table.data = []; 
		 			cf.ui.ClearPersistentMessageOverlay(view); 
		 			dataFunction(function (data) { 
		 				rows = buildRowsFunction(data);
		 				if (rows.length > 0) { table.setData(rows); }
		 				else { noRowsFunction(); }
		 			});
		 		}
		 		view.dirty = false;
		 	}
		});		
				
		return view; 
	};
	
	//shorthand for alert dialog
	cf.ui.Alert = function(/*String*/ _title, /*String*/ _message, _buttons) {
		var a = Ti.UI.createAlertDialog({ title:_title, message:_message });
		if (_buttons != null) { a.buttonNames = _buttons; }
		a.show();
		return a;
	};
	
    /* So the keyboard doesn't cover our input */
	cf.ui.AttachFocusSlide = function(input, focusTop, focusHeight, otherUIFocusCallback, otherUIBlurCallback)
	{
		var originalTop = input.top;
		var originalHeight = input.height;
		//info('originalTop: '+originalTop);
		//info('originalHeight: '+originalHeight);
		
		input.addEventListener('focus', function() { 
			//info('slide focus:'+input.top+'|'+focusHeight); 
			input.top = focusTop; input.height = focusHeight; if (otherUIFocusCallback!=null) { otherUIFocusCallback(); } });
		input.addEventListener('blur', function() { 
			//info('slide focus:'+originalTop+'|'+originalHeight);
			input.top = originalTop; input.height = originalHeight; if (otherUIBlurCallback!=null) { otherUIBlurCallback(); } });
	}
	
	
    /* So the keyboard doesn't cover our input */
	cf.ui.AttachClearDefault = function(input, defaultvalue)
	{		
		input.addEventListener('focus', function() { if (input.value==defaultvalue) { input.value=''; } });
		input.addEventListener('blur', function() { if (input.value=='') { input.value=defaultvalue; } });
	}	
	
	//-- Cookie cutter table implementation
    cf.ui.AddAndroidPullRefreshTable = function(win, datafunction, buildrowsfunction, norowsfunction, clickfunction)
	{   
	    //var scrollView = Ti.UI.createScrollView({top:70, bottom:0, zIndex:2,showVerticalScrollIndicator:false});
	    
	    //info($jss.PullTableView);
	    var table = Ti.UI.createTableView($c($jss.PullTableView,{ zIndex:1, width:cf.PlatformWidth, height:'auto' }));    
		
		if (win.isTab != null) { table.top = 0; }
		
		var populateTable = function() { datafunction(function (data) {             
            if (data != null)
            {
	            var rows = buildrowsfunction(data); //Build a row set from our jason data
	            if (rows.length > 0) { 
	            	var tableHeight = 0;
	            	var i =0  
	            	//for (var l=rows.length;i<l;i++) { tableHeight += parseInt(rows[i].toImage().height); tableHeight++; }
					
					table.setData(rows); 
					
					//info('table.size.height: '+table.size.height);
					
					//info('set rows '+rows.length);
	            	//info("populate table.height:"+ table.toImage().height);		
					//table.height = rows.length * 150; //(200 buffer for row headers, 70 for title bar)
					//info("populate Ti.Platform.displayCaps.platformHeight:"+ Ti.Platform.displayCaps.platformHeight);					
					//bottomOfScreenOffset = (table.height-Ti.Platform.displayCaps.platformHeight);
					//info("populate bottomOfScreenOffset:"+ bottomOfScreenOffset);	
					//info("rows[i-1].height:"+rows[i-1].height);	
					//lastRowOffset = (bottomOfScreenOffset-rows[i-1].height);
					//info("populate lastRowOffset:"+ lastRowOffset); 
	            }
	            else if (norowsfunction != null) { norowsfunction(); info('no rows '); }
	        }    
	        //table.resetPullView(); //Reset our pull to refresh UI
    	})};

		//cf.ui.AttachPullToRefresh(table, populateTable);

		if (clickfunction != null) { table.addEventListener('click', clickfunction); }	
		
		//scrollView.add(table);
		//scrollView.table = table;

		// update the offset value whenever scroll event occurs
		/*var offset = 0;
		scrollView.addEventListener('scroll', function(e) {
			if (e.y!=null) {
				offset = e.y;
				Ti.API.debug('offset: '+offset);
			}
		});*/
		
		// set the initial position of the scrollView's content
		/*var init = setInterval(function(e){
			Ti.API.info('check if '+offset+' = 60');
			if (offset==60) {
				Ti.API.debug('we have just done what the scrollView\'s contentOffset should be doing');
				clearInterval(init);
			}
			scrollView.scrollTo(0,60);
		},100);*/
		
		//var bottomOfScreenOffset = (table.height-Ti.Platform.displayCaps.platformHeight);
		//var lastRowOffset = bottomOfScreenOffset-60;
		//Ti.API.debug("lastRowOffset: "+lastRowOffset+"\n bottomOfScreenOffset: "+bottomOfScreenOffset);
		
		/*var refreshThreshold = -135;
		
		scrollView.addEventListener('touchend', function() {
			//info("touchend lastRowOffset:"+ lastRowOffset);
			
			if (offset < refreshThreshold) {
				Ti.API.info('REFRESH !!!!');
				table.data = [];
				populateTable();
				scrollView.scrollTo(0,0);
			} else if (offset > refreshThreshold && offset < 0) {
				scrollView.scrollTo(0,0);
				Ti.API.info('Dont refresh, go back to base');
			} else if (offset > bottomOfScreenOffset) {
				//scrollView.scrollTo(0,bottomOfScreenOffset);
				Ti.API.info('Dont load more, go back to base');
			}
			/*else if (offset==bottomOfScreenOffset) {
				Ti.API.info('LOAD MORE !!!!');
				scrollView.scrollTo(0,lastRowOffset);
			} */
		//});
		
		win.add(table);

		populateTable();

		return table;
	};

    
	//-- Cookie cutter table implementation
    cf.ui.AddPullRefreshTable = function(win, datafunction, buildrowsfunction, norowsfunction, clickfunction)
	{
	    var table;
	    cf.os({ iphone: function() { table = cf.ui.AddiPhonePullRefreshTable(win, datafunction, buildrowsfunction, norowsfunction, clickfunction);}, 
	    	   android: function() { table = cf.ui.AddAndroidPullRefreshTable(win, datafunction, buildrowsfunction, norowsfunction, clickfunction);} });
	    return table;	    
	};
      
    cf.ui.AddiPhonePullRefreshTable = function(win, datafunction, buildrowsfunction, norowsfunction, clickfunction)
	{
		info('in iphone pull refresh');
	    var table = Ti.UI.createTableView($jss.PullTableView);    
		if (win.isTab != null) { table.top = 0; }
		
		var populateTable = function() { datafunction(function (data) {             
            if (data != null)
            {
	            var rows = buildrowsfunction(data); //Build a row set from our jason data
	            if (rows.length > 0) { table.setData(rows); info('set rows '+rows.length); }
	            else if (norowsfunction != null) { norowsfunction(); info('no rows '); }
	        }  
	        table.resetPullView(); //Reset our pull to refresh UI
    	})};

		cf.ui.AttachPullToRefresh(table, populateTable);

		if (clickfunction != null) { table.addEventListener('click', clickfunction); }	
		
		win.add(table);

		populateTable();

		return table;
	};
          
    cf.ui.AttachPullToRefresh = function(view, reloadedCallback)
	{	
    	view.pulling = false;
    	view.reloading = false;

		var header = Ti.UI.createView($jss.PullRefresh);
		//var border = Ti.UI.createView({ backgroundColor:"#000", height:2, bottom:0 });
	    cf.ui.Add(header, [ //border,
	    	arrow = Ti.UI.createView($jss.PullRefreshArrow),
	    	statusLabel = Ti.UI.createLabel($jss.PullRefreshStatus),
	    	lastUpdatedLabel = Ti.UI.createLabel($c($jss.PullRefreshLastUpdated, { text:"Last Updated: "+lib.currentDateFormatted() })),
	    	actInd = Ti.UI.createActivityIndicator($jss.PullRefreshIndicator)
	    ]);

		view.headerPullView = header;
	
		view.resetPullView = function() {
			// when you're done, just reset
			view.scrollToIndex(0, {animated:true});
			view.reloading = false;
			lastUpdatedLabel.text = "Last Updated: "+lib.currentDateFormatted();
			statusLabel.text = "Pull down to refresh...";
			actInd.hide();
			arrow.show();
		};
		
		view.addEventListener('scroll',function(e) {
			var offset = e.contentOffset.y;
	
			if (offset <= -65.0 && !view.pulling)
			{
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(-180);
				view.pulling = true;
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Release to refresh...";
			}
			else if (view.pulling && offset > -65.0 && offset < 0)
			{
				view.pulling = false;
				var t = Ti.UI.create2DMatrix();
				arrow.animate({transform:t,duration:180});
				statusLabel.text = "Pull down to refresh...";
			}
		});
		
		view.addEventListener('scrollEnd',function(e) {			
			var offset = e.contentOffset.y;

			if (view.pulling && !view.reloading && offset <= -65.0)
			{
				view.data = [];
				view.reloading = true;
				view.pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";
				view.scrollToIndex(0, {animated:true});
				arrow.transform=Ti.UI.create2DMatrix();
				reloadedCallback();
			}
		});
	};
	
	//-- pretty black overlay 
    cf.ui.ShowMessageOverlay = function(win, w, h, delay, messageText)
    {
		var indView = Ti.UI.createView($c($jss.OverlayView, { height:$Y(h), width:$X(w) }));
	    indView.add(Ti.UI.createLabel($c($jss.OverlayLabel, { text:messageText })));
		
		win.add(indView);
		indView.animate({ delay: delay, duration: 1000, opacity: 0.1 }, function() { win.remove(indView); });
	};
	
	//-- pretty black overlay 
    cf.ui.ShowPersistentMessageOverlay = function(win, w, h, messageText)
    {
		var indView = Ti.UI.createView($c($jss.OverlayView, { height:$Y(h), width:$X(w) }));
	    indView.add(Ti.UI.createLabel($c($jss.OverlayLabel, { text:messageText })));
		win.indView = indView;
		win.add(indView);
	};
	
	cf.ui.ClearPersistentMessageOverlay = function(win)
    {
		if (win.indView != null) {
			win.remove(win.indView);
			win.indView = null;	
		}	
	};
	
	cf.ui.AddFloatingLoader = function(view, msg) {		
		var fLoader = null;
		if (view != null)
		{
	    	cf.os({ iphone: function() { fLoader = cf.ui.AddIphoneFloatingLoader(view, msg);}, 
	    	   android: function() { fLoader = cf.ui.AddAndroidFloatingLoader(view, msg);} });
	   	}
	    return fLoader;
	}

	cf.ui.SetFloatingLoaderMessage = function(fLoader, msg) { if (fLoader != null) { fLoader.label.text = msg; } }   
    cf.ui.RemoveFloatingLoader = function(view) { if (view != null && view.floatingLoader != null) { view.remove(view.floatingLoader); view.floatingLoader = null; } };
	
	cf.ui.AddIphoneFloatingLoader = function(view, msg) {
		var fLoader = Ti.UI.createView($jss.FloatingLoader);
		var label = Ti.UI.createLabel($c($jss.FloatingLoaderLabel, { text: msg }))
		fLoader.label = label;
		fLoader.add(indicator = Ti.UI.createActivityIndicator($jss.FloatingLoaderIndicator));
		fLoader.add(label);
		//var bg = Ti.UI.createView({top:47,bottom:0,left:0,right:0,zIndex:100,backgroundImage: '/img/bg.png'});
		//cf.ui.SetFloatingLoaderMessage(fLoader, msg);
		
		indicator.show();
		view.floatingLoader = fLoader;
		view.add(fLoader);
		
		return fLoader;
    };   

	cf.ui.AddAndroidFloatingLoader = function(view, msg) {
		var fLoader = Ti.UI.createView($jss.FloatingLoader);
		//fLoader.add(indicator = Ti.UI.createActivityIndicator($jss.FloatingLoaderIndicator));
		var label = Ti.UI.createLabel($c($jss.FloatingLoaderLabel, { text: msg }))
		fLoader.add(label);
		fLoader.label = label;
		view.add(fLoader);
		//cf.ui.SetFloatingLoaderMessage(fLoader, msg);
		//indicator.show();
		view.floatingLoader = fLoader;
		return fLoader;
    };   
		
	cf.ui.OpenClimbfindWebsite = function(slug) {
		var cfUrl = cf.Stgs.WebRt+slug;
		cf.ui.OpenWebsite(cfUrl);
	};

	cf.ui.OpenWebsite = function(urlToOpen) {
		var webview = Ti.UI.createWebView({url:urlToOpen});
	    var window = Ti.UI.createWindow();
	    window.add(webview);
	    window.open({modal:true});
		window.barColor='#000';
	    
	    var closeBtn = Ti.UI.createButton({systemButton:Titanium.UI.iPhone.SystemButton.DONE, height:20 });
		closeBtn.addEventListener('click', function(){ window.close(); });
		window.setRightNavButton(closeBtn);

		// web controls
		var bb2 = Ti.UI.createButtonBar({ labels:['Back', 'Forward'], backgroundColor:'#000'});
		var flexSpace = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
		window.setToolbar([flexSpace,bb2,flexSpace]);
		webview.addEventListener('load',function(e) {
			Ti.API.debug("url = "+webview.url);
			Ti.API.debug("event url = "+e.url);
		});
		bb2.addEventListener('click',function(ce) {
			if (ce.index == 0) { webview.goBack(); }
		    else if (ce.index == 1) { webview.goForward(); }
	  	});
	};
	
})();

//Include major UI components and styling properties
Ti.include('/ui/welcome.js', '/ui/main.js', '/ui/login.js', '/ui/homeselect.js', '/ui/map.js', 
	'/ui/messages.js', '/ui/messagesconversation.js', '/ui/messagesnew.js', '/ui/feed.js',
	 '/ui/map.js', '/ui/newcall.js', '/ui/me.js', '/ui/profile.js', '/ui/postdetail.js', '/ui/postcomment.js', '/ui/place.js'
	);
	
Ti.include('/ui/rows/place.js', '/ui/rows/message.js', '/ui/rows/post.js', '/ui/rows/postcomment.js');