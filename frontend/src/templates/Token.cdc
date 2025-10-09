// {{NAME}} Fungible Token Contract
// Template for creating fungible tokens on Flow

pub contract {{NAME}} {
    
    // Total supply of tokens in circulation
    pub var totalSupply: UFix64
    
    // Maximum supply allowed
    pub let maxSupply: UFix64
    
    // Events
    pub event TokensInitialized(initialSupply: UFix64)
    pub event TokensWithdrawn(amount: UFix64, from: Address?)
    pub event TokensDeposited(amount: UFix64, to: Address?)
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
            emit TokensWithdrawn(amount: amount, from: self.owner?.address)
            return <- create Vault(balance: amount)
        }
        
        pub fun deposit(from: @Vault) {
            let amount = from.balance
            self.balance = self.balance + amount
            emit TokensDeposited(amount: amount, to: self.owner?.address)
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
            pre {
                {{NAME}}.totalSupply + amount <= {{NAME}}.maxSupply:
                    "Minting would exceed max supply"
            }
            
            {{NAME}}.totalSupply = {{NAME}}.totalSupply + amount
            emit TokensMinted(amount: amount)
            return <- create Vault(balance: amount)
        }
    }
    
    // Burner Resource
    pub resource Burner {
        pub fun burnTokens(from: @Vault) {
            let amount = from.balance
            destroy from
            emit TokensBurned(amount: amount)
        }
    }
    
    init(initialSupply: UFix64, maxSupply: UFix64) {
        self.totalSupply = initialSupply
        self.maxSupply = maxSupply
        
        // Create initial supply vault
        let vault <- create Vault(balance: initialSupply)
        self.account.save(<- vault, to: /storage/{{NAME}}Vault)
        
        // Create and save minter
        let minter <- create Minter()
        self.account.save(<- minter, to: /storage/{{NAME}}Minter)
        
        // Create and save burner
        let burner <- create Burner()
        self.account.save(<- burner, to: /storage/{{NAME}}Burner)
        
        emit TokensInitialized(initialSupply: initialSupply)
    }
}

