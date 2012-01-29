//-- Include everything in our single context
Ti.include('/cf/cf.js');
Titanium.Facebook.appid = cf.Stgs.FacebookAppID;
Titanium.Facebook.permissions = ['email'];
Titanium.Facebook.forceDialogAuth = true; //-- disable facebook SSO and just use dialog because it works

var initialize_iOS = function()
{	
	Titanium.UI.setBackgroundColor('#000');
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	var loggedInEmail = cf.app.LogInEmail();
	if (loggedInEmail != null)
	{
		info('logged in... setting up urbanairship and user in session: '+loggedInEmail);
		UrbanAirship.registeriOSForPushNotifications(loggedInEmail);
		cf.app.setMe(null); 
	}
	info('iphone initialized');
};

var initialize_android = function()
{ 
	info('android initialized');	  
};

cf.os({ iphone:initialize_iOS, android:initialize_android }); 

//-- This is where we store cached images
var cacheImgDirPath = Ti.Filesystem.applicationDataDirectory + '/CachedRemoteImages'
var dir = Ti.Filesystem.getFile(cacheImgDirPath);
//info(dir);
if (!dir.exists()) { info('creating cache dir: '+cacheImgDirPath); dir.createDirectory(); }

cf.Startup = function()
{
	cf.ui.mainWindowInstansiate();
	
	if (cf.app.LogInEmail() == null) { cf.ui.LoginWindow(null, cf.Startup); }
	else if (cf.app.Place == null) { cf.ui.welcomeWindow().open(); }
	else { cf.app.mainWindow.load(); }  
};

cf.Startup();

//Ti.include('/tests.js');