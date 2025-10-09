# FlowSense Backend API

RESTful API for FlowSense smart contract generation and Flow blockchain integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp env.example .env
```

3. Configure your environment variables in `.env`:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
FLOW_NETWORK=testnet
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Contract Generation

**Generate Smart Contract**
```
POST /api/contracts/generate
Content-Type: application/json

{
  "description": "A description of your dApp"
}

Response:
{
  "success": true,
  "contract": "// Cadence contract code...",
  "description": "A description of your dApp"
}
```

### Flow Integration

**Deploy Contract**
```
POST /api/flow/deploy
Content-Type: application/json

{
  "contract": "// Cadence code...",
  "name": "MyContract"
}
```

**Get Account Info**
```
GET /api/flow/account/:address

Response:
{
  "success": true,
  "account": { /* Flow account data */ }
}
```

### Health Check

```
GET /api/health

Response:
{
  "status": "ok",
  "message": "FlowSense API is running"
}
```

## Project Structure

```
backend/
├── controllers/
│   ├── contractController.js  # Contract generation logic
│   └── flowController.js       # Flow blockchain integration
├── routes/
│   ├── contractRoutes.js       # Contract endpoints
│   └── flowRoutes.js           # Flow endpoints
├── server.js                   # Express server setup
├── package.json
└── env.example
```

## Error Handling

All endpoints return errors in the following format:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Development

The server uses `nodemon` for development, which automatically restarts on file changes.

```bash
npm run dev
```

