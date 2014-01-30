
exports.jsonRes = function(instagram, request){

	return function(req, res){

	var city = req.params.city;

	request('http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false', function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	var dataResult = JSON.parse(body);
		var latitude = dataResult.results[0].geometry.location.lat;
		var longitude = dataResult.results[0].geometry.location.lng; 

		
		instagram.media.search({
			lat: latitude,
			lng: longitude,

			complete:function(data, pagination){
				console.log(pagination);
				res.render('jsonRes', {data : data});
			}
		});	   

	  }
	});

	}

};