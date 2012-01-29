//-- functionality and UI concerned with login/authorization/registration
(function() {
	cf.accounts = {};

	//Varibles in scope during login process
	cf.accounts.ActiveLoginWindow = null;
	cf.accounts.ActiveLoginView = null; //-- Only included to make floating loaders show correctly...
	cf.accounts.ActiveLoginSuccessDelegate = null;
	
	//Setup our scoped varibles and attach listeners
	cf.accounts.InitializeLogin = function(win, loginview, successCallback)
	{
		cf.accounts.ActiveLoginWindow = win;
		cf.accounts.ActiveLoginView = loginview;
		cf.accounts.ActiveLoginSuccessDelegate = successCallback;
		Titanium.Facebook.removeEventListener('logout', cf.accounts.facebookLogoutDelegate);
		Titanium.Facebook.addEventListener('login', cf.accounts.facebookLoginDelegate);
	};
	
	//Clean up our scoped varibles, detach listeners & re-execute our delegate that failed due to not being logged in
	cf.accounts.CleanupLogin = function()
	{
		Titanium.Facebook.removeEventListener('login', cf.accounts.facebookLoginDelegate);
		Titanium.Facebook.addEventListener('logout', cf.accounts.facebookLogoutDelegate);
		
		cf.accounts.ActiveLoginSuccessDelegate();
		
		cf.accounts.ActiveLoginView = null;
		cf.accounts.ActiveLoginWindow.close();
		cf.accounts.ActiveLoginWindow = null;
		cf.accounts.ActiveLoginSuccessDelegate = null;
	};
	
	//-- Call CF Accounts Server to give us a token based on email/password
	cf.accounts.requestAccessToken = function(win, email, password, successCallback, failCallback)
	{
		//alert('requestAccessToken');
			
		var requestUrl = cf.Stgs.IdIssueUrl;
		var emailAndPass = email+':'+password;
		var b64EcodedCreds = Titanium.Utils.base64encode(emailAndPass);
		var authHeaderValue = 'Basic '+ b64EcodedCreds;
		var xhr = Titanium.Network.createHTTPClient();	
	    xhr.open('GET', requestUrl); 
		xhr.setRequestHeader("Authorization", authHeaderValue);	
		xhr.setTimeout(30000);
		xhr.onerror = function(e) { 
		    //alert('failed to get access token');
		    info('failed to get a token for '+email);
		    cf.ui.RemoveFloatingLoader(win); 
		    failCallback();
	    };
		xhr.onload = function(){
			//info('Received 200 response from '+requestUrl);
			var tokenVal = this.responseText;
			//alert(tokenVal);
			cf.app.SetAccessToken(tokenVal);
			cf.app.setMe(function() {
				cf.ui.RemoveFloatingLoader(win); 
				successCallback();					
			}); 	
		}
		
		var fLoader = cf.ui.AddFloatingLoader(win, "Logging in to CF...");
	    xhr.send();
	}
	
	//-- Pass FB token to IdentityServer to perform a GetMe and connect fb/cf accounts based on email
	cf.accounts.tryConnectCFandFB = function(win, fbToken, successCallback)
	{
		//info('trying to connect Facebook account via CF Accounts Server');	
		var requestUrl = cf.Stgs.IdSvrRt+'/Account/MobileConnectFacebook';
		var xhr = Titanium.Network.createHTTPClient();	
	    xhr.open('POST', requestUrl); 
		xhr.onerror = function(e) { cf.ui.RemoveFloatingLoader(win); alert('Could not connect to Climbfind Accounts Server'); };
		xhr.onload = function() {
			info('Received 200 response from '+requestUrl);
			var result = this.responseText;
			info('200 result: '+result);
			cf.ui.RemoveFloatingLoader(win); 
			successCallback(result);	
		}
		
		var fLoader = cf.ui.AddFloatingLoader(win, "Logging in to CF...");
	    xhr.send({accessToken:fbToken});
	}

    //-- Use the fb access token (and fb profile details on the server) plus nationality to register a new account
	cf.accounts.registerWithFacebook = function(win, fbToken, countryID, successCallback)
	{
		//info('registering to CF Accounts Server with facebook account');
		var requestUrl = cf.Stgs.IdSvrRt+'/Account/MobileSignUpFacebook';
		var xhr = Titanium.Network.createHTTPClient();	
	    xhr.open('POST', requestUrl, false);
	    xhr.setTimeout(15000); //-- FOR ANDROID TO WORK... GHHHH 
		xhr.onerror = function(e) { cf.ui.RemoveFloatingLoader(win); alert('Could not register account with Climbfind Accounts Server'); };
		xhr.onload = function() {
			info('Received 200 response from '+requestUrl);
			var result = this.responseText;
			info('200 result: '+result);
			cf.ui.RemoveFloatingLoader(win); 
			successCallback(result);	
		}
		
		var fLoader = cf.ui.AddFloatingLoader(win, "Saving...");
		//info('CREATING ACCOUNT>>>>>>>>>>>>>>>>>>>>>>>>>>');
		if (cf.PlatformAndroid) {
			countryID = countryID.toString(); } //-- Fucking Android => http://developer.appcelerator.com/question/119438/integer-in-label-displays-with-decimal-on-android
		var params = { accessToken:fbToken, nationality:countryID, signUpOrigin:'cf.'+Ti.Platform.osname };
		//info(params); 
	    xhr.send(params);
	}

	/* Tries to get an access token based on the app stored email/pass combination */
	cf.accounts.setFreshAccessToken = function(win, successCallback, failCallback)
	{
		var email = cf.app.LogInEmail();	
		if (email == null) { failCallback(); }
		else 
		{
			var pass = cf.app.LogInPassword();
			cf.accounts.requestAccessToken(win, email, pass, successCallback, failCallback);
	    }
	};
	
	/* Tries to loging (and get an access token) based on user supplies email/pass */
	cf.accounts.tryLogin = function(win, email, pass, successCallback, failedCallback)
	{
		cf.accounts.requestAccessToken(win, email, pass,
			function() { cf.app.SetLogInDetails(email, pass); successCallback(); },
			failedCallback);
	};
	
	/* Try login with CF account email/pass */
	cf.accounts.tryCfLogin = function(win, email, pass, successCallback)
	{
		cf.accounts.tryLogin(win, email, pass, successCallback,
			function() { cf.ui.ShowMessageOverlay(win, 290, 160, 3500, "Authentication failed for " + email + " & the given password. Please try again"); }
		);
	};


	/* Try login with fb email and cf backdoor password using fb password formula*/
	cf.accounts.tryLoginToCfWithFacebook = function(fbProfile, callback)
	{								
		var fbAuthPass = 'fAu' + cf.accounts.getRandomThreeNumbers() + fbProfile.id;
		//info('tryLoginToCfWithFacebook => fbAuthPass: '+fbAuthPass);
	
		//-- 1: Try login with email + fbID special		
		cf.accounts.tryLogin(cf.accounts.ActiveLoginView, fbProfile.email, fbAuthPass,
			function() { if (callback != null) { callback(); } cf.accounts.CleanupLogin(); },
			function() { cf.accounts.tryConnectOrRegister(fbProfile, fbAuthPass); });
			
		//Ti.API.info(fbProfile);
		//alert(fbProfile.email);
	}
	
	cf.accounts.facebookLogoutDelegate = function() {};
	cf.accounts.facebookLoginDelegate = function()
	{
		//alert('in login delegate');
		cf.ui.AddFloatingLoader(cf.accounts.ActiveLoginView, "Loading...");
		if (Ti.Facebook.loggedIn) {	
			//alert('iTi.Facebook.loggedIn');
			Titanium.Facebook.requestWithGraphPath('me' , {}, 'GET', function(e){
				cf.ui.RemoveFloatingLoader(cf.accounts.ActiveLoginView); 
				//alert('cf.accounts.tryLoginToCfWithFacebook');
				cf.accounts.tryLoginToCfWithFacebook(JSON.parse(e.result), null);			
			});
		} else
		{
			//alert('iTi.Facebook.NOTloggedIn');
			cf.ui.RemoveFloatingLoader(cf.accounts.ActiveLoginView);
		}
	}

	//If there is an existing CF account matching the CF email, it connects, otherwise asks use to register
	cf.accounts.tryConnectOrRegister = function(fbProfile)
	{
		//info('tryConnectOrRegister => fbProfile.email: '+fbProfile.email);	
		var fbToken = Titanium.Facebook.accessToken;
		//info('fbToken: '+fbToken);
				
		var fbConnectCallback = function(connectResult) {
			//info('connectResult:'+connectResult);
			
		  	if (connectResult == 'connected') { 
		  		var fbAuthPass = 'fAu' + cf.accounts.getRandomThreeNumbers() + fbProfile.id;
		  		cf.accounts.tryLogin(cf.accounts.ActiveLoginView, fbProfile.email, fbAuthPass,
					cf.accounts.CleanupLogin,
					function() { alert('Should never get here... Something is broken, Please restart app.'); });
	  		}		  			
		  	else {	  		
		  		info('ShowSignUpScreen => fbProfile.email: '+fbProfile.email);
		  		cf.accounts.selectNationalityWindow(fbToken, fbProfile).open();
		  	}
		}
		
		cf.accounts.tryConnectCFandFB(cf.accounts.ActiveLoginView, fbToken, fbConnectCallback);
	}

	//-- Sign up screen asking for nationality (missing detail for sign up)
	cf.accounts.selectNationalityWindow = function(fbToken, fbProfile)
	{
		var countryID = 245; //-- Default CountryID is USA
		var win = cf.ui.Window();
		
		var title = Ti.UI.createLabel($c($jss.SignUpCountryTitle, {text:'One signup detail & you\'re good to go!'}));
		var whyCountry = Ti.UI.createLabel($c($jss.SignUpCountryWhy, {text:'Climbfind is worldwide network for finding climbing partners on the go. Travel & meeting climbers from different origins is core to Climbfind culture. Select your nationality for your profile & watch out for visiting climbers in your area!'}));
		
		var picker = Ti.UI.createPicker($jss.SignUpCountryPicker);
		
		var r = [];r[0]=Ti.UI.createPickerRow({title:'Afghanistan',cid:3}); r[1]=Ti.UI.createPickerRow({title:'Albania',cid:6}); r[2]=Ti.UI.createPickerRow({title:'Algeria',cid:68}); r[3]=Ti.UI.createPickerRow({title:'American Samoa',cid:12}); r[4]=Ti.UI.createPickerRow({title:'Andorra',cid:1}); r[5]=Ti.UI.createPickerRow({title:'Angola',cid:9}); r[6]=Ti.UI.createPickerRow({title:'Anguilla',cid:5}); r[7]=Ti.UI.createPickerRow({title:'Antarctica',cid:10}); r[8]=Ti.UI.createPickerRow({title:'Antigua and Barbuda',cid:4}); r[9]=Ti.UI.createPickerRow({title:'Argentina',cid:11}); r[10]=Ti.UI.createPickerRow({title:'Armenia',cid:7}); r[11]=Ti.UI.createPickerRow({title:'Aruba',cid:17}); r[12]=Ti.UI.createPickerRow({title:'Australia',cid:16}); r[13]=Ti.UI.createPickerRow({title:'Austria',cid:13}); r[14]=Ti.UI.createPickerRow({title:'Azerbaijan',cid:19}); r[15]=Ti.UI.createPickerRow({title:'Bahamas',cid:37}); r[16]=Ti.UI.createPickerRow({title:'Bahrain',cid:26}); r[17]=Ti.UI.createPickerRow({title:'Bangladesh',cid:22}); r[18]=Ti.UI.createPickerRow({title:'Barbados',cid:21}); r[19]=Ti.UI.createPickerRow({title:'Belarus',cid:41}); r[20]=Ti.UI.createPickerRow({title:'Belgium',cid:23}); r[21]=Ti.UI.createPickerRow({title:'Belize',cid:42}); r[22]=Ti.UI.createPickerRow({title:'Benin',cid:28}); r[23]=Ti.UI.createPickerRow({title:'Bermuda',cid:33}); r[24]=Ti.UI.createPickerRow({title:'Bhutan',cid:38}); r[25]=Ti.UI.createPickerRow({title:'Bolivia',cid:35}); r[26]=Ti.UI.createPickerRow({title:'Bosnia and Herzegovina',cid:20}); r[27]=Ti.UI.createPickerRow({title:'Botswana',cid:40}); r[28]=Ti.UI.createPickerRow({title:'Bouvet Island',cid:39}); r[29]=Ti.UI.createPickerRow({title:'Brazil',cid:36}); r[30]=Ti.UI.createPickerRow({title:'Brunei Darussalam',cid:34}); r[31]=Ti.UI.createPickerRow({title:'Bulgaria',cid:25}); r[32]=Ti.UI.createPickerRow({title:'Burkina Faso',cid:24}); r[33]=Ti.UI.createPickerRow({title:'Burundi',cid:27}); r[34]=Ti.UI.createPickerRow({title:'Cambodia',cid:130}); r[35]=Ti.UI.createPickerRow({title:'Cameroon',cid:52}); r[37]=Ti.UI.createPickerRow({title:'Cape Verde',cid:57}); r[38]=Ti.UI.createPickerRow({title:'Cayman Islands',cid:139}); r[39]=Ti.UI.createPickerRow({title:'Central African Republic',cid:46}); r[40]=Ti.UI.createPickerRow({title:'Chad',cid:230}); r[41]=Ti.UI.createPickerRow({title:'Chile',cid:51}); r[42]=Ti.UI.createPickerRow({title:'China',cid:53}); r[43]=Ti.UI.createPickerRow({title:'Colombia',cid:54}); r[44]=Ti.UI.createPickerRow({title:'Comoros',cid:134}); r[45]=Ti.UI.createPickerRow({title:'Congo',cid:47}); r[46]=Ti.UI.createPickerRow({title:'Congo Democratic Republic',cid:45}); r[47]=Ti.UI.createPickerRow({title:'Cook Islands',cid:50}); r[48]=Ti.UI.createPickerRow({title:'Costa Rica',cid:55}); r[50]=Ti.UI.createPickerRow({title:'Croatia',cid:109}); r[51]=Ti.UI.createPickerRow({title:'Cuba',cid:56}); r[52]=Ti.UI.createPickerRow({title:'Cyprus',cid:59}); r[53]=Ti.UI.createPickerRow({title:'Czech Republic',cid:60}); r[54]=Ti.UI.createPickerRow({title:'Denmark',cid:65}); r[55]=Ti.UI.createPickerRow({title:'Djibouti',cid:64}); r[56]=Ti.UI.createPickerRow({title:'Dominica',cid:66}); r[57]=Ti.UI.createPickerRow({title:'Dominican Republic',cid:67}); r[58]=Ti.UI.createPickerRow({title:'Ecuador',cid:69}); r[59]=Ti.UI.createPickerRow({title:'Egypt',cid:71}); r[60]=Ti.UI.createPickerRow({title:'El Salvador',cid:226}); r[62]=Ti.UI.createPickerRow({title:'Equatorial Guinea',cid:97}); r[63]=Ti.UI.createPickerRow({title:'Eritrea',cid:73}); r[64]=Ti.UI.createPickerRow({title:'Estonia',cid:70}); r[65]=Ti.UI.createPickerRow({title:'Ethiopia',cid:75}); r[66]=Ti.UI.createPickerRow({title:'Falkland Islands',cid:78}); r[67]=Ti.UI.createPickerRow({title:'Fiji',cid:77}); r[68]=Ti.UI.createPickerRow({title:'Finland',cid:76}); r[69]=Ti.UI.createPickerRow({title:'France',cid:81}); r[70]=Ti.UI.createPickerRow({title:'French Polynesia',cid:192}); r[71]=Ti.UI.createPickerRow({title:'Gabon',cid:82}); r[72]=Ti.UI.createPickerRow({title:'Gambia',cid:93}); r[73]=Ti.UI.createPickerRow({title:'Georgia',cid:85}); r[74]=Ti.UI.createPickerRow({title:'Germany',cid:61}); r[75]=Ti.UI.createPickerRow({title:'Ghana',cid:88}); r[76]=Ti.UI.createPickerRow({title:'Gibraltar',cid:89}); r[77]=Ti.UI.createPickerRow({title:'Greece',cid:98}); r[78]=Ti.UI.createPickerRow({title:'Greenland',cid:90}); r[79]=Ti.UI.createPickerRow({title:'Grenada',cid:84}); r[80]=Ti.UI.createPickerRow({title:'Guam',cid:103}); r[81]=Ti.UI.createPickerRow({title:'Guatemala',cid:100}); r[82]=Ti.UI.createPickerRow({title:'Guernsey',cid:87}); r[83]=Ti.UI.createPickerRow({title:'Guinea',cid:95}); r[84]=Ti.UI.createPickerRow({title:'Guinea-Bissau',cid:104}); r[85]=Ti.UI.createPickerRow({title:'Guyana',cid:105}); r[86]=Ti.UI.createPickerRow({title:'Haiti',cid:110}); r[87]=Ti.UI.createPickerRow({title:'Honduras',cid:108}); r[88]=Ti.UI.createPickerRow({title:'Hong Kong',cid:106}); r[89]=Ti.UI.createPickerRow({title:'Hungary',cid:111}); r[90]=Ti.UI.createPickerRow({title:'Iceland',cid:120}); r[91]=Ti.UI.createPickerRow({title:'India',cid:116}); r[92]=Ti.UI.createPickerRow({title:'Indonesia',cid:112}); r[93]=Ti.UI.createPickerRow({title:'Iran',cid:119}); r[94]=Ti.UI.createPickerRow({title:'Iraq',cid:118}); r[95]=Ti.UI.createPickerRow({title:'Ireland',cid:113}); r[96]=Ti.UI.createPickerRow({title:'Isle of Man',cid:115}); r[97]=Ti.UI.createPickerRow({title:'Israel',cid:114}); r[98]=Ti.UI.createPickerRow({title:'Italy',cid:123}); r[99]=Ti.UI.createPickerRow({title:'Jamaica',cid:125}); r[100]=Ti.UI.createPickerRow({title:'Japan',cid:127}); r[101]=Ti.UI.createPickerRow({title:'Jersey',cid:124}); r[102]=Ti.UI.createPickerRow({title:'Jordan',cid:126}); r[103]=Ti.UI.createPickerRow({title:'Kazakhstan',cid:140}); r[104]=Ti.UI.createPickerRow({title:'Kenya',cid:128}); r[105]=Ti.UI.createPickerRow({title:'Kiribati',cid:133}); r[106]=Ti.UI.createPickerRow({title:'Kuwait',cid:138}); r[107]=Ti.UI.createPickerRow({title:'Kyrgyzstan',cid:129}); r[108]=Ti.UI.createPickerRow({title:'Laos',cid:141}); r[109]=Ti.UI.createPickerRow({title:'Latvia',cid:150}); r[110]=Ti.UI.createPickerRow({title:'Lebanon',cid:142}); r[111]=Ti.UI.createPickerRow({title:'Lesotho',cid:147}); r[112]=Ti.UI.createPickerRow({title:'Liberia',cid:146}); r[113]=Ti.UI.createPickerRow({title:'Libya',cid:151}); r[114]=Ti.UI.createPickerRow({title:'Liechtenstein',cid:144}); r[115]=Ti.UI.createPickerRow({title:'Lithuania',cid:148}); r[116]=Ti.UI.createPickerRow({title:'Luxembourg',cid:149}); r[117]=Ti.UI.createPickerRow({title:'Macao',cid:165}); r[118]=Ti.UI.createPickerRow({title:'Macedonia',cid:161}); r[119]=Ti.UI.createPickerRow({title:'Madagascar',cid:159}); r[120]=Ti.UI.createPickerRow({title:'Malawi',cid:173}); r[121]=Ti.UI.createPickerRow({title:'Malaysia',cid:175}); r[122]=Ti.UI.createPickerRow({title:'Maldives',cid:172}); r[123]=Ti.UI.createPickerRow({title:'Mali',cid:162}); r[124]=Ti.UI.createPickerRow({title:'Malta',cid:170}); r[125]=Ti.UI.createPickerRow({title:'Mauritania',cid:168}); r[126]=Ti.UI.createPickerRow({title:'Mauritius',cid:171}); r[127]=Ti.UI.createPickerRow({title:'Mexico',cid:174}); r[128]=Ti.UI.createPickerRow({title:'Moldova',cid:156}); r[129]=Ti.UI.createPickerRow({title:'Monaco',cid:155}); r[130]=Ti.UI.createPickerRow({title:'Mongolia',cid:164}); r[131]=Ti.UI.createPickerRow({title:'Montenegro',cid:157}); r[132]=Ti.UI.createPickerRow({title:'Montserrat',cid:169}); r[133]=Ti.UI.createPickerRow({title:'Morocco',cid:153}); r[134]=Ti.UI.createPickerRow({title:'Mozambique',cid:176}); r[135]=Ti.UI.createPickerRow({title:'Myanmar',cid:163}); r[136]=Ti.UI.createPickerRow({title:'Namibia',cid:177}); r[137]=Ti.UI.createPickerRow({title:'Nauru',cid:186}); r[138]=Ti.UI.createPickerRow({title:'Nepal',cid:185}); r[139]=Ti.UI.createPickerRow({title:'Netherlands',cid:183}); r[140]=Ti.UI.createPickerRow({title:'New Caledonia',cid:178}); r[141]=Ti.UI.createPickerRow({title:'New Zealand',cid:188}); r[142]=Ti.UI.createPickerRow({title:'Nicaragua',cid:182}); r[143]=Ti.UI.createPickerRow({title:'Niger',cid:179}); r[144]=Ti.UI.createPickerRow({title:'Nigeria',cid:181}); r[145]=Ti.UI.createPickerRow({title:'Norfolk Island',cid:180}); r[146]=Ti.UI.createPickerRow({title:'North Korea',cid:136}); r[147]=Ti.UI.createPickerRow({title:'Northern Ireland',cid:31}); r[148]=Ti.UI.createPickerRow({title:'Norway',cid:184}); r[149]=Ti.UI.createPickerRow({title:'Oman',cid:189}); r[150]=Ti.UI.createPickerRow({title:'Pakistan',cid:195}); r[151]=Ti.UI.createPickerRow({title:'Palau',cid:202}); r[152]=Ti.UI.createPickerRow({title:'Palestinian Territory',cid:200}); r[153]=Ti.UI.createPickerRow({title:'Panama',cid:190}); r[154]=Ti.UI.createPickerRow({title:'Papua New Guinea',cid:193}); r[155]=Ti.UI.createPickerRow({title:'Paraguay',cid:203}); r[156]=Ti.UI.createPickerRow({title:'Peru',cid:191}); r[157]=Ti.UI.createPickerRow({title:'Philippines',cid:194}); r[158]=Ti.UI.createPickerRow({title:'Pitcairn Islands',cid:198}); r[159]=Ti.UI.createPickerRow({title:'Poland',cid:196}); r[160]=Ti.UI.createPickerRow({title:'Portugal',cid:201}); r[161]=Ti.UI.createPickerRow({title:'Puerto Rico',cid:199}); r[162]=Ti.UI.createPickerRow({title:'Qatar',cid:204}); r[163]=Ti.UI.createPickerRow({title:'Romania',cid:206}); r[164]=Ti.UI.createPickerRow({title:'Russia',cid:208}); r[165]=Ti.UI.createPickerRow({title:'Rwanda',cid:209}); r[166]=Ti.UI.createPickerRow({title:'Saint Helena',cid:216}); r[167]=Ti.UI.createPickerRow({title:'Saint Kitts and Nevis',cid:135}); r[168]=Ti.UI.createPickerRow({title:'Saint Lucia',cid:143}); r[169]=Ti.UI.createPickerRow({title:'Saint Martin',cid:158}); r[170]=Ti.UI.createPickerRow({title:'Saint Pierre and Miquelon',cid:197}); r[171]=Ti.UI.createPickerRow({title:'Samoa',cid:251}); r[172]=Ti.UI.createPickerRow({title:'San Marino',cid:221}); r[173]=Ti.UI.createPickerRow({title:'Sao Tome and Principe',cid:225}); r[174]=Ti.UI.createPickerRow({title:'Saudi Arabia',cid:210}); r[175]=Ti.UI.createPickerRow({title:'Scotland',cid:15}); r[176]=Ti.UI.createPickerRow({title:'Senegal',cid:222}); r[177]=Ti.UI.createPickerRow({title:'Serbia',cid:207}); r[178]=Ti.UI.createPickerRow({title:'Seychelles',cid:212}); r[179]=Ti.UI.createPickerRow({title:'Sierra Leone',cid:220}); r[180]=Ti.UI.createPickerRow({title:'Singapore',cid:215}); r[181]=Ti.UI.createPickerRow({title:'Slovakia',cid:219}); r[182]=Ti.UI.createPickerRow({title:'Slovenia',cid:217}); r[183]=Ti.UI.createPickerRow({title:'Solomon Islands',cid:211}); r[184]=Ti.UI.createPickerRow({title:'Somalia',cid:223}); r[185]=Ti.UI.createPickerRow({title:'South Africa',cid:253}); r[186]=Ti.UI.createPickerRow({title:'South Korea',cid:137}); r[187]=Ti.UI.createPickerRow({title:'Spain',cid:74}); r[188]=Ti.UI.createPickerRow({title:'Sri Lanka',cid:145}); r[189]=Ti.UI.createPickerRow({title:'Sudan',cid:213}); r[190]=Ti.UI.createPickerRow({title:'Suriname',cid:224}); r[191]=Ti.UI.createPickerRow({title:'Swaziland',cid:228}); r[192]=Ti.UI.createPickerRow({title:'Sweden',cid:214}); r[193]=Ti.UI.createPickerRow({title:'Switzerland',cid:48}); r[194]=Ti.UI.createPickerRow({title:'Syria',cid:227}); r[195]=Ti.UI.createPickerRow({title:'Taiwan',cid:241}); r[196]=Ti.UI.createPickerRow({title:'Tajikistan',cid:233}); r[197]=Ti.UI.createPickerRow({title:'Tanzania',cid:242}); r[198]=Ti.UI.createPickerRow({title:'Thailand',cid:232}); r[199]=Ti.UI.createPickerRow({title:'Togo',cid:231}); r[200]=Ti.UI.createPickerRow({title:'Tokelau',cid:234}); r[201]=Ti.UI.createPickerRow({title:'Tonga',cid:237}); r[202]=Ti.UI.createPickerRow({title:'Trinidad and Tobago',cid:239}); r[203]=Ti.UI.createPickerRow({title:'Tunisia',cid:236}); r[204]=Ti.UI.createPickerRow({title:'Turkey',cid:238}); r[205]=Ti.UI.createPickerRow({title:'Turkmenistan',cid:235}); r[206]=Ti.UI.createPickerRow({title:'Turks and Caicos Islands',cid:229}); r[207]=Ti.UI.createPickerRow({title:'Tuvalu',cid:240}); r[208]=Ti.UI.createPickerRow({title:'Uganda',cid:244}); r[209]=Ti.UI.createPickerRow({title:'Ukraine',cid:243}); r[210]=Ti.UI.createPickerRow({title:'United Arab Emirates',cid:2}); r[212]=Ti.UI.createPickerRow({title:'Uruguay',cid:246}); r[213]=Ti.UI.createPickerRow({title:'Uzbekistan',cid:247}); r[214]=Ti.UI.createPickerRow({title:'Vanuatu',cid:250}); r[215]=Ti.UI.createPickerRow({title:'Venezuela',cid:248}); r[216]=Ti.UI.createPickerRow({title:'VietNam',cid:249}); r[217]=Ti.UI.createPickerRow({title:'Wales',cid:18}); r[218]=Ti.UI.createPickerRow({title:'Western Sahara',cid:72}); r[219]=Ti.UI.createPickerRow({title:'Yemen',cid:252}); r[220]=Ti.UI.createPickerRow({title:'Zambia',cid:254}); r[221]=Ti.UI.createPickerRow({title:'Zimbabwe',cid:255});		
		
		cf.os({ iphone: function(){
					picker.setSelectedRow(0,1,true);
					picker.selectionIndicator = true;			
				}, 
				android:function(){
					picker.setSelectedRow(0,0);					
				}}); 

		picker.add(Ti.UI.createPickerRow({title:'United States',cid:245}));
		picker.add(Ti.UI.createPickerRow({title:'England',cid:14}));
		picker.add(Ti.UI.createPickerRow({title:'Canada',cid:43}));
		for (var ri=0;ri<r.length;ri++) { picker.add(r[ri]); }
		
		picker.addEventListener('change',function(e) { countryID = e.row.cid; });	
		
		var save = Ti.UI.createButton($c($jss.YellowBtn,$jss.SignUpCountrySave));
		save.addEventListener("click", function() { 
			cf.accounts.registerWithFacebook(win, fbToken, countryID,
	  			function(result) {
					//info('registerWithFacebook => result:'+result);
					if (result == true || result == 'true') {
						info('*** Registration success '+fbProfile.email); 
						cf.accounts.tryLoginToCfWithFacebook(fbProfile, function() { win.close(); });
					}
					else { alert('failed to register with facebook account, please restart app.'); }
				});		
		});	
		return cf.ui.Add(win, [title, whyCountry, picker, save]);;		
	}

	//-- Random generate 3 numbers for FB backdoor pass
	cf.accounts.getRandomThreeNumbers = function() {
    	return Math.floor(Math.random()*(999-1));
    };

})();