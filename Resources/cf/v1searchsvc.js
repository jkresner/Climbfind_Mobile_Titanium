(function() {
	cf.v1.searchSvc = {};

	cf.v1.searchSvc.Term = function(win, searchterm, callback) { execute(win, '/term/'+escape(searchterm), callback); };
	cf.v1.searchSvc.Place = function(win, searchterm, callback) { execute(win, '/place/'+escape(searchterm), callback); };
	cf.v1.searchSvc.Location = function(win, searchterm, callback) { execute(win, '/location/'+escape(searchterm), callback); };
	cf.v1.searchSvc.Climbingarea = function(win, searchterm, callback) { execute(win, '/climbing-area/'+escape(searchterm), callback); };
	cf.v1.searchSvc.Province = function(win, searchterm, callback) { execute(win, '/province/'+escape(searchterm), callback); };
		
	function execute(win, relativeUrl, callback) { cf.http.InvokeCfSearchSvcV1(win, cf.Stgs.SearchSvcV1Rt+relativeUrl, callback, "Downloading ..."); }
})();
