(function() {
	cf.ui.ConversationWindow = function(model, _args) {
		var win = cf.ui.Window(_args);
		
		var meName; //-- Set these when the conversation object comes back from the server
		var meAvatar;
		
		cf.ui.AddBackButton(win);

		//-- Add new message button now that we've go a hold of the model
		cf.ui.AddTitleButton(win, $jss.MessageButton,'right', function() { cf.ui.NewMessage(model.WithID, model.WithName, model.WithAvatar, win).open(); });
		
		var buildRowsFunction = function(data) {
		    var rows = [];
		    var messages = data.Messages.sort(lib.sort_by('Utc', true, parseInt));
		    meName = data.MeName; meAvatar = data.MeAvatar;
		    
		    for (var i = 0, l = messages.length; i < l; i++) {
		    	var name = meName;
		    	var avatar = meAvatar; 
		    	if (messages[i].SenderID == data.WithID) { name = data.WithName; avatar = data.WithAvatar; } 
		        var row = cf.ui.rows.MessageRow(messages[i], name, avatar);
		        if (i == 0) { row.header = 'Conversation with '+data.WithName; }
		        rows.push(row);
		    }	
		    
		    return rows;	
		}
		
		table = cf.ui.AddPullRefreshTable(win, function(data) { cf.v1.dataSvc.GetConversation(win, model.WithID, data); }, buildRowsFunction, null, function() { });	
		
		win.addEventListener('newMessageSent', function(msg) { cf.ui.ShowMessageOverlay(win, 220, 110, 2000, "Message sent."); table.insertRowBefore(0,cf.ui.rows.MessageRow(msg, meName, meAvatar)); });
				
	    return win;
	};
})();