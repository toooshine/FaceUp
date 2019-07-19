var express = require('express');
var router = express.Router();

var cloudinary = require('cloudinary');
var pictureModel = require('../models/picture');
cloudinary.config({
	cloud_name: 'toooshine',
	api_key: '679619914182143',
	api_secret: '4qz9PcXPDa3bux8fgVSFkdNZo4g'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(pictureModel);
	res.render('index', { title: 'Express' });
});

router.get('/pictures', function(req, res, next) {
	pictureModel.find(function(err, data) {
		res.json({ data });
	});
});

router.post('/upload', function(req, res, next) {
	var randomName = Math.floor(Math.random() * 1000000);
	var photoPath = `public/images/selfie-${randomName}.jpg`;
	var filename = req.files.photo;

	req.files.photo.mv(photoPath, function(err) {
		if (err) {
			res.json({ result: false, message: err });
		} else {
			cloudinary.v2.uploader.upload(photoPath, function(error, result) {
				if (result) {
					var newPicture = new pictureModel({
						url: result.secure_url,
						name: result.original_filename
					});

					newPicture.save(function(error, picture) {
						console.log('PICTURE SAVED IN MLAB --> ' + picture);
						res.json({ result: true, data: picture });
					});
				}
			});
		}
	});
});

module.exports = router;
