/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	index: function (req, res) {
 		console.log('loading users...')

 		User.find().exec(
 			function(err, users) {
 				return res.view('users/index', { users: users })
 			}
 			)
 	},

 	new: function (req, res) {
 		return res.view('users/new', {user: User.newObj()} );
 	},

 	create: function (req, res) {
 		var userParams = req.allParams().user;
 		if(userParams !== null) {
 			User.create(userParams).exec(
 				function createCB(err, user){
 					if(err !== null){
 						return res.view('users/new', {user: Object.assign(User.newObj(), userParams), errors: err.errors});
 					}
 					console.log('Created user with name ' + user.email);
 					req.flash('success', ('Successfully created user with email ' + user.email + ' .') );
 					return res.redirect('/users');
 				}
 				);
 		} else {
 			return res.view('users/new', {errors: {base: 'No user data provided.'} } );
 		}
 	},

 	edit: function (req, res) {
 		User.findOne({id: req.params.id}).exec(
 			function (err, user){
 				if (err) {
 					return res.serverError(err);
 				}
 				if (!user) {
 					return res.redirect('/');
 				}
 				sails.log('Found "%s"', user.email);
 				return res.view('users/edit', {user: user });
 			}
 			);
 	},

 	update: function (req, res) {
 		var userParams = req.allParams().user;
 		if(userParams !== null) {
 			User.update({ id : req.param("id")}, userParams).exec(
 				function updateCB(err, data){
 					if(err !== null){
 						return res.view('users/edit', {user: Object.assign(User.newObj(), userParams), errors: err.errors});
 					}
 					req.flash('error', ('Failed to update user "%s".', userParams['email'] ) );
 					return res.redirect('/users');
 				});
 		} else {
 			return res.view('users/edit', {errors: {base: 'No user data provided.'} } );
 		}
 	},

 	show: function (req, res) {
 		User.findOne({id: req.param("id")}).exec(
 			function(err, user){
 				if(err){
 					return res.redirect('/users');		
 				} else {
 					return res.view('users/show', {user: user});
 				}
 			}
 			)
 	},

 	destroy: function (req, res) {
 		User.destroy({ id : req.param("id") }).exec(
 			function deleteCB(err, data){
 				return res.ok();	
 			}
 			);
 	}

 };

