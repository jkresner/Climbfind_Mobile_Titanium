(function() {
	
//LocationResultsDto { ID, Type, Description, Name, NameShort, Latitude, Longitude, Avatar, Distance }
	cf.ui.rows.PlaceRow = function (item) {
	    var row = Ti.UI.createTableViewRow($c($jss.Row60,{data: item}));
	    
		//-- Adding a bottom:6 to a row avatar makes that avatar vertically centered instead if top alighed	    
	    var avatar = Ti.UI.createImageView($c($jss.RowAvatar,{bottom:6}));
	    cf.TryUseCachedImage(avatar, cf.helpers.GetLocationAvatarThumbUrl(item));	    

	    var detailText = cf.Types[item.Type];
	    if (item.Distance != 0)
	    {
		    var kmDistance = item.Distance/1000;
		    var miDistance = kmDistance*0.621;
		    var kmText = Math.round(kmDistance*10)/10; //-- Round up to 1 decimal place
		    var miText = Math.round(miDistance*10)/10;	
		    detailText += ' ('+kmText+'km / '+miText+' miles)'; 
	    }

	    cf.ui.Add(row, [avatar, 
	    	Ti.UI.createLabel($c($jss.RowName,{text: item.Name})),
	    	Ti.UI.createLabel($c($jss.RowDetails,{text:detailText})),
	    	Ti.UI.createImageView($jss.RowArrow) ]);  
	
	    //-- If it's been rated show the stars    
	    if (item.RatingCount > 0) { row.add(Ti.UI.createImageView($c($jss.RowStars,{ image: cf.helpers.GetStarImage(item.Rating) }))); }
	    
	    return row;
	};	
    
})();