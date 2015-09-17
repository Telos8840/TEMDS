/**
 * Created with PhpStorm.
 * User: Saul Guardado
 * Date: 9/11/15
 * Time: 10:07 PM
 */

module.exports.success = function (res, message) {
  message = !message ? "Success" : message;

  console.log("HTTP Status 200:", message);

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify({
    message: message
  }));
};

module.exports.error = function (res, message, err) {
  message = !message ? "Error" : message;

  console.log("HTTP Status 400:", message);

  res.writeHead(400, {
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify({
    error: err,
    message: message
  }));
};

module.exports.invalid = function (res, message) {
  message = !message ? "Invalid" : message;

  console.log("HTTP Status 403:", message);

  res.writeHead(403, {
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify({
    message: message
  }));
};

module.exports.sendJSON = function (res, json) {
  console.log("HTTP Status 200: Sending JSON");

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify(json));
};