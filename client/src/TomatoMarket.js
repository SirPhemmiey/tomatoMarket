import web3 from './web3';

const address = '0xA497c24032043D9e96ff6b80747B51449dcf0167';

const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "message",
          "type": "string"
        }
      ],
      "name": "TomatoAdded",
      "type": "event",
      "signature": "0x8337155f98bedbe9df880a51899a134cca67d26eb1094d2b0ef63b09488a45d4"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTomatoCount",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x2db95aa9"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "displayName",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "uint8"
        },
        {
          "name": "status",
          "type": "uint8"
        },
        {
          "name": "photoHash",
          "type": "string"
        }
      ],
      "name": "addTomato",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x9115b484"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "tomatoId",
          "type": "uint8"
        }
      ],
      "name": "getTomato",
      "outputs": [
        {
          "name": "displayName",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "uint8"
        },
        {
          "name": "photoHash",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc8d9ebc4"
    }
  ]

  export default new web3.eth.Contract(abi, address);