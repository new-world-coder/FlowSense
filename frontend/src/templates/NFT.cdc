// {{NAME}} NFT Contract
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
}

