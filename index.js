const request = require('request-promise')
var token = null;

// wrap a request in an promise
async function get_token(username, password) {

    if (token != null)
    {
        console.log('token is "'.concat(token).concat('" returning'));
        return;
    }

    return new Promise((resolve, reject) => {
        var url = 'https://www.victorsmartkill.com/api-token-auth/';
        request.post(url, 
                     {form:{'username': username, 'password': password}},
                     (error, response, body) => {
            if (error) 
                reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            token = JSON.parse(body)['token'];
            resolve(token);
            console.log("doesn't have token, fetched it - ".concat(this.token));
        });
    });
}

function callback(error, response, body)
{
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        for (var ii in info['results']) {
            var obj = info['results'][ii];
            var name = obj['name'];
            var kill_presents = parseInt(obj['trapstatistics']['kills_present']);
            if (kill_presents == 0) {
                console.log(name.concat(" - 0"));
            }
            else {
                console.log(name.concat(" - ").concat(kill_presents));
            }
        }
    }
    else{
        console.log(response);
    }
}

async function check_traps(username, password) {
    try {
        await get_token(username, password);
    
        const options = {
          url: 'https://www.victorsmartkill.com/traps/',
          headers :{
              'Host' : 'www.victorsmartkill.com',
              'Connection':'keep-alive',
              'Accept' : '*/*',
              'User-Agent' : 'Victor/1.7 (com.victor.victorsmartkill; build:10; iOS 12.4.0) Alamofire/4.7.0',
              'Accept-Language':'en-US;q=1.0',
              'Authorization':'Token '.concat(token),
              'Accept-Encoding':'gzip;q=1.0, compress;q=0.5',
              'content-length': '0'
          }
        };
        response = await request(options, callback);
        //console.log(response);
    } catch (error) {
        console.error('ERROR:');
        console.error(error);
    }
    return response;
}

//module.exports = check_traps;
exports.check_traps = check_traps;
