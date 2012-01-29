
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[\-+]\d{4})?)\b/g,
		timezoneClip = /[^\-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) {
				val = "0" + val; 
			};
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date();
		if (isNaN(date)) { 
			throw SyntaxError("invalid date");
		};

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


/* Ripped from http://blog.stevenlevithan.com/archives/date-time-format

	Steven did an awesome job back in 2007 with this javascript library, the great 
	thing is that its 100% portable to Titanium codebases!  Sorry though bud, I had to 
	add in some revisions to squelch javascript compiler errors.  It's ok for frameworks like
	jQuery, Dojo, etc, but Titanium's compiler has to be more picky to prevent code compilation 
	to native contexts. */
(function() {

	cf.ui.pickerStartTime = "";
	cf.ui.pickerEndTime = "";
    
    cf.ui.createDatePickerWin = function (minDate, maxDate, selectedDate, pickerParent) {
	/* Create a place holder variable that influences the selection logic as well as 
	holds the selections for later */
	var startOrEnd = "start";
	var timeValue;
	var dateSelectWin = cf.ui.Window(null);
	var backButton = cf.ui.AddBackButton(dateSelectWin);

	var picker = Ti.UI.createPicker({ bottom:60, type:Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate:minDate, maxDate:maxDate, value:selectedDate, minuteInterval: 15 });
	
	picker.selectionIndicator = true;
	
	/* Creating the objects for the top of the window that allow for start and end selections 
	I call these buttons because they're behaving like buttons with a highlight color, but in all actuality
	they're simply labels.  Also, we're going to set the buttonStart as *selected* off the bat.  */
	var buttonStart = Ti.UI.createLabel({ top:50, width:310, height:40, color:"#fff",
		backgroundGradient:{ type:'linear', colors:['#000000','#f8ba2f'] }, font: {fontSize:14}, borderRadius:5 });
	
	var buttonEnd = Ti.UI.createLabel({ top:95, width:310, height:40, color:"#000",
		backgroundColor:"#fff", font: {fontSize:14}, borderRadius:5 });
	
	var buttonAllDay = Ti.UI.createLabel({ top:135, width:310, height:40, color:"#000",
		backgroundColor:"#fff", font: {fontSize:14}, borderRadius:5 });
	
	/* My not-so-good attempt at creating the flat borders in the middle and rounded top and bottom edges */
	var nonRoundedCover = Ti.UI.createLabel({ backgroundColor:"#fff", width:310, height:80, top:65 });
	
	/* Objects to add to the labels created a few lines ago. */
	var lblStarts = Ti.UI.createLabel({ font: { fontFamily:"Helvetica Neue", fontSize:14, fontWeight:'bold' },
		text: "Start", color:"#fff", left:10, top:0 });
	
	var lblStartTime = Ti.UI.createLabel({ font: { fontFamily:"Helvetica Neue", fontSize:14 },
		text: cf.ui.pickerStartTime, color:"#fff", right:0, top:0, width:200 });
	
	var lblEnd = Ti.UI.createLabel({ font: { fontFamily:"Helvetica Neue", fontSize:14, fontWeight:'bold' },
		text: "End", left:10, top:0 });
	
	var lblEndTime = Ti.UI.createLabel({ font: { fontFamily:"Helvetica Neue", fontSize:14 }, 
		text: cf.ui.pickerEndTime, right:0, top:0,	width:200 });
	
	var lblAllDay = Ti.UI.createLabel({ text:"* End is optional", font: { fontFamily:"Helvetica Neue", fontSize:12 }, left:10, top:0 });
	
	/* This switch basically swaps functionality between all day events, and events
	with specific start and end times. */
	//var allDaySwitch = Ti.UI.createSwitch({ value:false, right:20, top:147 });
	
	var doneButton = Ti.UI.createButton($c($jss.YellowBtn,{ bottom:10, width:300, height:40, title:'Done' }));
	
	/* TRIGGERS */
	/*allDaySwitch.addEventListener('change', function(e) {
		if (e.value == 1) { picker.type = Ti.UI.PICKER_TYPE_DATE; } else if (e.value == 0) {
			picker.type = Ti.UI.PICKER_TYPE_DATE_AND_TIME; }
	});*/
	
	doneButton.addEventListener("click", function() {
		/* Sets the lblTimes object from the outer window scope to our selected startTime and endTime combination */
		pickerParent.lblTimes.text = cf.ui.pickerStartTime + "\n" + cf.ui.pickerEndTime;
		dateSelectWin.close();
	});
	
	picker.addEventListener("change", function(e) {
		timeValue = new Date(e.value);
		/* Implementation of the dateFormat library I included 
		Formats the date/time based on whether the event is an all day event or has specific
		start and end times*/
		var timeFormatted;
		//if (allDaySwitch.value == 0) { 
			timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy hh:MM TT"); //} 
		//else { timeFormatted = dateFormat(timeValue, "ddd mmm dd yyyy"); //};
		
		/* If all day is selected, start times start at 12:00 AM and by default set the end time to 
		the same day, but at 11:59 PM.  If the end date is selected, it just changes that date and leaves
		the start alone. */
		if (startOrEnd == 'start') {
			/*if (allDaySwitch.value == 1) {
				lblEndTime.text = timeFormatted + " 11:59 PM";
				cf.ui.pickerEndTime = timeFormatted + " 11:59 PM";
				timeFormatted += " 12:00 AM";
			};*/
			lblStartTime.text = timeFormatted;
			cf.ui.pickerStartTime = timeFormatted;
		} else if (startOrEnd == "end") {
			/*if (allDaySwitch.value == 1) {
				timeFormatted += " 11:59 PM";
			}*/
			lblEndTime.text = timeFormatted;
			cf.ui.pickerEndTime = timeFormatted;
		};
	});
	
	/* These next two event listeners basically act as faux-button functionality.
	Since the Objects are label constructs, I want them to look like selected buttons 
	The gradients can be changed, I just thought they were pretty */
	buttonEnd.addEventListener('click', function() {
		startOrEnd = 'end';
		buttonStart.backgroundGradient = {type:'linear', colors:["#fff", '#fff']};
		lblStarts.color = "#000";
		lblStartTime.color = "#000";
		buttonEnd.backgroundGradient = { type:'linear', colors:['#000000','#f8ba2f'] };
		lblEnd.color = "#fff";
		lblEndTime.color = "#fff";
	});
	
	buttonStart.addEventListener('click', function() {
		startOrEnd = 'start';
		buttonStart.backgroundGradient = { type:'linear', colors:['#000000','#f8ba2f'] };
		lblStarts.color = "#fff";
		lblStartTime.color = "#fff";
		buttonEnd.backgroundGradient = {type:'linear', color:["#fff"]};
		lblEnd.color = "#000";
		lblEndTime.color = "#000";
	});
	
	/* In the end, add everything to objects and to the window (stage) */
	buttonStart.add(lblStarts);
	buttonStart.add(lblStartTime);
	buttonEnd.add(lblEnd);
	buttonEnd.add(lblEndTime);
	buttonAllDay.add(lblAllDay);
	dateSelectWin.add(nonRoundedCover);
	dateSelectWin.add(buttonStart);
	dateSelectWin.add(buttonEnd);
	dateSelectWin.add(buttonAllDay);
	//dateSelectWin.add(allDaySwitch);
	dateSelectWin.add(picker);
	dateSelectWin.add(doneButton);
	
	/* Open the window with an animation, these can be swapped out easy as well */
	dateSelectWin.open({modal:true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
	
	picker.fireEvent("change", {value:selectedDate});
};
})();