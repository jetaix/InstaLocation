
exports.map = function(){
	
  	return function(req, res){

  		res.render('map', {lat : 12, lng : 12});
	}
  	
};