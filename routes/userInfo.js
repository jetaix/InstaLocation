
exports.userInfo = function(instagram){

	return function(req, res){

		instagram.users.info({ 
			user_id: 272745024,
			complete: function(data){
				
				var user_name = data.username,
					user_id = data.id;
				console.log(data);
				res.render('userInfo', { user_name : user_name, user_id : user_id });
			}
		});

	}

};