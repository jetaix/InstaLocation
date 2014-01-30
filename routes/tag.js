
exports.tag = function(instagram){

	return function(req, res){

		var tag = req.params.tag;
		console.log(tag);
		instagram.tags.recent({ 
			name: tag,

			complete:function(data){
				var content = [];

				for (var i = 0; i < data.length; i++) {

				    content.push({
				    	
			    		image: {
			    			username: data[i].user.username,
			    			fullname: data[i].user.full_name,
			    			images: data[i].images.standard_resolution.url,
			    			linkImg: data[i].link,
			    			nbComment: data[i].comments.count,
			    			nbLike: data[i].likes.count,
			    			imgUser: data[i].user.profile_picture,
			    			iconUrl: data[i].images.thumbnail.url,
			    		}
				    	
				    });


				}
				res.render('tag', {content : content});
			}

		});
	}

};