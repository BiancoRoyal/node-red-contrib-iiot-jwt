const helperExtensions = require("../../test-helper-extensions")

module.exports = {

  "testRS256PayloadFlow": helperExtensions.cleanFlowPositionData( [
    {
      "id": "e347a834.107f48",
      "type": "inject",
      "name": "",
      "topic": "",
      "payload": "test content",
      "payloadType": "str",
      "repeat": "",
      "crontab": "",
      "once": true,
      "wires": [
        [
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f1", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "FILE",
      "signature": "",
      "algoHash": "",
      "privateKeyFile": "../examples/keys/private.pem",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "tokenExpires": false,
      "expiresIn": 60,
      "expiresInUnit": "s",
      "tokenNotBefore": false,
      "notBefore": 1,
      "notBeforeUnit": "s",
      "wires": [
        [
          "n2f1",
          "1a20574d.475b21",
          "3d236890.683438"
        ]
      ]
    },
    { "id": "n2f1", "type": "helper" },
    {
      "id": "1a20574d.475b21",
      "type": "JWT-IN",
      "name": "",
      "algoType": "DECODE",
      "signature": "",
      "publicKeyFile": "",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        [ "n3f1" ]
      ]
    },
    { "id": "n3f1", "type": "helper" },
    {
      "id": "3d236890.683438",
      "type": "JWT-IN",
      "name": "",
      "algoType": "FILE",
      "signature": "",
      "publicKeyFile": "../examples/keys/public.pem",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        [ "n4f1" ]
      ]
    },
    { "id": "n4f1", "type": "helper" }
  ]),

  "testRS256MessageFlow": helperExtensions.cleanFlowPositionData( [
    {
      "id": "e347a834.107f48",
      "type": "inject",
      "name": "",
      "topic": "",
      "payload": "test message",
      "payloadType": "str",
      "repeat": "",
      "crontab": "",
      "once": true,
      "wires": [
        [
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f1", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "FILE",
      "signature": "",
      "algoHash": "",
      "privateKeyFile": "../examples/keys/private.pem",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "tokenExpires": false,
      "expiresIn": 60,
      "expiresInUnit": "s",
      "tokenNotBefore": false,
      "notBefore": 1,
      "notBeforeUnit": "s",
      "wires": [
        [
          "n2f1",
          "1a20574d.475b21",
          "3d236890.683438"
        ]
      ]
    },
    { "id": "n2f1", "type": "helper" },
    {
      "id": "1a20574d.475b21",
      "type": "JWT-IN",
      "name": "",
      "algoType": "DECODE",
      "signature": "",
      "publicKeyFile": "",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        [ "n3f1" ]
      ]
    },
    { "id": "n3f1", "type": "helper" },
    {
      "id": "3d236890.683438",
      "type": "JWT-IN",
      "name": "",
      "algoType": "FILE",
      "signature": "",
      "publicKeyFile": "../examples/keys/public.pem",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": false,
      "issuer": "",
      "subject": "",
      "audience": "",
      "jwtId": "",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        [ "n4f1" ]
      ]
    },
    { "id": "n4f1", "type": "helper" }
  ])
}
