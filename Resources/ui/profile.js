(function() {
	
	//-- Open a profile in a fresh window
	cf.ui.ProfileOpen = function(id, _args) {		
		var win = cf.ui.Window(_args);	
		cf.ui.AddBackButton(win);
		
		cf.v1.dataSvc.GetClimber(win, id, function(profile) { 	
			var view = cf.ui.ProfileView(win, profile, _args);
			view.top = $jss.TitleBar.height; 
			win.add(view);
		});
		
		return win;		
	};
	
	//-- Create the view / guts of the profile
	//-- Pass parent in so we can attach a listener if sending a message
	cf.ui.ProfileView = function(parent, profile, _args) {

		var headerView = Ti.UI.createView($jss.ProfileHeader);			
		headerView.add(Ti.UI.createLabel($c($jss.ProfileName, {text: profile.DisplayName })));
		headerView.add(Ti.UI.createImageView($c($jss.ProfileCountryImage, { image: cf.helpers.GetCountryImage(profile.CountryID) })));
		
		if (profile.Avatar != '') //-- Add a pic if we have one
		{
			var avatarIView = Ti.UI.createImageView($jss.ProfileAvatar);
			cf.TryUseCachedImage(avatarIView, cf.Stgs.ImagesRt+'/users/main240/'+profile.Avatar);
			headerView.add(avatarIView);
		}	
		
		if (cf.app.Me.ID != profile.ID) //-- Add message button if we're not looking at ourselves
		{
			var message = Ti.UI.createButton($c($jss.ProfileMessage, $jss.YellowBtn));
			message.title = "Message " + profile.DisplayName;
			message.addEventListener('click', function() { cf.ui.NewMessage(profile.ID, profile.DisplayName, profile.Avatar, parent).open(); } );
			parent.addEventListener('newMessageSent', function(msg) { cf.ui.ShowMessageSent(parent, profile.DisplayName); });
			headerView.add(message);
		}

		var table = Titanium.UI.createTableView($jss.ProfileTable);		
		table.section = Ti.UI.createTableViewSection();
    	table.section.headerView = headerView;		
		table.addEventListener('click', function(e) {
			if (e.row.isheader == null) {  //-- [if check] because of stupid android FUCKER
				cf.ui.PostDetail(e.row.data, true).open(); }
		});	
		table.setData([table.section]);
		
		//-- Stupid android doesn't do custom header view (Titanium sucks) so we hack it with a row
		cf.os({ android: function() { 
			var headerRow = Ti.UI.createTableViewRow({backgroundColor:'transparent', isheader: true});
			headerRow.add(headerView);
			table.section.add(headerRow);	 
		}});
		
		//-- Add users activity feed
		cf.v1.dataSvc.GetUserFeed(parent, profile.ID, function(data) { 
			var rows = cf.ui.rows.BuildProfilePostRows(data);
			for (i=0;i<rows.length;i++) { table.section.add(rows[i]); }			
					
			table.data = [];
			table.setData([table.section]);	
		});
		
		return table;
	};
		
})();