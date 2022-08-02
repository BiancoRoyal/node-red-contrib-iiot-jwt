const helperExtensions = require("../../test-helper-extensions")

module.exports = {

  "testUnsignedPayloadFlow": helperExtensions.cleanFlowPositionData( [
    {
      "id": "ba201f96.24b0d8",
      "type": "inject",
      "name": "",
      "topic": "TestTopic",
      "payload": "{ \"text\": \"test content\" }",
      "payloadType": "json",
      "repeat": "",
      "crontab": "",
      "once": true,
      "startDelay": "1",
      "wires": [
        [
          "n1f1",
          "59d58a47.02d6a4"
        ]
      ]
    },
    { "id": "n1f1", "type": "helper" },
    {
      "id": "59d58a47.02d6a4",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "NONE",
      "signature": "",
      "algoHash": "HS256",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": true,
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
          "f43bebe.cfa3f98"
        ]
      ]
    },
    { "id": "n2f1", "type": "helper" },
    {
      "id": "f43bebe.cfa3f98",
      "type": "JWT-IN",
      "name": "",
      "algoType": "NONE",
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
        [
          "n3f1"
        ]
      ]
    },
    { "id": "n3f1", "type": "helper" }
  ]),

  "testEntireUnsignedMessageFlow": helperExtensions.cleanFlowPositionData( [
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
          "n1f2",
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f2", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "NONE",
      "signature": "",
      "algoHash": "",
      "privateKeyFile": "",
      "algoFile": "",
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
          "n2f2",
          "1a20574d.475b21"
        ]
      ]
    },
    { "id": "n2f2", "type": "helper" },
    {
      "id": "1a20574d.475b21",
      "type": "JWT-IN",
      "name": "",
      "algoType": "NONE",
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
        [
          "n3f2"
        ]
      ]
    },
    { "id": "n3f2", "type": "helper" }
  ])
}
