(function() {
	cf.ui.HomeSelect = function(_args) {
		var win = cf.ui.Window(_args);

		//-- Add new message button now that we've go a hold of the model
		var sb = cf.ui.AddTitleButton(win, $jss.SearchButton,'right', function() { 
			table.visible = false;search.visible = true; db.visible = true; sb.visible = false;
			cf.ui.HomeSearchWindow(win, search);
			 });

		var db = cf.ui.AddTitleButton(win, $jss.DoneButton,'right', function() { 
			table.visible = true;search.visible = false; db.visible = false; sb.visible = true; });

		sb.visible=false; //-- we set this to false incase they are not logged in to stop it coming up		
		db.visible=false;
		
		var search = Ti.UI.createSearchBar($jss.SearchBar);
		search.visible = false;
		
		var buildRowsFunction = function(data) {
			sb.visible=true; //not actually part of build rows, but makes the search button visible 
			
			var sortedData = data.sort(lib.sort_by('Type', false, parseInt));
		    var typegroup = 0;
		    var rows = [];
		    for (var i = 0, l = sortedData.length; i < l; i++) {
		        var row = cf.ui.rows.PlaceRow(sortedData[i]);
		        if (i == 0) { row.header = 'Nearby places'; }
		        rows.push(row);
		    }   
		    return rows;
		};

		win.add(search);

		var table = cf.ui.AddPullRefreshTable(win, 
			 function(data) { cf.v1.dataSvc.GetGeoContext(win, data); }, 
			 buildRowsFunction, 
			 null,
			 function(e) { 
			 	var place = e.row.data;
			 	cf.app.setPlace(place);
			 	win.close();
			 	//info('MADE IT TO THE END OF CLICK');
		 	 });	
		
	    return win;
	};
	
	cf.ui.HomeSearchWindow = function(win, search, _args) {
		
		function getSearchResultRow(item)
		{
			var row = Ti.UI.createTableViewRow($c($jss.SearchResultRow, {data: item}));
		
		    cf.ui.Add(row, [Ti.UI.createImageView($c($jss.SearchResultRowFlag, {image: cf.Stgs.StaticRt+'/flags/'+item.Flag })),
		    	Ti.UI.createLabel($c($jss.SearchResultTitle, {text:item.Title })),
		    	Ti.UI.createLabel($c($jss.SearchResultDetails, {text:cf.Types[item.TypeID] })), 
		        Ti.UI.createImageView($jss.RowArrow) ]);
		
			return row;	
		}
		
		function getRowCollection(data) {
		    var sortedData = data.sort(lib.sort_by('TypeID', false, parseInt));
		    var typegroup = 0;
		    var rows = [];
		    for (var i = 0; i < sortedData.length; i++) {
		        if (sortedData[i].TypeID > 100 && sortedData[i].TypeID < 110) {} // don't include climbs - can't do partner calls
		        else
		        {
			        var row = getSearchResultRow(sortedData[i]);
			        if (typegroup != row.data.TypeID) { row.header = cf.Types[row.data.TypeID] +'s'; typegroup = row.data.TypeID; }
			        rows.push(row);
			    }
		    }   
		    return rows;
		}

		var table = Ti.UI.createTableView($c($jss.ClearTableView, $jss.SearchResultsTableView));
		
		table.addEventListener('click', function(e) {
			var geo = e.row.data;
			var geoTypeID = geo.TypeID;
			var id = geo.ID.replace(/-/g,'');
		    
		    cf.GetPlace(win, id, geoTypeID, function(place)
		    {
		    	cf.app.setPlace(place);
			 	win.close(); 
		    });					
		});
		
		var populateSearchResults = function(searchTerm) { cf.v1.searchSvc.Place(win, searchTerm, function (data) { table.setData(getRowCollection(data)); }); };	
		
		search.addEventListener('focus', function(e) { search.showCancel=true; table.data = []; });
		search.addEventListener('cancel', function(e) { table.data = []; search.blur(); });
		search.addEventListener('return', function(e) {
			if (e.value.length <= 2){ Ti.UI.createAlertDialog({ title:'Please Try Again', message: 'Please type at least 3 characters to submit your search' }).show(); }
			else{ 
				search.blur();
				populateSearchResults(e.value);
			}
		});
		
		cf.ui.Add(win, [search, table]);
	  };
})();