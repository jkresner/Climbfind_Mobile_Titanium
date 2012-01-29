//All application functionality is namespaced here
var cf = {};
(function() {
	cf.Stgs = { WebRt: 'http://www.climbfind.com',
			    StaticRt: 'http://static.climbfind.com',
			    ImagesRt: 'http://images.climbfind.com',
			    IdSvrRt: 'https://accounts.climbfind.com',
			    IdIssueUrl: 'https://accounts.climbfind.com/issue/simple?realm=http%3A%2F%2Fmobile.climbfind.com%2F',//auto swt token
			    MobileDataSvcV1Rt: 'http://api.climbfind.com/v1/mobile',
			    SearchSvcV1Rt: 'http://api.climbfind.com/v1/search',
			    UploadSvcV1Rt: 'http://upload.climbfind.com',	    
				CfClientAppID: 'cf',
			    FacebookAppID: '231062836925414', 
			    UrbanAirshipkey: 'Z01PaxDzRe66n6HDJEoUrA',
				UrbanAirshipsecret: 'f5mhQ9hlR_uNyE8TOrl9RA-w8rPDYQuiTw',
				UrbanAirshipmaster_secret: 'O8oZN__qQr2wA27vB3IvpA',
				UrbanAirshipbaseurl: 'https://go.urbanairship.com' 
	};
			    
	//grab platform dimensions only once to save a trip over the bridge
	//OS, Locale, and Density specific branching helpers
	var locale = Ti.Platform.locale;
	var osname = Ti.Platform.osname;
	cf.PlatformIphone = (osname == 'iphone');
	cf.PlatformAndroid = (osname == 'android');
	cf.PlatformWidth = Ti.Platform.displayCaps.platformWidth;
	cf.PlatformHeight = Ti.Platform.displayCaps.platformHeight;
	
	//-- Initialize some Climbfind specific data
	//-- All the different types of 'geo' objects in the climbfind database
	cf.Types = [];cf.Types[1] = 'Country';cf.Types[2] = 'Province';cf.Types[3] = 'City';cf.Types[7] = 'Climbing area';cf.Types[10] = 'Indoor climbing gym';cf.Types[11] = 'Sports Center';cf.Types[12] = 'Private indoor facility';cf.Types[21] = 'Outdoor rock wall';cf.Types[23] = 'Outdoor boulder';cf.Types[25] = 'Water soloing';cf.Types[31] = 'Outdoor alpine wall';cf.Types[41] = 'Summit';cf.Types[51] = 'Ice climbing';cf.Types[101] = 'Indoor climb';cf.Types[103] = 'Outdoor climb';cf.Types[103] = 'Outdoor climb';cf.Types[103] = 'Outdoor climb';cf.Types[120] = 'User';
	//-- The options a user can select for their experience when logging a climb
	cf.Experience = [];cf.Experience[10] = 'Painful';cf.Experience[15] = 'Scary';cf.Experience[20] = 'Neutral';cf.Experience[25] = 'Cruisey';cf.Experience[30] = 'Fun';cf.Experience[34] = 'Lovely';cf.Experience[40] = 'Gratifying';
	//-- The options a user can select for the outcome when logging a climb
	cf.Outcome = [];cf.Outcome[11] = 'Attempt';cf.Outcome[17] = 'Breaks';cf.Outcome[23] = 'Redpoint';cf.Outcome[27] = 'Flash';cf.Outcome[31] = 'Onsight';
	//-- The options a user can select for how they felt about a grade when logging a climb
	cf.GradeOpinion = [];cf.GradeOpinion[0] = 'Unknown';cf.GradeOpinion[5] = 'Not sure';cf.GradeOpinion[13] = 'Easy';cf.GradeOpinion[19] = 'Spot on';cf.GradeOpinion[29] = 'Hard';
	//-- The options a user can select for how they felt about a grade when logging a climb
	cf.ClimbType = [];cf.ClimbType[0] = 'Unspecified';cf.ClimbType[1] = 'Top Rope Only';cf.ClimbType[2] = 'Top Rope + Lead';cf.ClimbType[3] = 'Lead Only';cf.ClimbType[4] = 'Boulder';
	//-- All the countries climbfind database
	cf.F = [];cf.F[3]='af'; cf.F[6]='al'; cf.F[68]='dz'; cf.F[12]='as'; cf.F[1]='ad'; cf.F[9]='ao'; cf.F[5]='ai'; cf.F[10]='aq'; cf.F[4]='ag'; cf.F[11]='ar'; cf.F[7]='am'; cf.F[17]='aw'; cf.F[16]='au'; cf.F[13]='at'; cf.F[19]='az'; cf.F[37]='bs'; cf.F[26]='bh'; cf.F[22]='bd'; cf.F[21]='bb'; cf.F[41]='by'; cf.F[23]='be'; cf.F[42]='bz'; cf.F[28]='bj'; cf.F[33]='bm'; cf.F[38]='bt'; cf.F[35]='bo'; cf.F[20]='ba'; cf.F[40]='bw'; cf.F[39]='bv'; cf.F[36]='br'; cf.F[34]='bn'; cf.F[25]='bg'; cf.F[24]='bf'; cf.F[27]='bi'; cf.F[130]='kh'; cf.F[52]='cm'; cf.F[43]='ca'; cf.F[57]='cv'; cf.F[139]='ky'; cf.F[46]='cf'; cf.F[230]='td'; cf.F[51]='cl'; cf.F[53]='cn'; cf.F[54]='co'; cf.F[134]='km'; cf.F[47]='cg'; cf.F[45]='cd'; cf.F[50]='ck'; cf.F[55]='cr'; cf.F[49]='ci'; cf.F[109]='hr'; cf.F[56]='cu'; cf.F[59]='cy'; cf.F[60]='cz'; cf.F[65]='dk'; cf.F[64]='dj'; cf.F[66]='dm'; cf.F[67]='do'; cf.F[69]='ec'; cf.F[71]='eg'; cf.F[226]='sv'; cf.F[14]='en'; cf.F[97]='gq'; cf.F[73]='er'; cf.F[70]='ee'; cf.F[75]='et'; cf.F[78]='fk'; cf.F[77]='fj'; cf.F[76]='fi'; cf.F[81]='fr'; cf.F[192]='pf'; cf.F[82]='ga'; cf.F[83]='en'; cf.F[93]='gm'; cf.F[85]='ge'; cf.F[61]='de'; cf.F[88]='gh'; cf.F[89]='gi'; cf.F[98]='gr'; cf.F[90]='gl'; cf.F[84]='gd'; cf.F[103]='gu'; cf.F[100]='gt'; cf.F[87]='nn'; cf.F[95]='gn'; cf.F[104]='gw'; cf.F[105]='gy'; cf.F[110]='ht'; cf.F[108]='hn'; cf.F[106]='hk'; cf.F[111]='hu'; cf.F[120]='is'; cf.F[116]='in'; cf.F[112]='id'; cf.F[119]='ir'; cf.F[118]='iq'; cf.F[113]='ie'; cf.F[115]='nn'; cf.F[114]='il'; cf.F[123]='it'; cf.F[125]='jm'; cf.F[127]='jp'; cf.F[124]='nn'; cf.F[126]='jo'; cf.F[140]='kz'; cf.F[128]='ke'; cf.F[133]='ki'; cf.F[138]='kw'; cf.F[129]='kg'; cf.F[141]='la'; cf.F[150]='lv'; cf.F[142]='lb'; cf.F[147]='ls'; cf.F[146]='lr'; cf.F[151]='ly'; cf.F[144]='li'; cf.F[148]='lt'; cf.F[149]='lu'; cf.F[165]='mo'; cf.F[161]='mk'; cf.F[159]='mg'; cf.F[173]='mw'; cf.F[175]='my'; cf.F[172]='mv'; cf.F[162]='ml'; cf.F[170]='mt'; cf.F[168]='mr'; cf.F[171]='mu'; cf.F[174]='mx'; cf.F[156]='md'; cf.F[155]='mc'; cf.F[164]='mn'; cf.F[157]='me'; cf.F[169]='ms'; cf.F[153]='ma'; cf.F[176]='mz'; cf.F[163]='mm'; cf.F[177]='na'; cf.F[186]='nr'; cf.F[185]='np'; cf.F[183]='nl'; cf.F[178]='nc'; cf.F[188]='nz'; cf.F[182]='ni'; cf.F[179]='ne'; cf.F[181]='ng'; cf.F[180]='nf'; cf.F[136]='kp'; cf.F[31]='gb'; cf.F[184]='no'; cf.F[189]='om'; cf.F[195]='pk'; cf.F[202]='pw'; cf.F[200]='ps'; cf.F[190]='pa'; cf.F[193]='pg'; cf.F[203]='py'; cf.F[191]='pe'; cf.F[194]='ph'; cf.F[198]='pn'; cf.F[196]='pl'; cf.F[201]='pt'; cf.F[199]='pr'; cf.F[204]='qa'; cf.F[206]='ro'; cf.F[208]='ru'; cf.F[209]='rw'; cf.F[216]='sh'; cf.F[135]='kn'; cf.F[143]='lc'; cf.F[158]='fr'; cf.F[197]='pm'; cf.F[251]='ws'; cf.F[221]='sm'; cf.F[225]='st'; cf.F[210]='sa'; cf.F[15]='sp'; cf.F[222]='sn'; cf.F[207]='rs'; cf.F[212]='sc'; cf.F[220]='sl'; cf.F[215]='sg'; cf.F[219]='sk'; cf.F[217]='si'; cf.F[211]='sb'; cf.F[223]='so'; cf.F[253]='za'; cf.F[137]='ke'; cf.F[74]='es'; cf.F[145]='lk'; cf.F[213]='sd'; cf.F[224]='sr'; cf.F[228]='sz'; cf.F[214]='se'; cf.F[48]='ch'; cf.F[227]='sy'; cf.F[241]='tw'; cf.F[233]='tj'; cf.F[242]='tz'; cf.F[232]='th'; cf.F[231]='tg'; cf.F[234]='tk'; cf.F[237]='to'; cf.F[239]='tt'; cf.F[236]='tn'; cf.F[238]='tr'; cf.F[235]='tm'; cf.F[229]='tc'; cf.F[240]='tv'; cf.F[244]='ug'; cf.F[243]='ua'; cf.F[2]='ae'; cf.F[245]='us'; cf.F[246]='uy'; cf.F[247]='uz'; cf.F[250]='vu'; cf.F[248]='ve'; cf.F[249]='vn'; cf.F[18]='wa'; cf.F[72]='eh'; cf.F[252]='ye'; cf.F[254]='zm'; cf.F[255]='zw';
	cf.C = [];cf.C[3]='Afghanistan'; cf.C[6]='Albania'; cf.C[68]='Algeria'; cf.C[12]='American Samoa'; cf.C[1]='Andorra'; cf.C[9]='Angola'; cf.C[5]='Anguilla'; cf.C[10]='Antarctica'; cf.C[4]='Antigua & Barbuda'; cf.C[11]='Argentina'; cf.C[7]='Armenia'; cf.C[17]='Aruba'; cf.C[16]='Australia'; cf.C[13]='Austria'; cf.C[19]='Azerbaijan'; cf.C[37]='Bahamas'; cf.C[26]='Bahrain'; cf.C[22]='Bangladesh'; cf.C[21]='Barbados'; cf.C[41]='Belarus'; cf.C[23]='Belgium'; cf.C[42]='Belize'; cf.C[28]='Benin'; cf.C[33]='Bermuda'; cf.C[38]='Bhutan'; cf.C[35]='Bolivia'; cf.C[20]='Bosnia and Herzegovina'; cf.C[40]='Botswana'; cf.C[39]='Bouvet Island'; cf.C[36]='Brazil'; cf.C[34]='Brunei Darussalam'; cf.C[25]='Bulgaria'; cf.C[24]='Burkina Faso'; cf.C[27]='Burundi'; cf.C[130]='Cambodia'; cf.C[52]='Cameroon'; cf.C[43]='Canada'; cf.C[57]='Cape Verde'; cf.C[139]='Cayman Islands'; cf.C[46]='Central African Republic'; cf.C[230]='Chad'; cf.C[51]='Chile'; cf.C[53]='China'; cf.C[54]='Colombia'; cf.C[134]='Comoros'; cf.C[47]='Congo'; cf.C[45]='Congo Democratic Republic'; cf.C[50]='Cook Islands'; cf.C[55]='Costa Rica';  cf.C[83]='England'; cf.C[109]='Croatia'; cf.C[56]='Cuba'; cf.C[59]='Cyprus'; cf.C[60]='Czech Republic'; cf.C[65]='Denmark'; cf.C[64]='Djibouti'; cf.C[66]='Dominica'; cf.C[67]='Dominican Republic'; cf.C[69]='Ecuador'; cf.C[71]='Egypt'; cf.C[226]='El Salvador'; cf.C[14]='England'; cf.C[97]='Equatorial Guinea'; cf.C[73]='Eritrea'; cf.C[70]='Estonia'; cf.C[75]='Ethiopia'; cf.C[78]='Falkland Islands'; cf.C[77]='Fiji'; cf.C[76]='Finland'; cf.C[81]='France'; cf.C[192]='French Polynesia'; cf.C[82]='Gabon'; cf.C[93]='Gambia'; cf.C[85]='Georgia'; cf.C[61]='Germany'; cf.C[88]='Ghana'; cf.C[89]='Gibraltar'; cf.C[98]='Greece'; cf.C[90]='Greenland'; cf.C[84]='Grenada'; cf.C[103]='Guam'; cf.C[100]='Guatemala'; cf.C[87]='Guernsey'; cf.C[95]='Guinea'; cf.C[104]='Guinea-Bissau'; cf.C[105]='Guyana'; cf.C[110]='Haiti'; cf.C[108]='Honduras'; cf.C[106]='Hong Kong'; cf.C[111]='Hungary'; cf.C[120]='Iceland'; cf.C[116]='India'; cf.C[112]='Indonesia'; cf.C[119]='Iran'; cf.C[118]='Iraq'; cf.C[113]='Ireland'; cf.C[115]='Isle of Man'; cf.C[114]='Israel'; cf.C[123]='Italy'; cf.C[125]='Jamaica'; cf.C[127]='Japan'; cf.C[124]='Jersey'; cf.C[126]='Jordan'; cf.C[140]='Kazakhstan'; cf.C[128]='Kenya'; cf.C[133]='Kiribati'; cf.C[138]='Kuwait'; cf.C[129]='Kyrgyzstan'; cf.C[141]='Laos'; cf.C[150]='Latvia'; cf.C[142]='Lebanon'; cf.C[147]='Lesotho'; cf.C[146]='Liberia'; cf.C[151]='Libya'; cf.C[144]='Liechtenstein'; cf.C[148]='Lithuania'; cf.C[149]='Luxembourg'; cf.C[165]='Macao'; cf.C[161]='Macedonia'; cf.C[159]='Madagascar'; cf.C[173]='Malawi'; cf.C[175]='Malaysia'; cf.C[172]='Maldives'; cf.C[162]='Mali'; cf.C[170]='Malta'; cf.C[168]='Mauritania'; cf.C[171]='Mauritius'; cf.C[174]='Mexico'; cf.C[156]='Moldova'; cf.C[155]='Monaco'; cf.C[164]='Mongolia'; cf.C[157]='Montenegro'; cf.C[169]='Montserrat'; cf.C[153]='Morocco'; cf.C[176]='Mozambique'; cf.C[163]='Myanmar'; cf.C[177]='Namibia'; cf.C[186]='Nauru'; cf.C[185]='Nepal'; cf.C[183]='Netherlands'; cf.C[178]='New Caledonia'; cf.C[188]='New Zealand'; cf.C[182]='Nicaragua'; cf.C[179]='Niger'; cf.C[181]='Nigeria'; cf.C[180]='Norfolk Island'; cf.C[136]='North Korea'; cf.C[31]='Northern Ireland'; cf.C[184]='Norway'; cf.C[189]='Oman'; cf.C[195]='Pakistan'; cf.C[202]='Palau'; cf.C[200]='Palestinian Territory'; cf.C[190]='Panama'; cf.C[193]='Papua New Guinea'; cf.C[203]='Paraguay'; cf.C[191]='Peru'; cf.C[194]='Philippines'; cf.C[198]='Pitcairn Islands'; cf.C[196]='Poland'; cf.C[201]='Portugal'; cf.C[199]='Puerto Rico'; cf.C[204]='Qatar'; cf.C[206]='Romania'; cf.C[208]='Russia'; cf.C[209]='Rwanda'; cf.C[216]='Saint Helena'; cf.C[135]='Saint Kitts and Nevis'; cf.C[143]='Saint Lucia'; cf.C[158]='Saint Martin'; cf.C[197]='Saint Pierre and Miquelon'; cf.C[251]='Samoa'; cf.C[221]='San Marino'; cf.C[225]='Sao Tome and Principe'; cf.C[210]='Saudi Arabia'; cf.C[15]='Scotland'; cf.C[222]='Senegal'; cf.C[207]='Serbia'; cf.C[212]='Seychelles'; cf.C[220]='Sierra Leone'; cf.C[215]='Singapore'; cf.C[219]='Slovakia'; cf.C[217]='Slovenia'; cf.C[211]='Solomon Islands'; cf.C[223]='Somalia'; cf.C[253]='South Africa'; cf.C[137]='South Korea'; cf.C[74]='Spain'; cf.C[145]='Sri Lanka'; cf.C[213]='Sudan'; cf.C[224]='Suriname'; cf.C[228]='Swaziland'; cf.C[214]='Sweden'; cf.C[48]='Switzerland'; cf.C[227]='Syria'; cf.C[241]='Taiwan'; cf.C[233]='Tajikistan'; cf.C[242]='Tanzania'; cf.C[232]='Thailand'; cf.C[231]='Togo'; cf.C[234]='Tokelau'; cf.C[237]='Tonga'; cf.C[239]='Trinidad and Tobago'; cf.C[236]='Tunisia'; cf.C[238]='Turkey'; cf.C[235]='Turkmenistan'; cf.C[229]='Turks and Caicos Islands'; cf.C[240]='Tuvalu'; cf.C[244]='Uganda'; cf.C[243]='Ukraine'; cf.C[2]='United Arab Emirates'; cf.C[245]='United States'; cf.C[246]='Uruguay'; cf.C[247]='Uzbekistan'; cf.C[250]='Vanuatu'; cf.C[248]='Venezuela'; cf.C[249]='VietNam'; cf.C[18]='Wales'; cf.C[72]='Western Sahara'; cf.C[252]='Yemen'; cf.C[254]='Zambia'; cf.C[255]='Zimbabwe';

	//-- Scope for v1 release (data/serach/upload services)
	cf.v1 = {};

	//application state variables are held in this namespace.  
	//Like the current app main window, for instance, which is created in app.js
	cf.app = {};
	
	//app state helper methods
	cf.app.HasProp = function(propName) { return Titanium.App.Properties.getString(propName) != null; };
	cf.app.SetProp = function(propName, json) { Titanium.App.Properties.setString(propName, JSON.stringify(json)); };
	cf.app.GetProp = function(propName) { if (cf.app.HasProp(propName)) { return JSON.parse(Titanium.App.Properties.getString(propName)); } else { return null; } };
	cf.app.UnsetProp = function(propName) { Titanium.App.Properties.removeProperty(propName); };

	cf.app.SetLoggedOut = function() { 
		if (cf.PlatformIphone) { UrbanAirship.unregisteriOSForPushNotifications(); }
		cf.app.clearPlace();
		cf.app.clearMe();
		Titanium.App.Properties.removeProperty("accessToken");
		Titanium.App.Properties.removeProperty("userid");
		Titanium.App.Properties.removeProperty("email");
		Titanium.App.Properties.removeProperty("password");	
		Titanium.App.Properties.removeProperty("push");
		Titanium.Facebook.logout();
	};
	cf.app.SetLogInDetails = function(email, password) { 
	    //info("setting login: "+email+' '+password);
		Titanium.App.Properties.setString("email", email);
		Titanium.App.Properties.setString("password", password);
		if (cf.PlatformIphone) { UrbanAirship.registeriOSForPushNotifications(email); } 
	};
	cf.app.SetAccessToken = function(token) { Titanium.App.Properties.setString("accessToken", token); };	
	cf.app.AccessToken = function() { return Titanium.App.Properties.getString("accessToken"); };
	cf.app.LogInEmail = function() { return Titanium.App.Properties.getString("email"); };
	cf.app.LogInPassword = function() { return Titanium.App.Properties.getString("password"); };
	
	cf.GetPlace = function(win, id, type, callback) {
		if (type == 1) { Ti.UI.createAlertDialog({ title:'Countries are too big', message: 'Countries have too many destinations for us to show partner calls and let you post calls for. Too many people would receive your call. Try a smaller area.'}).show(); }
		else if (type ==2) { Ti.UI.createAlertDialog({ title:'Provinces are too big', message: 'Provinces/states have too many destinations for us to show partner calls and let you post calls for. Too many people would receive your call. Try a smaller area.'}).show(); } 
		else if (type >=3 && type <= 8) {				
			cf.v1.dataSvc.GetAreaLite(win, id, function(place) { callback(place); });	
		} 
		else if (type >=9 && type <= 50) { //-- Indoor + Outdoor
			cf.v1.dataSvc.GetLocation(win, id, function(place) { callback(place);});	
		} 
		else { Ti.UI.createAlertDialog({ title:'Unknown Place', message: 'Cannot open place type specified.'}).show(); }	
	};
	
	//-- Model variables for when the app drills into tabs
	cf.app.Place = cf.app.GetProp('Place');
	cf.app.setPlace = function(place)
	{
		cf.app.SetProp('Place', place);	
		cf.app.Place = cf.app.GetProp('Place');	
		Ti.App.fireEvent('app:homeSelected'); 
	};
	cf.app.clearPlace = function() { cf.app.UnsetProp("Place"); cf.app.Place = cf.app.GetProp('Place'); }
		
	//-- Model variables for when the app drills into tabs
	cf.app.Me = cf.app.GetProp('Me');
	cf.app.setMe = function(callback)
	{
		cf.v1.dataSvc.GetMe(null, function(me) {  	
			cf.app.SetProp('Me', me);
			cf.app.Me = cf.app.GetProp('Me');
			if (callback != null) {
				callback(); //-- Need to put this hear for android
			}
		});	
	};
	cf.app.clearMe = function(locIndex) { cf.app.UnsetProp("Me"); cf.app.Me = cf.app.GetProp('Me'); }

	
	//-- Model variables for when the app drills into tabs
	cf.app.CurrentTabsClimb = {};
	cf.app.CurrentTabsLocation = {};
	cf.app.CurrentTabsUser = {};
	cf.app.CurrentTabsPartnersPlace = {};
		
	//Extend an object with the properties from another (thanks Dojo - http://docs.dojocampus.org/dojo/mixin)
	//(mixin is used by combine, which we use for our jss)
	var empty = {};
	function mixin(target, source){
		var name, s, i;
		for(name in source){
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
		return target; // Object
	};
	cf.mixin = function(/*Object*/ obj, /*Object...*/ props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			mixin(obj, arguments[i]);
		}
		return obj; // Object
	};
	
	//create a new object, combining the properties of the passed objects with the last arguments having
	//priority over the first ones
	cf.combine = function(/*Object*/ obj, /*Object...*/ props) {
		var newObj = {};
		for(var i=0, l=arguments.length; i<l; i++){
			mixin(newObj, arguments[i]);
		}
		return newObj;
	};
	
	//-- Object list enumerator, checks if there is an object in the list with the given id
	cf.listContainsObjectWithID = function(list, id) {
		for (var i = 0, l = list.length;i<l;i++)
		{
			if (list[i].ID == id) { return true; }
		}
		return false;
	}

	//-- Return the index of an object with a specified id
	cf.indexOfObjectWithID = function(list, id) {
		for (var i = 0, l = list.length;i<l;i++)
		{
			if (list[i].ID == id) { return i; }
		}
		return null;
	}
	
	/*
		Branching logic based on locale
	*/
	//tt.locale = function(/*Object*/ map) {
	//	var def = map.def||null; //default function or value
	//	if (map[locale]) {
	//		if (typeof map[locale] == 'function') { return map[locale](); }
	//		else { return map[locale]; }
	//	}
	//	else {
	//		if (typeof def == 'function') { return def(); }
	//		else { return def; }
	//	}
	//};

	/*
		Branching logic based on OS
	*/
	cf.os = function(/*Object*/ map) {
		var def = map.def||null; //default function or value
		if (typeof map[osname] != 'undefined') {
			if (typeof map[osname] == 'function') { return map[osname](); }
			else { return map[osname]; }
		}
		else {
			if (typeof def == 'function') { return def(); }
			else { return def; }
		}
	};
	
	//-- Try get an image from cache and if not, store it in the cache for next time to speed up the app
	cf.TryUseCachedImage = function(iView, imageURL) {
		
		if (imageURL) {
	        var hashedSource = Ti.Utils.md5HexDigest(imageURL + '') + '.' + imageURL.split('.').pop();
	   		//info('trying to use cache image of '+imageURL + '|'+hashedSource);
	        var localIcon = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + '/CachedRemoteImages', hashedSource);
	        if (localIcon.exists()) {        
	            //info('GOT LOCAL: '+localIcon.nativePath);	    		
	            iView.image = localIcon.nativePath;
	    	}
	    	else {
	        	//info('caching: ' + imageURL + ' to: '+localIcon.nativePath);
	            //-- 1) We use a fresh non-style iView so we get the original image cached and not a resized one
	            //-- 2) We're being tricky, we're only loading/saving the image when the real ImageView is loaded so we don't cause all the images to load in advance
	            iView.image = imageURL;
	            
	            //*** THIS EVENT DOES NOT FIRE ON ANDROID MORE STUPID TITANIUM
	            iView.addEventListener('load' ,function() { 
	            	info(imageURL+' written to disk');
	            	localIcon.write(Ti.UI.createImageView({image:imageURL}).toImage()); 
	            });
	    	}
       }
       
       //iView.image = imageURL;
   };
   
   //-- Attach an event to a window and remove it when the window is closed
   cf.addWindowListener = function(win, eventName, callback)
   { 			
		info('adding: '+eventName+' listener');
		Ti.App.addEventListener(eventName, callback);
		win.addEventListener('close', function(){ Ti.App.removeEventListener(eventName, callback); 
			info('removing:'+eventName+' listener'); });
  };
   
})();

//-- Here we add a couple of handy references to funtion to make the code of the rest of our app nicer
var $c = cf.combine;
var info = function(msg) { Titanium.API.info(msg); } //-- need this for stupid Titanium android

/** Common & Default Styles - used to scale UI on android devices **/
var $X = function(x) { return Math.round(x*cf.PlatformWidth/320); };
var $Y = function(y) { return Math.round(y*cf.PlatformHeight/480); }; 
var cdp = { TitleHeight: $Y(44) };

//Include additional Climbfind namespaces
Ti.include('/cf/utility.js', '/cf/geo.js', '/cf/urbanairship.js', '/cf/accounts.js', '/cf/http.js', 
	'/cf/v1datasvc.js', '/cf/v1uploadsvc.js', '/cf/v1searchsvc.js', '/ui/ui.js', '/cf/helpers.js', 
	'/cf/model.js', '/cf/datePickerWin.js');

//Include 'javascript styles sheets'
Ti.include('/jss.js');