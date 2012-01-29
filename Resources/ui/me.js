(function() {
	cf.ui.Me = function(win, _args) {	
		var view = Ti.UI.createView($c($jss.Stretch, { loaded:false, dirty:false }));
					
		view.titleOptionButton = cf.ui.TabsViewTitleOptionButton(win, $jss.OptionsButton, cf.ui.MeOptions);
		view.titleOptionButton.visible = false;
		view.addEventListener("visible", function() { 
			if (!view.loaded) { 
				view.profile = cf.ui.ProfileView(win, cf.app.Me, _args); 
				view.add(view.profile); view.loaded = true; }
			if (view.dirty) { 
				view.remove(view.profile);
				view.profile = cf.ui.ProfileView(win, cf.app.Me, _args); 
				view.add(view.profile);
				view.dirty = false;
			}
			
			view.titleOptionButton.visible = true;
		});
								
		info('Me Profile returned');
		return view; 
	};

	cf.ui.MeOptions = function()
	{
		var dialog = Ti.UI.createOptionDialog({ options:['Edit Pic', 'Logout', 'Cancel'], destructive:1, cancel:2, title:'Options' });
		dialog.addEventListener('click', function(e) { 
			if (e.index == 0) { alert('Log onto www.climbfind.com to edit your pic and profile details.'); }
			else if (e.index == 1) { cf.app.SetLoggedOut(); cf.Startup(); }
			else if (e.index == 2) {  }
		});	
		dialog.show();
	};
})();