pragma solidity ^0.5.0;

import "../accesscontrol/BidManagerRole.sol";
import "../accesscontrol/DeliveryLeadRole.sol";
import "../accesscontrol/SalesLeadRole.sol";
import "../accesscontrol/SolutionArchitectRole.sol";


contract BidProcess is 
BidManagerRole,
DeliveryLeadRole,
SalesLeadRole,
SolutionArchitectRole 
{

	 //variable: 'Owner'
    address proposalOwner;
    
    //varibale: define a variable uint for proposalID
    uint256 public proposalId;

	//various state in which a proposal can be
    enum  proposalState  {Initiated, Created, Populated, Reviewed, Revision, Rejected, Approved, Packed, Submitted}
						//0			1		 2			3			4		5		 6		  7			8


    //struct: 'Proposal' with the following fields: name, sku, price, state, seller, buyer
    struct Proposal{
        string name;
        uint proposalId;
        uint proposalTCV;
        proposalState state;
		string proposalContent;
        address currentOwner;
		address previousOwner;
    }

    // Define mapping 'proposals' that maps the proposalid (a number) to a proposal.
    mapping (uint => Proposal)  public proposals;

    	
	//EVENTS
    event BidInitiated(uint proposalId);
    event BidCreated(uint proposalId);
	event BidPopulated(uint proposalId);
	event BidReviewed(uint proposalId);
	event BidRevised(uint proposalId);
	event BidApproved(uint proposalId);
	event BidRejected(uint proposalId);
	event BidPacked(uint proposalId);
	event BidSubmitted(uint proposalId);



    //Modifier: Only Owner to see if the msg.sender == owner of the contract
    modifier onlyOwner(){
		 require(msg.sender == proposalOwner);
		 _;
	}

	modifier verifyCaller (address _address) {
        require(msg.sender == _address, "Caller not allowed to execute this function");
        _;
    }

	modifier isInititated (uint id) {
		require(proposals[id].state == proposalState.Initiated, "Proposal is not initiated yet");
		_;
	}

	modifier isCreated (uint id) {
		require(proposals[id].state == proposalState.Created, "Proposal is not created yet");
		_;
	}

	modifier isPopulated (uint id) {
		require(proposals[id].state == proposalState.Populated, "Proposal is not populated yet");
		_;
	}

	modifier isReviewed (uint id) {
		require(proposals[id].state == proposalState.Reviewed, "Proposal is not Reviewed yet");
		_;
	}

	modifier isReviewedorRevised (uint id) {
		bool result = (proposals[id].state == proposalState.Reviewed) || (proposals[id].state == proposalState.Revision) ;
		require(result, "Proposal is not Reviewed or Revised yet");
		_;
	}

	modifier isApproved (uint id) {
		require(proposals[id].state == proposalState.Approved, "Proposal is not Approved yet");
		_;
	}

	modifier isRejected (uint id) {
		require(proposals[id].state == proposalState.Rejected, "Proposal is not Rejected yet");
		_;
	}

	modifier isRevised (uint id) {
		require(proposals[id].state == proposalState.Revision, "Proposal is not Revised yet");
		_;
	}

	modifier isPacked (uint id) {
		require(proposals[id].state == proposalState.Packed, "Proposal is not packaged yet");
		_;
	}

	modifier isSubmitted (uint id) {
		require(proposals[id].state == proposalState.Submitted, "Proposal is not ready for Submission.");
		_;
	}
	
	
	//CONSTRUCTOR
	constructor() public{
		proposalOwner = msg.sender;
		proposalId = 0 ;   //set the proposal id to be 0.
	}
	

	// Sales Lead Initiates 
	function initiateBidRequest(string memory name, uint totalContractValue) public onlySalesLead returns (uint) {
		proposalId = proposalId + 1; 					 // Create a new proposal id. GP is to use safemath
		proposals[proposalId].proposalId = proposalId ;	 // set the proposal id for the new proposal
		proposals[proposalId].name = name ;		//Set the name
		proposals[proposalId].proposalTCV = totalContractValue ; //set the TCV
		proposals[proposalId].state =  proposalState.Initiated;				// O is the initiated state
        proposals[proposalId].currentOwner = msg.sender ;
		emit BidInitiated(proposalId) ;
		return proposalId;
	}

	// Bid manager creates a bid request and proposal content
	function createBid(uint  id, string  memory content) public onlyBidManager isInititated(id) {
		proposals[id].previousOwner = proposals[id].currentOwner; //make current owner (Sales Lead) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the bid manager
		proposals[id].state =  proposalState.Created;				// O is the initiated state
		proposals[id].proposalContent =  content;			//create content
		emit BidCreated(id) ;
	}


	//Solution Arcchitect populates the proposal response
	function populateProposalResponse(uint  id, string memory content) public onlySolutionArchitect isCreated(id){
		proposals[id].previousOwner = proposals[id].currentOwner ;//make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Populated;				// O is the initiated state
		proposals[id].proposalContent =  content;	
		emit BidPopulated(id) ;
	}


	//Delivery Lead Review Proposal
	function reviewProposal(uint  id, string memory revision) public onlyDeliveryLead isPopulated(id){
		proposals[id].previousOwner = proposals[id].currentOwner ;//make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Reviewed;				// O is the initiated state
		proposals[id].proposalContent =  revision;	
		emit BidReviewed(id) ;
	}

	//Delivery Lead provides the approval
	function provideApproval(uint  id) public onlyDeliveryLead //isReviewedorRevised(id)
	{
		proposals[id].previousOwner = proposals[id].currentOwner ;//make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Approved;				// O is the initiated state
		emit BidApproved(id) ;
	}

	//Delivery Lead Reject the proposal
	function rejectProposal(uint  id) public onlyDeliveryLead isReviewed(id){
		proposals[id].previousOwner = proposals[id].currentOwner ;//make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Rejected;				// O is the initiated state
		emit BidRejected(id) ;
	}

	//Solution Architect Revise the proposal
	function reviseProposal(uint  id, string memory content) public onlySolutionArchitect isRejected(id){
		proposals[id].previousOwner = proposals[id].currentOwner; //make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Populated;		   // Change the status as populated to follow the workflow
		proposals[id].proposalContent = content;
		emit BidRevised(id) ;
	}


	//Bid manager packages the proposal
	function packageProposal(uint  id) public onlyBidManager isApproved(id){
		proposals[id].previousOwner = proposals[id].currentOwner ;//make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Packed;		   // Change the status as populated to follow the workflow
		emit BidPacked(id) ;
	}

	//Sales lead submit the proposal
	function submitProposal(uint  id) public onlySalesLead isPacked(id){
		proposals[id].previousOwner = proposals[id].currentOwner; //make current owner (Bid Manager) the previous owner
		proposals[id].currentOwner = msg.sender ;		// make the sender the proposal owner
		proposals[id].state =  proposalState.Packed;		   // Change the status as populated to follow the workflow
		emit BidSubmitted(id) ;
	}



	/// UTILITY FUNCTIONS

	function fetchProposalState(uint  id) public view returns (proposalState state){
		state = proposals[id].state;
		return state;
	}

}