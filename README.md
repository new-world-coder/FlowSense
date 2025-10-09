# 🚀 FlowSense

> AI-Powered Smart Contract Generator for Flow Blockchain

FlowSense is a full-stack web application that leverages artificial intelligence to generate production-ready Cadence smart contracts for the Flow blockchain. Simply describe your dApp idea, and FlowSense will create optimized, secure smart contracts following Flow best practices.

## ✨ Features

- 🤖 **AI-Powered Generation**: Uses OpenAI GPT-4 to generate Cadence smart contracts
- 🎨 **Stunning UI**: Full-screen Flow-style gradient with glass-morphism design
- 🌈 **Flow Branding**: Beautiful gradient backgrounds and animated Flow logo
- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- ⚡ **Smooth Animations**: Powered by Framer Motion with spring physics
- 🎭 **Collapsible Code Panel**: Right-side panel for generated contracts
- 🔗 **Flow Integration**: Direct integration with Flow blockchain testnet
- 📝 **Templates**: Pre-built templates for common dApp patterns
- 📊 **Dashboard**: Track your contract generation and deployment activity

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **OpenAI API** - AI-powered contract generation
- **Flow JS SDK** - Flow blockchain integration

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- OpenAI API key
- Flow testnet account (optional)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd FlowSense
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Create a `.env` file in the backend directory:
```bash
cd backend
cp env.example .env
```

Edit `.env` and add your credentials:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
FLOW_NETWORK=testnet
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

3. **Open your browser**
Navigate to `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

## 📁 Project Structure

```
FlowSense/
├── backend/
│   ├── controllers/
│   │   ├── contractController.js
│   │   └── flowController.js
│   ├── routes/
│   │   ├── contractRoutes.js
│   │   └── flowRoutes.js
│   ├── server.js
│   ├── package.json
│   └── env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Templates.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Settings.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## 🎯 Usage

1. **Generate a Smart Contract**
   - Navigate to the Home page
   - Enter a description of your dApp idea
   - Click "Generate Smart Contract"
   - Wait for AI to generate your contract
   - Copy the generated Cadence code

2. **Explore Templates**
   - Visit the Templates page
   - Choose from pre-built contract templates
   - Customize as needed

3. **Track Your Progress**
   - Check the Dashboard for statistics
   - View recent contracts and deployments

4. **Configure Settings**
   - Add your API keys
   - Customize notifications
   - Manage security settings

## 🔐 API Endpoints

### Contract Generation
```
POST /api/contracts/generate
Body: { description: string }
Response: { success: boolean, contract: string, description: string }
```

### Flow Integration
```
POST /api/flow/deploy
Body: { contract: string, name: string }

GET /api/flow/account/:address
Response: { success: boolean, account: object }
```

### Health Check
```
GET /api/health
Response: { status: string, message: string }
```

## 🎨 UI Components

- **Sidebar Navigation**: Home, Templates, Dashboard, Profile, Settings
- **Dark/Light Mode Toggle**: Persistent theme preference
- **Animated Transitions**: Smooth page transitions with Framer Motion
- **Responsive Design**: Mobile-first, works on all devices
- **Custom Scrollbar**: Themed scrollbar for better UX

## 🔄 Future Enhancements

- [ ] Direct contract deployment to Flow
- [ ] User authentication with Flow wallet
- [ ] Contract versioning and history
- [ ] Collaborative editing
- [ ] Contract testing framework
- [ ] Multi-chain support
- [ ] Contract templates marketplace

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Flow Blockchain team for the amazing platform
- OpenAI for GPT-4 API
- The React and TailwindCSS communities

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ for the Flow Blockchain Ecosystem**

