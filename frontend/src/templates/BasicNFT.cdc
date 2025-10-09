// {{NAME}} - Basic NFT Contract
// Simple NFT template for Flow blockchain

pub contract {{NAME}} {
    
    // Total NFTs minted
    pub var totalSupply: UInt64
    
    // Maximum supply
    pub let maxSupply: UInt64
    
    // Events
    pub event ContractInitialized()
    pub event NFTMinted(id: UInt64, metadata: {String: String})
    pub event NFTTransferred(id: UInt64, from: Address, to: Address)
    
    // NFT Resource
    pub resource NFT {
        pub let id: UInt64
        pub let metadata: {String: String}
        pub let mintedAt: UFix64
        
        init(metadata: {String: String}) {
            self.id = {{NAME}}.totalSupply
            self.metadata = metadata
            self.mintedAt = getCurrentBlock().timestamp
            
            {{NAME}}.totalSupply = {{NAME}}.totalSupply + 1
        }
    }
    
    // Collection to hold NFTs
    pub resource Collection {
        pub var ownedNFTs: @{UInt64: NFT}
        
        init() {
            self.ownedNFTs <- {}
        }
        
        // Deposit NFT into collection
        pub fun deposit(token: @NFT) {
            let id = token.id
            let oldToken <- self.ownedNFTs[id] <- token
            destroy oldToken
        }
        
        // Withdraw NFT from collection
        pub fun withdraw(withdrawID: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("NFT not found")
            return <- token
        }
        
        // Get list of NFT IDs
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }
        
        // Transfer NFT to another address
        pub fun transfer(id: UInt64, recipient: &Collection) {
            let nft <- self.withdraw(withdrawID: id)
            
            emit NFTTransferred(
                id: id,
                from: self.owner?.address ?? panic("No owner"),
                to: recipient.owner?.address ?? panic("No recipient")
            )
            
            recipient.deposit(token: <- nft)
        }
        
        destroy() {
            destroy self.ownedNFTs
        }
    }
    
    // Create empty collection
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }
    
    // Minter Resource - restricted to contract owner
    pub resource Minter {
        pub fun mintNFT(metadata: {String: String}): @NFT {
            pre {
                {{NAME}}.totalSupply < {{NAME}}.maxSupply:
                    "Maximum supply reached"
            }
            
            let nft <- create NFT(metadata: metadata)
            let id = nft.id
            
            emit NFTMinted(id: id, metadata: metadata)
            
            return <- nft
        }
        
        pub fun batchMint(count: UInt64, baseMetadata: {String: String}): @[NFT] {
            pre {
                {{NAME}}.totalSupply + count <= {{NAME}}.maxSupply:
                    "Batch mint would exceed max supply"
            }
            
            var nfts: @[NFT] <- []
            var i: UInt64 = 0
            
            while i < count {
                var metadata = baseMetadata
                metadata["index"] = i.toString()
                nfts.append(<- self.mintNFT(metadata: metadata))
                i = i + 1
            }
            
            return <- nfts
        }
    }
    
    // Get current supply
    pub fun getTotalSupply(): UInt64 {
        return self.totalSupply
    }
    
    // Get max supply
    pub fun getMaxSupply(): UInt64 {
        return self.maxSupply
    }
    
    init(maxSupply: UInt64) {
        self.totalSupply = 0
        self.maxSupply = maxSupply
        
        // Create and save minter resource
        let minter <- create Minter()
        self.account.save(<- minter, to: /storage/{{NAME}}Minter)
        
        // Create public capability for minter (optional)
        // self.account.link<&Minter>(/public/{{NAME}}Minter, target: /storage/{{NAME}}Minter)
        
        emit ContractInitialized()
        
        log("{{NAME}} initialized with max supply: ".concat(maxSupply.toString()))
    }
}

