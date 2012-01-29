(function() {
	cf.model = { dbname:'cfdb' 	};
	
	cf.model.InitializeCFLocalDB = function() {
		var db = Ti.Database.open(cf.model.dbname);
		
		db.execute('DROP TABLE IF EXISTS CachedClimbs');
		db.execute('CREATE TABLE IF NOT EXISTS CachedClimbs (id TEXT PRIMARY KEY, json TEXT, timestamp TEXT)');
		db.close();		
	}
	
	//-- Might be for a location (current) or a checkin (specific date). Because ids are unique even across entity sets, it won't collide
	cf.model.TryGetCachedClimbsForCall = function(objID, datacall, callback, forceRefresh) {
		var currentDate = new Date();
		var begin = new Date().getTime();
		db = Ti.Database.open(cf.model.dbname);
					
		var rs = db.execute('SELECT * FROM CachedClimbs WHERE id = ?', objID);
		
		if (!rs.isValidRow()) {
			info('no local, getting climbs: '+objID);
			
			datacall(function (data) {             
	            info('saving cached climbs: '+currentDate.toString());
	            db.execute('INSERT INTO CachedClimbs (id, json, timestamp) VALUES ("'+objID+'", ?, "'+currentDate.toString()+'")', JSON.stringify(data));
				callback(data);				
				rs.close();
				db.close();	
				info('saved to cache');					        
		    });    			
			//Ti.App.fireEvent('app:db.climbscached',{ className:this._className, id:id });
		} 
		else
		{
			info('got local cached climbs: '+objID);
						
			var timestamp = new Date(rs.fieldByName('timestamp'));
			var diffInMillisecond = currentDate.getTime() - timestamp.getTime()

			//alert(diffInMillisecond);

			var olderThanADay = diffInMillisecond > 86400000; //milliseconds in a day
			
			if (olderThanADay || forceRefresh)
			{ 
				datacall(function (data) {             
	            	info('saving UPDATED cached climbs: '+currentDate.toString());
		            db.execute('UPDATE CachedClimbs SET json = ?, timestamp = "'+currentDate.toString()+'" WHERE id = "'+objID+'"', JSON.stringify(data));
					callback(data);				
					rs.close();
					db.close();						        
			    });    
			}
			else
			{
				
				//alert('reading column');
				var json = rs.fieldByName('json');
				
				obj = JSON.parse(json); 
				//alert('got column as json:' + (new Date().getTime()-begin)); 
				callback(obj);
				//alert('Called callback');
				rs.close();
				db.close();	
			}
		}
	}
	
	//Create a persistent entity
	/*cf.model.Entity = function(_class, _properties) {
		//mixin all properties for the object passed in
		//tt.mixin(this,_properties);
		
		this._className = _class;
		
		//Create a table for this entity type
		var db = Ti.Database.open(cf.model.dbname);
		db.execute('CREATE TABLE IF NOT EXISTS '+_class+' (id INTEGER PRIMARY KEY, json TEXT)');
		db.close();
		
		//save this entity - returns the ID of this entity
		this.save = function() {
			db = Ti.Database.open(cf.model.dbname);
			db.execute('INSERT INTO '+this._className+' (json) VALUES (?)',JSON.stringify(this));
			var id = db.lastInsertRowId;
			this.id = id;
			db.close();
			Ti.App.fireEvent('app:entity.saved',{
				className:this._className,
				id:id
			});
			return id;
		};
	};*/
	
	//helper function to hydrate a JSON graph with class functions
	//function hydrate(/*String*/ _className, /*String*/ _json) {
	//	return (cf.model[_className]) ? new cf.model[_className](JSON.parse(_json)) : JSON.parse(_json);
	//}
	
	//load an entity by the given ID
	/*cf.model.load = function(_className, _id) {
		var obj = null,
		db = Ti.Database.open(cf.model.dbname);
		
		//be tolerant of entities that don't exist - create a table for them
		db.execute('CREATE TABLE IF NOT EXISTS '+_className+' (id INTEGER PRIMARY KEY, json TEXT)');
		
		var rs = db.execute('SELECT * FROM '+_className+' WHERE id = ?', _id);
		
		if (rs.isValidRow()) {
			var json = rs.fieldByName('json');
			obj = hydrate(_className,json);
			obj.id = rs.fieldByName('id');
		}
		
		rs.close();
		db.close();
		return obj;
	};*/
	
	//get a list of all entities of the given class
	/*cf.model.list = function(_className) {
		var results = [],
		db = Ti.Database.open(cf.model.dbname);
		
		//be tolerant of entities that don't exist - create a table for them
		db.execute('CREATE TABLE IF NOT EXISTS '+_className+' (id INTEGER PRIMARY KEY, json TEXT)');
		
		var rs = db.execute('SELECT * FROM '+_className);
		
		while (rs.isValidRow()) {
			var json = rs.fieldByName('json');
			
			obj = hydrate(_className,json);
			obj.id = rs.fieldByName('id');
			
			results.push(obj);
			rs.next();
		}
		
		rs.close();
		db.close();
		return results;
	};*/
})();