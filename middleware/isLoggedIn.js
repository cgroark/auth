//detecting logged in user with middleware
module.exports = function(req, res, next){
	if(!req.user){
		req.flash("error", "you must be logged in to see this one pal");
		res.redirect("/auth/login");
	}
	else{
		next();
	}
}
