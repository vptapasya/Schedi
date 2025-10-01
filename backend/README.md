# Schedi Backend

A simple Node.js/Express backend API for the Schedi course scheduling application.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
NODE_ENV=development
PORT=3001
```

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## API Endpoints

- `GET /` - Hello World message
- `GET /health` - Health check
- `GET /api/hello` - API hello message

## Deployment

This backend is configured for deployment on Render.com.

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (Render will set this automatically)
