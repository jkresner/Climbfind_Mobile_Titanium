/*--------------------------------------------------------------------------*/
/*---- Handy GENERIC ultity functions picked up from other Ti projects -----*/
/*--------------------------------------------------------------------------*/
var lib = {};
(function() {
//
// returns true if iphone/ipad and version is 3.2+
//
lib.isIPhone3_2_Plus = function()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		var minor = parseInt(version[1],10);
		
		// can only test this support on a 3.2+ device
		if (major > 3 || (major == 3 && minor > 1))
		{
			return true;
		}
	}
	return false;
};

lib.isiOS4Plus = function()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		
		// can only test this support on a 3.2+ device
		if (major >= 4)
		{
			return true;
		}
	}
	return false;
};

//-- Check if an array contains a value

lib.contains = function(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
};

lib.sort_by = function(field, reverse, primer){

   reverse = (reverse) ? -1 : 1;

   return function(a,b){

       a = a[field];
       b = b[field];

       if (typeof(primer) != 'undefined'){
           a = primer(a);
           b = primer(b);
       }

       if (a<b) return reverse * -1;
       if (a>b) return reverse * 1;
       return 0;
   }
};

lib.currentDateFormatted = function(d)
{
	d = d || new Date();
    return d.toDateString() + ' ' + d.toLocaleTimeString();
};

lib.localDateFromEpoch = function(epochTime) { 
	var asInt = parseInt(epochTime)
	var asDate = new Date(asInt);
	var asString = asDate.toDateString();
	return asString;
}; 

lib.localDateTimeFromEpoch = function(epochTime) { 
    var asInt = parseInt(epochTime)
	var asDate = new Date(asInt);
	var asString = asDate.toLocaleTimeString() + ' ' + asDate.toDateString();	
	return asString;
}; 

lib.toTimeElapsedSimple = function(date) {
    if (!date) { return 'Unknown'; }
    if (!date.getTime) { date = new Date(date); }
    
    var ms = new Date().getTime() - date.getTime();
    var min = parseInt(ms / 60000);
    var hrs = 0;
    var days = 0;
    if (min > 60) {
        hrs = parseInt(min / 60);
        min = min % 60;
    }
    if (hrs > 24) {
        days = parseInt(hrs / 24);
		if (days == 1) { return '1 day ago'; }
		else { return days + ' days ago'; }
    }
    if (hrs < 1) { return min < 3 ? 'Just Now' : min + ' minutes ago'; }
    return hrs < 2 ? '1 hour ago' : hrs + ' hours ago';
};


/**
 * Define our HTML parser class. It takes in some text, and then you can call "linkifyURLs", or one of the other
 * methods, and then call "getHTML" to get the fully parsed text back as HTML!
 * @param text that you want parsed
 */
/*function HTMLParser(text) {

    var html = text;

    var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    var hashTagRegex = /#([^ ]+)/gi;
    var mentionRegex = /@([^ ]+)/gi;

    this.linkifyURLs = function() {
        html = html.replace(urlRegex, '<a href="$1">$1</a>');
    };
    this.linkifyHashTags = function() {
        html = html.replace(hashTagRegex, '<a href="http://twitter.com/#!/search?q=%23$1">#$1</a>');
    };
    this.linkifyMentions = function() {
        html = html.replace(mentionRegex, '<a href="http://twitter.com/#!/search?q=%40$1">@$1</a>');
    };

    this.getHTML = function() {
        return html;
    };
}*/

/*function parseISODate(input) {
    var year, months, days, hours, minutes, seconds, milliseconds;
    var iso = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
    var parts = input.match(iso);
    if (parts == null) {
        return null;
    }
    year = Number(parts[1]);
    if (typeof parts[2] != "undefined") {
        // Convert weeks to days, months 0 
        var weeks = Number(parts[2]) - 1;
        days = Number(parts[3]);
        if (typeof days == "undefined") {
            days = 0;
        }
        days += weeks * 7;
        months = 0;
    }
    else {
        if (typeof parts[4] != "undefined") {
            months = Number(parts[4]) - 1;
        }
        else {
            months = 0;
        }
        days = Number(parts[5]);
    }
    if (typeof parts[6] != "undefined" &&
            typeof parts[7] != "undefined") {
        hours = Number(parts[6]);
        minutes = Number(parts[7]);
        if (typeof parts[8] != "undefined") {
            seconds = Number(parts[8]);
            if (typeof parts[9] != "undefined") {
                milliseconds = Number(parts[9]) / 100;
            }
        }
    }
    if (typeof parts[10] != "undefined") {
        minutes = Number(minutes) + (parts[10] * 60 + (new Date().getTimezoneOffset()));
    }
    return new Date(year, months, days, hours, minutes, seconds);
}*/

})();
