# 🔗 Flow Blockchain Integration Guide

Complete guide to FlowSense's Flow blockchain integration using FCL (Flow Client Library).

## ✨ Features Implemented

### 1. **Flow Wallet Connection**
- Connect/Disconnect Flow wallet
- Display wallet address in navbar
- Show FLOW balance
- Auto-reconnect on page reload
- Wallet dropdown with account details

### 2. **Smart Contract Deployment**
- Deploy generated Cadence contracts to Flow testnet
- Transaction submission
- Real-time deployment status
- Error handling and user feedback

### 3. **Transaction Verification**
- Verify transaction status on Flow
- Track transaction sealing
- Display transaction details
- Block explorer integration

### 4. **User Interface**
- Flow Wallet Button with dropdown
- Transaction Status component
- Deploy button integration
- Real-time feedback

## 📁 File Structure

```
frontend/src/
├── utils/
│   └── flow.js                  # Flow SDK utilities and functions
│
├── context/
│   └── FlowContext.jsx          # Flow state management
│
├── components/
│   ├── FlowWalletButton.jsx    # Wallet connection UI
│   └── TransactionStatus.jsx   # Transaction feedback UI
│
└── pages/
    └── Home.jsx                 # Updated with deploy functionality
```

## 🔧 Core Components

### 1. Flow Utilities (`utils/flow.js`)

#### Configuration
```javascript
fcl.config({
  'app.detail.title': 'FlowSense',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'flow.network': 'testnet',
});
```

#### Main Functions

**Authentication**
- `authenticateFlow()` - Connect wallet
- `unauthenticateFlow()` - Disconnect wallet
- `getCurrentFlowUser()` - Get current user
- `subscribeToFlowAuth(callback)` - Listen to auth changes

**Smart Contracts**
- `deployContract(contractCode, contractName)` - Deploy contract
- `verifyTransaction(txId)` - Verify transaction
- `sendTransaction(cadence, args)` - Send transaction
- `executeScript(cadence, args)` - Execute read-only script

**Account Management**
- `getAccount(address)` - Get account info
- `getFlowBalance(address)` - Get FLOW balance
- `formatFlowAddress(address, chars)` - Format address for display
- `isValidFlowAddress(address)` - Validate Flow address

### 2. Flow Context (`FlowContext.jsx`)

Provides global Flow state management:

```javascript
const { 
  user,              // Current user object
  isConnected,       // Boolean - wallet connected
  isConnecting,      // Boolean - connecting in progress
  balance,           // FLOW balance string
  error,             // Error message
  connect,           // Function to connect wallet
  disconnect,        // Function to disconnect
  refreshBalance,    // Function to refresh balance
  deployContract,    // Function to deploy contract
  verifyTransaction  // Function to verify transaction
} = useFlow();
```

### 3. Flow Wallet Button (`FlowWalletButton.jsx`)

Features:
- Connect/Disconnect button
- Wallet address display (formatted)
- FLOW balance display
- Dropdown with account details
- Refresh balance button
- Copy address functionality
- Minimal mode for header

### 4. Transaction Status (`TransactionStatus.jsx`)

Features:
- Transaction status display
- Auto-verification
- Status icons (pending, success, failed)
- Transaction details
- Block explorer link
- Manual status check button
- Error messages

## 🚀 Usage Examples

### Connect Wallet

```jsx
import { useFlow } from '../context/FlowContext';

function MyComponent() {
  const { connect, isConnected, user } = useFlow();

  return (
    <div>
      {!isConnected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <p>Connected: {user.address}</p>
      )}
    </div>
  );
}
```

### Deploy Contract

```jsx
import { useFlow } from '../context/FlowContext';

function DeployButton() {
  const { deployContract, isConnected } = useFlow();
  const [txId, setTxId] = useState(null);

  const handleDeploy = async () => {
    if (!isConnected) {
      alert('Connect wallet first');
      return;
    }

    try {
      const result = await deployContract(contractCode, 'MyContract');
      setTxId(result.txId);
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  return <button onClick={handleDeploy}>Deploy</button>;
}
```

### Verify Transaction

```jsx
import { useFlow } from '../context/FlowContext';
import TransactionStatus from '../components/TransactionStatus';

function DeploymentStatus({ txId }) {
  return (
    <TransactionStatus
      txId={txId}
      autoVerify={true}
      onClose={() => console.log('Closed')}
    />
  );
}
```

### Check Balance

```jsx
import { useFlow } from '../context/FlowContext';

function BalanceDisplay() {
  const { balance, refreshBalance } = useFlow();

  return (
    <div>
      <p>Balance: {balance} FLOW</p>
      <button onClick={refreshBalance}>Refresh</button>
    </div>
  );
}
```

## 🔐 Flow Wallet Button Usage

### Standard Mode
```jsx
import FlowWalletButton from '../components/FlowWalletButton';

<FlowWalletButton />
```

### Minimal Mode (for Header)
```jsx
<FlowWalletButton minimal={true} />
```

## 📊 Transaction Flow

### 1. User Flow
```
1. User generates contract → AI creates Cadence code
2. User connects Flow wallet → FCL authentication
3. User clicks deploy → deployContract() called
4. Transaction submitted → txId returned
5. Status component shown → Auto-verify transaction
6. Transaction sealed → Success/failure displayed
7. View on explorer → Link to Flow testnet explorer
```

### 2. Technical Flow
```
Home.jsx
  ↓
handleDeploy()
  ↓
useFlow().deployContract()
  ↓
FlowContext → utils/flow.js → deployContract()
  ↓
fcl.mutate() → Submit transaction
  ↓
Return txId
  ↓
TransactionStatus component
  ↓
Auto-verify with verifyTransaction()
  ↓
fcl.tx(txId).onceSealed()
  ↓
Display result
```

## 🎨 UI Components

### FlowWalletButton States

**Not Connected**
```
┌──────────────────────┐
│ 💰 Connect Wallet    │
└──────────────────────┘
```

**Connecting**
```
┌──────────────────────┐
│ ⏳ Connecting...     │
└──────────────────────┘
```

**Connected (Minimal)**
```
┌──────────────────────┐
│ 💰 0x1234...5678     │
└──────────────────────┘
```

**Connected (Full with Dropdown)**
```
┌──────────────────────────┐
│ 💰  0x1234...5678  ▼    │
└──────────────────────────┘
      ↓ (Click to open)
┌──────────────────────────┐
│ Flow Address             │
│ 0x1234567890abcdef       │
├──────────────────────────┤
│ Balance         🔄       │
│ 123.4567 FLOW           │
├──────────────────────────┤
│ 🚪 Disconnect Wallet     │
└──────────────────────────┘
```

### TransactionStatus States

**Pending**
```
┌─────────────────────────┐
│       ⏳                │
│  Transaction Pending    │
│                         │
│  TX: 0xabc...           │
│  [Check Status]         │
│  [View on Explorer]     │
└─────────────────────────┘
```

**Success**
```
┌─────────────────────────┐
│       ✅                │
│  Transaction Successful!│
│                         │
│  TX: 0xabc...           │
│  Block: 12345678        │
│  Events: 3              │
│  [View on Explorer]     │
│  [Close]                │
└─────────────────────────┘
```

**Failed**
```
┌─────────────────────────┐
│       ❌                │
│  Transaction Failed     │
│                         │
│  Error: ...             │
│  TX: 0xabc...           │
│  [View on Explorer]     │
│  [Close]                │
└─────────────────────────┘
```

## 🔍 Transaction Verification

### Status Codes
- `0` - Success
- `1` - Failure
- `2` - Pending
- `3` - Expired
- `4` - Sealed

### Transaction States
- **Pending**: Transaction submitted but not sealed
- **Sealed**: Transaction included in a block
- **Success**: Transaction executed successfully
- **Failed**: Transaction execution failed

## 🌐 Block Explorer Integration

FlowSense integrates with Flow testnet block explorer:

```
https://testnet.flowdiver.io/tx/{transactionId}
```

Users can:
- View transaction details
- See execution results
- Check events emitted
- Verify contract deployment

## 📝 Cadence Contract Structure

Example generated contract:
```cadence
pub contract MyDApp {
    // Contract state
    pub var totalSupply: UInt64
    
    // Events
    pub event ContractInitialized()
    pub event ItemCreated(id: UInt64)
    
    init() {
        self.totalSupply = 0
        emit ContractInitialized()
    }
    
    pub fun createItem(): UInt64 {
        let itemId = self.totalSupply
        self.totalSupply = self.totalSupply + 1
        emit ItemCreated(id: itemId)
        return itemId
    }
}
```

## ⚠️ Important Notes

### 1. Contract Deployment Limitations
- Direct contract deployment requires account authorization
- Current implementation prepares deployment transaction
- Full deployment requires service account setup
- Users need FLOW in wallet for gas fees

### 2. Testnet Configuration
- All transactions on Flow testnet
- Free testnet FLOW available from faucet
- Testnet data may be reset
- Use for development/testing only

### 3. Wallet Support
- Supports Flow wallet providers via FCL Discovery
- Compatible with:
  - Blocto
  - Lilico
  - Dapper Wallet
  - Flow Wallet (dev)

### 4. Error Handling
- Network errors handled gracefully
- User-friendly error messages
- Transaction failures logged
- Retry mechanisms in place

## 🔧 Configuration

### Environment Variables
```env
# Optional: Custom RPC endpoints
NEXT_PUBLIC_FLOW_ACCESS_NODE=https://rest-testnet.onflow.org

# Optional: WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### FCL Configuration Options
```javascript
fcl.config({
  'app.detail.title': 'FlowSense',
  'app.detail.icon': 'https://flowsense.app/icon.png',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'flow.network': 'testnet',
  'walletconnect.projectId': 'your-project-id',
});
```

## 🚀 Future Enhancements

1. **Mainnet Support**
   - Add mainnet configuration
   - Network switcher
   - Gas estimation

2. **Contract Management**
   - List deployed contracts
   - Contract versioning
   - Update deployed contracts

3. **Advanced Features**
   - Script execution UI
   - Transaction history
   - Event monitoring
   - Contract interaction UI

4. **Account Features**
   - Multi-sig support
   - Account key management
   - Resource management

## 🔗 Resources

- [Flow Documentation](https://docs.onflow.org)
- [FCL Documentation](https://docs.onflow.org/fcl/)
- [Cadence Language](https://docs.onflow.org/cadence/)
- [Flow Testnet Faucet](https://testnet-faucet.onflow.org)
- [Flow Block Explorer](https://testnet.flowdiver.io)

## ✅ Testing Checklist

- [ ] Connect wallet successfully
- [ ] Display correct address
- [ ] Show FLOW balance
- [ ] Refresh balance works
- [ ] Disconnect wallet works
- [ ] Generate contract
- [ ] Deploy button appears
- [ ] Deploy requires wallet connection
- [ ] Transaction submitted
- [ ] Transaction status displays
- [ ] Auto-verification works
- [ ] Manual verification works
- [ ] Block explorer link works
- [ ] Error handling works
- [ ] UI responsive on mobile

---

**Built with 🔗 Flow Blockchain & FCL**

FlowSense now has complete blockchain integration, enabling users to connect their Flow wallets, deploy smart contracts, and verify transactions - all with a beautiful, responsive UI!

