(function() {
	cf.ui.places.AreaWindow = function(areaID, _args) {
		var win = cf.ui.Window(_args);
		cf.ui.AddBackButton(win);

		var buildRowsFunction = function(data) {
		    var rows = [];
		
			//--- Build the top "Area row"
			var areaRow = Ti.UI.createTableViewRow($c($jss.Row60,{slug: data.SlugUrl}));
		    var avatar = Ti.UI.createImageView($jss.RowAvatar);
		    cf.TryUseCachedImage(avatar, cf.Stgs.ImagesRt+'/places/ar/'+data.Avatar);

		   	cf.ui.Add(areaRow, [avatar, 
		    	Ti.UI.createLabel($c($jss.RowName,{text: data.Name})),
		    	Ti.UI.createLabel($c($jss.RowDetails,{text:cf.Types[data.Type]})),
		    	Ti.UI.createImageView($jss.RowArrow) ]);   
		 
		    //-- If it's been rated show the stars    
		    if (data.RatingCount > 0) { areaRow.add(Ti.UI.createImageView($c($jss.RowStars,{ image: cf.helpers.GetStarImage(data.Rating) }))); }	    
			areaRow.header = 'Area details';
			rows.push(areaRow);
		
			//-- Add the rest of the location rows
		    var sortedData = data.Locations.sort(lib.sort_by('Type', false, parseInt));
		    var typegroup = 0;
		    for (var i = 0, l = sortedData.length; i < l; i++) {
		        var row = cf.ui.rows.GetPlaceRow(sortedData[i]);
		        if (typegroup != row.data.Type) { row.header = cf.Types[row.data.Type] +'s'; typegroup = row.data.Type; }
		        rows.push(row);
		    }   
		    return rows;
		};

		var loadAreaUI = function(area)
		{	
			var table = Ti.UI.createTableView($jss.PullTableView);
		    table.setData(buildRowsFunction(area));
		    win.add(table);
		    
		    table.addEventListener('click', function (e) { 
		   		if (e.row.slug == null) { 
		   			var geoType = e.row.data.Type;
		   			if (geoType >=3 && geoType <= 8) { cf.ui.places.AreaWindow(e.row.data.ID).open(); } 
					else { cf.ui.places.Location(win, e.row.data.ID, 0, null).open(); } 	
				}
		    	else { //-- If it's the area row, take them to the cf website
		    		var a = cf.ui.Alert('Open on climbfind.com', 'Open full details of '+area.Name+' on climbfind.com?', ['Yes please','No thanks']);
		    	    a.addEventListener('click', function(clicked) { if (clicked.index == 0) { cf.ui.OpenClimbfindWebsite(e.row.slug); } });
		    	}
		    });
		};
		
		cf.v1.dataSvc.GetArea(win, areaID, loadAreaUI);  

	    return win;
	};
})();