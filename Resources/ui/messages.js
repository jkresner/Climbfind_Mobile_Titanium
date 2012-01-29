(function() {
	cf.ui.Messages = function(win, _args) {
		UrbanAirship.decrementAppBadge(); //-- incase we're opening this from a push notification

		var noRowsFunction = function() { cf.ui.ShowPersistentMessageOverlay(view, 300, 180, "No conversations\nYou haven't started any conversations yet... \n\nWhen you message another climber it will appear here."); };

		var view = cf.ui.TabsViewWithTable(win, cf.app.Me, 
/*noRows*/  	noRowsFunction,
/*buildRows*/	cf.ui.rows.BuildConversationRows,
/*dataFn*/  function(callback) { cf.v1.dataSvc.GetMyConversations(view, callback); },			
/*clickFn*/ function(e) { cf.ui.ConversationWindow(e.row.data).open(); }, 
/*opsBtn*/	null);		

		info('Messages returned');
	    return view;
	};
	
	cf.ui.ShowMessageSent = function(win, toName)
	{
		cf.ui.ShowMessageOverlay(win, 240, 160, 5500, 'Message sent.\n\nYou can view your full anytime conversation with '+toName+' by visiting the "Inbox" tab.');	
	};
	
	//-- For recieving push notification event
	cf.ui.MessagesWindow = function(_args) {
		var win = cf.ui.Window(_args);
		cf.ui.AddBackButton(win);
		
		var view = cf.ui.Messages(win);
		view.top = $jss.TitleBar.height;
		win.add(view);
		view.fireEvent('visible');
		
		info('Messages window');
	    return win;
	};	
		
})();