const helperExtensions = require("../../test-helper-extensions")

module.exports = {

  "testEntireMessageFlow": helperExtensions.cleanFlowPositionData( [
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
          "n1f1",
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f1", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS256",
      "privateKeyFile": "",
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
          "1a20574d.475b21"
        ]
      ]
    },
    { "id": "n2f1", "type": "helper" },
    {
      "id": "1a20574d.475b21",
      "type": "JWT-IN",
      "name": "",
      "algoType": "HASH",
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
          "n3f1"
        ]
      ]
    },
    { "id": "n3f1", "type": "helper" }
  ]),

  "testOptionalsHashMessageFlow": helperExtensions.cleanFlowPositionData( [
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
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS512",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": true,
      "issuer": "urn:issuer",
      "subject": "subject",
      "audience": "urn:foo",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "tokenExpires": true,
      "expiresIn": 60,
      "expiresInUnit": "s",
      "tokenNotBefore": true,
      "notBefore": 1,
      "notBeforeUnit": "s",
      "wires": [
        [
          "n2f2",
          "ad809de1.a85bd"
        ]
      ]
    },
    { "id": "n2f2", "type": "helper" },
    {
      "id": "ad809de1.a85bd",
      "type": "delay",
      "name": "",
      "pauseType": "delay",
      "timeout": "2",
      "timeoutUnits": "seconds",
      "rate": "1",
      "nbRateUnits": "1",
      "rateUnits": "second",
      "randomFirst": "1",
      "randomLast": "5",
      "randomUnits": "seconds",
      "drop": false,
      "wires": [
        [
          "n3f2",
          "1a20574d.475b21",
          "3d236890.683438"
        ]
      ]
    },
    { "id": "n3f2", "type": "helper" },
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
        ["n4f2"]
      ]
    },
    { "id": "n4f2", "type": "helper" },
    {
      "id": "3d236890.683438",
      "type": "JWT-IN",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "publicKeyFile": "",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": true,
      "issuer": "urn:issuer",
      "subject": "subject",
      "audience": "urn:foo",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        ["n5f2"]
      ]
    },
    { "id": "n5f2", "type": "helper" }
  ]),

  "testMsgOptionalsHashMessageFlow": helperExtensions.cleanFlowPositionData( [
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
          "34dee285.63cd36"
        ]
      ]
    },
    {
      "id": "34dee285.63cd36",
      "type": "function",
      "name": "options",
      "func": "msg.jwt = {\n    options : {\n        audience: \"urn:foo\", \n        issuer: \"urn:issuer\", \n        jwtid: \"jwtid\", \n        subject: \"subject\" \n    }\n}\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "wires": [
        [
          "n1f3",
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f3", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS512",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": true,
      "useOptions": true,
      "issuer": "urn:issuer1",
      "subject": "subject1",
      "audience": "urn:foo1",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "tokenExpires": true,
      "expiresIn": 60,
      "expiresInUnit": "s",
      "tokenNotBefore": true,
      "notBefore": 1,
      "notBeforeUnit": "s",
      "wires": [
        [
          "n2f3",
          "ad809de1.a85bd"
        ]
      ]
    },
    { "id": "n2f3", "type": "helper" },
    {
      "id": "ad809de1.a85bd",
      "type": "delay",
      "name": "",
      "pauseType": "delay",
      "timeout": "2",
      "timeoutUnits": "seconds",
      "rate": "1",
      "nbRateUnits": "1",
      "rateUnits": "second",
      "randomFirst": "1",
      "randomLast": "5",
      "randomUnits": "seconds",
      "drop": false,
      "wires": [
        [
          "n3f3",
          "1a20574d.475b21",
          "3d236890.683438"
        ]
      ]
    },
    { "id": "n3f3", "type": "helper" },
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
        ["n4f3"]
      ]
    },
    { "id": "n4f3", "type": "helper" },
    {
      "id": "3d236890.683438",
      "type": "JWT-IN",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "publicKeyFile": "",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": true,
      "showErrors": false,
      "useOptions": true,
      "issuer": "urn:issuer",
      "subject": "subject",
      "audience": "urn:foo",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        ["n5f3"]
      ]
    },
    { "id": "n5f3", "type": "helper" }
  ]),

  "testMsgOptionalsHashPropertyFlow": helperExtensions.cleanFlowPositionData( [
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
          "34dee285.63cd36"
        ]
      ]
    },
    {
      "id": "34dee285.63cd36",
      "type": "function",
      "name": "options",
      "func": "msg.jwt = {\n    options : {\n        audience: \"urn:foo\", \n        issuer: \"urn:issuer\", \n        jwtid: \"jwtid\", \n        subject: \"subject\" \n    }\n}\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "wires": [
        [
          "n1f4",
          "2e9e94be.c27294"
        ]
      ]
    },
    { "id": "n1f4", "type": "helper" },
    {
      "id": "2e9e94be.c27294",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS512",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": true,
      "useOptions": false,
      "issuer": "urn:issuer1",
      "subject": "subject1",
      "audience": "urn:foo1",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "tokenExpires": true,
      "expiresIn": 60,
      "expiresInUnit": "s",
      "tokenNotBefore": true,
      "notBefore": 1,
      "notBeforeUnit": "s",
      "wires": [
        [
          "n2f4",
          "ad809de1.a85bd"
        ]
      ]
    },
    { "id": "n2f4", "type": "helper" },
    {
      "id": "ad809de1.a85bd",
      "type": "delay",
      "name": "",
      "pauseType": "delay",
      "timeout": "2",
      "timeoutUnits": "seconds",
      "rate": "1",
      "nbRateUnits": "1",
      "rateUnits": "second",
      "randomFirst": "1",
      "randomLast": "5",
      "randomUnits": "seconds",
      "drop": false,
      "wires": [
        [
          "n3f4",
          "1a20574d.475b21",
          "3d236890.683438"
        ]
      ]
    },
    { "id": "n3f4", "type": "helper" },
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
        ["n4f4"]
      ]
    },
    { "id": "n4f4", "type": "helper" },
    {
      "id": "3d236890.683438",
      "type": "JWT-IN",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "publicKeyFile": "",
      "tokenPayload": "",
      "selectedProperty": "",
      "entireMessage": false,
      "showErrors": false,
      "useOptions": false,
      "issuer": "urn:issuer",
      "subject": "subject",
      "audience": "urn:foo",
      "jwtId": "5c0ecf0d5b28bd659a8a4625",
      "ignoreExpiration": false,
      "ignoreNotBefore": false,
      "clockTolerance": 1,
      "clockToleranceUnit": "s",
      "useMaxAge": false,
      "maxAge": 120,
      "maxAgeUnit": "s",
      "wires": [
        ["n5f4"]
      ]
    },
    { "id": "n5f4", "type": "helper" }
  ])
}
