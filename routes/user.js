
exports.userSearch = function(instagram){

	return function(req, res){

		instagram.users.search({ 
			q: 'jetaix',
			complete: function(data){
				//res.json({item : data});

				json = res.json(data);

				console.log(json);
				//res.render('users', { data : json});
				//res.render('users', {users : data});
			}
		});

	}

};