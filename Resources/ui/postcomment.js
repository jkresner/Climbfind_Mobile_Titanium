(function() {
	cf.ui.PostComment = function(post, parent, _args) {
		var win = cf.ui.Window(_args);
		
		var bb = cf.ui.AddBackButton(win);		
		var db = cf.ui.AddTitleButton(win, $c($jss.DoneButton,{visible:false}), 'right', function(){ msgTextArea.blur();  });

		var iView = Ti.UI.createImageView($jss.CommentNewAvatar);
		cf.TryUseCachedImage(iView, cf.helpers.GetUserAvatarThumbUrl(post.ByPic));
		
		cf.ui.Add(win, [iView,
		  Ti.UI.createLabel($c($jss.CommentNewHeadingLabel, { text: 'Comment publicly on' })),
		  Ti.UI.createLabel($c($jss.CommentNewDisplayName, { text: post.By +"'s post" })), 
		  msgTextArea = Ti.UI.createTextArea($jss.CommentNewTextArea),
		  button = Ti.UI.createButton($c($c($jss.CommentNewButton, $jss.YellowBtn), {title: 'Submit' }) )
		]); 
		
		msgTextArea.addEventListener('focus', function() { db.visible = true; bb.visible = false; });
		msgTextArea.addEventListener('blur', function(){ db.visible = false; bb.visible = true; });
		
		button.addEventListener('click', function(){
			cf.v1.dataSvc.Comment(win, post.ID, msgTextArea.value,
				function(result) {			
					win.close();			
					if (parent != null) { parent.fireEvent('newCommentPosted', result); }
				});
		});
		
	    return win;
	};
})();