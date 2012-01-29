(function() {
	
	//-- View to hold our partner call form
	cf.ui.NewCall = function(win, _args) {
		var view = Ti.UI.createView($c($jss.Stretch, $jss.NewScrollView));
		view.dirty = false;	
	
		win.db = cf.ui.AddTitleButton(win, $c($jss.DoneButton,{visible:false}), 'right', function(){ commentTextArea.blur(); });
		
		var iView = Ti.UI.createImageView($jss.NewAvatar);
		cf.TryUseCachedImage(iView, cf.helpers.GetPlaceAvatarUrl(cf.app.Place));
		
		//-- DatePicker view specific to OS
		view.eventDate = cf.ui.NewCallEventDateView();
				
		cf.ui.Add(view, [ iView,
	          Ti.UI.createLabel($c($jss.NewLocName,{text: cf.app.Place.Name })), 
	          commentlbl = Ti.UI.createLabel($c($jss.NewCommentLabel, { text: 'Comment / call out details' })), 	          
	          commentTextArea = Ti.UI.createTextArea($jss.NewComment),
	          eventdatelbl = Ti.UI.createLabel($c($jss.NewDatesLabel, { text: 'When do you want to climb?' })),
	          view.eventDate,
	          successlbl = Ti.UI.createLabel($c($jss.NewSuccessLabel, { text: 'Your PartnerCall was posted successfully!', visible: false })),
	          submitButton = Ti.UI.createButton($c($jss.NewButton, $jss.YellowBtn)) ])

		//-- make sure we can type in a comment when the keyboard slides up		
		var focusHeight = 188;
		cf.os({ android: function() { focusHeight = $Y(158); } });	
		cf.ui.AttachFocusSlide(commentTextArea, 5, focusHeight, 
			function() { win.db.visible = true; win.hb.visible = false; }, 
			function() { win.db.visible = false; win.hb.visible = true; }); 		

		//-- Submit our partner call first checking some validation and then setting 'success state'
		submitButton.addEventListener('click', function() {
			if (commentTextArea.value == null || commentTextArea.value == '') { alert('Please leave a comment for your partner call.'); }
			else if (view.eventDate.lblTimes.text == null || view.eventDate.lblTimes.text == '') { alert('Please select at least a start date/time for your call.'); }
			else
			{
				submitButton.visible = false; //-- stop call being posted twice
				
				var startDateTime = view.eventDate.lblTimes.text.split('\n')[0].replace(/ /g,'').replace(/:/g,'');
				var endDateTime = view.eventDate.lblTimes.text.split('\n')[1];
				var preferredLevel = 9; //-- 9:Any, 19:Beginner, 29:Intermediate, 39:Advanced
				
				if (endDateTime == null || endDateTime == '') { endDateTime = 'default'; }
				else { endDateTime = endDateTime.replace(/ /g,'').replace(/:/g,''); }
				
				cf.v1.dataSvc.PartnerCall(view, cf.app.Place.ID, startDateTime, endDateTime, preferredLevel, commentTextArea.value,
					function(result) {		
						commentlbl.visible = false;
						commentTextArea.visible = false;
						eventdatelbl.visible = false;
						view.remove(view.eventDate); //-- remove date picker, well add a fresh one when we re-render
						view.eventDate = null; 
						successlbl.visible = true;
						Ti.App.fireEvent('app:partnerCallSuccess'); 	
				});
			}
		});
				
		//-- reshow partner call form			
		view.addEventListener("visible", function() { 
			if (view.dirty) { 
				commentlbl.visible = true;
				commentTextArea.visible = true;
				commentTextArea.value = '';
				eventdatelbl.visible = true;
				view.eventDate = cf.ui.NewCallEventDateView();
				view.add(view.eventDate);
				submitButton.visible = true;
				successlbl.visible = false;
			}			
		});			
					
		info('return partner calls new');		
		return view;
	};
	
	cf.ui.NewCallEventDateView = function()
	{
	    var view;
	    var min = new Date();
		var max = new Date(new Date().getTime() + 10 * 1000 * 60 * 60 * 24 * 7); //10 weeks away
		var selected = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); //tomorrow
		selected.setHours(12);
		selected.setMinutes(0);

	    cf.os({ iphone: function() { view = cf.ui.NewCallIphoneEventDateView(min, max, selected); }, 
	    	   android: function() { view = cf.ui.NewCallAndroidEventDateView(min, max, selected); } });
	    	   
	    return view;	    
	};

	//-- Use combo Date & Time spinner with some trickery appended 'date' & 'time' variables (only start date)
	cf.ui.NewCallAndroidEventDateView = function(min, max, selected) {
		updateDateTime = function()
		{
			dateTime.lblTimes.text = dateFormat( dateTime.lblTimes.date, "ddd mmm dd yyyy") + " ";
			dateTime.lblTimes.text += dateFormat( dateTime.lblTimes.time, "hh:MM TT");
			info("dateTime.lblTimes.text ============================> "+ dateTime.lblTimes.text); 
		}
		
		var dateTime = Ti.UI.createView($jss.NewDates);
		dateTime.lblTimes = {};
		dateTime.lblTimes.date = selected;
		dateTime.lblTimes.time = selected;
		dateTime.lblTimes.text = dateFormat(selected, "ddd mmm dd yyyy hh:MM TT");
		
		var datePicker = Ti.UI.createPicker({ height:$Y(100), useSpinner: true, type:Ti.UI.PICKER_TYPE_DATE, minDate:min, maxDate:max, value:selected, selectionIndicator:true });
		datePicker.addEventListener('change', function(e) { dateTime.lblTimes.date = e.value; updateDateTime(); });
		dateTime.add(datePicker);
		
		var timePicker = Ti.UI.createPicker({ height:$Y(100), useSpinner:true, type:Ti.UI.PICKER_TYPE_TIME, value:selected, minuteInterval:15, selectionIndicator:true });
		timePicker.addEventListener('change', function(e) { dateTime.lblTimes.time = e.value; updateDateTime(); });
		dateTime.add(timePicker);
		
		return dateTime;
	}
	
	//-- Use Titanium build in date/time picker with start/end date
	cf.ui.NewCallIphoneEventDateView = function(min, max, selected) {
		
		/* Variable initialization.  We want to use the values of these variables in this scope,
		but will assign them from within the createDatePickerWin function. */
		cf.ui.pickerStartTime = "";
		cf.ui.pickerEndTime = "";

		/* UI object instantiation */
		var lblStartsEnds = Ti.UI.createLabel({ font: { fontSize:13 }, text: "Start\nEnd", left:10, top:0, color:'gray' });
		var lblTimes = Ti.UI.createLabel({ font: { fontSize:13, fontWeight:'bold' }, text: '', left:70, top:0 });
		
		var eventDate = Ti.UI.createButton($jss.NewDates);

		/* Object assignments */
		eventDate.lblStartsEnds = lblStartsEnds;
		eventDate.add(lblStartsEnds);
		eventDate.lblTimes = lblTimes;
		eventDate.add(lblTimes);

		eventDate.addEventListener("click", function() {
			/* Function call to included file.  This allows for some more modular codebases */ 
			cf.ui.createDatePickerWin(min, max, selected, eventDate);
		});
		
		return eventDate;				
	};
})();