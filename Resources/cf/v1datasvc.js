(function() {
	cf.v1.dataSvc = {};

	/* Simple get functions */
	cf.v1.dataSvc.GetNearestLocations = function(win, callback) { execute(win, '/nearest-locations', callback, null, true); };
	cf.v1.dataSvc.GetGeoContext = function(win, callback) { execute(win, '/geo-context', callback, 'downloading...', true); };
	cf.v1.dataSvc.GetMe = function(win, callback) { execute(win, '/me', callback, null, false); };
	cf.v1.dataSvc.GetClimber = function(win, id, callback) { execute(win, '/climber/'+id, callback, 'downloading...', false); };
	
	cf.v1.dataSvc.GetCurrentClimbsOfLocation = function(win, id, callback) { execute(win, '/current-climbs/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetClimbsOfLocationAtCheckIn = function(win, id, callback) { execute(win, '/checkin-available-climbs/'+id, callback, 'downloading...', true); };
	cf.v1.dataSvc.GetClimb = function(win, id, callback) { execute(win, '/climb/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLocation = function(win, id, callback) { execute(win, '/location/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetArea = function(win, id, callback) { execute(win, '/get-area/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetAreaLite = function(win, id, callback) { execute(win, '/get-area-lite/'+id, callback, 'downloading...', false); };

	cf.v1.dataSvc.GetVisit = function(win, id, callback) { execute(win, '/get-visit/'+id, callback, 'updating...', false); };
	cf.v1.dataSvc.GetLoggedClimb = function(win, id, callback) { execute(win, '/get-logged-climb/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLatestSends = function(win, id, callback) { execute(win, '/get-latest-sends/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLatestUserSends = function(win, id, callback) { execute(win, '/get-latest-sends-by-user/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetMyLogsForClimb = function(win, id, callback) { execute(win, '/get-my-logs-for-climb/'+id, callback, 'downloading...', false); };
	
	cf.v1.dataSvc.GetMyHistory = function(win, callback) { execute(win, '/history/me', callback, 'downloading...', false); };
	cf.v1.dataSvc.GetHistory = function(win, id, callback) { execute(win, '/history/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetRecentVisitsAtLocation = function(win, id, callback) { execute(win, '/recent-visits/'+id, callback, 'downloading...', false); };

	cf.v1.dataSvc.GetMyPartnerCallSubscriptions = function(win, callback) { execute(win, '/get-subscriptions', callback, 'downloading...', false); };
	cf.v1.dataSvc.GetMyPartnerCalls = function(win, callback) { execute(win, '/my-partner-calls', callback, 'downloading...', false); };
	cf.v1.dataSvc.GetPlacesLatestPartnerCalls = function(win, id, callback) { execute(win, '/get-partner-calls/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetPlacesTodayPartnerCalls = function(win, id, callback) { execute(win, '/get-today-partner-calls/'+id, callback, 'downloading...', false); };

	cf.v1.dataSvc.GetMyConversations = function(win, callback) { execute(win, '/my-conversations', callback, 'downloading...', false); };
	cf.v1.dataSvc.GetConversation = function(win, id, callback) { execute(win, '/get-conversation/'+id, callback, 'downloading...', false); };
	
	cf.v1.dataSvc.GetGeoContextFeed = function(win, callback) { execute(win, '/feed/geocontext', callback, 'downloading...', true); };
	cf.v1.dataSvc.GetEverywhereFeed = function(win, callback) { execute(win, '/feed/everywhere', callback, 'downloading...', true); };
	cf.v1.dataSvc.GetPreferencesFeed = function(win, callback) { execute(win, '/feed/preference', callback, 'downloading...', true); };
	cf.v1.dataSvc.GetPlaceFeed = function(win, id, callback) { execute(win, '/feed/place/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetUserFeed = function(win, id, callback) { execute(win, '/feed/user/'+id, callback, null, false); };
	cf.v1.dataSvc.GetPostWithComments = function(win, id, callback) { execute(win, '/feed/post/'+id, callback, 'downloading...', false); };
	
	cf.v1.dataSvc.GetBestMedia = function(win, id, callback) { execute(win, '/best-media/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLatestMedia = function(win, id, callback) { execute(win, '/latest-media/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLatestOpinions = function(win, id, callback) { execute(win, '/latest-opinions/'+id, callback, 'downloading...', false); };
	cf.v1.dataSvc.GetLatestOpinionsByUser = function(win, id, callback) { execute(win, '/latest-opinions-by-user/'+id, callback, 'downloading...', false); };
	
	/* One line write functions */
	cf.v1.dataSvc.UpdateClimbGrade = function(win, id, grade, callback) { execute(win, '/update-climb-grade/'+id+'/'+grade, callback, ' saving ...', false); };
	cf.v1.dataSvc.UpdateCheckInComment = function(win, id, comment, callback) { execute(win, '/update-check-in/'+id+'?comment='+encodeComment(comment), callback, ' saving ...', false); };
	cf.v1.dataSvc.CheckOut = function(win, id, callback) { execute(win, '/check-out/'+id, callback, ' saving ...', false); };
	cf.v1.dataSvc.Talk = function(win, placeID, comment, callback) { execute(win, '/talk/'+placeID+'?comment='+encodeComment(comment), callback, ' saving ...', false); };
	cf.v1.dataSvc.Comment = function(win, postID, comment, callback) { execute(win, '/comment/'+postID+'?comment='+encodeComment(comment), callback, ' saving ...', false); };
	cf.v1.dataSvc.Message = function(win, toID, content, callback) { execute(win, '/message/'+toID+'?content='+encodeComment(content), callback, ' saving ...', false); };
	cf.v1.dataSvc.MessagePartnerCallReply = function(win, pcID, content, callback) { execute(win, '/message-partner-call-reply/'+pcID+'?content='+encodeComment(content), callback, ' saving ...', false); };
	cf.v1.dataSvc.LeaveOpinion = function(win, id, rating, comment, callback) { execute(win, '/leave-opinion/'+id+'/'+rating+'?comment='+encodeComment(comment), callback, ' saving ...', false); };
	cf.v1.dataSvc.DeleteLoggedClimb = function(win, id, callback) { execute(win, '/delete-logged-climb/'+id, callback, ' saving ...', false); };
	cf.v1.dataSvc.DeleteVisit = function(win, id, callback) { execute(win, '/delete-visit/'+id, callback, ' saving ...', false); };
		
	cf.v1.dataSvc.UpdateUserDeviceType = function(win, type, callback) { execute(win, '/update-user-device/'+type, callback, null, false); };	
		
	/* More complicated write functions */
	cf.v1.dataSvc.CheckIn = function(win, locationID, isPublic, getAlerts, comment, callback)
	{
		var isPrivate = 'n';
		if (isPublic == false) { isPrivate = 'y'; } 
		var alerts = 'y';
		if (getAlerts == false) { alerts = 'n'; } 
		
		var getUrl = '/check-in/'+locationID+'/'+isPrivate+'/'+alerts+'?comment='+encodeComment(comment)
	
	    execute(win, getUrl, callback, 'checking in ...', true);  
	};

	cf.v1.dataSvc.PartnerCall = function(win, locationID, startDate, startTime, preferredLevel, comment, callback)
	{
		var getUrl = '/new-partner-call/'+locationID+'/'+startDate+'/'+startTime+'/'+preferredLevel+'?comment='+encodeComment(comment)
	
	    execute(win, getUrl, callback, ' saving ...', true);  
	};

	
	cf.v1.dataSvc.LogClimb = function(win, checkInID, climbID, outcome, experience, gradeOpinion, rating, comment, callback)
	{	
	    var getUrl = '/log-climb/'+checkInID+'/'+climbID+'/'+outcome+'/'+experience+'/'+gradeOpinion+'/'+rating+'?comment='+encodeComment(comment)	
	    execute(win, getUrl, callback, ' saving ...', false);  
	};	
	
	cf.v1.dataSvc.LogClimbUpdate = function(win, checkInID, climbID, outcome, experience, gradeOpinion, rating, comment, callback)
	{	
	    var getUrl = '/log-climb-update/'+checkInID+'/'+climbID+'/'+outcome+'/'+experience+'/'+gradeOpinion+'/'+rating+'?comment='+encodeComment(comment)	
	    execute(win, getUrl, callback, ' saving ...', false);  
	};
	
	function encodeComment(comment) { return comment.replace(/&/g,"and"); } 	
	
	function execute(win, relativeUrl, callback, loadingMsg, includeGeo) { 
		cf.http.InvokeCfMobileSvcV1(win, cf.Stgs.MobileDataSvcV1Rt+relativeUrl, callback, loadingMsg, includeGeo); }
})();
