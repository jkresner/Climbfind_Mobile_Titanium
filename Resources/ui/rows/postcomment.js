(function() {

	//-- Comment on a post (on post detail screen)
	cf.ui.rows.CommentRow = function(item) {
	    var row = Ti.UI.createTableViewRow($c($jss.RowAuto, {data: item}));
	    var avatar = Ti.UI.createImageView($c($jss.RowAvatar, { image: cf.helpers.GetUserAvatarThumbUrl(item.ByPic) }));
	    var content = Ti.UI.createView($jss.RowVerticalContent);  
	      
	    cf.ui.Add(content, [Ti.UI.createLabel($c($jss.CommentRowName, {text: item.By })),
	    	Ti.UI.createLabel($c($jss.CommentRowUtc, { text: lib.toTimeElapsedSimple(parseInt(item.Utc)) })),
	    	Ti.UI.createLabel($c($jss.CommentRowComment, { text: item.Msg }))  ]);
	      
	    return cf.ui.Add(row, [avatar, content]);
	};	
	
})();