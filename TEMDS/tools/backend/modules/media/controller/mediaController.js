/**
 * Created by Saul on 4/25/16.
 */

'use strict';
var _ = rq('lodash');
var AWS = rq('aws-sdk');
var Venue = rq('venueModel');
var VenueDetail = rq('venueDetailModel');
var Collections = rq('collectionsModel');

module.exports.signAmazon = function (req, res) {
	console.log('signing name', req.params.name);
	console.log('signing type', req.params.type);
	var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
	var S3_BUCKET = process.env.S3_BUCKET;

	AWS.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });

	var s3 = new AWS.S3();
	var s3_params = {
		Bucket: S3_BUCKET,
		Key: req.params.name,
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
				url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.params.name
			};
			res.write(JSON.stringify(return_data));
			res.end();
		}
	});
};