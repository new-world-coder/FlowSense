// {{NAME}} Secure Vault Contract
// Template for creating secure storage vaults on Flow

pub contract {{NAME}} {
    
    // Total number of vaults created
    pub var totalVaults: UInt64
    
    // Events
    pub event VaultCreated(vaultID: UInt64, owner: Address)
    pub event ItemStored(vaultID: UInt64, itemID: String)
    pub event ItemRetrieved(vaultID: UInt64, itemID: String)
    pub event VaultLocked(vaultID: UInt64)
    pub event VaultUnlocked(vaultID: UInt64)
    
    // Stored Item
    pub struct StoredItem {
        pub let id: String
        pub let data: {String: AnyStruct}
        pub let timestamp: UFix64
        
        init(id: String, data: {String: AnyStruct}) {
            self.id = id
            self.data = data
            self.timestamp = getCurrentBlock().timestamp
        }
    }
    
    // Vault Resource
    pub resource Vault {
        pub let id: UInt64
        pub var isLocked: Bool
        access(self) var items: {String: StoredItem}
        access(self) var authorizedUsers: {Address: Bool}
        
        init() {
            self.id = {{NAME}}.totalVaults
            self.isLocked = false
            self.items = {}
            self.authorizedUsers = {}
            
            {{NAME}}.totalVaults = {{NAME}}.totalVaults + 1
        }
        
        pub fun addAuthorizedUser(address: Address) {
            pre {
                !self.isLocked: "Vault is locked"
                self.owner != nil: "Vault has no owner"
            }
            self.authorizedUsers[address] = true
        }
        
        pub fun removeAuthorizedUser(address: Address) {
            pre {
                !self.isLocked: "Vault is locked"
            }
            self.authorizedUsers.remove(key: address)
        }
        
        pub fun isAuthorized(address: Address): Bool {
            return self.authorizedUsers[address] ?? false
        }
        
        pub fun storeItem(id: String, data: {String: AnyStruct}) {
            pre {
                !self.isLocked: "Vault is locked"
                self.items[id] == nil: "Item with this ID already exists"
            }
            
            let item = StoredItem(id: id, data: data)
            self.items[id] = item
            
            emit ItemStored(vaultID: self.id, itemID: id)
        }
        
        pub fun retrieveItem(id: String): StoredItem? {
            pre {
                !self.isLocked: "Vault is locked"
            }
            
            let item = self.items[id]
            if item != nil {
                emit ItemRetrieved(vaultID: self.id, itemID: id)
            }
            return item
        }
        
        pub fun removeItem(id: String): StoredItem? {
            pre {
                !self.isLocked: "Vault is locked"
            }
            
            return self.items.remove(key: id)
        }
        
        pub fun lock() {
            self.isLocked = true
            emit VaultLocked(vaultID: self.id)
        }
        
        pub fun unlock() {
            self.isLocked = false
            emit VaultUnlocked(vaultID: self.id)
        }
        
        pub fun getItemIDs(): [String] {
            return self.items.keys
        }
        
        pub fun getItemCount(): Int {
            return self.items.length
        }
        
        destroy() {
            destroy self.items
        }
    }
    
    // Create new vault
    pub fun createVault(): @Vault {
        let vault <- create Vault()
        emit VaultCreated(vaultID: vault.id, owner: self.account.address)
        return <- vault
    }
    
    // Get total number of vaults
    pub fun getTotalVaults(): UInt64 {
        return self.totalVaults
    }
    
    init() {
        self.totalVaults = 0
        
        log("{{NAME}} Vault contract initialized")
    }
}

