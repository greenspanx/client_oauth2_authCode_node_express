A very simple demo of Client OAuth 2.0 using Node.js + Express，to add GitHub login to your app and access GitHub API.

There are four modes of OAuth 2.0:
1. authorization-code (the most strict mode)
```
https://b.com/oauth/authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=CALLBACK_URL&
  scope=read
```


input user name and password, approve
request(redirect) to client server:
```
https://a.com/callback?code=AUTHORIZATION_CODE
```

######################################

back-channel:
request to resource server:
```
https://b.com/oauth/token?
 client_id=CLIENT_ID&
 client_secret=CLIENT_SECRET&
 grant_type=authorization_code&
 code=AUTHORIZATION_CODE&
 redirect_uri=CALLBACK_URL
```

response to client server:
```
{    
  "access_token":"ACCESS_TOKEN",
  "token_type":"bearer",
  "expires_in":2592000,
  "refresh_token":"REFRESH_TOKEN",
  "scope":"read",
  "uid":100101,
  "info":{...}
}
```

request to resource server: get data
response to client server: receive data
######################################

response: redirect to login successful page

2. implicit (suits pure frontend app without the corresponding backend)
request:
```
https://b.com/oauth/authorize?
  response_type=token&
  client_id=CLIENT_ID&
  redirect_uri=CALLBACK_URL&
  scope=read
```

input user name and password, approve

response:
```
https://a.com/callback#token=ACCESS_TOKEN
```

normally, once session is closed, access token expires.

3. password
user input user name and password, and send to client backend.
```
https://oauth.b.com/token?
  grant_type=password&
  username=USERNAME&
  password=PASSWORD&
  client_id=CLIENT_ID
```

client(A site) use user name and password to get user's data from B site.

4. client credentials (suits CLI app)
request: send request from command line(CLI):
```
https://oauth.b.com/token?
  grant_type=client_credentials&
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET
```

response: receive access token from site B.

This demo shows the first yet the most strict mode: authorization-code.

## Step one: register the app

Register the app on Github : https://github.com/settings/applications/new .


- "Application name" field, enter any name you like.
- "Homepage URL" field, enter "http://localhost:3000/ ".
- "callback URL" field, enter "http://localhost:3000/oauth/redirect ".

Once registered, you will get a client ID and a client secret.

## Step two: get the code

First, clone the repo.

```bash
$ git clone
$ cd ...
```

Second, modify the config.

- `index.js`: replace the values of the `clientID` and `clientSecret` variables.
- `public/index.html`: replace the values of the `client_id` variable.

Third, install the dependencies.

```bash
$ npm install
```

## Step three: run the server

Now, run the server.

```bash
$ node index.js
```

Visit http://localhost:3000 in your browser, and click the link to login GitHub.
