var VKS = require('victor-smart-kill');
const fs = require('fs');

// Set these variables or set them in login.json (which isn't version controlled)
// var username = "email";
// var password = "password"


let rawdata = fs.readFileSync('login.json');
let username = JSON.parse(rawdata)['username'];
let password = JSON.parse(rawdata)['password'];

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

traps = VKS.check_traps(username, password, callback);
traps2 = setTimeout(function() {return VKS.check_traps(username, password, callback);}, 3000);

console.log(traps);
