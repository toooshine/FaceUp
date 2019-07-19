const mongoose = require('mongoose');

var pictureSchema = mongoose.Schema({
	url: String,
	name: String
});
var pictureModel = mongoose.model('picture', pictureSchema);

module.exports = pictureModel;
