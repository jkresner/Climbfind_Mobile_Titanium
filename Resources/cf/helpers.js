(function() {
	cf.helpers = {};
	
	cf.helpers.GetStarImage = function(value)
	{
	    if (value <= 5 && value >= 0)
		{
			if (value <=0.25){ return  '/img/rating/zero.png'; } 
			else if (value >=0.26 && value <= 0.75) { return '/img/rating/half.png'; }
			else if (value >=0.76 && value <= 1.25) { return '/img/rating/one.png'; }
			else if (value >=1.26 && value <= 1.75) { return '/img/rating/onenhalf.png'; }
			else if (value >=1.76 && value <= 2.25) { return '/img/rating/two.png'; }
			else if (value >=2.26 && value <= 2.75) { return '/img/rating/twonhalf.png'; }
			else if (value >=2.76 && value <= 3.25) { return '/img/rating/three.png'; }
			else if (value >=3.26 && value <= 3.75) { return '/img/rating/threenhalf.png'; }
			else if (value >=3.76 && value <= 4.25) { return '/img/rating/four.png'; }
			else if (value >=4.26 && value <= 4.75) { return '/img/rating/fournhalf.png'; }
			else if (value >=4.76 && value <= 5.00) { return '/img/rating/five.png'; }
		}
		return null;
	}

	cf.helpers.GetCountryImage = function(value)
	{
	    if (value <= 255 && value >= 0)
		{
			return '/img/flags/'+cf.F[value]+'.png';  
		}
		return null;
	}
	
	//-- Resolve a location avatar image file to a fully qualified url using Climbfind conventions
	cf.helpers.GetPlaceAvatarUrl = function(p)
	{
		if (p && p.Avatar) {
	        var typeID = p.Type;
	        var avatarUrl = cf.Stgs.ImagesRt;
	        if (typeID >=2 && typeID < 10) { avatarUrl += '/places/ar/' + p.Avatar; } 
	        else if (typeID >=10 && typeID < 20) { avatarUrl += '/places/id/' + p.Avatar; } 
	        else if (typeID >=20 && typeID < 100) { avatarUrl += '/places/od/' + p.Avatar; }
	        return avatarUrl;
	    }
	    return '/img/outdoor.png';
	}
	
	cf.helpers.GetLocationAvatarThumbUrl = function(loc){ if (loc && loc.Avatar) { return cf.Stgs.ImagesRt + '/media/tm/' + loc.Avatar; } return '/img/outdoor.png'; }
	cf.helpers.GetClimbAvatarUrl = function(climb) { if (climb && climb.Avatar) { return cf.Stgs.ImagesRt + '/places/cl/' + climb.Avatar; } return null; }
	cf.helpers.GetClimbAvatarThumbUrl = function(climb) { if (climb && climb.Avatar) { return cf.Stgs.ImagesRt + '/media/tm/' + climb.Avatar; } return '/img/outdoor.png'; }
	cf.helpers.GetUserAvatarThumbUrl = function(imageFile) { if (imageFile) { return cf.Stgs.ImagesRt + '/users/mainTm/' + imageFile; } return null; }
	cf.helpers.GetClimbOutcomeImage = function(loggedClimb) { if (loggedClimb) { return '/img/climbed/' + cf.Outcome[loggedClimb.Outcome] + '.png'; } return null; }
    cf.helpers.GetClimbExperienceImage = function(loggedClimb) { if (loggedClimb) { return '/img/climbed/' + cf.Experience[loggedClimb.Experience] + '.png'; } return null; }

})();