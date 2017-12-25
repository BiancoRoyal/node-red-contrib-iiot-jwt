![Platform Node-RED](http://b.repl.ca/v1/Platform-Node--RED-red.png)
![Node-RED JWT](http://b.repl.ca/v1/Node--RED-JWT-blue.png)
[![Repository GitHub](http://b.repl.ca/v1/Repository-GitHub-orange.png)](https://github.com/biancode/node-red-contrib-iiot-jwt)
[![Quality Travis CI](http://b.repl.ca/v1/Quality-Travis_CI-green.png)](https://travis-ci.org/biancode/node-red-contrib-iiot-jwt)
[![Build Status](https://travis-ci.org/biancode/node-red-contrib-iiot-jwt.svg?branch=master)](https://travis-ci.org/biancode/node-red-contrib-iiot-jwt)

[![nodejsonwebtoken](images/jwt-icon-small64.png)](https://jwt.io/)

# node-red-contrib-iiot-jwt
The JSON Web Token (JWT) toolbox package for Node-RED.

!!! UNDER DEVELOPMENT - START YOUR CONTRIBUTION !!!
## [Support for the project straight away!][3]

* based on jsonwebtoken library v8.x

### JWT Version

JWT 8.x

## Install

Run command on Node-RED installation directory.

	npm install node-red-contrib-iiot-jwt 

or run command for global installation.

	npm install -g node-red-contrib-iiot-jwt 

try these options on npm install to build, if you have problems to install

    --unsafe-perm --build-from-source
    
## TODO

* using options:
** algorithm (default: HS256)
** expiresIn
** notBefore
** audience
** issuer
** jwtid
** subject
** noTimestamp
** header
** keyid
* using key files

    
## Contributing

Let's work together! 
Please read and in best case accept [CONTRIBUTING](CONTRIBUTING.md) by your sign and send it via E-Mail.
You could also send just a pull request.

### License

The MIT License

[Klaus Landsdorf][1]

### Important

This is **not** an official product of the AuthO Group.
It is just to provide JSON Web Tokens to Node-RED based on jsonwebtoken package.

### Contribution JWT

I'd like to give special thanks to [AuthO][2] for the jwt package! 


[1]:https://bianco-royal.cloud/
[2]:https://github.com/auth0/
[3]:https://bianco-royal.cloud/supporter/
[4]:https://www.npmjs.com/package/jsonwebtoken/
[5]:https://jwt.io/
