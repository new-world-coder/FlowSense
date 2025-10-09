# 📁 FlowSense Project Structure

Complete overview of the FlowSense project architecture.

## 🗂️ Directory Structure

```
FlowSense/
│
├── 📄 README.md                    # Main project documentation
├── 📄 QUICKSTART.md               # Quick start guide
├── 📄 PROJECT_STRUCTURE.md        # This file
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 backend/                    # Node.js/Express backend
│   ├── 📁 controllers/
│   │   ├── contractController.js  # AI contract generation logic
│   │   └── flowController.js      # Flow blockchain integration
│   │
│   ├── 📁 routes/
│   │   ├── contractRoutes.js      # Contract API routes
│   │   └── flowRoutes.js          # Flow API routes
│   │
│   ├── 📄 server.js               # Express server entry point
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 env.example             # Environment variables template
│   └── 📄 README.md               # Backend documentation
│
└── 📁 frontend/                   # React frontend
    ├── 📁 public/
    │   └── flow-icon.svg          # App icon
    │
    ├── 📁 src/
    │   ├── 📁 components/
    │   │   ├── Header.jsx         # Top navigation with theme toggle
    │   │   ├── Layout.jsx         # Main layout wrapper
    │   │   └── Sidebar.jsx        # Side navigation menu
    │   │
    │   ├── 📁 context/
    │   │   └── ThemeContext.jsx   # Dark/Light theme state
    │   │
    │   ├── 📁 pages/
    │   │   ├── Home.jsx           # Contract generation page
    │   │   ├── Templates.jsx      # Template gallery
    │   │   ├── Dashboard.jsx      # User dashboard
    │   │   ├── Profile.jsx        # User profile
    │   │   └── Settings.jsx       # App settings
    │   │
    │   ├── 📁 config/
    │   │   └── flow.js            # Flow blockchain config
    │   │
    │   ├── 📁 utils/
    │   │   └── api.js             # API client utilities
    │   │
    │   ├── 📄 App.jsx             # Main app with routing
    │   ├── 📄 main.jsx            # React entry point
    │   └── 📄 index.css           # Global styles + Tailwind
    │
    ├── 📄 index.html              # HTML template
    ├── 📄 vite.config.js          # Vite configuration
    ├── 📄 tailwind.config.js      # TailwindCSS config
    ├── 📄 postcss.config.js       # PostCSS config
    ├── 📄 package.json            # Frontend dependencies
    └── 📄 README.md               # Frontend documentation
```

## 🔧 Key Technologies

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| OpenAI API | AI contract generation |
| @onflow/fcl | Flow blockchain SDK |
| CORS | Cross-origin requests |
| dotenv | Environment variables |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| React Router DOM | Routing |
| Axios | HTTP client |
| Lucide React | Icons |
| @onflow/fcl | Flow integration |

## 🎯 Core Features

### 1. **Smart Contract Generation** (Home Page)
- AI-powered Cadence contract generation
- Uses OpenAI GPT-4
- Real-time generation feedback
- Code copy functionality

### 2. **Template System** (Templates Page)
- Pre-built contract templates
- NFT, Token, Marketplace patterns
- One-click template usage

### 3. **Dashboard** (Dashboard Page)
- Contract statistics
- Recent activity
- Deployment tracking
- Success metrics

### 4. **User Profile** (Profile Page)
- User information
- Flow wallet integration
- Achievement system

### 5. **Settings** (Settings Page)
- Theme preferences
- API key management
- Notification settings
- Security options

### 6. **Theme System**
- Dark/Light mode toggle
- Persistent preferences
- Smooth transitions
- System-wide consistency

## 🔌 API Endpoints

### Contract Generation
```
POST /api/contracts/generate
```

### Flow Integration
```
POST /api/flow/deploy
GET  /api/flow/account/:address
```

### Health Check
```
GET  /api/health
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on all devices
- **Smooth Animations**: Framer Motion powered
- **Dark/Light Mode**: Toggle with persistence
- **Custom Scrollbar**: Themed scrollbar
- **Icon System**: Lucide React icons
- **Loading States**: User feedback
- **Error Handling**: Clear error messages

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configure Environment**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your API keys
   ```

3. **Run Development Servers**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📝 Development Workflow

1. **Backend Changes**: Edit files in `backend/`, server auto-reloads
2. **Frontend Changes**: Edit files in `frontend/src/`, HMR updates instantly
3. **Styling**: Use TailwindCSS classes or custom classes in `index.css`
4. **New Routes**: Add route in `App.jsx` and create page in `pages/`
5. **New API**: Add route in `routes/`, controller in `controllers/`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
OPENAI_API_KEY=your_openai_key
FLOW_NETWORK=testnet
```

### Frontend (optional .env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Backend
```bash
cd backend
npm start
# Runs on configured PORT
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📚 Additional Resources

- [Flow Documentation](https://docs.onflow.org)
- [Cadence Language](https://docs.onflow.org/cadence/)
- [OpenAI API](https://platform.openai.com/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Built with ❤️ for the Flow Blockchain Ecosystem**

