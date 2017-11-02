
module.exports = function(app) {
	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "index.html"));
	});


	app.get("/all", function(req, res) {
	});

};