// load npm packages
const express = require('express');
const axios = require('axios');

// Fill in app client ID and client secret
const clientID = 'fcdc378efa8f34b1a909';
const clientSecret = '4c54c0f9506aca90b83502907078587e72117bce';

const app = express();

// create a middleware to handling the back-channel auth code <---> access token exchange
const oauth2 = async (req, res) => {
  // pick authorization-code from frontend req
  const code = req.query.code;
  console.log('authorization code:', code);

  // exchange authorization-code for access token
  const token = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${code}`,
    headers: {
      accept: 'application/json'
    }
  });

  // pick access token
  const accessToken = token.data.access_token;
  console.log(`access token: ${accessToken}`);

  // extract data from resource server
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });

  console.log(result.data);
  const name = result.data.name;

  // redirect frontend to welcome page
  res.redirect(`/welcome.html?name=${name}`);

}


app.use(express.static(__dirname + '/public'));
app.get('/oauth/redirect', oauth2);

app.listen(3000, () => {
  console.log('Client oauth 2.0 demo is running');
});
