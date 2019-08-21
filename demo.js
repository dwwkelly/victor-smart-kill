var VKS = require('victor-smart-kill');

var username = "email";
var password = "password"

traps = VKS.check_traps(username, password);
traps2 = setTimeout(function() {return VKS.check_traps(username, password);}, 3000);

console.log(traps);
