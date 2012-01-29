(function() {
	cf.ui.PostDetailOpen = function(parent, id, drillfuther, _args) {
		UrbanAirship.decrementAppBadge(); //-- incase we're opening this from a push notification
		
		cf.v1.dataSvc.GetPostWithComments(parent, id, function(post) { 				
			cf.ui.PostDetail(post, true).open();
		});
	};

	cf.ui.PostDetail = function(post, drillfuther, _args) {
		var win = cf.ui.Window(_args);
		
		cf.ui.AddBackButton(win);

		/*------------------------------------------------------------------------------------------------------------------------------------------*/

		var comment = Ti.UI.createButton($jss.PostDetailToolbarComment);
		var message = Ti.UI.createButton($jss.PostDetailToolbarMessage);
		comment.addEventListener('click', function() { cf.ui.PostComment(post, win).open(); } );
		message.addEventListener('click', function() { cf.ui.NewMessage(post.ByID, post.By, post.ByPic, win).open(); } );

		var toolbar;
		cf.os({ iphone: function() { toolbar = cf.ui.PostDetailiphoneToolbar(comment, message); },
		   		android: function() { toolbar = cf.ui.PostDetailandroidToolbar(comment, message); } 
		   });

		/*------------------------------------------------------------------------------------------------------------------------------------------*/

		win.addEventListener('newMessageSent', function(msg) { cf.ui.ShowMessageSent(win, post.By); });

		win.addEventListener('newCommentPosted', function(comment) {  
		    var row = cf.ui.rows.CommentRow(comment);
		    if (table.data.length == 1) { row.header = 'Comments'; }
		    table.appendRow(row);
    
		    //-- To do, work out scroll to bottom
		    //var len = table.data.length-1;
		    //table.scrollToIndex(len); 			
		});
		
		/*------------------------------------------------------------------------------------------------------------------------------------------*/

		var table = Ti.UI.createTableView($c($jss.PullTableView, { bottom:$jss.BottomToolbar.height }));    
		
		function getRowCollection(data) {
		    var rows = [];
		    var postRow = cf.ui.rows.PostRow(data, false);
			postRow.header = 'Post';
		    rows.push(postRow);
		    
		    if (drillfuther) //-- If from non-personal feed allow it to drill to the personal feed
		    {
			    postRow.addEventListener('click', function(e) { cf.ui.ProfileOpen(e.row.data.ByID).open(); });
			}
		
		    for (var i = 0; i < data.Comments.length; i++) {
		        var row = cf.ui.rows.CommentRow(data.Comments[i]);
		        if (i == 0) { row.header = 'Comments'; }
		        rows.push(row);
		    }      
		    
		    return rows;
		}
		
		table.setData(getRowCollection(post));

		/*------------------------------------------------------------------------------------------------------------------------------------------*/
		
	    return cf.ui.Add(win, [table, toolbar]);
	};
	
	cf.ui.PostDetailiphoneToolbar = function(comment, message) {	
		var flexSpace = Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
		var toolbar = Ti.UI.createToolbar($c($jss.BottomToolbar, { items: [flexSpace, comment, flexSpace, message, flexSpace] }));	
		return toolbar;
	};
	
	cf.ui.PostDetailandroidToolbar = function(comment, message) {	
		var toolbar = Ti.UI.createView($jss.BottomToolbar);
		return cf.ui.Add(toolbar, [comment, message]);
	};
})();