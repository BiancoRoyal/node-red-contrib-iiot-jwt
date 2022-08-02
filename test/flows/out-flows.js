const helperExtensions = require("../test-helper-extensions")

module.exports = {

  "testFlowPayload": helperExtensions.cleanFlowPositionData( [
    {
      "id": "n2",
      "type": "helper",
      "z": "e04af34b13fffc53",
      "name": "",
      "active": true,
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 490,
      "y": 280,
      "wires": []
    },
    {
      "id": "n3",
      "type": "JWT-OUT",
      "z": "e04af34b13fffc53",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS256",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "payload",
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
      "x": 480,
      "y": 220,
      "wires": [
        [
          "n4"
        ]
      ]
    },
    {
      "id": "n4",
      "type": "helper",
      "z": "e04af34b13fffc53",
      "name": "",
      "active": true,
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 690,
      "y": 220,
      "wires": []
    },
    {
      "id": "n1",
      "type": "inject",
      "z": "e04af34b13fffc53",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": "",
      "crontab": "",
      "once": true,
      "onceDelay": "0.2",
      "topic": "",
      "payload": "test message",
      "payloadType": "str",
      "x": 260,
      "y": 220,
      "wires": [
        [
          "n3",
          "n2"
        ]
      ]
    }
  ]),

  "testFlowToken": helperExtensions.cleanFlowPositionData( [
    {
      "id": "n1",
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
          "n2", "n3"
        ]
      ]
    },
    { "id": "n2", "type": "helper" },
    {
      "id": "n3",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "HASH",
      "signature": "",
      "algoHash": "HS256",
      "privateKeyFile": "",
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
          "n4"
        ]
      ]
    },
    { "id": "n4", "type": "helper" }
  ]),

  "testNoneFlowPayload": helperExtensions.cleanFlowPositionData( [
    {
      "id": "n1f2",
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
          "n2f2", "n3f2"
        ]
      ]
    },
    { "id": "n2f2", "type": "helper" },
    {
      "id": "n3f2",
      "type": "JWT-OUT",
      "name": "",
      "algoType": "NONE",
      "signature": "",
      "algoHash": "HS256",
      "privateKeyFile": "",
      "algoFile": "RS256",
      "tokenPayload": "",
      "selectedProperty": "payload",
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
          "n4f2"
        ]
      ]
    },
    { "id": "n4f2", "type": "helper" }
  ])
}
