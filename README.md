# BID PROCESS SUPPLY CHAIN DAPP

A bid process supply chain DAPP. The actors of the bid process supply chain are Sales Lead, Bid Manager, Solution Architect and Delivery Lead. The asset is the bid document. The summary of the supply chain is as follows:
- Sales Lead initiate a Bid request 
- Bid manager then creates a Bid (The vitutal assets is created here)
- Solution Architect then populates the Bid
- Delivery Lead then reviews the bid.
- After Review, the Delivery lead then either rejects or approve the bid.
- If the bids gets Rejected the Solution Architect then revise the bid.
- Once the bid is approved the Bid Manager then package the bid
- The Sppoved bid is submitted by the Sales Lead 

## UML DIAGRAMS
![Activity Diagram](./PreSales_Process_ActivityDiagram.jpg)
![Class Diagram](./Presales_Process_ClassDiagram.jpg)
![Sequence Diagram](./Presales_Process_SequenceDiagram.jpg)
![State Diagram](./PreSales_Process_StateDiagram.jpg)


## Getting Started
**Prerequesites:  
You will need an [Infura](https://infura.io/) account; [Metamask](https://metamask.io/) in your browser; Node, npm and Truffle installed on your computer.**  
See [Resources](#resources) for tools and packages' version used.

1. Clone or download this repository.
2. Install dependencies
```
$ cd Presales_Process
$ npm install
$ cd app
$ npm install
```
3. Start development network and test contracts:
```
$ cd ..
$ truffle develop
$ truffle(develop)>test
```
6. Serve Front-End  
In a second console or close the truffle develop console (`ctrl + c` two times):
```
$ npm run dapp
```
7. Access Front-End at http://localhost:8000

## Contract details
This contract is deployed on the Rinkeby network!  

Roles: 
contract Address: 0x1ce0f2d7f56ee0e535210e241dc37b74d1856d7a
Link: https://rinkeby.etherscan.io/tx/0x7ffd1429d3eea2b35e72ce1df3b82da35c8e42f8b5cdf1493f3834a91292d920

SalesLead:
contrcat Address: 0x15ed16d52b03dfca67b022f16e66216071d4e3bc
Link: https://rinkeby.etherscan.io/tx/0x86a924153c43da9b8832e863ebb515bc73f09a5235a8880e3bc78579113149c3

BidManager: 
Contract Address:0x8d771dc464e556303a60f8d462d98896b02b622c
Link: https://rinkeby.etherscan.io/tx/0xc7f11604072ab84e48f0def69636adbcc9ab11a519fbab89ec0d3541221c379f

Solution Architect:
Contract Address: 0x8b44e05b9c7531c134c6806e61f54267c927049a
Link: https://rinkeby.etherscan.io/tx/0x0c958d7d90a9c82c113e98474ed8e0ece9603a3ab7b06b6dfcf0d1281b078664

Delivery Lead:
Contract Address: 0xcc082853ec6d225f347648768f124eb6590d56d1
Link: https://rinkeby.etherscan.io/tx/0x0b8f9573ce5f03e47a683ab16d91f204fffcfe6966d8d4a933a0bb2e09d091f1

BidProces Supply chain:
Contract Address: 0x433f4573c3f36c8c538ee320f1ec9530380d4034
Link: https://rinkeby.etherscan.io/tx/0xd8bfe04eb0586bb5871a0ef3dc51279e9b8def1be2ed4fd8cc4f2fa4377aed68




