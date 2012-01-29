(function() {
	cf.ui.welcomeWindow = function(_args) {
		var win = cf.ui.Window(_args);
		cf.ui.AddHomeButton(win);
		
		cf.ui.Add(win, [
		      Ti.UI.createLabel($c($jss.WelcomeWelcome, { text: 'Welcome to the Climbfind app! In a sec you\'ll be finding places to climb and partners to climb with.' })), 
		      Ti.UI.createLabel($c($jss.WelcomeSetPlace, { text: 'To get started, and at any time while using this app, click home in the top left to set your current location.' }))
			]);
			
		cf.addWindowListener(win, 'app:homeSelected', function(e) { win.close(); });			
			
		return win;
	};
})()