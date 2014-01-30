
exports.mediaSearch = function(instagram, request){

	return function(req, res){

	var city = req.body.request;

	request('http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false', function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	var dataResult = JSON.parse(body);
		var latitude = dataResult.results[0].geometry.location.lat;
		var longitude = dataResult.results[0].geometry.location.lng; 

		
		instagram.media.search({
			lat: latitude,
			lng: longitude,

			complete:function(data){
				var dataLength = data.length;
				var content = [];
				var mapping = [];

				for (var i = 0; i < dataLength; i++) {

					var created_time = data[i].created_time;
					var current = new Date();
					var date = new Date(created_time * 1000);
					var listComment = [];

					var listLike = [];

					for(var t = 0 ; t < data[i].likes.data.length ; t++){
						listLike[t] = data[i].likes.data[t];
					}

					for(var j = 0 ; j < data[i].comments.data.length ; j++){
						listComment[j] = data[i].comments.data[j];
					}
					//j = 0;
				    content.push({
				    	
			    		image: {
			    			username: data[i].user.username,
			    			fullname: data[i].user.full_name,
			    			images: data[i].images.standard_resolution.url,
			    			linkImg: data[i].link,
			    			nbComment: data[i].comments.count,
			    			nbLike: data[i].likes.count,
			    			imgUser: data[i].user.profile_picture,
			    			dateMonth : date.getMonth()+1,
			    			dateYear : date.getFullYear(),
			    			dateDay : date.getDate(),
			    			iconUrl: data[i].images.thumbnail.url,
			    			listComment: listComment,
							listLike: listLike
			    		}
				    	
				    });
				}

				for (var i = 0; i < dataLength; i++) {
				    mapping.push({
				    	
				    		type: 'Feature',
				    		properties: {
				    			username: data[i].user.username,
				    			fullname: data[i].user.full_name,
				    			images: data[i].images.standard_resolution.url,
				    			linkImg: data[i].link,
				    			nbLike: data[i].likes.count,
				    			date: data[i].created_time,
				    			imgUser: data[i].user.profile_picture,
						        icon: {
						            iconUrl: data[i].images.thumbnail.url,
						            iconSize: [50, 50],
						            iconAnchor: [0, 0],
						            popupAnchor: [15, -10],
						            className: "dot",

						        }
						    
				    		},
				    		geometry: {
				    			type: 'Point',
				    			coordinates: [data[i].location.longitude , data[i].location.latitude]
				    		}
				    	
				    });
				}


				//res.json(jsonArr);
				res.render('mediaSearch', {dataLength : dataLength, mapping : mapping, content : content, latitude : latitude, longitude : longitude});
				//res.json(jsonArr);
			}
		});	   

	  }
	});

	}

};