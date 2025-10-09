// Cadence Contract Templates as JavaScript strings

export const NFTTemplate = `// {{NAME}} NFT Contract
// Template for creating NFT collections on Flow

pub contract {{NAME}} {
    
    // Total supply of NFTs minted
    pub var totalSupply: UInt64
    
    // Events
    pub event ContractInitialized()
    pub event NFTMinted(id: UInt64, recipient: Address)
    pub event NFTDestroyed(id: UInt64)
    
    // NFT Resource
    pub resource NFT {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let thumbnail: String
        pub var metadata: {String: String}
        
        init(
            id: UInt64,
            name: String,
            description: String,
            thumbnail: String,
            metadata: {String: String}
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.metadata = metadata
        }
    }
    
    // Collection Resource
    pub resource Collection {
        pub var ownedNFTs: @{UInt64: NFT}
        
        init() {
            self.ownedNFTs <- {}
        }
        
        pub fun deposit(token: @NFT) {
            let id = token.id
            self.ownedNFTs[id] <-! token
        }
        
        pub fun withdraw(withdrawID: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("NFT not found in collection")
            return <- token
        }
        
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }
        
        pub fun borrowNFT(id: UInt64): &NFT? {
            return &self.ownedNFTs[id] as &NFT?
        }
        
        destroy() {
            destroy self.ownedNFTs
        }
    }
    
    // Public function to create empty collection
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }
    
    // Minter Resource
    pub resource NFTMinter {
        pub fun mintNFT(
            recipient: &{Receiver},
            name: String,
            description: String,
            thumbnail: String,
            metadata: {String: String}
        ): UInt64 {
            let newNFT <- create NFT(
                id: {{NAME}}.totalSupply,
                name: name,
                description: description,
                thumbnail: thumbnail,
                metadata: metadata
            )
            
            let id = newNFT.id
            recipient.deposit(token: <- newNFT)
            
            {{NAME}}.totalSupply = {{NAME}}.totalSupply + 1
            
            emit NFTMinted(id: id, recipient: recipient.owner!.address)
            
            return id
        }
    }
    
    // Receiver interface
    pub resource interface Receiver {
        pub fun deposit(token: @NFT)
    }
    
    init() {
        self.totalSupply = 0
        
        // Save minter to account storage
        self.account.save(<- create NFTMinter(), to: /storage/{{NAME}}Minter)
        
        emit ContractInitialized()
    }
}`;

export const BasicNFTTemplate = `// {{NAME}} - Basic NFT Contract
// Simple NFT template for Flow blockchain

pub contract {{NAME}} {
    
    // Total NFTs minted
    pub var totalSupply: UInt64
    
    // Maximum supply
    pub let maxSupply: UInt64
    
    // Events
    pub event ContractInitialized()
    pub event NFTMinted(id: UInt64, metadata: {String: String})
    
    // NFT Resource
    pub resource NFT {
        pub let id: UInt64
        pub let metadata: {String: String}
        
        init(metadata: {String: String}) {
            self.id = {{NAME}}.totalSupply
            self.metadata = metadata
            {{NAME}}.totalSupply = {{NAME}}.totalSupply + 1
        }
    }
    
    // Collection to hold NFTs
    pub resource Collection {
        pub var ownedNFTs: @{UInt64: NFT}
        
        init() {
            self.ownedNFTs <- {}
        }
        
        pub fun deposit(token: @NFT) {
            let id = token.id
            let oldToken <- self.ownedNFTs[id] <- token
            destroy oldToken
        }
        
        pub fun withdraw(withdrawID: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("NFT not found")
            return <- token
        }
        
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }
        
        destroy() {
            destroy self.ownedNFTs
        }
    }
    
    // Create empty collection
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }
    
    // Minter Resource
    pub resource Minter {
        pub fun mintNFT(metadata: {String: String}): @NFT {
            let nft <- create NFT(metadata: metadata)
            return <- nft
        }
    }
    
    init(maxSupply: UInt64) {
        self.totalSupply = 0
        self.maxSupply = maxSupply
        
        let minter <- create Minter()
        self.account.save(<- minter, to: /storage/{{NAME}}Minter)
        
        emit ContractInitialized()
    }
}`;

export const TokenTemplate = `// {{NAME}} Fungible Token Contract
// Template for creating fungible tokens on Flow

pub contract {{NAME}} {
    
    // Total supply of tokens in circulation
    pub var totalSupply: UFix64
    
    // Events
    pub event TokensInitialized(initialSupply: UFix64)
    pub event TokensMinted(amount: UFix64)
    pub event TokensBurned(amount: UFix64)
    
    // Vault Resource
    pub resource Vault {
        pub var balance: UFix64
        
        init(balance: UFix64) {
            self.balance = balance
        }
        
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            return <- create Vault(balance: amount)
        }
        
        pub fun deposit(from: @Vault) {
            self.balance = self.balance + from.balance
            destroy from
        }
        
        destroy() {
            if self.balance > 0.0 {
                {{NAME}}.totalSupply = {{NAME}}.totalSupply - self.balance
            }
        }
    }
    
    // Create empty vault
    pub fun createEmptyVault(): @Vault {
        return <- create Vault(balance: 0.0)
    }
    
    // Minter Resource
    pub resource Minter {
        pub fun mintTokens(amount: UFix64): @Vault {
            {{NAME}}.totalSupply = {{NAME}}.totalSupply + amount
            emit TokensMinted(amount: amount)
            return <- create Vault(balance: amount)
        }
    }
    
    init(initialSupply: UFix64) {
        self.totalSupply = initialSupply
        
        let vault <- create Vault(balance: initialSupply)
        self.account.save(<- vault, to: /storage/{{NAME}}Vault)
        
        let minter <- create Minter()
        self.account.save(<- minter, to: /storage/{{NAME}}Minter)
        
        emit TokensInitialized(initialSupply: initialSupply)
    }
}`;

export const MarketplaceTemplate = `// {{NAME}} Marketplace Contract
// Template for creating NFT marketplace on Flow

pub contract {{NAME}} {
    
    // Total number of listings
    pub var totalListings: UInt64
    
    // Fee percentage
    pub let marketplaceFee: UFix64
    
    // Events
    pub event ListingCreated(listingID: UInt64, nftID: UInt64, price: UFix64, seller: Address)
    pub event ListingCompleted(listingID: UInt64, buyer: Address)
    pub event ListingCancelled(listingID: UInt64)
    
    // Listing Resource
    pub resource Listing {
        pub let id: UInt64
        pub let nftID: UInt64
        pub let price: UFix64
        pub let seller: Address
        pub var isActive: Bool
        
        init(nftID: UInt64, price: UFix64, seller: Address) {
            self.id = {{NAME}}.totalListings
            self.nftID = nftID
            self.price = price
            self.seller = seller
            self.isActive = true
            
            {{NAME}}.totalListings = {{NAME}}.totalListings + 1
        }
        
        pub fun complete() {
            self.isActive = false
        }
        
        pub fun cancel() {
            self.isActive = false
        }
    }
    
    // Storefront Resource
    pub resource Storefront {
        pub var listings: @{UInt64: Listing}
        
        init() {
            self.listings <- {}
        }
        
        pub fun createListing(nftID: UInt64, price: UFix64): UInt64 {
            let listing <- create Listing(
                nftID: nftID,
                price: price,
                seller: self.owner!.address
            )
            
            let listingID = listing.id
            emit ListingCreated(
                listingID: listingID,
                nftID: nftID,
                price: price,
                seller: self.owner!.address
            )
            
            self.listings[listingID] <-! listing
            return listingID
        }
        
        pub fun cancelListing(listingID: UInt64) {
            let listing <- self.listings.remove(key: listingID)
                ?? panic("Listing does not exist")
            
            listing.cancel()
            emit ListingCancelled(listingID: listing.id)
            destroy listing
        }
        
        destroy() {
            destroy self.listings
        }
    }
    
    pub fun createStorefront(): @Storefront {
        return <- create Storefront()
    }
    
    init() {
        self.totalListings = 0
        self.marketplaceFee = {{FEE_PERCENTAGE}}
    }
}`;

export const VaultTemplate = `// {{NAME}} Secure Vault Contract
// Template for creating secure storage vaults on Flow

pub contract {{NAME}} {
    
    // Total number of vaults created
    pub var totalVaults: UInt64
    
    // Events
    pub event VaultCreated(vaultID: UInt64, owner: Address)
    pub event ItemStored(vaultID: UInt64, itemID: String)
    pub event VaultLocked(vaultID: UInt64)
    
    // Vault Resource
    pub resource Vault {
        pub let id: UInt64
        pub var isLocked: Bool
        access(self) var items: {String: String}
        
        init() {
            self.id = {{NAME}}.totalVaults
            self.isLocked = false
            self.items = {}
            
            {{NAME}}.totalVaults = {{NAME}}.totalVaults + 1
        }
        
        pub fun storeItem(id: String, data: String) {
            pre {
                !self.isLocked: "Vault is locked"
            }
            self.items[id] = data
            emit ItemStored(vaultID: self.id, itemID: id)
        }
        
        pub fun retrieveItem(id: String): String? {
            pre {
                !self.isLocked: "Vault is locked"
            }
            return self.items[id]
        }
        
        pub fun lock() {
            self.isLocked = true
            emit VaultLocked(vaultID: self.id)
        }
        
        pub fun getItemIDs(): [String] {
            return self.items.keys
        }
    }
    
    pub fun createVault(): @Vault {
        let vault <- create Vault()
        emit VaultCreated(vaultID: vault.id, owner: self.account.address)
        return <- vault
    }
    
    init() {
        self.totalVaults = 0
    }
}`;

export const AccessControlTemplate = `// {{NAME}} Access Control Contract
// Template for role-based access control on Flow

pub contract {{NAME}} {
    
    // Role definitions
    pub enum Role: UInt8 {
        pub case Admin
        pub case User
        pub case Guest
    }
    
    // Events
    pub event RoleGranted(address: Address, role: Role)
    pub event RoleRevoked(address: Address, role: Role)
    
    // Permission Manager Resource
    pub resource PermissionManager {
        access(self) var userRoles: {Address: [Role]}
        
        init() {
            self.userRoles = {}
        }
        
        pub fun grantRole(address: Address, role: Role) {
            if self.userRoles[address] == nil {
                self.userRoles[address] = []
            }
            
            if !self.userRoles[address]!.contains(role) {
                self.userRoles[address]!.append(role)
                emit RoleGranted(address: address, role: role)
            }
        }
        
        pub fun revokeRole(address: Address, role: Role) {
            if let roles = self.userRoles[address] {
                var i = 0
                while i < roles.length {
                    if roles[i] == role {
                        self.userRoles[address]!.remove(at: i)
                        emit RoleRevoked(address: address, role: role)
                        break
                    }
                    i = i + 1
                }
            }
        }
        
        pub fun hasRole(address: Address, role: Role): Bool {
            if let roles = self.userRoles[address] {
                return roles.contains(role)
            }
            return false
        }
    }
    
    pub fun createPermissionManager(): @PermissionManager {
        return <- create PermissionManager()
    }
    
    init() {
        let manager <- create PermissionManager()
        self.account.save(<- manager, to: /storage/{{NAME}}Manager)
    }
}`;

export const DAOTemplate = `// {{NAME}} DAO Governance Contract
// Template for decentralized governance on Flow

pub contract {{NAME}} {
    
    // Total proposals created
    pub var totalProposals: UInt64
    
    // Voting period in seconds
    pub let votingPeriod: UFix64
    
    // Events
    pub event ProposalCreated(proposalID: UInt64, proposer: Address)
    pub event VoteCast(proposalID: UInt64, voter: Address, support: Bool)
    pub event ProposalExecuted(proposalID: UInt64)
    
    // Proposal Resource
    pub resource Proposal {
        pub let id: UInt64
        pub let proposer: Address
        pub let description: String
        pub let createdAt: UFix64
        pub var votesFor: UInt64
        pub var votesAgainst: UInt64
        access(self) var voters: {Address: Bool}
        
        init(proposer: Address, description: String) {
            self.id = {{NAME}}.totalProposals
            self.proposer = proposer
            self.description = description
            self.createdAt = getCurrentBlock().timestamp
            self.votesFor = 0
            self.votesAgainst = 0
            self.voters = {}
            
            {{NAME}}.totalProposals = {{NAME}}.totalProposals + 1
        }
        
        pub fun castVote(voter: Address, support: Bool) {
            pre {
                self.voters[voter] == nil: "Already voted"
            }
            
            self.voters[voter] = support
            
            if support {
                self.votesFor = self.votesFor + 1
            } else {
                self.votesAgainst = self.votesAgainst + 1
            }
            
            emit VoteCast(proposalID: self.id, voter: voter, support: support)
        }
    }
    
    // Governor Resource
    pub resource Governor {
        access(self) var proposals: @{UInt64: Proposal}
        
        init() {
            self.proposals <- {}
        }
        
        pub fun createProposal(description: String, proposer: Address): UInt64 {
            let proposal <- create Proposal(
                proposer: proposer,
                description: description
            )
            
            let proposalID = proposal.id
            emit ProposalCreated(proposalID: proposalID, proposer: proposer)
            
            self.proposals[proposalID] <-! proposal
            return proposalID
        }
        
        destroy() {
            destroy self.proposals
        }
    }
    
    pub fun createGovernor(): @Governor {
        return <- create Governor()
    }
    
    init(votingPeriod: UFix64) {
        self.totalProposals = 0
        self.votingPeriod = votingPeriod
        
        let governor <- create Governor()
        self.account.save(<- governor, to: /storage/{{NAME}}Governor)
    }
}`;

export default {
  NFTTemplate,
  BasicNFTTemplate,
  TokenTemplate,
  MarketplaceTemplate,
  VaultTemplate,
  AccessControlTemplate,
  DAOTemplate,
};

