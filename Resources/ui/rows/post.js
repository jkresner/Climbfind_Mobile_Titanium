(function() {
	
	cf.ui.rows.BuildProfilePostRows =  function(data) { 
		var rows = [];    
	    for (var i = 0, l = data.length; i < l; i++) {
	        var row = cf.ui.rows.PostRow(data[i], true, true);
	        rows.push(row);
	    }   
	    return rows;
	};

	cf.ui.rows.PostRow = function(item, includeSelect, groupedMode) {
	    //info(item);
	    
	    var row = Ti.UI.createTableViewRow($c($jss.RowAuto, {data: item}));
	    
	    if (item.ByPic != null) {
	    	var avatar = Ti.UI.createImageView($c($jss.RowAvatar, { image: cf.helpers.GetUserAvatarThumbUrl(item.ByPic) }));
	    	row.add(avatar);
	    }
	    
	    var body;
	    if (groupedMode) { body = Ti.UI.createView($jss.RowVerticalContentGrouped); }
	    else { body = Ti.UI.createView($jss.RowVerticalContent); }        
	    
	    /*var placeView = Ti.UI.createView($jss.FeedRowPlace);
	    cf.ui.Add(placeView, [ 
	    	//Ti.UI.createImageView($c($jssp.FeedRowPlaceFlag,{image: cf.helpers.GetCountryImage(245)})),
	   		Ti.UI.createLabel($c($jssp.FeedRowPlaceName,{text: item.PlaceName}))]);*/  

	    cf.ui.Add(body, [ Ti.UI.createLabel($c($jss.FeedRowName,{text: item.By })),
	    	Ti.UI.createLabel($c($jss.FeedRowUtc,{text:lib.toTimeElapsedSimple(parseInt(item.Utc))})),
	    	Ti.UI.createLabel($c($jss.FeedRowPlaceName,{text:item.PlaceName})),
	    	Ti.UI.createLabel($c($jss.FeedRowPostMeta,{text:item.Meta}))
		 ]);
	    	 
	    //-- e.g. no Comment on content add	 
	    //info(item.Comment);
	    if (item.Comment != '') { body.add(Ti.UI.createLabel($c($jss.FeedRowPostComment,{text:item.Comment}))); }	 
	    	
	    if (includeSelect && item.Comments.length > 0) { 
	    	var text = item.Comments.length + ' comment'; if (item.Comments.length > 1) { text+='s'; }
	    	body.add(Ti.UI.createLabel($c($jss.FeedRowCommentsLabel,{text: text})) ); }
	      
	    row.add(body);
	    if (includeSelect) { row.add(Ti.UI.createImageView($jss.RowArrow)); }  
	      
	    return row;
	};
	
		
	cf.ui.rows.PreparePostContent = function(item) {
		/*//ContentAdd { Meta } 
		if (item.Type == 101) { 
			var meta = 'Added '+item.Category+' '+item.Content;
			return Ti.UI.createLabel($c($jssp.FeedRowPostMeta,{text:meta})); }
		//Opinion { Rating, Meta, Comment }
		if (item.Type == 501) { 
			var meta = 'Thinks '+item.Score+' /5 about '+item.Name;
			var opinionContent = Ti.UI.createView($jssp.FeedPostContent);
			var metaView = Ti.UI.createView($jssp.FeedOpinionMeta);
			metaView.add(Ti.UI.createImageView($c($jspl.OpinionRowStars, {image: cf.helpers.GetStarImage(item.Score)})));
			metaView.add(Ti.UI.createLabel($c($jssp.FeedRowPostMeta,{text:meta})));
			return cf.ui.Add(opinionContent,[metaView, Ti.UI.createLabel($c($jssp.FeedRowPostComment,{text:item.Comment})) ]);
		}
		//MediaOpinion
		//if (item.Type == 511) {}
		//Visit { Meta, Comment, Media { Title, Thumb } , Climbs {  } }
		if (item.Type == 2111) { 
			var meta = 'Visited '+item.Place;
			var visitContent = Ti.UI.createView($jssp.FeedPostContent);
			cf.ui.Add(visitContent, [
				Ti.UI.createLabel($c($jssp.FeedRowPostMeta,{text:meta})),
				Ti.UI.createLabel($c($jssp.FeedRowPostComment,{text:item.Comment}))]);
			//if (item.Media.length > 0)
			//{
				//var metaView = Ti.UI.createView($jssp.FeedOpinionMeta);
			//}
			//if (item.Climbs.length > 0)
			//{
			//	for (var i = 0;i<item.Climbs.length;i++)
			//	{
					//var climbView = Ti.UI.createView($jssp.FeedVisitClimb);
					//climbView.add(Ti.UI.createImageView($c($jspl.SendRowOutcomeImage, { image: cf.helpers.GetClimbOutcomeImage(item) })));
					//climbView.add(Ti.UI.createImageView($c($jspl.SendRowExperienceImage, { image: cf.helpers.GetClimbExperienceImage(item) }));
					//climbView.add(Ti.UI.createImageView($c($jspl.SendRowExperienceImage, { image: cf.helpers.GetClimbExperienceImage(item) }));
			//	}		
			//}
			return visitContent;
		}*/
		//PartnerCall { Meta, Comment }
		if (item.Type == 3111) { 
			//info('building partner call row');
			//var meta = 'Called out to '+item.Content.Level + ' climbers up for climbing at ' + item.Place + ' ' + item.Content.Start;
			info(item.Meta);
			var pcContent = Ti.UI.createView($jss.FeedPostContent);
			return cf.ui.Add(pcContent, [
				Ti.UI.createLabel($c($jss.FeedRowPostMeta,{text:item.Meta})),
				Ti.UI.createLabel($c($jss.FeedRowPostComment,{text:item.Comment})) ]);
		}
		//Talk { Meta, Comment }
		/*if (item.Type == 4111) { 
			var talkContent = Ti.UI.createView($jssp.FeedPostContent);
			return cf.ui.Add(talkContent, [
				Ti.UI.createLabel($c($jssp.FeedRowPostMeta,{text:item.Meta})),
				Ti.UI.createLabel($c($jssp.FeedRowPostComment,{text:item.Comment})) ]);	
		}*/
		
		return Ti.UI.createView($jssp.FeedPostContent);
	};
	
})();