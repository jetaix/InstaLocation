
exports.mediaSearch = function(instagram){

	return function(req, res){

		instagram.media.search({ 
			lat: 48.880141,
			lng: 2.415873,
			complete:function(data){
				var dataLength = data.length;
				var jsonArr = [];

				for (var i = 0; i < dataLength; i++) {
				    jsonArr.push({
				    	
				    		type: 'Feature',
				    		properties: {
				    			title: data[i].user.username
				    		},
				    		geometry: {
				    			type: 'Point',
				    			coordinates: [data[i].location.longitude , data[i].location.latitude]
				    		}
				    	
				    });
				}

				//res.json(jsonArr);
				res.render('mediaSearch', {json : jsonArr});
				//res.json(jsonArr);
			}
		});
	}

};