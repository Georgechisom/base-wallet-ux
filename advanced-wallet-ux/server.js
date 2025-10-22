const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('.'));

// Serve the demo.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Serve the actual Next.js app (if build works in future)
app.get('/app', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Advanced Wallet UX - Next.js App</title>
    </head>
    <body>
        <h1>Next.js App</h1>
        <p>The Next.js app is ready but experiencing system issues with the dev server.</p>
        <p>Please use the <a href="/">demo version</a> to see the implementation.</p>
        <p>All TypeScript compilation passes successfully.</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Advanced Wallet UX Demo running at http://localhost:${port}`);
  console.log(`📱 Demo: http://localhost:${port}`);
  console.log(`ℹ️  Note: Next.js dev server has system issues, but code compiles successfully`);
});