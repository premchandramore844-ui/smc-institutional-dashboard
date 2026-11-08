# Institutional SMC Analyzer — starter

A mobile-first starter app for an educational chart screenshot analysis workflow.

## What works in this starter
- Responsive dashboard UI for Android and desktop
- PNG/JPG/WEBP screenshot selection and preview
- Market and timeframe selection
- Server-side upload endpoint with an 8 MB limit
- Health endpoint at `/api/health`
- Clear placeholder response until AI integration is implemented

## What is not implemented yet
- Gemini vision-model analysis
- BOS/CHoCH, FVG, liquidity-sweep or support/resistance detection
- Entry, stop-loss, take-profit or confidence scoring

The app deliberately does not invent analysis results.

## Run locally
1. Install Node.js 20 or newer.
2. Extract the project folder.
3. In the folder, run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000` in a browser.

## Deploy on Render
- Create a new **Web Service** from this folder/repository.
- Build command: `npm install`
- Start command: `npm start`
- Add `GEMINI_API_KEY` in Render's Environment settings only after the AI integration is implemented.
- Do not add secrets to frontend JavaScript or commit them to Git.

## Next milestone
Implement the server-side Gemini image request with a strict JSON response schema, input validation, and explicit uncertainty handling. Test with chart screenshots before displaying any directional bias or levels.

## Safety
This is an educational analysis tool, not a broker, execution system, or guaranteed signal provider. Never place trades automatically from its output.
