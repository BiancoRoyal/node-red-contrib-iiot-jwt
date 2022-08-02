const helperExtensions = require("../test-helper-extensions")

module.exports = {

  "testFlowPayload": helperExtensions.cleanFlowPositionData( [
    {
      "id": "n1",
      "type": "inject",
      "payload": "eyJhbGciOiJIUzI1NiJ9.VGVzdA.QrGSd49pBydy_lJuAiCbNVG7_F6inUTJub7k_FpW7Tk",
      "payloadType": "str",
      "once": true,
      "wires": [["n2", "n3"]]
    },
    { "id": "n2", "type": "helper" },
    {
      "id": "n3",
      "type": "JWT-IN",
      "selectedProperty": "payload",
      "wires": [["n4"]]
    },
    { "id": "n4", "type": "helper" }
  ]),

  "testFlowToken": helperExtensions.cleanFlowPositionData( [
    {
      "id": "n1",
      "type": "inject",
      "payload": "Test",
      "payloadType": "str",
      "once": true,
      "wires": [["n2", "n3"]]
    },
    { "id": "n2",
      "type": "function",
      "func": "msg.token = \"eyJhbGciOiJIUzI1NiJ9.Tm9kZS1SRUQtSldU.-5uQr1GLmUwjw2b1DF8gWptQ3C1TKGppSBu5sV-MPEk\";\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "wires": [["n3", "n4"]]
    },
    { "id": "n3", "type": "helper" },
    {
      "id": "n4",
      "type": "JWT-IN",
      "wires": [["n5"]]
    },
    { "id": "n5", "type": "helper" }
  ])
}
