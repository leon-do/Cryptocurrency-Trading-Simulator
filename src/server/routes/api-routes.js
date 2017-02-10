module.exports = (app) => {
	app.post('/login', (req, res) => {
		//  replace current contents with login/new user code
		console.log(req);
		res.end();
	});
};