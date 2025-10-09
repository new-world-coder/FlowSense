# 🚀 FlowSense Quick Start Guide

Get FlowSense up and running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Step 1: Install Dependencies

### Backend
```bash
cd FlowSense/backend
npm install
```

### Frontend
```bash
cd FlowSense/frontend
npm install
```

## Step 2: Configure Environment

1. Navigate to the backend directory:
```bash
cd FlowSense/backend
```

2. Create a `.env` file:
```bash
cp env.example .env
```

3. Edit `.env` and add your OpenAI API key:
```env
PORT=5000
OPENAI_API_KEY=sk-your-actual-api-key-here
FLOW_NETWORK=testnet
```

## Step 3: Start the Application

### Terminal 1 - Start Backend
```bash
cd FlowSense/backend
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2 - Start Frontend
```bash
cd FlowSense/frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

## Step 4: Use FlowSense

1. Open your browser to http://localhost:5173
2. You'll see the FlowSense home page
3. Enter a description of your dApp idea, for example:
   > "Create an NFT marketplace where users can mint, buy, and sell digital art with a 5% royalty fee for creators"
4. Click "Generate Smart Contract"
5. Wait for the AI to generate your Cadence smart contract
6. Copy the code and use it in your Flow project!

## 🎨 Explore Features

- **🏠 Home**: Generate smart contracts
- **📝 Templates**: Browse pre-built contract templates
- **📊 Dashboard**: View your activity and statistics
- **👤 Profile**: Check your achievements
- **⚙️ Settings**: Configure your preferences

## 💡 Tips

- Toggle dark/light mode using the button in the top right
- All pages have smooth animations powered by Framer Motion
- Your theme preference is saved automatically

## 🔧 Troubleshooting

**Backend won't start?**
- Make sure port 5000 is available
- Check that your `.env` file is properly configured

**Frontend won't connect to backend?**
- Ensure backend is running on port 5000
- Check the Vite proxy configuration in `vite.config.js`

**Contract generation fails?**
- Verify your OpenAI API key is valid
- Ensure you have API credits available
- Check the browser console for errors

## 🚀 Next Steps

- Explore the Templates page for common dApp patterns
- Try generating different types of smart contracts
- Check out the Dashboard to track your progress
- Configure your settings for a personalized experience

## 📚 Resources

- [Flow Documentation](https://docs.onflow.org)
- [Cadence Language](https://docs.onflow.org/cadence/)
- [Flow Playground](https://play.onflow.org)

---

**Happy Building! 🎉**

