
exports.userSearch = function(instagram){

	return function(req, res){

		instagram.users.search({ 
			q: 'jordan',
			complete: function(data){
				
				//var cpt = Object.keys(data).length;
				//var username = data.username;
				//res.json('userSearch', { search : data });
				var dataLength = data.length;
				//console.log(data[1].username);
				res.render('userSearch', {dataLength : dataLength, data : data});
			}
		});
	}

};