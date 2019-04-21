import BidProcess from '../../build/contracts/BidProcess.json'
import Config from './config.json';
import Web3 from 'web3';

export default class Contract {

    constructor (network, callback) {
    
        let config = Config[network]
        // Inject web3
        if (window.ethereum) {
          // use metamask's providers
          // modern browsers
          this.web3 = new Web3(window.ethereum)
          // Request accounts access
          try {
            window.ethereum.enable()
          } catch (error) {
            console.error('User denied access to accounts')
          }
        } else if (window.web3) {
          // legacy browsers
          this.web3 = new Web3(web3.currentProvider)
        } else {
          // fallback for non dapp browsers
          this.web3 = new Web3(new Web3.providers.HttpProvider(config.url))
        }
    
        
      

        // Load contract
        this.bidProcess = new this.web3.eth.Contract(BidProcess.abi, config.contractAddress)
      
        //console.log(this.flightSuretyApp);
        this.initialize(callback)
        //this.account = null
        //console.log(this.account)
      }
    

    initialize (callback) {
      this.web3.eth.getAccounts((error, accts) => {
        if (!error) {
          this.account = accts[0]
          this.salesLead = accts[1]
          this.bidManager = accts[2]
          this.solutionArchitect = accts[4]
          this.deliveryLead = accts[5]
          callback()
        } else {
          console.error(error)
        }
      })
    }

 
    //Check if Sales Lead
    async isSalesLead(address){
        let self = this;
        try{
        let result = await self.bidProcess.methods
          .isSalesLead(address)  
          .call()
        console.log(result);
         return result 
         }catch (error) {
            console.log(error)
            return false
        }
    }

    // Add Sales Lead
    async addSalesLead(address){
        let self = this;
        let result = "Success" 
        try{
          await self.bidProcess.methods
          .addSalesLead(address)  
          .send({ from: self.account,
            gas: 1500000,
            gasPrice: '30000000000000'
        });
        }catch (error) {
            result = error;
        }
        return result
    }

    // Renounce Sales Lead
    async renounceSalesLead(address){
        let self = this;
        let result = "Success" 
        try{
        console.log("I am in contract js")
            await self.bidProcess.methods
            .renounceSalesLead()  
            .send({ from: address,
                gas: 1500000,
                gasPrice: '30000000000000'});
        }catch (error) {
            result = error;
        }
        return result
    }


        //Check if Bid Manager 
        async isBidManager(address){
            let self = this;
            try{
            let result = await self.bidProcess.methods
              .isBidManager(address)  
              .call()
             return result 
             }catch (error) {
                console.log(error)
                return false
            }
        }

    // Add Bid Manager 
    async addBidManager(address){
        let self = this;
        let result = "Success" 
        try{
          await self.bidProcess.methods
          .addBidManager(address)  
          .send({ from: self.account,
            gas: 1500000,
            gasPrice: '30000000000000'
        });
        }catch (error) {
            result = error;
        }
        return result
    }

    // Renounce Bid Manager
    async renounceBidManager(address){
        let self = this;
        let result = "Success" 
        try{
            await self.bidProcess.methods
            .renounceBidManager()  
            .send({ from: address,
                gas: 1500000,
                gasPrice: '30000000000000'});
        }catch (error) {
            result = error;
        }
        return result
    }


     //Check if solution Architect
     async isSolutionArchitect(address){
        let self = this;
        try{
        let result = await self.bidProcess.methods
          .isSolutionArchitect(address)  
          .call()
         return result 
         }catch (error) {
            console.log(error)
            return false
        }
    }

    // Add Solution Architect 
    async addSolutionArchitect(address){
        let self = this;
        let result = "Success" 
        try{
          await self.bidProcess.methods
          .addSolutionArchitect(address)  
          .send({ from: self.account,
            gas: 1500000,
            gasPrice: '30000000000000'
        });
        }catch (error) {
            result = error;
        }
        return result
    }

    // Renounce Solution Architect
    async renounceSolutionArchitect(address){
        let self = this;
        let result = "Success" 
        try{
            await self.bidProcess.methods
            .renounceSolutionArchitect()  
            .send({ from: address,
                gas: 1500000,
                gasPrice: '30000000000000'});
        }catch (error) {
            result = error;
        }
        return result
    }

      //Check if Delivery Lead
      async isDeliveryLead(address){
        let self = this;
        try{
        let result = await self.bidProcess.methods
          .isDeliveryLead(address)  
          .call()
         return result 
         }catch (error) {
            console.log(error)
            return false
        }
    }

    // Add Delivery Lead
    async addDeliveryLead(address){
        let self = this;
        let result = "Success" 
        try{
          await self.bidProcess.methods
          .addDeliveryLead(address)  
          .send({ from: self.account,
            gas: 1500000,
            gasPrice: '30000000000000'
        });
        }catch (error) {
            result = error;
        }
        return result
    }

    // Renounce Delivery Lead
    async renounceDeliveryLead(address){
        let self = this;
        let result = "Success" 
        try{
            await self.bidProcess.methods
            .renounceDeliveryLead()  
            .send({ from: address,
                gas: 1500000,
                gasPrice: '30000000000000'});
        }catch (error) {
            result = error;
        }
        return result
    }

     // Initiate Bid Request
     async initiateBidRequest(name, TCV, requestor){
        let self = this;
        let bidID = 0
        //console.log(self.account)
        try{
            bidID = await self.bidProcess.methods
            .initiateBidRequest(name,parseInt(TCV))  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }

        return bidID ;
    }

     // Create Bid
     async createBid(bidID, content, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .createBid(parseInt(bidID),content)  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

     // Populate Bid
     async populateProposalResponse(bidID, content, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .populateProposalResponse(parseInt(bidID),content)  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

    // Review Bid
    async reviewProposal(bidID, content, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .reviewProposal(parseInt(bidID),content)  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

     // Reject Bid
     async rejectProposal(bidID, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .rejectProposal(parseInt(bidID))  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

     // Revise Bid
     async reviseProposal(bidID, content, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .reviseProposal(parseInt(bidID),content)  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

      // Approve Bid
      async provideApproval(bidID, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .provideApproval(parseInt(bidID))  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

      // Pacakage Bid
      async packageProposal(bidID, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .packageProposal(parseInt(bidID))  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }

    // Submit Bid
    async submitProposal(bidID, requestor){
        let self = this;
        //console.log(self.account)
        try{
            await self.bidProcess.methods
            .submitProposal(parseInt(bidID))  
            .send({ from: requestor,
                gas: 1500000,
                gasPrice: '30000000000000'
            });
        }catch (error) {
            console.log(error);
        }
    }


      // Fetch Proposal State
      async fetchProposalState(bidID){
        let self = this;
        let state = 100
        try{
            state = await self.bidProcess.methods
            .fetchProposalState(parseInt(bidID))  
            .call();

            console.log(state);
        }catch (error) {
            console.log(error);
        }
        return state
    }


   
}
    