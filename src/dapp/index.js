
import DOM from './dom'
import Contract from './contract'
import './presales_process.css'
import Web3 from 'web3';


(async () => {
  let result = null

  let contract = new Contract('localhost', () => {
       

        //Contract owner provides access to the Role (addRole)
        DOM.elid('assign-role').addEventListener('click', async () => {
          //fetch role
          let role = DOM.elid('select-role').value
          //destructure
          let address = DOM.elid('auth-user').value
          // Write transaction

          
          if(role == 0){
            //alert("Please select a role for assignment")
            display("Missing Data", "Please select a role for assignment")
          }

          if (address == ""){
            //alert("Please provide an address")
            display("Missing Data", "Please provide an address")
          }

          if(!Web3.utils.toChecksumAddress(address)){
            //alert("Please provide a valid address")
            display("Missing Data", "Please provide a valid address")
          }
          
          
          if(role == 1){
            const result = await contract.addSalesLead(address)
            display("Result", "Sales Lead addition was a " + result)
            console.log("Sales Lead addition was a " + result);
          }

          if(role == 2){
            const result = await contract.addBidManager(address)
            display("Result", "Bid Manager additon was a " + result)
            console.log("Bid Manager additon was a " + result);
          }

          if(role == 3){
            const result = await contract.addSolutionArchitect(address)
            display("Result", "Solution Architect additon was a " + result)
            console.log("Solution Architect additon was a " + result);
          }

          if(role == 4){
            const result = await contract.addDeliveryLead(address)
            display("Result", "Delivery Lead additon was a " + result)
            console.log("Delivery Lead additon was a " + result);
          }     
              
        })

          //Check access of a role to an address
          DOM.elid('check-role').addEventListener('click', async () => {
            //fetch role
            let role = DOM.elid('select-role-validation').value
            //destructure
            let address = DOM.elid('addr-user').value
            // Write transaction
            
            //console.log(role)
            //console.log(address)
            
            if(role == 0){
              //alert("Please select a role for assignment")
              display("Missing Data", "Please select a role for assignment")
            }
  
            if (address == ""){
              //alert("Please provide an address")
              display("Missing Data", "Please provide an address")
            }
  
            if(!Web3.utils.toChecksumAddress(address)){
              //alert("Please provide a valid address")
              display("Missing Data", "Please provide a valid address")
            }
            
            if(role == 1){
              const result = await contract.isSalesLead(address)
              if(result){
                display("Result", "The " + address + "is a  Sales Lead")
                console.log("The " + address + "is a  Sales Lead");
              }else{
                display("Result", "The " + address + "is a not a Sales Lead")
                console.log("The " + address + "is a not a Sales Lead");
              }             
            }
  
            if(role == 2){
              const result = await contract.isBidManager(address)
              if(result){
                display("Result", "The " + address + "is a  Bid Manager ")
                console.log("The " + address + "is a  Bid Manager ");
              }else{
                display("Result", "The " + address + "is a Bid Manager")
                console.log("The " + address + "is a Bid Manager");
              } 
            }
  
            if(role == 3){
              const result = await contract.isSolutionArchitect(address)
              if(result){
                display("Result", "The " + address + "is a  Solution Architect")
                console.log("The " + address + "is a  Solution Architect");
              }else{
                display("Result", "The " + address + "is a not a Solution Architect")
                console.log("The " + address + "is a not a Solution Architect");
              } 
            }
  
            if(role == 4){
              const result = await contract.isDeliveryLead(address)
              if(result){
                display("Result", "The " + address + "is a  Delivery Lead")
                console.log("The " + address + "is a  Delivery Lead");
              }else{
                display("Result", "The " + address + "is a not a Delivery Lead")
                console.log("The " + address + "is a not a Delivery Lead");
              } 
            }     
                
          })


           //Renounce access of a role to an address
           DOM.elid('renounce-role').addEventListener('click', async () => {
            //fetch role
            let role = DOM.elid('select-role-renunciation').value
            //destructure
            let address = DOM.elid('addr-renc-user').value
            // Write transaction
            
            //console.log(role)
            //console.log(address)
            
            if(role == 0){
              //alert("Please select a role for assignment")
              display("Missing Data", "Please select a role for assignment")
            }
  
            if (address == ""){
              //alert("Please provide an address")
              display("Missing Data", "Please provide an address")
            }
  
            if(!Web3.utils.toChecksumAddress(address)){
              //alert("Please provide a valid address")
              display("Missing Data", "Please provide a valid address")
            }
            
            
            if(role == 1){
              const result = await contract.renounceSalesLead(address)
              if(result=="Success"){
                display("Success", "The " + address + " has been renounced as Sales Lead")
                console.log("The " + address + " has been renounced as Sales Lead");
              }else{
                display("Failure", "The " + address + " was not able to renounce as a Sales Lead")
                console.log("The " + address + " was not able to renounce as a Sales Lead");
              }             
            }
  
            if(role == 2){
              const result = await contract.renounceBidManager(address)
              if(result){
                display("Success", "The " + address + " has been renounced as Bid Manager ")
                console.log("The " + address + " has been renounced as Bid Manager ");
              }else{
                display("Failure", "The " + address + " was not able to renounce as a Bid Manager")
                console.log("The " + address + " was not able to renounce as a Bid Manager");
              } 
            }
  
            if(role == 3){
              const result = await contract.renounceSolutionArchitect(address)
              if(result){
                display("Success", "The " + address + " has been renounced as Solution Architect")
                console.log("The " + address + " has been renounced as Solution Architect");
              }else{
                display("Failure", "The " + address + " was not able to renounce as a Solution Architect")
                console.log("The " + address + " was not able to renounce as a Solution Architect");
              } 
            }
  
            if(role == 4){
              const result = await contract.renounceDeliveryLead(address)
              if(result){
                display("Success", "The " + address + " has been renounced as  Delivery Lead")
                console.log("The " + address + " has been renounced as  Delivery Lead");
              }else{
                display("Failure", "The " + address + " was not able to renounce as a Delivery Lead")
                console.log("The " + address + " was not able to renounce as a Delivery Lead");
              } 
            }     
                
          })

           //Perform Bid Management Function
           DOM.elid('perform-function').addEventListener('click', async () => {
            //fetch role
            let role = DOM.elid('select-role-function').value
            //fetch function to perform
            let bidFunction = DOM.elid('select-bid-function').value
            //destructure
            let address = DOM.elid('addr-bid-function').value
            // capture proposal ID
            let proposalID = DOM.elid('bid-id').value
            // capture content
            let content = DOM.elid('bid-content').value

            //Initialize a proposal ID
            
            
            //console.log(role)
            //console.log(address)
            // console.log(bidFunction)
            
            if(role == 0){
              //alert("Please select a role for assignment")
              display("Missing Data", "Please select a role for assignment")
            }
  
            if (address == ""){
              //alert("Please provide an address")
              display("Missing Data", "Please provide an address")
            }
  
            if(!Web3.utils.toChecksumAddress(address)){
              //alert("Please provide a valid address")
              display("Missing Data", "Please provide a valid address")
            }
            
           if(bidFunction == 0){
            display("Missing Data", "Please select a function to perform")
           // alert("Please select a function to perform")
           }

           if(bidFunction == 1){
             let name = "Test Bid" // In production app this needs to be captured via use input
             let TCV = 10000000  // In production app this needs to be captured via use input

              if(role == 1){ 
                proposalID = await contract.initiateBidRequest(name, TCV, address)
                console.log(proposalID);
                display("Success", "The Proposal ID is created ")
              }else {
                display("Information ", "Only Sales lead can initiate a bid request")
                //alert("Only Sales lead can initiate a bid request")
              }
           } 

           if(bidFunction == 2){
              if(role == 2){ 
                await contract.createBid(proposalID,content, address)
              }else {
                display("Information ", "Only Bid Manager can Create a bid request")
                //alert("Only Bid Manager can Create a bid request")
              }
           } 

           if(bidFunction == 3){
            if(role == 3){ 
              await contract.populateProposalResponse(proposalID,content, address)
            }else {
              display("Information ", "Only Solution Architect can populate a bid ")
              //alert("Only Solution Architect can populate a bid ")
            }
           } 

           if(bidFunction == 4){
            if(role == 4){ 
              await contract.reviewProposal(proposalID,content, address)
            }else {
              display("Information ", "Only Delivery Lead can review a bid ")
              //alert("Only Delivery Lead can review a bid ")
            }
           } 

           if(bidFunction == 5){
            if(role == 4){ 
              await contract.rejectProposal(proposalID, address)
            }else {
              display("Information ", "Only Delivery Lead can Reject a bid ")
              //alert("Only Delivery Lead can Reject a bid ")
            }
           } 

           if(bidFunction == 6){
            if(role == 3){ 
              await contract.reviseProposal(proposalID, content, address)
            }else {
              display("Information ", "Only Solution Architect can revise a bid ")
              //alert("Only Solution Architect can revise a bid ")
            }
            
           } 

           if(bidFunction == 7){
            if(role == 4){ 
              await contract.provideApproval(proposalID, address)
            }else {
              display("Information ", "Only Delivery Lead can provide approval for a bid ")
              //alert("Only Delivery Lead can provide approval for a bid ")
            }
            
           } 

           if(bidFunction == 8){
            if(role == 2){ 
              await contract.packageProposal(proposalID, address)
            }else {
              display("Information ", "Only a Bid Manager can pacakage a proposal ")
              //alert("Only a Bid Manager can pacakage a proposal ")
            }
         
           } 

           if(bidFunction == 9){
            if(role == 1){ 
              await contract.submitProposal(proposalID, address)
            }else {
              display("Information ", "Only a Sales Lead can submit a proposal")
              //alert("Only a Sales Lead can submit a proposal")
            }
           
           } 
         })

            //Renounce access of a role to an address
            DOM.elid('fetch-status').addEventListener('click', async () => {
              //fetch role
              let id = DOM.elid('bid-id-status').value
            
             
              console.log(id)
                           
              let status = await contract.fetchProposalState(id)
              display("Information ", "The proposal stage is " + status)
              console.log(status)
            })
          })
})

()
function display (title, description) {
  let displayDiv = DOM.elid('display-wrapper')
  let section = DOM.section()
  section.appendChild(DOM.h5(title))
  section.appendChild(DOM.span(description))
  displayDiv.append(section)
}

