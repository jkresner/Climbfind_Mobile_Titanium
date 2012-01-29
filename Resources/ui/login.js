(function() {
	cf.ui.LoginWindow = function(parent, successCallback) {
		var win = cf.ui.Window(null);	
	
		cf.app.SetLoggedOut();
		
		var loginview = Ti.UI.createView($jss.LoginView);
		
		cf.accounts.InitializeLogin(win, loginview, successCallback); 
		 
		var title = Ti.UI.createLabel($c($jss.LoginTitle, {text:'Please use your Climbfind or facebook account to login.'})); 
		var emailField = Ti.UI.createTextField($jss.LoginEmailText);
		var passwordField = Ti.UI.createTextField($jss.LoginPasswordText);
		var loginBtn = Ti.UI.createButton($c($jss.YellowBtn,$jss.LoginButton));
		loginBtn.addEventListener("click", function() { 
			emailField.blur(); passwordField.blur(); //-- hide the keyboard while trying to log in
			cf.accounts.tryCfLogin(loginview, emailField.value, passwordField.value, cf.accounts.CleanupLogin);
		});

		var fbButton = Titanium.Facebook.createLoginButton($c($jss.LoginFBbutton));
		var fbCallout = Ti.UI.createLabel($c($jss.LoginFBcallout, {text:"Don't have a Climbfind login or forgot your password?"}));

		cf.ui.Add(loginview, [title, emailField, passwordField, loginBtn, fbCallout, fbButton]);

		win.add(loginview); 
		
		win.open();

		 
		return win;
	};
})();