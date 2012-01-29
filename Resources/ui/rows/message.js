(function() {
	
	//-- List conversations
	cf.ui.rows.BuildConversationRows = function (data) {
	    var converstions = data.Conversations;
	    var rows = [];
	    for (var i = 0; i < converstions.length; i++) {
	        var row = cf.ui.rows.ConversationRow (converstions[i]);
	        if (i == 0) { row.header = 'Most recent conversations'; }
	        rows.push(row);
	    }	
	    return rows;
	}
	
	//ConversationDto { ID, WithName, WithAvatar, WithID, LastSenderID, LastUtc, LastExcerpt }
	cf.ui.rows.ConversationRow = function(item) {
	    var row = Ti.UI.createTableViewRow($c($jss.RowAuto, {data: item}));	    
		var avatar = Ti.UI.createImageView($c($jss.RowAvatar));
	    cf.TryUseCachedImage(avatar, cf.helpers.GetUserAvatarThumbUrl(item.WithAvatar));
	    var content = Ti.UI.createView($jss.RowVerticalContent); 
	    
	    var whoText = 'You'; if (item.WithID == item.LastSenderID) { whoText = "They"; }
	    cf.ui.Add(content, [Ti.UI.createLabel($c($jss.ConversationRowName, {text: item.WithName })),
	    	Ti.UI.createLabel($c($jss.ConversationRowDetails, { text: whoText + ' said ' + lib.toTimeElapsedSimple(parseInt(item.LastUtc)) })),
	    	Ti.UI.createLabel($c($jss.ConversationRowExcerpt, {text: item.LastExcerpt })) ]);
	    
	    return cf.ui.Add(row, [avatar, content, Ti.UI.createImageView($jss.RowArrow)]);        
	};
    
	cf.ui.rows.MessageRow = function(item, name, withavatar) 
	{    
		var row = Ti.UI.createTableViewRow($c($jss.RowAuto, {model: item}));	    
		var avatar = Ti.UI.createImageView($c($jss.RowAvatar));
	    cf.TryUseCachedImage(avatar, cf.helpers.GetUserAvatarThumbUrl(withavatar));
	    var content = Ti.UI.createView($jss.RowVerticalContent); 

	    cf.ui.Add(content, [Ti.UI.createLabel($c($jss.ConversationRowName, {text: name })),
	    	Ti.UI.createLabel($c($jss.ConversationRowDetails, { text: lib.toTimeElapsedSimple(parseInt(item.Utc)) })),
	    	Ti.UI.createLabel($c($jss.ConversationRowExcerpt, {text: item.Content })) ]);

	    return cf.ui.Add(row, [avatar, content]);
	};	
    
})();