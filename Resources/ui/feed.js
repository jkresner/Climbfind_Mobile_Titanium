(function() {
	cf.ui.HomeFeed = function(win, _args) {
		var placeName = cf.app.Place.NameShort;
		if (placeName == '') { placeName = cf.app.Place.Name; }
		
		var view = cf.ui.TabsViewWithTable(win, cf.app.Place, 
/*noRows*/  	function() { cf.ui.ShowPersistentMessageOverlay(view, 290, 160, 'Empty feed\n\nNo activity at '+ cf.app.Place.Name+' yet... Check in, log some climbs or leave your opinion to start the buzz around here!'); },
/*buildRows*/	function(data) { var rows = [];
				    for (var i = 0, l = data.length; i < l; i++) {
				        var row = cf.ui.rows.PostRow(data[i], true, false);
				        if (i == 0) { row.header = 'Activity @ '+ placeName; }
				        rows.push(row);
				    }   
				    return rows;
				},
/*dataFn*/  function(callback) { cf.v1.dataSvc.GetPlaceFeed(view, cf.app.Place.ID, callback); },			
/*clickFn*/ function(e) { cf.ui.PostDetail(e.row.data, true).open(); }, 
/*opsBtn*/	null);

		info('return home feed tab');
		return view; 
	};	
})();