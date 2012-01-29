/*iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone
	 * iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone iPHone iPhone */
	
(function() {	
	cf.ui.properties = {		
Stretch: { top:0,bottom:0,left:0,right:0 },
Window:{ backgroundImage:'/img/shadow_bg_320.png' },
TitleBar:{ top: 0, right: 0, left: 0, height: 44 },
BellowTitleVerticalScrollView:{ contentWidth:320, layout:'vertical', top: 45, contentHeight:'auto' },
YellowBtn:{ color:'#000', shadowColor:'#fff', shadowOffset:{x:0,y:1}, font:{fontWeight:'bold', fontSize:14 }, 
	textAlign:'center', borderRadius:5, border:5, borderColor:'#f8ba2f', backgroundImage:'/img/btn_bg2.png' },

OverlayLabel: { color:'#fff', textAlign:'center', font:{fontSize:14}, height:'auto', width:'auto', left:10, right:10 },
OverlayView: { top:70, backgroundColor:'#000', borderRadius:10, opacity:0.8, touchEnabled:false, zIndex:1001 }, 

TabView: { bottom:0, height:64, backgroundImage:'/img/tabs/bg.png', width: cf.PlatformWidth },
TabFilmStrip: { top:45, left:0, right:0, bottom: 50 },
TabXY: { width: 48 },

BottomToolbar:{ bottom: 0, borderTop: true, borderBottom: false, translucent: true, barColor: '#000', height:40 },

FloatingLoader:{ backgroundColor:'#000', borderRadius:10, opacity:0.8, bottom:0, top:0, right:0, left:0, width:180, height:120, zIndex:100 },
FloatingLoaderIndicator:{ left:100, right:100, top:35, width:20, height:10 },
FloatingLoaderLabel:{ left:10, right:0, top:25, color:"#fff", textAlign:"center", font:{fontSize:16}, shadowColor:"#000", shadowOffset:{x:0,y:1} },		

RefreshButton:{ backgroundImage: '/img/buttons/refresh.png', width: 41, height: 30 },
BackButton:{ backgroundImage: '/img/buttons/back.png', width: 54, height: 30 },
HuhButton:{ backgroundImage: '/img/buttons/help.png', width: 55, height: 30 },
DoneButton:{ backgroundImage: '/img/buttons/done.png', width: 50, height: 30 },
EditButton:{ backgroundImage: '/img/buttons/edit.png', width: 48, height: 30 },		
MessageButton:{ backgroundImage: '/img/buttons/email.png', width:35, height: 30 }, 
OpinionButton:{ backgroundImage: '/img/buttons/opinion.png', width:41, height: 30 },
DeleteButton:{ backgroundImage: '/img/buttons/delete.png', width: 57, height: 30 },
SearchButton:{ backgroundImage: '/img/buttons/search.png', width: 61, height: 30 },
CameraButton:{ backgroundImage: '/img/buttons/camera.png', width: 41, height: 30 },
MoreButton:{ backgroundImage: '/img/buttons/moreinfo.png', width: 74, height: 30 },
ProfileButton:{ backgroundImage: '/img/buttons/profile.png', width: 59, height: 30 },
ModeButton:{ backgroundImage: '/img/buttons/mode.png', width: 52, height: 30 },
MapButton:{ backgroundImage: '/img/buttons/map.png', width: 48, height: 30 },
HomeButton:{ image: '/img/buttons/home.png', width: 54, height: 30 },
OptionsButton:{ image: '/img/buttons/options.png', width: 66, height: 30 },		
LogbookButton:{ image: '/img/buttons/logbook.png', width: 71, height: 30 },				
				
//Tables
ClearTableView:{ backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, footerView: Ti.UI.createView({ height: 1, backgroundColor: '#fff' }) },
PullTableView:{ top: 45, backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, footerView: Ti.UI.createView({ height: 1, backgroundColor: '#fff' }) },
PullTableViewGrouped:{ top: 45, backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0, style: Titanium.UI.iPhone.TableViewStyle.GROUPED },
PullRefresh:{ backgroundColor:"#000", width:320, height:60 },
PullRefreshArrow:{ backgroundImage:"/img/whiteArrow.png", width:23, height:60, bottom:10, left:20 },
PullRefreshStatus:{ text:"Pull to reload", color: '#fff', height:15, left:55, width:200, bottom:30, textAlign:"center", font:{fontSize:13,fontWeight:"bold"}, shadowColor:"#999", shadowOffset:{x:0,y:1} },
PullRefreshLastUpdated:{ left:55, width:200, height:14, bottom:15, textAlign:"center",  color: '#fff', font:{fontSize:12}, shadowColor:"#999", shadowOffset:{x:0,y:1} },
PullRefreshIndicator:{ left: 20, bottom: 13, width: 30, height: 30 },

RowAuto:{ selectedBackgroundColor: '#ddd', backgroundColor: '#fff', height: 'auto', borderColor: 'transparent', borderWidth: 0 }, 
Row60:{ selectedBackgroundColor: '#ddd', backgroundColor: '#fff', height: 60, borderColor: 'transparent', borderWidth: 0 },
RowAvatar:{ left:6, top:6, width:46, height:42 },
RowVerticalContent:{ top:2, width:240, right: 20, bottom:6, height: 'auto', layout:'vertical' },
RowVerticalContentGrouped:{ top:2, width:220, right: 20, bottom:6, height: 'auto', layout:'vertical' }, 
RowName:{ top: 7, right: 20, left: 60, height: 16, font: { fontWeight: 'bold', fontSize: 14 }, color: 'black' },
RowDetails:{ top: 23, left:60, height:'auto', width:236, textAlign:'left', color:'#777777', font:{fontSize:11 } },
RowStars:{ top: 39, left: 59, height: 13, width: 76 },
RowArrow:{ right: 6, width: 6, height: 10, image: '/img/arrowright.png' },

WelcomeWelcome:{ color:'#fff', top:60, width:240, height:'auto', textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: 15, fontWeight:'bold' } },
WelcomeSetPlace:{ color:'#fff', top:160, width:240, height:'auto', textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: 14, fontWeight:'bold' } },

SearchResultsTableView:{ top: 90 }
,SearchBar:{ barColor: '#000', showCancel:false, height: 43, top: 45, hintText: 'Cities, areas, gyms & outdoor climbing' }
,SearchResultRow:{  backgroundColor: '#fff', selectedBackgroundColor: '#ddd', height: 40, borderColor: 'transparent', borderWidth: 0 }
,SearchResultRowFlag:{ top:10, left:6, height:20, width:20 }
,SearchResultTitle:{ top: 6, left:34, height: 14, font: { fontWeight: 'bold', fontSize: 14 }, color: 'black' }
,SearchResultDetails:{ top: 20, left:34, height:'auto', width:236, textAlign:'left', color:'#777777', font:{fontSize:11, fontFamily:'Helvetica' } }
	
		
//-- Login page
,LoginView:{ bottom:0, width:320, top:45, backgroundColor:'transparent', zIndex:1001 },
LoginTitle:{color:'#fff', top:10, width:260, height:55, textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: 12, fontWeight:'bold' } },
LoginEmailText:{ hintText:'email address', height:35, top:75, left:35, width:250, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE },
LoginPasswordText:{ hintText:'password', height:35, top:115, left:35, width:250, passwordMask:true, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE },
LoginButton:{height:35, title:'Login with Climbfind', top:160, width:246 },
LoginFBcallout:{color:'#fff', top:252, left:35, right:35, height:'auto', textAlign:'center', font:{ fontSize: 15, fontWeight:'bold'} },
LoginFBbutton:{ 'style':'wide', top:302 },

SignUpCountryTitle:{color:'#fff', top:50, width:300, height:18, textAlign:'center', shadowColor:'#000', shadowOffset:{x:0,y:1}, font:{ fontSize: 13, fontWeight:'bold' }},
SignUpCountryWhy:{color:'#fff', top:70, width:300, height:100, textAlign:'center', shadowColor:'#000', font:{ fontSize: 13 }},	
SignUpCountryPicker:{ top:170 },
SignUpCountrySave:{ height:35, title:'Save', top:405, width:250 },

ProfileTable: { top:0, borderColor: 'transparent', borderWidth: 0, backgroundColor:'transparent', rowBackgroundColor:'white', style: Titanium.UI.iPhone.TableViewStyle.GROUPED }, 
ProfileHeader: { height:'auto', left:0, right:0, layout:'vertical' },
ProfileName:{ top:2, left:10, right:10, textAlign:'center', color: '#fff', height:17, font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} },
ProfileCountryImage:{top:2, width:16, height:16 },
ProfileCountryLabel:{color:'#fff', top:3, width:290, height:60, textAlign:'center', shadowColor:'#000', font:{ fontSize: 13 }},	
ProfileAvatar:{ top:5, height:200, width:240, left:10, right:10 },
ProfileMessage:{top:10, bottom:10, height:35, left:20, right:20 },

//-- Messages (because I don't want to start a seperate file)
ConversationRowName:{ top:0, left: 0, height: 13, font: { fontWeight: 'bold', fontSize: 13 }, color: 'black' },
ConversationRowDetails:{ top:3, left: 0, height: 'auto', font: { fontSize: 12 }, color: 'black' },
ConversationRowExcerpt:{ top: 3, left:2, width:250, height:'auto', textAlign:'left', color:'#777777', font:{fontSize:11, fontFamily:'Helvetica' } },

CommentNewHeadingLabel:{ top: 55, left: 10, height: 17, color: '#fff',font: { fontWeight: 'bold', fontSize: 15 } },
CommentNewAvatar:{ top: 77, left:11, width: 30, height: 30 },
CommentNewDisplayName:{ top: 85, left: 47, height: 15, color: '#fff', font: { fontSize: 13 } },
CommentNewTextArea:{ editable: true, top:115, left:10, width:300, height:120, borderRadius:5, font: { fontSize: 14 }, paddingLeft:15, paddingRight:15 },
CommentNewButton:{ top:245, height:35, left:10, right:10 },

//-- Photo upload
AddPhotoChooseLabel:{ textAlign:'center', font:{ fontSize:18, fontFamily:'Helvetica', fontWeight:'bold', fontStyle:'italic' }, height:'auto', width:'auto', color:'#fff', top:65 },
AddPhotoChooseSources:{ top:110, height:90, width:230 },
AddPhotoChooseGallery:{ backgroundImage:'/img/albums-button.png', top:0, width:229, height:42 },
AddPhotoChooseCamera:{ backgroundImage:'/img/camera-button.png', width:229, height:46, top:43 },

AddPhotoNameLabel:{ textAlign:'center', font:{ fontSize:18, fontFamily:'Trebuchet MS', fontWeight:'bold' }, height:'auto', width:'auto', color:'#fff', top:60 },
AddPhotoName:{ height:35, width:300, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, top:95, clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS },
AddPhotoThumbPreview:{ top:150, height:200, width:200 },
AddPhotoUploadButton:{title:"Upload", width:188, height:46, bottom:40 },
		
NewScrollView:{ contentWidth:320 } /*layout:'vertical'*/
,NewAvatar:{ top:5, left:120, width:80, height:60 }
,NewLocName:{ top:69, left:10, right:10, height:'auto', textAlign:'center', color:'#fff', font:{fontWeight:'bold',fontSize:15}, shadowColor:'#000', shadowOffset:{x:0,y:1} }
,NewDatesLabel:{ top:97, left:10, height:14, color:'#fff', font: { fontSize: 12 } }
,NewDates:{  top:115, left:10, width:300, height:60, color:"#000", font: { fontSize:13 }, borderRadius:5 }
,NewCommentLabel:{ top:181, left:10, height:14, color:'#fff', font: { fontSize: 12 } }
,NewComment:{ editable: true, top:199, left:10, width:300, height:105, borderRadius:5, font: { fontSize: 14 }, paddingLeft:15, paddingRight:15, zIndex:2 }
,NewButton:{ top:316, height:35, left:10, right:10, title: 'Post PartnerCall' } 
,NewSuccessLabel:{ top:180, height:35, left:10, right:10, textAlign:'center', color:'#fff', font: { fontSize: 14 } }

,ReplyComment:{ editable: true, top:217, left:10, width:300, height:120, borderRadius:5, font: { fontSize: 14 }, paddingLeft:15, paddingRight:15 }
,ReplyButton:{ top:345, height:35, left:10, right:10, title: 'Reply' } 
		
,FeedRowName:{ top:3, left: 0, height: 16, font: { fontWeight: 'bold', fontSize: 13 }, color: 'black' }
,FeedRowUtc:{ top:1, left: 0, height: 14, font: { fontSize: 10 }, color: 'gray' }
,FeedRowPlace:{ layout:'Horzontal' }
,FeedRowPlaceFlag:{ height:16, width:16 }
,FeedRowPlaceName:{ top:1, left: 0, height: 14, font: { fontSize: 10 }, color: 'black' }
,FeedRowPostContent:{ top:1, left: 0, height: 'auto', layout:'vertical' }
,FeedRowPostMeta:{ top:1, left: 0, height: 'auto', font: { fontSize: 10 }, color: 'gray' }
,FeedRowPostComment:{ top:1, left:0, height: 'auto', font: { fontSize: 12 }, color:'black' }
,FeedRowHtml:{ top:1, left:0, width:230, height:'auto' }
,FeedRowCommentsLabel:{ top:1, left:10, right:0, textAlign:'right', bottom:5, height:12, font: { fontWeight: 'bold',fontSize: 11 }, color:'orange' }

,CommentRowName:{ top:0, left: 0, height: 13, font: { fontWeight: 'bold', fontSize: 13 }, color: 'black' }
,CommentRowUtc:{ top:3, left: 0, height: 'auto', font: { fontSize: 10 }, color: 'black' }
,CommentRowComment:{ top: 3, left:2, width:250, height:'auto', textAlign:'left', color:'#777777', font:{fontSize:11, fontFamily:'Helvetica' } }


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
,PostDetailToolbarMessage:{ title:'Private message', style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED }
,PostDetailToolbarComment:{ title:'Public comment', style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED }

,CommentRowName:{ top:0, left: 0, height: 13, font: { fontWeight: 'bold', fontSize: 13 }, color: 'black' }
,CommentRowUtc:{ top:3, left: 0, height: 'auto', font: { fontSize: 10 }, color: 'black' }
,CommentRowComment:{ top: 3, left:2, width:250, height:'auto', textAlign:'left', color:'#777777', font:{fontSize:11, fontFamily:'Helvetica' } }

	
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