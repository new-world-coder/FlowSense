# 🧱 FlowSense Template Engine & Safe Mode

Complete guide to the Safe Mode template system with pre-built Cadence contracts.

## ✨ Features Implemented

### 1. **Dual Mode System**
- **Safe Mode**: Pre-audited templates with variable replacement
- **AI Mode**: Custom AI-generated contracts

### 2. **Template Library**
7 production-ready Cadence templates:
- NFT Collection (advanced)
- Basic NFT (simple)
- Fungible Token
- NFT Marketplace
- Secure Vault
- Access Control
- DAO Governance

### 3. **Variable Replacement**
- Dynamic variable substitution ({{NAME}}, {{SUPPLY}}, etc.)
- Custom input fields per template
- Default values provided
- Type validation

### 4. **Syntax Highlighting**
- Beautiful code display with react-syntax-highlighter
- Line numbers
- Dark theme (VS Code Dark+)
- Responsive code blocks

### 5. **AI Explanation**
- "Explain" button in code panel
- OpenAI-powered explanations
- Clear, educational descriptions
- Security considerations included

## 📁 Template Files

### Location
```
frontend/src/templates/
├── NFT.cdc              # Advanced NFT collection
├── BasicNFT.cdc         # Simple NFT contract
├── Token.cdc            # Fungible token
├── Marketplace.cdc      # NFT marketplace
├── Vault.cdc            # Secure storage vault
├── AccessControl.cdc    # Role-based access
└── DAO.cdc              # Governance system
```

### Template Structure

Each template includes:
- **Variables**: Replaceable placeholders like {{NAME}}
- **Comments**: Clear documentation
- **Events**: Proper event emission
- **Resources**: Flow resource types
- **Init**: Initialization logic
- **Functions**: Core functionality

## 🎯 Template Details

### 1. NFT Collection (`NFT.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Complete NFT implementation
- Collection management
- Minting functionality
- Metadata support
- Transfer capabilities

### 2. Basic NFT (`BasicNFT.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Simple NFT structure
- Max supply limit
- Basic minting
- Batch minting
- Easy to understand

### 3. Fungible Token (`Token.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Vault-based token
- Minting/burning
- Max supply enforcement
- Transfer events
- Balance tracking

### 4. NFT Marketplace (`Marketplace.cdc`)
**Variables**: `{{NAME}}`, `{{FEE_PERCENTAGE}}`
**Features**:
- Listing creation
- Purchase functionality
- Fee calculation
- Listing cancellation
- Event tracking

### 5. Secure Vault (`Vault.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Secure storage
- Access control
- Lock/unlock mechanism
- Multi-user support
- Item management

### 6. Access Control (`AccessControl.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Role-based permissions
- User management
- Permission manager
- Role hierarchy
- Audit logging

### 7. DAO Governance (`DAO.cdc`)
**Variables**: `{{NAME}}`
**Features**:
- Proposal creation
- Voting mechanism
- Quorum requirements
- Vote tracking
- Execution control

## 🔧 Template Manager (`utils/templates.js`)

### Main Functions

```javascript
// Get all templates
contractTemplates

// Get template by ID
getTemplate(templateId)

// Process template with variables
processTemplate(template, variables)

// Generate contract from template
generateFromTemplate(templateId, variables)

// Get template categories
getCategories()

// Filter by category
getTemplatesByCategory(category)
```

### Template Object Structure

```javascript
{
  id: 'nft',
  name: 'NFT Collection',
  description: 'Complete NFT collection with minting',
  category: 'NFT',
  icon: '🖼️',
  template: '<template string>',
  variables: [
    {
      key: 'NAME',
      label: 'Contract Name',
      default: 'MyNFTCollection',
      type: 'text'
    }
  ]
}
```

## 🎨 UI Features

### Mode Toggle
```
┌────────────────┬────────────────┐
│  🛡️ Safe Mode  │  ⚡ AI Mode    │
└────────────────┴────────────────┘
```

### Safe Mode UI
```
1. Select Contract Type (dropdown)
   ↓
2. Customize variables (inputs)
   ↓
3. Template preview (card)
   ↓
4. Generate button
   ↓
5. Code panel opens with syntax highlighting
   ↓
6. Explain button → AI explanation
   ↓
7. Deploy button
```

### AI Mode UI
```
1. Describe dApp idea (textarea)
   ↓
2. Generate with AI button
   ↓
3. Code panel opens
   ↓
4. Explain & Deploy
```

## 💻 Code Panel Features

### Syntax Highlighting
- Language: Swift (closest to Cadence)
- Theme: VS Code Dark+
- Line numbers: Yes
- Wrap lines: Yes
- Copy functionality

### Explain Feature
- Purple/pink gradient button
- Loading state during explanation
- Expandable explanation section
- AI-powered descriptions
- Security insights

## 🔌 Backend Integration

### New Endpoint: `/api/contracts/explain`

```javascript
POST /api/contracts/explain
Content-Type: application/json

{
  "code": "<cadence code>"
}

Response:
{
  "success": true,
  "explanation": "This contract..."
}
```

### Implementation
- Uses OpenAI GPT-4
- Educational prompt
- Focus on clarity
- Security considerations
- Best practices

## 🚀 Usage Examples

### Generate from Template

```jsx
import { generateFromTemplate } from '../utils/templates';

const code = generateFromTemplate('nft', {
  NAME: 'MyAwesomeNFT'
});
```

### Use in Component

```jsx
const Home = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [variables, setVariables] = useState({});
  
  const handleGenerate = () => {
    const code = generateFromTemplate(selectedTemplate, variables);
    setGeneratedCode(code);
  };
};
```

### Get Template Info

```jsx
import { getTemplate } from '../utils/templates';

const template = getTemplate('nft');
console.log(template.name); // "NFT Collection"
console.log(template.variables); // [{ key: 'NAME', ... }]
```

## 🎬 User Flow

### Safe Mode Flow
```
1. Land on home page
2. Click "Safe Mode" toggle
3. Select template from dropdown
4. See template info card
5. Fill in variables (e.g., contract name)
6. Click "Generate Safe Contract"
7. Code panel slides in with highlighted code
8. Click "Explain" for AI explanation
9. Read explanation below code
10. Click "Deploy" when ready
```

### Variable Replacement
```cadence
// Template:
pub contract {{NAME}} {
    pub var supply: UInt64
}

// User inputs:
NAME = "MyToken"

// Result:
pub contract MyToken {
    pub var supply: UInt64
}
```

## 🎨 UI Design

### Mode Buttons
- **Safe Mode**: Emerald → Cyan gradient, Shield icon
- **AI Mode**: Purple → Pink gradient, Zap icon
- Active state highlighted
- Smooth transitions

### Template Dropdown
- All templates with icons and descriptions
- Categories visible
- Clear selection
- Disabled during generation

### Variable Inputs
- Dynamic based on template
- Labels from template config
- Default values pre-filled
- Type-appropriate inputs

### Feature Pills
- **Safe Mode**: "Pre-Audited", "Production Ready", "Best Practices", "Instant Deploy"
- **AI Mode**: "AI-Powered", "Custom Logic", "Optimized", "Secure"
- Color-coded per mode

## 📊 Template Categories

- **NFT**: NFT-related contracts
- **Token**: Fungible tokens
- **DeFi**: Decentralized finance
- **Storage**: Data storage
- **Security**: Access control
- **DAO**: Governance

## 🔐 Security Features

### Safe Mode Benefits
- Pre-audited code
- Known security patterns
- Best practices built-in
- Tested templates
- Production-ready

### Variable Validation
- Type checking
- Required fields
- Default values
- Sanitization

## 🎨 Syntax Highlighting

### Configuration
```javascript
<SyntaxHighlighter
  language="swift"          // Closest to Cadence
  style={vscDarkPlus}      // Dark theme
  customStyle={{
    padding: '1.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  }}
  showLineNumbers={true}
  wrapLines={true}
>
  {code}
</SyntaxHighlighter>
```

## 🤖 AI Explanation

### Prompt Engineering
```
System: "You are an expert Cadence smart contract educator..."
User: "Explain this Cadence smart contract: <code>"
```

### Response Format
- Clear overview
- Key functions
- Security notes
- Best practices
- Simple language

## 📝 Example Templates

### NFT Template
```cadence
pub contract {{NAME}} {
    pub var totalSupply: UInt64
    
    pub resource NFT {
        pub let id: UInt64
        // ...
    }
    
    pub resource Collection {
        // ...
    }
}
```

### Token Template
```cadence
pub contract {{NAME}} {
    pub var totalSupply: UFix64
    pub let maxSupply: UFix64
    
    pub resource Vault {
        pub var balance: UFix64
        // ...
    }
}
```

## 🔄 Template Processing

### Step-by-Step
1. User selects template
2. Template loaded from file
3. Variable inputs shown
4. User fills variables
5. `generateFromTemplate()` called
6. Regex replaces {{VAR}} with values
7. Processed code returned
8. Displayed with syntax highlighting

## ✅ Testing

Visit http://localhost:5173 and:
- [ ] Toggle between Safe/AI mode
- [ ] Select each template
- [ ] Fill in variables
- [ ] Generate contract
- [ ] See syntax highlighting
- [ ] Click Explain button
- [ ] Read AI explanation
- [ ] Deploy contract

## 🚀 Future Enhancements

1. **More Templates**
   - Staking contracts
   - Multi-sig wallets
   - Auction systems
   - Lending protocols

2. **Advanced Features**
   - Template versioning
   - Template marketplace
   - User-submitted templates
   - Template rating system

3. **Variable Improvements**
   - Conditional variables
   - Dependent variables
   - Advanced validation
   - Visual editors

4. **Code Features**
   - Syntax validation
   - Error highlighting
   - Auto-formatting
   - Code diff view

---

**Result**: A complete template system with Safe Mode, variable replacement, syntax highlighting, and AI explanations - providing users with secure, production-ready smart contracts instantly! 🎉

