
var BidProcess = artifacts.require('BidProcess')

contract('BidProcess', async (accounts)  => {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    const ContractOwnerId = accounts[0]               // 0xE8318Da70e75fce4E9Bf8578c3D7cF82092972fD
    const SalesLeadId = accounts[1]                   // 0xF6d431534bD5E87b7F5A26574606f3017AaFDA77
    const BidManagerId = accounts[2]                  // 0x6E441370BCFB4484a0f450DC1ce6Dac90E87a052
    const SolutionArchitectId = accounts[3]           // 0xD956543A3C718DA82ff1393cBf1B2Ebe906c2c31
    const DeliveryLeadId = accounts[4]                // 0xb6406BDFC4cbCdE3aC454f64DE1D0599017C5c84
   

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner ID: accounts[0] ", accounts[0])
    console.log("Sales Leadd: accounts[1] ", accounts[1])
    console.log("Bid Manager: accounts[2] ", accounts[2])
    console.log("Solution Architect: accounts[3] ", accounts[3])
    console.log("Delivery Lead: accounts[4] ", accounts[4])

    // const bidProcess = await BidProcess.deployed();

    // -------------------------------------TEST Roles contract----------------------------------//
   
    //TEST: ADD SALES LEAD 
        it('can add a Sales Lead Role to an address', async () => {
            const bidProcess = await BidProcess.deployed();
            assert.equal(await bidProcess.isSalesLead(SalesLeadId), false)
            await bidProcess.addSalesLead(SalesLeadId)
            assert.equal(await bidProcess.isSalesLead(SalesLeadId), true, "It can not add Sales Lead Role")
        })

        //TEST: RENOUNCE SALES LEAD 
        it('can renounce Sales Lead Role', async () => {
            const bidProcess = await BidProcess.deployed();
            assert.equal(await bidProcess.isSalesLead(SalesLeadId), true)
            await bidProcess.renounceSalesLead({ from: SalesLeadId })
            assert.equal(await bidProcess.isSalesLead(SalesLeadId), false, "It can not remove Sales Lead Role")

            //ADD back the sales lead role for further testing
            await bidProcess.addSalesLead(SalesLeadId)
            assert.equal(await bidProcess.isSalesLead(SalesLeadId), true, "It can not add Sales Lead Role")
        })

        //TEST: ADD BID MANAGER 
        it('can add a Bid Manager Role to an address', async () => {
            const bidProcess = await BidProcess.deployed();
            assert.equal(await bidProcess.isBidManager(BidManagerId), false)
            await bidProcess.addBidManager(BidManagerId)
            assert.equal(await bidProcess.isBidManager(BidManagerId), true, "It can not add Bid Manager Role")
        })

        //TEST: RENOUNCE Bid Manager 
        it('can renounce Bid Manager Role', async () => {
        const bidProcess = await BidProcess.deployed();
        assert.equal(await bidProcess.isBidManager(BidManagerId), true)
        await bidProcess.renounceBidManager({ from: BidManagerId })
        assert.equal(await bidProcess.isBidManager(BidManagerId), false, "It can not remove Bid Manager Role")

        //ADD back the sales lead role for further testing
        await bidProcess.addBidManager(BidManagerId)
        assert.equal(await bidProcess.isBidManager(BidManagerId), true, "It can not add Bid Manager Role")
        })

        //TEST: ADD SOLUTION ARCHITECT 
        it('can add a Solution Architect Role to an address', async () => {
            const bidProcess = await BidProcess.deployed();
            assert.equal(await bidProcess.isSolutionArchitect(SolutionArchitectId), false)
            await bidProcess.addSolutionArchitect(SolutionArchitectId)
            assert.equal(await bidProcess.isSolutionArchitect(SolutionArchitectId), true, "It can not add Solution Architect Role")
        })

        //TEST: RENOUNCE SOLUTION ARCHITECT 
        it('can renounce Solution Architect Role', async () => {
        const bidProcess = await BidProcess.deployed();
        assert.equal(await bidProcess.isSolutionArchitect(SolutionArchitectId), true)
        await bidProcess.renounceSolutionArchitect({ from: SolutionArchitectId })
        assert.equal(await bidProcess.isSolutionArchitect(SolutionArchitectId), false, "It can not remove Solution Architect Role")

        //ADD back the sales lead role for further testing
        await bidProcess.addSolutionArchitect(SolutionArchitectId)
        assert.equal(await bidProcess.isSolutionArchitect(SolutionArchitectId), true, "It can not add Solution Architect Role")
        })


        //TEST: ADD DELIVERY LEAD
        it('can add a Delivery Lead Role to an address', async () => {
            const bidProcess = await BidProcess.deployed();
            assert.equal(await bidProcess.isDeliveryLead(DeliveryLeadId), false)
            await bidProcess.addDeliveryLead(DeliveryLeadId)
            assert.equal(await bidProcess.isDeliveryLead(DeliveryLeadId), true, "It can not add Delivery Lead Role")
        })

        //TEST: RENOUNCE DELIVERY LEAD
        it('can renounce Delivery Lead Role', async () => {
        const bidProcess = await BidProcess.deployed();
        assert.equal(await bidProcess.isDeliveryLead(DeliveryLeadId), true)
        await bidProcess.renounceDeliveryLead({ from: DeliveryLeadId })
        assert.equal(await bidProcess.isDeliveryLead(DeliveryLeadId), false, "It can not remove Delivery Lead Role")

        //ADD back the sales lead role for further testing
        await bidProcess.addDeliveryLead(DeliveryLeadId)
        assert.equal(await bidProcess.isDeliveryLead(DeliveryLeadId), true, "It can not add Delivery Lead Role")
        })



  //-----------------------END of ROLE CONTRACT TEST-------------------------------------------------//

  //-----------------------START of BID PROCESS CONTRACT TEST ---------------------------------------//

    //   TEST: A role other than sales lead cannot initiate a bid request
    it('can not let other role other than sales lead to raise a initiate bid request', async () => {
        const bidProcess = await BidProcess.deployed();
        let errorMsg = false;
        let bidId = 0 ;
        let isSalesLead = false ;
        try { 
            
            //check if contract owner is also the sales lead: He should be
            isSalesLead = await bidProcess.isSalesLead.call(ContractOwnerId);
            // console.log("The contract owner is sales lead: " + isSalesLead) ;

            // Renounce Sales Lead role of the contract owner
            await bidProcess.renounceSalesLead();

            // check if contract owner is also the sales lead: He should be not after renouncing
            isSalesLead = await bidProcess.isSalesLead.call(ContractOwnerId);
            //console.log("The contract owner is sales lead: " + isSalesLead) ;

            //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
            bidId = await bidProcess.initiateBidRequest.call("New RMS Service", 1000000);
            //console.log("bid id is " + bidId)
        }catch(error){
            //console.log("error is " + error)
            errorMsg = error.message.includes("Only Sales Lead is alllowed to perform this function");
            //console.log(errorMsg);
        }
        assert.equal(errorMsg, true, "A Bid can be initiated by other than sales lead. This is an error")
    })

    //   TEST: Sales LEad and initate a request
    it('can let sales lead to initiate a bid request', async () => {
        const bidProcess = await BidProcess.deployed();
        let errorMsg = false;
        let bidId = 0 ;
        let isSalesLead = false ;
        try { 
            
            //check if contract owner is also the sales lead: He should be
            isSalesLead = await bidProcess.isSalesLead.call(SalesLeadId);
            //console.log("Is the caller a sales lead: " + isSalesLead) ;

            //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
            bidId = await bidProcess.initiateBidRequest.call("New RMS Service", 1000000, {from: SalesLeadId});
            //console.log("bid id is " + bidId)
        }catch(error){
            //console.log("error is " + error)
            errorMsg = error.message.includes("Only Sales Lead is alllowed to perform this function");
            //console.log(errorMsg);
        }
        assert.equal(errorMsg, false, "A Bid can be initiated by other than sales lead. This is an error")
    })



   // TEST: Bid Manager can Create a bid 
   it('can let bid  manager to create a bid response', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isBidManager = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isBidManager = await bidProcess.isBidManager.call(BidManagerId);
        //console.log("Is the caller a Bid Manager: " + isBidManager) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.createBid(1, "draft content", {from: BidManagerId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is " + error)
        //console.log(errorMsg);
        if (error.message.includes("Proposal is not initiated yet")){
            errorMsg = error.message.includes("Proposal is not initiated yet");
        }

        if (error.message.includes("Only Bid Manager is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Bid Manager is alllowed to perform this function");
        }
        
    }
    assert.equal(errorMsg, false, "Either the bid is not initiated or the role is not of a bid manager.")
})


   // TEST: Solution Architect can Populate a Bid

   it('can let a solution architect populate a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isSolutionArchitect = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isSolutionArchitect = await bidProcess.isSolutionArchitect.call(SolutionArchitectId);
        //console.log("Is the caller a Solution Architect: " + isSolutionArchitect) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.populateProposalResponse(1, "draft content", {from: SolutionArchitectId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is " + error)
        if (error.message.includes("Proposal is not created yet")){
            errorMsg = error.message.includes("Proposal is not created yet");
        }

        if (error.message.includes("Only Solution Architect is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Solution Architect is alllowed to perform this function");
        }
              
        //console.log(errorMsg);
    }
    assert.equal(errorMsg, false, "Either the bid is not created or the role is not of a solution architect.")
})


   // TEST: Only a Delivery Lead can review a Bid
   it('can let a delivery Lead review a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isDeliveryLead = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isDeliveryLead = await bidProcess.isDeliveryLead.call(DeliveryLeadId);
        //console.log("Is the caller a Delivery Lead: " + isDeliveryLead) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.reviewProposal(1, "revised content", {from: DeliveryLeadId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is " + error)
        if (error.message.includes("Proposal is not populated yet")){
            errorMsg = error.message.includes("Proposal is not populated yet");
        }

        if (error.message.includes("Only Delivery Lead is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Delivery Lead is alllowed to perform this function");
        }
              
        //console.log(errorMsg);
    }
    assert.equal(errorMsg, false, "Either the bid is not populated or the role is not of a Delivery Lead.")
})


   // TEST: Delivery Lead can Reject a Bid
   it('can let delivery lead reject a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isDeliveryLead = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isDeliveryLead = await bidProcess.isDeliveryLead.call(DeliveryLeadId);
        //console.log("Is the caller a Delivery Lead: " + isDeliveryLead) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.rejectProposal(1, {from: DeliveryLeadId});
        //console.log("bid id is " + bidId)
         let state = await bidProcess.fetchProposalState.call(1)
         //console.log(state);
         if(state != 5){
            errorMsg = true
         }
    }catch(error){
        console.log("error is " + error)
        if (error.message.includes("Proposal is not Reviewed yet")){
            errorMsg = error.message.includes("Proposal is not Reviewed yet");
        }             
        //console.log(errorMsg);
    }
    assert.equal(errorMsg, false, "Either the bid is not reviewed or the role is not of a Delivery Lead.")
})

   // TEST: solution Architect can Revise a Bid
   it('can let a solution architect revise a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isSolutionArchitect = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isSolutionArchitect = await bidProcess.isSolutionArchitect.call(SolutionArchitectId);
        //console.log("Is the caller a Solution Architect: " + isSolutionArchitect) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.reviseProposal(1, "revised content", {from: SolutionArchitectId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is revise + " + error)
        if (error.message.includes("Proposal is not Rejected yet")){
            errorMsg = error.message.includes("Proposal is not Rejected yet");
        }

        if (error.message.includes("Only Solution Architect is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Solution Architect is alllowed to perform this function");
        }
              
        //console.log(errorMsg);
    }
    assert.equal(errorMsg, false, "Either the bid is not created/Rejected or the role is not of a solution architect.")
})

   // TEST: Delivery Lead can Approve a Bid
   it('can let delivery lead approve a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isDeliveryLead = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isDeliveryLead = await bidProcess.isDeliveryLead.call(DeliveryLeadId);
        //console.log("Is the caller a Delivery Lead: " + isDeliveryLead) ;

        
        //Before approval he need to review it
        
        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.provideApproval(1, {from: DeliveryLeadId});
        //console.log("bid id is " + bidId)
         let state = await bidProcess.fetchProposalState.call(1)
         //console.log(state);
         if(state != 6){
            errorMsg = true
         }
    }catch(error){
        console.log("error is in Approval " + error)
        if (error.message.includes("Proposal is not Reviewed or Revised yet")){
            errorMsg = error.message.includes("Proposal is not Reviewed or Revised yet");
        }             
        //console.log(errorMsg);
    }
    assert.equal(errorMsg, false, "Either the bid is not Approved or the role is not of a Delivery Lead.")
})

   // TEST: Only a Bid Manager can Package a Bid
   it('Can allow a bid manager to pacakage a bid', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let isBidManager = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isBidManager = await bidProcess.isBidManager.call(BidManagerId);
        //console.log("Is the caller a Bid Manager: " + isBidManager) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
         await bidProcess.packageProposal(1, {from: BidManagerId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is in pacakage  " + error)
        //console.log(errorMsg);
        if (error.message.includes("Proposal is not approved yet")){
            errorMsg = error.message.includes("Proposal is not approved yet");
        }

        if (error.message.includes("Only Bid Manager is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Bid Manager is alllowed to perform this function");
        }
        
    }
    assert.equal(errorMsg, false, "Either the bid is not approved or the role is not of a bid manager.")
})

   // TEST:  Sales Lead can Submit a Bid
   it('can let sales lead to submit a bid ', async () => {
    const bidProcess = await BidProcess.deployed();
    let errorMsg = false;
    let bidId = 0 ;
    let isSalesLead = false ;
    try { 
        
        //check if contract owner is also the sales lead: He should be
        isSalesLead = await bidProcess.isSalesLead.call(SalesLeadId);
        //console.log("Is the caller a sales lead: " + isSalesLead) ;

        //This call is being executed from contract owner account and hence shold raise error because of onlySalesLead
        await bidProcess.submitProposal(1, {from: SalesLeadId});
        //console.log("bid id is " + bidId)
    }catch(error){
        console.log("error is in submission " + error)
        //console.log(errorMsg);
        if (error.message.includes("Proposal is not packaged yet")){
            errorMsg = error.message.includes("Proposal is not packaged yet");
        }

        if (error.message.includes("Only Sales Lead is alllowed to perform this function")){
            errorMsg = error.message.includes("Only Sales Lead is alllowed to perform this function");
        }
    }
    assert.equal(errorMsg, false, "either the bid is not packaged or the role is not a sales lead")
})





   //-----------------------END of BID PROCESS CONTRACT TEST ---------------------------------------//
})

