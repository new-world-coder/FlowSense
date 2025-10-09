// {{NAME}} Marketplace Contract
// Template for creating NFT marketplace on Flow

pub contract {{NAME}} {
    
    // Total number of listings
    pub var totalListings: UInt64
    
    // Fee percentage (e.g., 2.5 = 2.5%)
    pub let marketplaceFee: UFix64
    
    // Events
    pub event ListingCreated(listingID: UInt64, nftID: UInt64, price: UFix64, seller: Address)
    pub event ListingCompleted(listingID: UInt64, nftID: UInt64, price: UFix64, seller: Address, buyer: Address)
    pub event ListingCancelled(listingID: UInt64, nftID: UInt64, seller: Address)
    
    // Listing Details
    pub struct ListingDetails {
        pub let listingID: UInt64
        pub let nftID: UInt64
        pub let price: UFix64
        pub let seller: Address
        pub let isActive: Bool
        
        init(
            listingID: UInt64,
            nftID: UInt64,
            price: UFix64,
            seller: Address,
            isActive: Bool
        ) {
            self.listingID = listingID
            self.nftID = nftID
            self.price = price
            self.seller = seller
            self.isActive = isActive
        }
    }
    
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
        
        pub fun getDetails(): ListingDetails {
            return ListingDetails(
                listingID: self.id,
                nftID: self.nftID,
                price: self.price,
                seller: self.seller,
                isActive: self.isActive
            )
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
        
        pub fun purchase(listingID: UInt64, payment: @Vault): @NFT {
            pre {
                self.listings[listingID] != nil: "Listing does not exist"
                payment.balance >= self.listings[listingID]?.price ?? 0.0:
                    "Insufficient payment"
            }
            
            let listing <- self.listings.remove(key: listingID)!
            let price = listing.price
            let seller = listing.seller
            let nftID = listing.nftID
            
            // Calculate marketplace fee
            let fee = price * ({{NAME}}.marketplaceFee / 100.0)
            let sellerAmount = price - fee
            
            // TODO: Transfer payment to seller and fee to marketplace
            // This would require payment vault and marketplace vault references
            
            listing.complete()
            
            emit ListingCompleted(
                listingID: listingID,
                nftID: nftID,
                price: price,
                seller: seller,
                buyer: payment.owner?.address ?? panic("No buyer address")
            )
            
            destroy listing
            destroy payment
            
            // TODO: Return the NFT to buyer
            // This is a placeholder - actual implementation would transfer NFT
            panic("NFT transfer not implemented in template")
        }
        
        pub fun cancelListing(listingID: UInt64) {
            let listing <- self.listings.remove(key: listingID)
                ?? panic("Listing does not exist")
            
            listing.cancel()
            
            emit ListingCancelled(
                listingID: listing.id,
                nftID: listing.nftID,
                seller: listing.seller
            )
            
            destroy listing
        }
        
        pub fun getListingIDs(): [UInt64] {
            return self.listings.keys
        }
        
        destroy() {
            destroy self.listings
        }
    }
    
    // Create empty storefront
    pub fun createStorefront(): @Storefront {
        return <- create Storefront()
    }
    
    // Placeholder interfaces
    pub resource interface Receiver {
        pub fun deposit(token: @NFT)
    }
    
    pub resource NFT {
        pub let id: UInt64
        init(id: UInt64) {
            self.id = id
        }
    }
    
    pub resource Vault {
        pub var balance: UFix64
        init(balance: UFix64) {
            self.balance = balance
        }
    }
    
    init() {
        self.totalListings = 0
        self.marketplaceFee = {{FEE_PERCENTAGE}}
        
        emit ContractInitialized()
    }
}

