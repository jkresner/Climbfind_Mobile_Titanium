//Android
(function() {	
	cf.ui.properties = {		
Stretch: { top:0,bottom:0,left:0,right:0 },
Window:{ backgroundImage:'/img/shadow_bg.png' },
TitleBar:{ top: 0, right: 0, left: 0, height: cdp.TitleHeight, backgroundImage:'/img/header.png' },
BellowTitleVerticalScrollView:{ contentWidth:cf.PlatformWidth, layout:'vertical', top: cdp.TitleHeight },
YellowBtn:{ color:'#000', shadowColor:'#fff', shadowOffset:{x:0,y:1}, font:{fontWeight:'bold', fontSize:$Y(14) }, 
	textAlign:'center', borderRadius:5, border:5, borderColor:'#f8ba2f', backgroundImage:'/img/btn_bg2.png' },

OverlayLabel: { color:'#fff', textAlign:'center', font:{fontSize:$Y(14)}, height:'auto', width:'auto', left:$X(10), right:$X(10) },
OverlayView: { top:$Y(70), backgroundColor:'#000', borderRadius:10, opacity:0.8, touchEnabled:false, zIndex:1001 }, 
		
TabView: { bottom:0, height:$Y(64), backgroundImage:'/img/tabs/bg.png', width: cf.PlatformWidth },
TabFilmStrip: { top:cdp.TitleHeight, left:0, right:0, bottom: $Y(50) },
TabXY: { width: $X(48) },
		
BottomToolbar:{ bottom: 0, borderBottom: false, backgroundImage:'/img/bottom_bar.png', height:$Y(40), width: cf.PlatformWidth },		
FloatingLoader:{ backgroundColor:'#000', borderRadius:10, opacity:0.8, bottom:$Y(120), top:$Y(80), right:$X(40), left:$X(40), width:180, height:120, zIndex:100 },
FloatingLoaderIndicator:{ left:100, right:100, top:35, width:20, height:10 },
FloatingLoaderLabel:{ left:10, right:0, top:25, color:"#fff", textAlign:"center", font:{fontSize:$Y(16)}, shadowColor:"#000", shadowOffset:{x:0,y:1} },		
		
RefreshButton:{ backgroundImage: '/img/buttons/refresh.png', width: $X(41), height: $Y(30) },
HomeButton:{ backgroundImage: '/img/buttons/home.png', width: $X(54), height: $Y(30) },
BackButton:{ backgroundImage: '/img/buttons/back.png', width: $X(54), height: $Y(30) },
HuhButton:{ backgroundImage: '/img/buttons/help.png', width: $X(55), height: $Y(30) },
DoneButton:{ backgroundImage: '/img/buttons/done.png', width: $X(50), height: $Y(30) },
EditButton:{ backgroundImage: '/img/buttons/edit.png', width: $X(48), height: $Y(30) },
MessageButton:{ backgroundImage: '/img/buttons/email.png', width: $X(35), height: $Y(30) }, 
OpinionButton:{ backgroundImage: '/img/buttons/opinion.png', width: $X(41), height: $Y(30) },
DeleteButton:{ backgroundImage: '/img/buttons/delete.png', width: $X(57), height: $Y(30) },
SearchButton:{ backgroundImage: '/img/buttons/search.png', width: $X(61), height: $Y(30) },
CameraButton:{ backgroundImage: '/img/buttons/camera.png', width: $X(41), height: $Y(30) },
SignupButton:{ backgroundImage: '/img/buttons/newaccount.png', width: $X(95), height: $Y(30) },
MoreButton:{ backgroundImage: '/img/buttons/moreinfo.png', width: $X(74), height: $Y(30) },
ProfileButton:{ backgroundImage: '/img/buttons/profile.png', width: $X(59), height: $Y(30) },
ModeButton:{ backgroundImage: '/img/buttons/mode.png', width: $X(52), height: $Y(30) },
MapButton:{ backgroundImage: '/img/buttons/map.png', width: $X(48), height: $Y(30) },
OptionsButton:{ image: '/img/buttons/options.png', width: $X(66), height: $Y(30) },		
LogbookButton:{ image: '/img/buttons/logbook.png', width: $X(71), height: $Y(30) },		
				
//Tables
ClearTableView:{ width: cf.PlatformWidth, backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, footerView: Ti.UI.createView({ height: 1, backgroundColor: '#fff' }) },
PullTableView:{ width: cf.PlatformWidth, top: cdp.TitleHeight, backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, footerView: Ti.UI.createView({ height: 1, backgroundColor: '#fff' }) },

RowAuto:{ backgroundSelectedColor: '#ddd', backgroundColor: '#fff', height: 'auto', borderColor: 'transparent', borderWidth: 0 }, 
Row60:{ backgroundSelectedColor: '#ddd', backgroundColor: '#fff', height: $Y(60), borderColor: 'transparent', borderWidth: 0 },
RowAvatar:{ left:6, top:6, width:$X(46), height:$X(42) },
RowVerticalContent:{ top:2, width:$X(240), left: $X(61), right: $X(22), bottom:6, height: 'auto', layout:'vertical' }, 
RowName:{ top: $Y(5), right: $X(20), left: $X(60), height: $Y(20), font: { fontWeight: 'bold', fontSize: $Y(14) }, color: 'black' },
RowDetails:{ top: $Y(21), left:$X(60), height:'auto', width:$X(236), textAlign:'left', color:'#777777', font:{fontSize:$Y(11) } },
RowStars:{ top: $Y(39), left: $X(59), height: $Y(13), width: $X(76) },
RowArrow:{ right: 6, width: 10, height: 14, image: '/img/arrowright.png' },

	PullTableViewGrouped:{ top: $Y(45), backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0 },

/*PullRefresh:{ backgroundColor:"#000", width:320, height:60 },
PullRefreshArrow:{ backgroundImage:"/img/whiteArrow.png", width:23, height:60, bottom:10, left:20 },
PullRefreshStatus:{ text:"Pull to reload", color: '#fff', height:15, left:55, width:200, bottom:30, textAlign:"center", font:{fontSize:13,fontWeight:"bold"}, shadowColor:"#999", shadowOffset:{x:0,y:1} },
PullRefreshLastUpdated:{ left:55, width:200, height:14, bottom:15, textAlign:"center",  color: '#fff', font:{fontSize:12}, shadowColor:"#999", shadowOffset:{x:0,y:1} },
PullRefreshIndicator:{ left: 20, bottom: 13, width: 30, height: 30 },*/

	RowVerticalContentGrouped:{ top:$Y(2), width:$X(220), right: $X(20), bottom:$Y(6), height: 'auto', layout:'vertical' }, 

WelcomeWelcome:{ color:'#fff', top:$Y(60), width:$X(240), height:'auto', textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: $Y(15), fontWeight:'bold' } },
WelcomeSetPlace:{ color:'#fff', top:$Y(160), width:$X(240), height:'auto', textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: $Y(14), fontWeight:'bold' } },

SearchResultsTableView:{ top: $Y(90) }
,SearchBar:{ barColor: '#000', showCancel:false, height: $Y(43), top: $Y(45), hintText: 'Cities, gyms/outdoor climbing' }
,SearchResultRow:{  backgroundColor: '#fff', backgroundSelectedColor: '#ddd', height: $Y(40), borderColor: 'transparent', borderWidth: 0 }
,SearchResultRowFlag:{ top:$Y(10), left:$X(6), height:$X(20), width:$X(20) }
,SearchResultTitle:{ top: $Y(3), left:$X(34), height: $Y(17), width:$X(260),font: { fontWeight: 'bold', fontSize: $Y(13) }, color: 'black' }
,SearchResultDetails:{ top: $Y(20), left:$X(34), height:'auto', width:$X(236), textAlign:'left', color:'#777777', font:{fontSize:$Y(11), fontFamily:'Helvetica' } }
		
//-- Login page
,LoginView:{ bottom:0, width:$X(320), top:$Y(45), backgroundColor:'transparent', zIndex:1001 },
LoginTitle:{color:'#fff', top:$Y(10), width:$X(260), height:$Y(55), textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: $Y(12), fontWeight:'bold' } },
LoginEmailText:{ hintText:'email address', height:$Y(35), top:$Y(75), left:$X(35), width:$X(250), borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE },
LoginPasswordText:{ hintText:'password', height:$Y(35), top:$Y(115), left:$X(35), width:$X(250), passwordMask:true, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE },
LoginButton:{height:$Y(35), title:'Login with Climbfind', top:$Y(160), width:$X(246) },
LoginFBcallout:{color:'#fff', top:$Y(252), left:$X(35), right:$X(35), height:'auto', textAlign:'center', font:{ fontSize: $Y(15), fontWeight:'bold'} },
LoginFBbutton:{ 'style':'wide', top:$Y(302) },

SignUpCountryTitle:{color:'#fff', top:$Y(50), width:$X(300), height:$Y(18), textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: $Y(13), fontWeight:'bold' }},
SignUpCountryWhy:{color:'#fff', top:$Y(70), width:$X(300), height:$Y(100), textAlign:'center', shadowColor:'#000', font:{ fontSize: $Y(13) }},	
SignUpCountryPicker:{ top:$Y(180) },
SignUpCountrySave:{ height:$Y(35), title:'Save', top:$Y(405), width:$X(250) },

ProfileTable: { top:0, borderColor: 'transparent', borderWidth: 0, backgroundColor:'transparent', rowBackgroundColor:'white' },
ProfileHeader: { height:'auto', left:0, right:0, layout:'vertical' },
ProfileName:{ top:$Y(2), textAlign:'center', color: '#fff', height:$Y(20), font:{fontWeight:'bold',fontSize:$Y(15)}, shadowColor:'#000', shadowOffset:{x:0,y:1} },
ProfileCountryImage:{ top:$Y(2), width:$X(16), height:$X(16) },
ProfileCountryLabel:{color:'#fff', top:$Y(3), width:$X(290), height:$Y(60), textAlign:'center', shadowColor:'#000', font:{ fontSize: $Y(13) }},	
ProfileAvatar:{ top:$Y(5), height:$Y(200), width:$X(240), left:$X(40), right:$X(40) },
ProfileMessage:{top:$Y(10), bottom:$Y(10), height:$Y(35), left:$X(20), right:$X(20) },

//-- Messages (because I don't want to start a seperate file)
ConversationRowName:{ top:0, left: 0, height: $Y(15), font: { fontWeight: 'bold', fontSize: $Y(13) }, color: 'black' },
ConversationRowDetails:{ top:$Y(3), left: 0, height: 'auto', font: { fontSize: $Y(12) }, color: 'black' },
ConversationRowExcerpt:{ top: $Y(3), left:$X(2), width:$X(250), height:'auto', textAlign:'left', color:'#777777', font:{fontSize:$Y(11), fontFamily:'Helvetica' } },

CommentNewHeadingLabel:{ top: $Y(55), left: $X(10), height: $Y(17), color: '#fff',font: { fontWeight: 'bold', fontSize: $Y(15) } },
CommentNewAvatar:{ top: $Y(77), left:$X(11), width: $X(30), height: $Y(30) },
CommentNewDisplayName:{ top: $Y(85), left: $X(47), height: $Y(15), color: '#fff', font: { fontSize: $Y(13) } },
CommentNewTextArea:{ editable: true, top:$Y(115), left:$X(10), width:$X(300), height:$Y(120), borderRadius:5, font: { fontSize: $Y(14) }, paddingLeft:15, paddingRight:15 },
CommentNewButton:{ top:$Y(245), height:$Y(35), left:$X(10), right:$X(10) },

//-- Photo upload
AddPhotoChooseLabel:{ textAlign:'center', font:{ fontSize:18, fontFamily:'Helvetica', fontWeight:'bold', fontStyle:'italic' }, height:'auto', width:'auto', color:'#fff', top:65 },
AddPhotoChooseSources:{ top:110, height:90, width:230 },
AddPhotoChooseGallery:{ backgroundImage:'/img/albums-button.png', top:0, width:229, height:42 },
AddPhotoChooseCamera:{ backgroundImage:'/img/camera-button.png', width:229, height:46, top:43 },

AddPhotoNameLabel:{ textAlign:'center', font:{ fontSize:18, fontFamily:'Trebuchet MS', fontWeight:'bold' }, height:'auto', width:'auto', color:'#fff', top:60 },
AddPhotoName:{ height:35, width:300, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, top:95, clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS },
AddPhotoThumbPreview:{ top:150, height:200, width:200 },
AddPhotoUploadButton:{title:"Upload", width:188, height:46, bottom:40 },
		
NewScrollView:{ contentWidth:$X(320) } /*layout:'vertical'*/
,NewAvatar:{ top:$Y(5), width:$X(80), height:$X(60) }
,NewLocName:{ top:$Y(60), height:'auto', textAlign:'center', color:'#fff', font:{fontWeight:'bold',fontSize:$Y(15)}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,NewDatesLabel:{ top:$Y(82), left:$X(10), height:$Y(15), color:'#fff', font: { fontSize: $Y(11) } }
,NewDates:{ layout:'horizontal', top:$Y(100), left:$X(10), width:$X(300), height:$Y(100) }
,NewCommentLabel:{ top:$Y(200), left:$X(10), height:$Y(15), color:'#fff', font: { fontSize: $Y(11) } }
,NewComment:{ editable: true, top:$Y(215), left:$X(10), width:$X(300), height:$Y(100), borderRadius:5, font: { fontSize: $Y(14) }, paddingLeft:15, paddingRight:15, zIndex:2 }
,NewButton:{ top:$Y(323), height:$Y(35), left:$X(10), right:$X(10), title: 'Post partner call' } 
,NewSuccessLabel:{ top:$Y(180), height:$Y(35), textAlign:'center', color:'#fff', font: { fontSize: $Y(14) } }

,ReplyComment:{ editable: true, top:$Y(217), left:$X(10), width:$X(300), height:$Y(120), borderRadius:5, font: { fontSize: $Y(14) }, paddingLeft:15, paddingRight:15 }
,ReplyButton:{ top:$Y(345), height:$Y(35), left:$X(10), right:$X(10), title: 'Reply' } 
		
,FeedRowName:{ top:$Y(1), left: 0, height: $Y(17), font: { fontWeight: 'bold', fontSize: $Y(13) }, color: 'black' }
,FeedRowUtc:{ top:$Y(1), left: 0, height: $Y(14), font: { fontSize: $Y(10) }, color: 'gray' }
,FeedRowPlace:{ layout:'Horzontal' }
,FeedRowPlaceFlag:{ height:$X(16), width:$X(16) }
,FeedRowPlaceName:{ top:$Y(1), left: 0, height: $Y(14), font: { fontSize: $Y(10) }, color: 'black' }
,FeedRowPostContent:{ top:$Y(1), left: 0, height: 'auto', layout:'vertical' }
,FeedRowPostMeta:{ top:$Y(1), left: 0, height: 'auto', font: { fontSize: $Y(10) }, color: 'gray' }
,FeedRowPostComment:{ top:$Y(1), left:0, height: 'auto', font: { fontSize: $Y(12) }, color:'black' }
,FeedRowHtml:{ top:$Y(1), left:0, width:$X(230), height:'auto' }
,FeedRowCommentsLabel:{ top:$Y(1), left:$X(10), right:0, textAlign:'right', bottom:$Y(5), height:$Y(12), font: { fontWeight: 'bold',fontSize: $Y(11) }, color:'orange' }

,CommentRowName:{ top:0, left: 0, height: $Y(18), font: { fontWeight: 'bold', fontSize: $Y(14) }, color: 'black' }
,CommentRowUtc:{ top:$Y(3), left: 0, height: 'auto', font: { fontSize: $Y(12) }, color: 'gray' }
,CommentRowComment:{ top: $Y(3), left:$Y(2), width:$X(250), height:'auto', textAlign:'left', color:'black', font:{fontSize:$Y(11), fontFamily:'Helvetica' } }

,ClimbDetailScrollView:{ contentHeight:380, contentWidth:320, layout:'vertical' }
,ClimbHorizontalHolder:{ top:10, left:0, right:0, height: 'auto', layout:'horizontal' }
,ClimbTitle:{ left:10, right:10, top:0, height:20, width:'auto', color: '#fff', layout:'horizontal'  }
,ClimbGrade:{ top:2, left:2, color: '#fff', height:17, font:{fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,ClimbName:{ top:2, left:5, color: '#fff', height:17, font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,ClimbLocationName:{ top:2, color: '#fff', height:14, font:{fontSize:12}, shadowColor:'#000', shadowOffset:{x:0,y:1}, textAlign:'center' }
,ClimbLogButton:{ top:0, title: 'Log climb', height:35, left:10, width:146 }
,QuickLogButton:{ top:0, title: 'Quicklog', height:35, left:8, width:146 }
,ClimbAvatar:{ top:14, left:8, right:0, width: 146, height:146, borderRadius:0 }
,ClimbDetailsHolder:{ top:14, left:10, borderRadius:0, backgroundColor:'white', height:146, width:146 }
,ClimbStarRating:{ top:5, height:14, width: 90, left:0 }
,ClimbRatingCount:{ top:6, left:86, height:'auto', width:'auto', color:'gray', font:{fontSize:11} }
,ClimbSet:{ top:22, left:10, right:10, height:'auto', color:'#000', font:{fontSize:12} }
,ClimbTags:{ top:38, left:10, right:10, height:'auto', color:'#000', font:{fontSize:12} }
,ClimbSectionLabel:{ top: 10, left: 176, color: '#fff', font: { fontSize: 12 } }
,ClimbSectionName:{ top: 10, left: 220, color: '#fff', font: { fontSize: 12 } }
,ClimbDescriptionLabel:{ top:0, left:10, color:'#fff', height:15, font:{ fontSize:12}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,ClimbDescription:{ top:2, left:10, right:10, height:'65', color:'#000', borderRadius:10, font:{fontSize:12, fontFamily:'Helvetica'}, editable:'false' }
,QuickLogsLabelHolder:{height:20}
,ClimbLogsLabelHolder:{height:17}
,ClimbLogsLabel:{ top:0, bottom:0, left:15, color:'#fff', height:'auto', font:{ fontSize:13}, shadowColor:'#000', shadowOffset:{x:0,y:1} }

,ClimbGradeTitle:{ top:60, width:'auto', height:'auto',	textAlign:'center', color:'white' }
,ClimbGradeSaveButton:{ top:380, title: 'Save', height:35, left:10, right:10 }

,SectionRowClimbCount:{ top: 38, left:60, height:'auto', width:236, textAlign:'left', color:'#777777', font:{fontSize:11 } }
	

,LogName:{ top:50, left:10, right:10, textAlign:'center', color:'#fff', height:17, font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LogWhatLabel:{ top:75, left:11, right:10, color:'#fff', height:14, font: { fontSize: 12 }, text: 'What was the outcome?' }
,LogOutcomeSlider:{ top:100, left:10, right:120, width:190, min:0, max:4, leftTrackImage:'/img/slider_orange.png' }
,LogOutcomeImage:{ top:100, left:205, width:20, height: 20 }
,LogOutcomeLabel:{ top:101, left:230, right:10, color:'#fff', height:19, font: { fontSize: 16 } }
,LogHowLabel:{ top:130, left:11, right:10, color:'#fff', height:14, font: { fontSize: 12 }, text: 'How was your experience?' }
,LogExperienceSlider:{ top:155, left:10, right:120, width:190, min:0, max:6, leftTrackImage:'/img/slider_orange.png' }
,LogExperienceImage:{ top:155, left:205, width:20, height: 20 }
,LogExperienceLabel:{ top:156, left:230, right:10, color:'#fff', height:19, font: { fontSize: 16 } }
,LogGradeOpinionLabel:{ top:185, left:11, right:10, color:'#fff', height:14, font: { fontSize: 12 } }
,LogGradeOpinionTabs:{ top:210, left:10, labels:['Not sure', 'Easy', 'Spot on', 'Hard'], backgroundColor:'#999', height:25, width:280, style:Titanium.UI.iPhone.SystemButtonStyle.BAR }
,LogFeedbackLabel:{ top:245, left:10, color:'#fff', height:14, font: { fontSize: 12 }, text: 'Share your opinion with other climbers!' }
,LogRating:{ top:255, left:7, right:20, height:50 }
,LogRateLabel:{ top:275, left:160, right:20, color:'#fff', height:'auto', textAlign:'left', font: { fontSize: 12 } }
,LogStar:{ backgroundImage:'/img/rating/stars/empty.png', width: 24, height: 24 }
,LogComment:{ top:305, left:10, width:300, height:90, borderRadius:5, font: { fontSize: 13 }, paddingLeft:5, paddingRight:5 }
,LogButton:{ top:410, height:35, left:10, right:10, title: 'Log climb' } 

,LogHelpScrollView: { top:45, contentHeight:380, contentWidth:320 }
,LogHelpTitle:{ top:8, left:10, right:10, color:'#fff', height:17, font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LogHelpAttempImg:{ top:35, left:10, width:20, height: 20, image:'/img/climbed/Attempt.png' }
,LogHelpAttempLb:{ top:37, left:35, color:'#fff', height:'auto', font:{fontWeight:'bold',fontSize:13} }
,LogHelpAttempDetail:{ top:55, left:36, right:10, height:13, font:{fontSize:12}, color:'#fff' }
,LogHelpBreaksImg:{ top:80, left:10, width:20, height: 20, image:'/img/climbed/Breaks.png' }
,LogHelpBreaksLb:{ top:82, left:35, color:'#fff', height:'auto', font:{fontWeight:'bold',fontSize:13} }
,LogHelpBreaksDetail:{ top:98, left:36, right:10, height:30, font:{fontSize:12}, color:'#fff' }
,LogHelpRedpointImg:{ top:135, left:10, width:20, height: 20, image:'/img/climbed/Redpoint.png' }
,LogHelpRedpointLb:{ top:138, left:35, color:'#fff', height:'auto', font:{fontWeight:'bold',fontSize:13} }
,LogHelpRedpointDetail:{ top:155, left:36, right:10, height:45, font:{fontSize:12}, color:'#fff' }
,LogHelpFlashImage:{ top:210, left:10, width:20, height: 20, image:'/img/climbed/Flash.png' }
,LogHelpFlashLb:{ top:213, left:35, color:'#fff', height:'auto', font:{fontWeight:'bold',fontSize:13} }
,LogHelpFlashDetail:{ top:229, left:36, right:10, height:45, font:{fontSize:12}, color:'#fff' }
,LogHelpOnsighImg:{ top:280, left:10, width:20, height: 20, image:'/img/climbed/Onsight.png' }
,LogHelpOnsighLb:{ top:283, left:35, color:'#fff', height:'auto', font:{fontWeight:'bold',fontSize:13} }
,LogHelpOnishgtDetail:{ top:300, left:36, right:10, height:45, font:{fontSize:12}, color:'#fff' }

,LogRowUtc:{ top: 6, left: 2, height: 16, font: { fontWeight: 'bold', fontSize: 13 }, color: 'black' }
,LogRowOutcome:{ top:3, left: 0, height:20, width:120 }
,LogRowOutcomeImage:{ top: 0, left: 0, width:20, height:20 }
,LogRowOutcomeLabel:{ top: 5, left: 24, height: 14, font: { fontSize: 12 }, color: 'black'}
,LogRowExperience:{ top:3, left: 0, height:20,width:120 }
,LogRowExperienceImage:{ top: 0, left: 0, width:19, height:19 }
,LogRowExperienceLabel:{ top: 5, left: 24, height: 14, font: { fontSize: 12 }, color: 'black' }
,LogRowOpinion:{ top:3, left: 0, height:20, width:200 }
,LogRowRating:{ top:6, left:0, width:76, height: 13 }
,LogRowGradeOpinion:{ top:5, left:80, font:{ fontSize:12 }, color:'black' }
,LogRowComment:{ top: 3, left:2, width:230, height:'auto', textAlign:'left', color:'#777777', font:{fontSize:11, fontFamily:'Helvetica' } }

,PostDetailToolbar:{ }
,PostDetailToolbarMessage:{ backgroundImage: '/img/buttons/tool_message.png', width: $X(116), height: $Y(30), right: $X(27) }
,PostDetailToolbarComment:{ backgroundImage: '/img/buttons/tool_comment.png', width: $X(114), height: $Y(30), left: $X(27) }

,CommentRowName:{ top:0, left: 0, height: $Y(16), font: { fontWeight: 'bold', fontSize: $Y(13) }, color: 'black' }
,CommentRowUtc:{ top:3, left: 0, height: 'auto', font: { fontSize: $Y(10) }, color: 'gray' }
,CommentRowComment:{ top: 3, left:$X(2), width:$X(250), height:'auto', textAlign:'left', color:'black', font:{fontSize:$Y(11), fontFamily:'Helvetica' } }

	
,LocDetailScrollView:{ contentWidth:320, layout:'vertical' }
,LocName:{ top:2, left:10, right:10, textAlign:'center', color: '#fff', height:17, font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LocImages:{ top: 8, left:20, right:20, layout:'horizontal', height:74, width:'auto' }
,LocAvatar:{ height:74, width:100, left:10, right:10 }
,LocDescriptionLabel:{ top:0, left:10, color:'#fff', height:14, font:{ fontSize:12, fontFamily:'Helvetica'}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LocDescription:{ top:2, left:10, right:10, height:165, color:'#000', borderRadius:5, font:{fontSize:12, fontFamily:'Helvetica'}, editable:'false' }
,LocIndoorAddress:{ top:1, left: 10, color: '#fff', textAlign:'center', height:14, font:{fontSize:12}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LocIndoorLogo:{ height:74, width:100, left:10, right:10 }
,LocIndoorClimbTypesLabel:{ top:2, right:10, textAlign:'center', color: '#fff', height:14, font:{ fontSize:12 }, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,LocIndoorClimbTypes:{ top:2, height:45, width: 'auto', left:20, right:20, itemWidth:55 }
,LocIndoorClimbTypeLead:{ image:'/img/icons/place_lead_white.png', top:5, height:40, width:43 }
,LocIndoorClimbTypeTopRope:{ image:'/img/icons/place_toprope_white.png', top:7, height:40, width:43 }
,LocIndoorClimbTypeBoulder:{ image:'/img/icons/place_boulder_white.png', top:7, height:40, width:43 }
,LocOutdoorCoordinates:{ top:1, left: 10, right:10, textAlign:'center', color:'#fff', height:14, font:{fontSize:12}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
				
	};
})();

//global shortcut for UI properties, since these get used A LOT. polluting the global
//namespace, but for a good cause (saving keystrokes)
var $jss = cf.ui.properties;