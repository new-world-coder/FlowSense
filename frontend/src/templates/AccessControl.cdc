// {{NAME}} Access Control Contract
// Template for role-based access control on Flow

pub contract {{NAME}} {
    
    // Role definitions
    pub enum Role: UInt8 {
        pub case Admin
        pub case Moderator
        pub case User
        pub case Guest
    }
    
    // Total number of registered users
    pub var totalUsers: UInt64
    
    // Events
    pub event RoleGranted(address: Address, role: Role)
    pub event RoleRevoked(address: Address, role: Role)
    pub event PermissionChanged(resource: String, role: Role, allowed: Bool)
    pub event UserRegistered(address: Address)
    
    // User Profile
    pub struct UserProfile {
        pub let address: Address
        pub var roles: [Role]
        pub let registeredAt: UFix64
        pub var isActive: Bool
        
        init(address: Address) {
            self.address = address
            self.roles = [Role.Guest]
            self.registeredAt = getCurrentBlock().timestamp
            self.isActive = true
        }
        
        access(contract) fun addRole(role: Role) {
            if !self.roles.contains(role) {
                self.roles.append(role)
            }
        }
        
        access(contract) fun removeRole(role: Role) {
            var i = 0
            while i < self.roles.length {
                if self.roles[i] == role {
                    self.roles.remove(at: i)
                    break
                }
                i = i + 1
            }
        }
        
        pub fun hasRole(role: Role): Bool {
            return self.roles.contains(role)
        }
    }
    
    // Permission Manager Resource
    pub resource PermissionManager {
        // Maps resource name -> role -> allowed
        access(self) var permissions: {String: {Role: Bool}}
        
        // Maps address -> UserProfile
        access(self) var users: {Address: UserProfile}
        
        init() {
            self.permissions = {}
            self.users = {}
            
            // Set default permissions
            self.setDefaultPermissions()
        }
        
        access(self) fun setDefaultPermissions() {
            // Admins can do everything
            self.setPermission(resource: "all", role: Role.Admin, allowed: true)
            
            // Moderators have limited permissions
            self.setPermission(resource: "moderate", role: Role.Moderator, allowed: true)
            
            // Users have basic permissions
            self.setPermission(resource: "read", role: Role.User, allowed: true)
            self.setPermission(resource: "write", role: Role.User, allowed: true)
            
            // Guests can only read
            self.setPermission(resource: "read", role: Role.Guest, allowed: true)
        }
        
        pub fun registerUser(address: Address) {
            pre {
                self.users[address] == nil: "User already registered"
            }
            
            let profile = UserProfile(address: address)
            self.users[address] = profile
            
            {{NAME}}.totalUsers = {{NAME}}.totalUsers + 1
            
            emit UserRegistered(address: address)
        }
        
        pub fun grantRole(address: Address, role: Role) {
            pre {
                self.users[address] != nil: "User not registered"
            }
            
            self.users[address]?.addRole(role: role)
            emit RoleGranted(address: address, role: role)
        }
        
        pub fun revokeRole(address: Address, role: Role) {
            pre {
                self.users[address] != nil: "User not registered"
            }
            
            self.users[address]?.removeRole(role: role)
            emit RoleRevoked(address: address, role: role)
        }
        
        pub fun setPermission(resource: String, role: Role, allowed: Bool) {
            if self.permissions[resource] == nil {
                self.permissions[resource] = {}
            }
            self.permissions[resource]?.insert(key: role, allowed)
            
            emit PermissionChanged(resource: resource, role: role, allowed: allowed)
        }
        
        pub fun hasPermission(address: Address, resource: String): Bool {
            let user = self.users[address]
            if user == nil {
                return false
            }
            
            // Check if user has any role with permission
            for role in user!.roles {
                // Admin role has access to everything
                if role == Role.Admin {
                    return true
                }
                
                // Check specific permission
                let resourcePerms = self.permissions[resource]
                if resourcePerms != nil && (resourcePerms![role] ?? false) {
                    return true
                }
                
                // Check "all" permission
                let allPerms = self.permissions["all"]
                if allPerms != nil && (allPerms![role] ?? false) {
                    return true
                }
            }
            
            return false
        }
        
        pub fun getUserProfile(address: Address): UserProfile? {
            return self.users[address]
        }
        
        pub fun getAllUsers(): [Address] {
            return self.users.keys
        }
    }
    
    // Create permission manager
    pub fun createPermissionManager(): @PermissionManager {
        return <- create PermissionManager()
    }
    
    init() {
        self.totalUsers = 0
        
        // Save permission manager to contract account
        let manager <- create PermissionManager()
        self.account.save(<- manager, to: /storage/{{NAME}}PermissionManager)
        
        log("{{NAME}} Access Control initialized")
    }
}

