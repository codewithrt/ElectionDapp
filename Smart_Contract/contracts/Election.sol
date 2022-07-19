// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

contract Election{
    // model a candidate
    struct Candidate{
        uint256 id;
        string name;
        uint256 votecount;
    }

    mapping(address => bool) voters;

    mapping(uint => Candidate) public Candidates;
    uint256 public candidatecount;
    
    event voteEvent(uint256 indexed _candidateid);
    constructor(){
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
    }
    function addCandidate(string memory _name ) private {
         candidatecount += 1;
         Candidates[candidatecount] = Candidate(candidatecount,_name,0);
    }
    function vote(uint256 _Candidateid) public  {
        // They havent voted before
        require(!voters[msg.sender]);
        // Require a valid candidate
        require(_Candidateid > 0 && _Candidateid <= candidatecount);
        // Record that voter has voted
        voters[msg.sender] = true;
        Candidates[_Candidateid].votecount += 1;
        
        emit voteEvent(_Candidateid);
    }
}