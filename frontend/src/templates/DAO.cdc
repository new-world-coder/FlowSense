// {{NAME}} DAO Governance Contract
// Template for decentralized governance on Flow

pub contract {{NAME}} {
    
    // Proposal states
    pub enum ProposalStatus: UInt8 {
        pub case Active
        pub case Passed
        pub case Rejected
        pub case Executed
        pub case Cancelled
    }
    
    // Total proposals created
    pub var totalProposals: UInt64
    
    // Voting period in seconds
    pub let votingPeriod: UFix64
    
    // Minimum votes required for quorum
    pub let quorumVotes: UInt64
    
    // Events
    pub event ProposalCreated(proposalID: UInt64, proposer: Address, description: String)
    pub event VoteCast(proposalID: UInt64, voter: Address, support: Bool, votes: UInt64)
    pub event ProposalExecuted(proposalID: UInt64)
    pub event ProposalCancelled(proposalID: UInt64)
    
    // Proposal Resource
    pub resource Proposal {
        pub let id: UInt64
        pub let proposer: Address
        pub let description: String
        pub let createdAt: UFix64
        pub var votesFor: UInt64
        pub var votesAgainst: UInt64
        pub var status: ProposalStatus
        access(self) var voters: {Address: Bool}
        
        init(proposer: Address, description: String) {
            self.id = {{NAME}}.totalProposals
            self.proposer = proposer
            self.description = description
            self.createdAt = getCurrentBlock().timestamp
            self.votesFor = 0
            self.votesAgainst = 0
            self.status = ProposalStatus.Active
            self.voters = {}
            
            {{NAME}}.totalProposals = {{NAME}}.totalProposals + 1
        }
        
        pub fun castVote(voter: Address, support: Bool, votingPower: UInt64) {
            pre {
                self.status == ProposalStatus.Active: "Proposal is not active"
                self.voters[voter] == nil: "Already voted"
                !self.isExpired(): "Voting period has ended"
            }
            
            self.voters[voter] = support
            
            if support {
                self.votesFor = self.votesFor + votingPower
            } else {
                self.votesAgainst = self.votesAgainst + votingPower
            }
            
            emit VoteCast(
                proposalID: self.id,
                voter: voter,
                support: support,
                votes: votingPower
            )
            
            // Auto-finalize if quorum reached
            self.checkAndFinalize()
        }
        
        pub fun hasVoted(voter: Address): Bool {
            return self.voters[voter] != nil
        }
        
        pub fun isExpired(): Bool {
            return getCurrentBlock().timestamp > self.createdAt + {{NAME}}.votingPeriod
        }
        
        pub fun getTotalVotes(): UInt64 {
            return self.votesFor + self.votesAgainst
        }
        
        access(self) fun checkAndFinalize() {
            let totalVotes = self.getTotalVotes()
            
            if totalVotes >= {{NAME}}.quorumVotes {
                if self.votesFor > self.votesAgainst {
                    self.status = ProposalStatus.Passed
                } else {
                    self.status = ProposalStatus.Rejected
                }
            } else if self.isExpired() {
                self.status = ProposalStatus.Rejected
            }
        }
        
        pub fun execute() {
            pre {
                self.status == ProposalStatus.Passed: "Proposal not passed"
            }
            
            self.status = ProposalStatus.Executed
            emit ProposalExecuted(proposalID: self.id)
        }
        
        pub fun cancel() {
            pre {
                self.status == ProposalStatus.Active: "Proposal not active"
            }
            
            self.status = ProposalStatus.Cancelled
            emit ProposalCancelled(proposalID: self.id)
        }
        
        pub fun getDetails(): {String: AnyStruct} {
            return {
                "id": self.id,
                "proposer": self.proposer,
                "description": self.description,
                "createdAt": self.createdAt,
                "votesFor": self.votesFor,
                "votesAgainst": self.votesAgainst,
                "status": self.status.rawValue,
                "totalVotes": self.getTotalVotes(),
                "isExpired": self.isExpired()
            }
        }
    }
    
    // DAO Governor Resource
    pub resource Governor {
        access(self) var proposals: @{UInt64: Proposal}
        access(self) var votingPower: {Address: UInt64}
        
        init() {
            self.proposals <- {}
            self.votingPower = {}
        }
        
        pub fun createProposal(description: String, proposer: Address): UInt64 {
            let proposal <- create Proposal(
                proposer: proposer,
                description: description
            )
            
            let proposalID = proposal.id
            
            emit ProposalCreated(
                proposalID: proposalID,
                proposer: proposer,
                description: description
            )
            
            self.proposals[proposalID] <-! proposal
            
            return proposalID
        }
        
        pub fun vote(proposalID: UInt64, voter: Address, support: Bool) {
            pre {
                self.proposals[proposalID] != nil: "Proposal does not exist"
            }
            
            let votingPower = self.votingPower[voter] ?? 1
            self.proposals[proposalID]?.castVote(
                voter: voter,
                support: support,
                votingPower: votingPower
            )
        }
        
        pub fun setVotingPower(address: Address, power: UInt64) {
            self.votingPower[address] = power
        }
        
        pub fun getProposal(proposalID: UInt64): &Proposal? {
            return &self.proposals[proposalID] as &Proposal?
        }
        
        pub fun getAllProposalIDs(): [UInt64] {
            return self.proposals.keys
        }
        
        destroy() {
            destroy self.proposals
        }
    }
    
    // Create governor
    pub fun createGovernor(): @Governor {
        return <- create Governor()
    }
    
    init(votingPeriod: UFix64, quorumVotes: UInt64) {
        self.totalProposals = 0
        self.votingPeriod = votingPeriod
        self.quorumVotes = quorumVotes
        
        // Create and save governor
        let governor <- create Governor()
        self.account.save(<- governor, to: /storage/{{NAME}}Governor)
        
        log("{{NAME}} DAO initialized - Voting period: ".concat(votingPeriod.toString())
            .concat(" | Quorum: ").concat(quorumVotes.toString()))
    }
}

