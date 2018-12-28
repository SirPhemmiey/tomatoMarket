import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
//const Buffer = require('buffer/').Buffer;
import web3 from './web3';
//import getWeb3 from './utils/getWeb3';
import ipfs from './ipfs';
//import TomatoMarketContract from './contracts/TomatoMarket.json';
//import truffleContract from  'truffle-contract';
import TomatoMarket from './TomatoMarket';


export default class TomatoToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ipfsHash: null,
            buffer: '',
            open: false,
            displayName: '',
            description: '',
            price: 0,
            contract: '',
            web3: '',
            ethAddress:'',
            accounts: ''
        };
    }
    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleOpen = () => {
        this.setState({
            displayName: '',
            description: '',
            price: '',
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleAdd = () => {
        this.setState({ open: false });
        const reader = new FileReader();
        reader.onloadend = function() {
            const buf = Buffer(reader.result);
            //const g = Buffer()
            window.ipfs.add(buf, (err, result) => {
                if (err) {
                    console.error("Error sending file to IPFS: ", err);
                    return;
                }
                console.log(JSON.stringify(result));
                let url = result[0].hash;
                console.log("IPFS url: https://gateway.ipfs.io/ipfs/" + url);
                // TomatoMarket.methods.addTomato(
                //     this.state.displayName,
                //     this.state.description,
                //     this.state.price,
                //     0,
                //     this.state.ipfsHash,
                //     { from: accounts[0]}
                // )
                // .then(res => {
                //     return TomatoMarket.getTomato.call()
                // })

                window.contract.addTomato(
                    this.state.displayName,
                    this.state.description,
                    this.state.price,
                    0,
                    url,
                    { from: window.signedUser },
                    (err, result) => {
                        if (err) {
                            alert("Error while adding Tomato: " + err)
                        }
                    }
                );
            });
        }

        const photo = document.getElementById("fileInput");
        reader.readAsArrayBuffer(photo.files[0]);
    };

    captureFile = event => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
      };

      convertToBuffer = async (reader) => {
          //file is converted to a buffer to prepare for uploading to IPFS
          const buffer = await Buffer.from(reader.result);
          this.setState({buffer})
      };

      onSubmit = async (event) => {
        event.preventDefault();
          try {

            //trigger the capture file
            this.captureFile();
            //Get network provider and web3 instance
            //const web3 = await getWeb3();
            //bring in users metamask address
            const accounts = await web3.eth.getAccounts();

            //get the contract instance
            // const Contract = truffleContract(TomatoMarketContract);
            // Contract.setProvider(web3.currentProvider);
            // const instance = await Contract.deployed();

            const ethAddress= await TomatoMarket.options.address;
            this.setState({ethAddress, accounts});


            console.log("Sending from metamask account: " + accounts[0]);

            //obtain contract address from TokenMarket
            await ipfs.add(this.state.buffer, (err, ipfsHash) => {
                if (err) {
                    console.error("Error sending file to IPFS: ", err);
                    return;
                }
                console.log("IPFS url: https://gateway.ipfs.io/ipfs/" + ipfsHash);
                this.setState({ ipfsHash: ipfsHash[0].hash});

                //send the data to the smart contract
                const { accounts } = this.state;
                TomatoMarket.methods.addTomato(
                    this.state.displayName,
                    this.state.description,
                    this.state.price,
                    0,
                    this.state.ipfsHash,
                    { from: accounts[0]}
                )
                .then(res => {
                    return TomatoMarket.getTomato.call()
                })
            });
          }
          catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.log(error);
          }
      };

    render() {
        const dialogStyle = {
            width: '600px'
        };
        const actions = [
            <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose}
            />,
            <FlatButton
            label="Add"
            primary={true}
            disabled={false}
            onClick={this.handleAdd}
            />
        ];

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label="Add Tomato" primary={true} onClick={this.handleOpen} />
                    <Dialog
                        title="Add Tomato"
                        actions={actions}
                        contentStyle={dialogStyle}
                        modal={true}
                        open={this.state.open}
                    >
                        <TextField name="displayName" hintText="Title" value={this.state.displayName} onChange={this.handleChange}/>
                        <br />
                        <TextField name="description" hintText="Description" value={this.state.description} onChange={this.handleChange}/>
                        <br />
                        <TextField name="price" hintText="Price" value={this.state.price} onChange={this.handleChange}/>
                        <br />
                        <input id="fileInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
                        <br />
                        <RaisedButton
                            label="Pick photo"
                            onClick={(e) => this.upload.click() }
                        >
                        </RaisedButton>
                    </Dialog>
                </ToolbarGroup>
            </Toolbar>
            );
    }

}