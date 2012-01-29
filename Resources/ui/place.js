(function() {
	cf.ui.Place = function(id, geotype, _args) {
		var win = cf.ui.Window(_args);	
		cf.ui.AddBackButton(win);
		
		cf.GetPlace(win, id, geotype, function(place) { 	
			if (place.Type < 9) { alert('area'); }
			else { win.add(cf.ui.LocationView(place)); }
		});
		
		return win;	
	};
	
	cf.ui.LocationView = function(location) {
		var view = Ti.UI.createScrollView($jss.BellowTitleVerticalScrollView);
		view.dirty = false;	

		var loadIndooUI = function(loc) {
			cf.ui.Add(view, [
				Ti.UI.createLabel($c($jss.LocName, {text: loc.Name })),
				Ti.UI.createLabel($c($jss.LocIndoorAddress,{ text: loc.Address })) ]);

			if (loc.Avatar != '' || loc.Logo != '') 
			{
				var locImagesView = Ti.UI.createView($jss.LocImages);
				if (loc.Avatar != '') {
					var avatarIView = Ti.UI.createImageView($jss.LocAvatar);
					cf.TryUseCachedImage(avatarIView, cf.Stgs.ImagesRt+'/places/id/'+loc.Avatar);
					locImagesView.add(avatarIView);
				}
				if (loc.Logo != '') {
					var logoIView = Ti.UI.createImageView($jss.LocIndoorLogo);
					cf.TryUseCachedImage(logoIView, cf.Stgs.ImagesRt+'/places/id/'+loc.Logo);
					locImagesView.add(logoIView);
				}
				view.add(locImagesView);
			}
			
			if (loc.Lead || loc.TopRope || loc.Boulder)
			{
				view.add(Ti.UI.createLabel($c($jss.LocIndoorClimbTypesLabel, {text: 'Climbing available here' })));
				var climbTypeHolder = Ti.UI.createView($jss.LocIndoorClimbTypes);
				var climbTypesLeftPosition = 0;
				if (loc.Lead) { climbTypeHolder.add( Ti.UI.createImageView($c($jss.LocIndoorClimbTypeLead, {left:0})) ); 
								climbTypesLeftPosition+=$jss.LocIndoorClimbTypes.itemWidth; }
				if (loc.TopRope) { climbTypeHolder.add( Ti.UI.createImageView($c($jss.LocIndoorClimbTypeTopRope, {left:climbTypesLeftPosition})) ); 
								climbTypesLeftPosition+=$jss.LocIndoorClimbTypes.itemWidth; }	
			    if (loc.Boulder){ climbTypeHolder.add( Ti.UI.createImageView($c($jss.LocIndoorClimbTypeBoulder, {left:climbTypesLeftPosition})) ); }
				view.add(climbTypeHolder);
			}
		    
		    if (loc.Description != '')
		    {
				view.add(Ti.UI.createLabel($c($jss.LocDescriptionLabel, {text: 'Description' })));
				view.add(Ti.UI.createTextArea($c($jss.LocDescription, {value: loc.Description })));
			}  
		};
		
		var loadOutdoorUI = function(loc) {
			
			cf.ui.Add(view, [
				Ti.UI.createLabel($c($jss.LocName, {text: loc.Name })),
				Ti.UI.createLabel($c($jss.LocOutdoorCoordinates,{ text:  loc.Lat + ', ' + loc.Lon })) ]);
	
			if (loc.Avatar != '') 
			{
				var locImagesView = Ti.UI.createView($jss.LocImages);			
				var avatarIView = Ti.UI.createImageView($jss.LocAvatar);
				cf.TryUseCachedImage(avatarIView, cf.Stgs.ImagesRt+'/places/od/'+loc.Avatar);
				locImagesView.add(avatarIView);			
				view.add(locImagesView);
			}
		    
		    if (loc.Description != '')
		    {
				view.add(Ti.UI.createLabel($c($jss.LocDescriptionLabel, {text: 'Description' })));
				view.add(Ti.UI.createTextArea($c($jss.LocDescription, {value: loc.Description })));
			}  
		};
				
		//info(location);
		var isIndoor = (location.Address != null);
		if (isIndoor) { loadIndooUI(location);  }
		else { loadOutdoorUI(location); }				
				
		info('return loc detail');		
		return view;
	};
})();