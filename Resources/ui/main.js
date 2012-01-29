(function() {
	//-- problems with android loosing events grrrrr, have to keep main window open
	cf.ui.mainWindowInstansiate = function() {
		if (cf.app.mainWindow == null)
		{
			cf.app.mainWindow = cf.ui.Window({exitOnClose:true});
			cf.app.mainWindow.load = function() { cf.ui.mainWindowLoad(cf.app.mainWindow); };
			cf.app.mainWindow.open(); 
			cf.addWindowListener(cf.app.mainWindow, 'app:homeSelected', cf.Startup);		
		}
		else
		{
			cf.ui.mainWindowClear(cf.app.mainWindow);
		}
	}
	
	cf.ui.mainWindowLoad = function(win) {
		win.hb = cf.ui.AddHomeButton(win);
			
		var tabWidth = cf.PlatformWidth/5;
		var tabs = [];		
		
		cf.ui.mainWindowClear(win);
		
		var tabViews = [ cf.ui.HomeFeed(win), win.mapTabView = cf.ui.Map(win), cf.ui.NewCall(win), cf.ui.Messages(win), cf.ui.Me(win) ];
		win.filmStrip = cf.ui.FilmStripView($c($jss.TabFilmStrip ,{ views:tabViews }));	
		win.tabView = Ti.UI.createView($jss.TabView);
		
		//-- assemble & add tabs
		tabs.push(cf.ui.CreateTab('feed', function() { cf.ui.SetActiveTab(win.filmStrip, tabs, 0); }, true, tabWidth));
		tabs.push(cf.ui.CreateTab('map', function() { cf.ui.SetActiveTab(win.filmStrip, tabs, 1); }, false, tabWidth));
		tabs.push(cf.ui.CreateTab('call', function() { cf.ui.SetActiveTab(win.filmStrip, tabs, 2); }, false, tabWidth));
		tabs.push(cf.ui.CreateTab('inbox', function() { cf.ui.SetActiveTab(win.filmStrip, tabs, 3); }, false, tabWidth));
		tabs.push(cf.ui.CreateTab('me', function() { cf.ui.SetActiveTab(win.filmStrip, tabs, 4); }, false, tabWidth));
		for (var i = 0, l = tabs.length; i<l; i++) {
			tabs[i].left = tabWidth*i;
			win.tabView.add(tabs[i]);
		}
				
		win.tabs = tabs;				
		win.add(win.tabView);
		win.add(win.filmStrip);			
		
		if (!win.loaded)
		{		
			win.setViewsAsDirty = function() { for (var i=0;i<5;i++) { win.filmStrip.views[i].dirty=true; } };		
					
			cf.addWindowListener(win, 'app:setMainActiveTab', function(e) { cf.ui.SetActiveTab(win.filmStrip, win.tabs, e.index); });
			cf.addWindowListener(win, 'app:partnerCallSuccess', win.setViewsAsDirty);	
			cf.addWindowListener(win, 'newMessageSent', function(msg) { win.filmStrip.views[3].dirty=true; });
		}
		
		win.loaded = true;		
	}
	
	cf.ui.mainWindowClear = function(win)
	{
		if (win.tabView != null) { win.remove(win.tabView); win.tabView = null; }
		if (win.filmStrip != null) { win.remove(win.filmStrip); win.filmStrip = null; }
		if (cf.ui.MapView) { win.mapTabView.remove(cf.ui.MapView); }
		
		//-- clear all the options buttons
		win.remove(win.bar);
	    win.bar = null;
		var bar = Ti.UI.createView($jss.TitleBar);  
	    win.add(bar);
	    win.bar = bar;
	    cf.ui.AddHomeButton(win);
	}

	//cf.ui.setTab1 = function() { Ti.App.fireEvent('app:setMainActiveTab', { index: 0 }); }
	
})();