
var soap = require('soap');
var url = 'http://localhost:4000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
  /* 
  * Parameters of the service call: they need to be called as specified
  * in the WSDL file
  */
  // call the service
  console.log(client.describe());
});