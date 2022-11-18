'use strict';

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
let util = require('util');
const request = require('request');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            require('jsonwebtoken').verify(req.body.toString('utf8'), process.env.jwtSecret, {
                algorithm: 'HS256'
            }, (error, myDecoded)=>{
                if (error) {
                    console.error(error);
                    return res.status(401).end();
                }
                console.log("Incallback",myDecoded,JSON.stringify(myDecoded));
            });
            
            console.log("decoded.inArguments[0].contactKey: " + decoded.inArguments[0].contactKey);
            console.log('decodedArgs-'+JSON.stringify(decoded.inArguments));
            logData(req);
            let bodyToSend = '';
            switch (decoded.inArguments[5].selectedTemplate.toString()) {
              case '1':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "en"
                      },
                      "name": "presales_promote_online_sales_reservation",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/Buy+Car+Online+En.jpg"
                      }
                    }
                          ]
                      }]
                  }
              }
                break;
              case '2':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "ar"
                      },
                      "name": "presales_promote_online_sales_reservation",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/Buy+Car+Online+Ar.jpg"
                      }
                    }
                          ]
                      }]
                  }
              };
              break;
              case '3':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "en"
                      },
                      "name": "post_purchase_promote_online_sales",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/post_purchase_promote_online_sales+-+English.jpg"
                      }
                    }
                          ]
                      }]
                  }
              }
              break;

              case '4':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "ar"
                      },
                      "name": "post_purchase_promote_online_sales",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/post_purchase_promote_online_sales+-+Arabic.jpg"
                      }
                    }
                          ]
                      }]
                  }
              };
              break;

              case '5':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "en"
                      },
                      "name": "post_service_visit",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/post_service_visit+-+English.jpg"
                      }
                    }
                          ]
                      }]
                  }
              };
              break;

              case '6':
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": { 
                  "namespace": "7cf78afe_6967_440e_b6a2_4e56fd6d4c26",
                      "language": {
                          "policy": "deterministic",
                          "code": "ar"
                      },
                      "name": "post_service_visit",
                      "components": [{
                          "type": "header",
                          "parameters": [{
                      "type": "image",
                      "image": {
                        "link": "https://car-care-imges.s3.us-west-2.amazonaws.com/post_service_visit+-+Arabic.jpg"
                      }
                    }
                          ]
                      }]
                  }
              }
              break;
            
              default:
                bodyToSend = {
                  "to": decoded.inArguments[4].myPhoneArgument.toString(),
                  "type": "template",
                  "template": {
                    "namespace": "ecafd84e_6829_4074_bd9d_382a28af2296",
                    "language": {
                      "policy": "deterministic",
                      "code": "en"
                    },
                    "name": "service",
                    "components": [
                      {
                        "type": "body",
                        "parameters": [
                          {
                            "type": "text",
                            "text": decoded.inArguments[1].myNameArgument.toString()
                          },
                          {
                            "type": "text",
                            "text": "sharjah"
                          },
                          {
                            "type": "text",
                            "text": "27/12/2021"
                          },
                          {
                            "type": "text",
                            "text": "16:00"
                          },
                          {
                            "type": "text",
                            "text": "Faisal"
                          },
                          {
                            "type": "text",
                            "text": "+971502227241"
                          },
                          {
                            "type": "text",
                            "text": "123456"
                          }
                        ]
                      }
                    ]
                  }
                };
                break;
            }
            let options = {
                'method': 'POST',
                'url': 'https://waba.360dialog.io/v1/messages',
                'headers': {
                  'D360-API-KEY': 'ZqinuCd1RzJ5bAX8AvI9go2YAK',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyToSend)
              
              };
              request(options, function (error, response) {
                if (error) {
                    res.send(200, {"status": "Fail","contactId":decoded.inArguments[0].contactKey});
                }
                res.send(200, {"status": "Sent","contactId":decoded.inArguments[0].contactKey});
        
              });
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


// async function sendUpdates(){
//     let response = await axios.post('https://mcv7gfn0-v8t3lz0455cfvswsfk0.auth.marketingcloudapis.com/v2/token',
//     {
//         "grant_type": "client_credentials",
//         "client_id": "baot2fkv0x5ehiu7p2thkivt",
//         "client_secret": "vaU3posckWiDmiRlbDLnjqJ0",
//         "account_id": "536002418"
//     }).then((response)=>{
//         console.log(response);
//     }).catch((err)=>{
//         console.log(err);
//     })
// } 

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};