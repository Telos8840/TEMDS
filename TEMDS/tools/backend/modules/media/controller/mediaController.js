/**
 * Created by Saul on 4/25/16.
 */

'use strict';
var _ = rq('lodash');
var fs = rq('fs');
var AWS = rq('aws-sdk');
var Venue = rq('venueModel');
var VenueDetail = rq('venueDetailModel');
var Collections = rq('collectionsModel');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

module.exports.signAmazon = function (req, res) {
	var keyName = _.join([req.params.venueId.toString(), encodeURIComponent(req.params.name)], '/');

	AWS.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });

	var s3 = new AWS.S3();
	var s3_params = {
		Bucket: S3_BUCKET,
		Key: keyName,
		Expires: 60,
		ContentType: req.params.type,
		ACL: 'public-read'
	};

	s3.getSignedUrl('putObject', s3_params, function(err, data){
		if(err){
			console.log(err);
		}
		else{
			var return_data = {
				signed_request: data,
				url: 'https://s3-us-west-2.amazonaws.com/temds/' + keyName
			};
			res.write(JSON.stringify(return_data));
			res.end();
		}
	});
};

module.exports.uploadToAmazon = function (req, res) {
	AWS.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });

	var body = req.body,
		file = req.file,
		aws = 'https://s3-us-west-2.amazonaws.com/temds/',
		s3Bucket = new AWS.S3({params: {Bucket: S3_BUCKET}});
		file.originalname = file.originalname.replace(/ /g, "_");

	var keyName = _.join([body.venueId.toString(), encodeURIComponent(file.originalname)], '/'),
		params = {
			Key: keyName,
			ContentType: file.mimetype,
			Body: file.buffer
		};

	s3Bucket.putObject(params, function(err, data){
		if (err) {
			console.log('Error uploading data: ', err);
			return res.status(400)
				.send('Error uploading to Amazon ' + err);
		} else {
			if (body.isMain == 'true') {
				Venue.findById(body.venueId, function (err, venue) {
					if(err) {
						return res.status(400)
							.send("Error finding Venue \n" + err);
					} else {
						venue.img = aws + keyName;

						venue.save(function (err, v) {
							if (err) {
								console.log(err);
								return res.status(400)
									.send("Error saving venue image");
							} else {
								return res.status(200)
									.send('Venue updated successfully!');
							}
						});
					}
				});
			} else {
				VenueDetail.find({ venueId: body.venueId }).exec(function (err, detail) {
					if(err) {
						return res.status(400)
							.send("Error finding Venue \n" + err);
					} else {
						detail = detail[0];
						if (!detail.gallery){
							detail.gallery = [aws + keyName];
						} else {
							detail.gallery.push(aws + keyName);
						}

						detail.save(function (err, d) {
							if (err) {
								console.log(err);
								return res.status(400)
									.send("Error saving venue image");
							} else {
								return res.status(200)
									.send('Venue Detail updated successfully!');
							}
						});
					}
				});
			}
		}
	});
};
