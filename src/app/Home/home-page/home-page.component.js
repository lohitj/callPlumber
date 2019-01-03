const accountSid = 'AC115eb66175b1b1073c6b369fc2de043c';
const authToken = 'c3b64f1820c18cb19c669d850a468c67';
function sendText () { 
  alert("lohit");
const client = require('twilio')(accountSid,authToken);
    client.messages.create({
      body: 'Hello from Node',
      to: '+918427262396',
      from: '+17193995051'
    })
      .then((message) => console.log(message.sid));
  }