(function() {
	cf.v1.uploadSvc = {};

	cf.v1.uploadSvc.AddVisitPhoto = function(win, image, id, name, callback) { execute(win, '/visit-photo/'+id+'/'+escape(name.replace("&","and")), image, callback); };
	cf.v1.uploadSvc.AddClimbPhoto = function(win, image, id, name, callback) { execute(win, '/climb-photo/'+id+'/'+escape(name.replace("&","and")), image, callback); };
	//this.uploadLocationPhoto = function(id, callback) { execute('/location/'+escape(searchterm), callback); };
		
	function execute(win, relativeUrl, image, callback) { //alert('execute'+relativeUrl);
		cf.http.InvokeCfUploadSvcV1(win, cf.Stgs.UploadSvcV1Rt+relativeUrl, image, callback); }
})();
