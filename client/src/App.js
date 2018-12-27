import React from 'react'
import logo from './logo.png';
import TomatoList from './TomatoList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import TomatoToolbar from './TomatoToolbar';
import TomatoMarketContract from './contracts/TomatoMarket.json';

class App extends React.Component {
  constructor() {
    super();

    const ipfsScript = document.createElement("script");
    const fileBufferScript = document.createElement("script");

    ipfsScript.src = "https://unpkg.com/ipfs-api/dist/index.js";
    ipfsScript.async = true;

    fileBufferScript.src = "https://wzrd.in/standalone/buffer";
    fileBufferScript.async = true;

    ipfsScript.addEventListener('load', async function() {
      let ipfsHost = "127.0.0.1";
      let ipfsAPIPort = "5001";
      let ipfsWebPort = "8080";

      window.ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort);
      window.ipfs.swarm.peers(function(err, response) {
        if (err) {
          console.error("Error while connecting to IPFS: " + err);
        }
        else {
          console.log("IPFS - connected to " + response.length + " peers.");
          console.log(response);
        }
      })
    });
    document.body.appendChild(ipfsScript);
    document.body.appendChild(fileBufferScript);

    //window.signedUser = window.web3.eth.accounts[0];
    let abi = JSON.parse([
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
        "type": "event"
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
        "type": "function"
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
        "type": "function"
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
        "type": "function"
      }
    ]);
    let contractAbi = window.web3.eth.contract(abi)
    window.signedInUser = window.web3.eth.accounts[0]
    window.contract = contractAbi.at('0xA497c24032043D9e96ff6b80747B51449dcf0167');

    window.contract.TomatoAdded().watch(function(error, result) {
      if (!error) {
        alert("Tomato added!");
      } else {
        alert("Error while adding tomato: " + error);
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Black Market for Tomatoes</h1>
          </header>
          <TomatoToolbar />
          <br />
          <TomatoList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;