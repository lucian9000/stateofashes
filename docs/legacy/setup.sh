#!/bin/bash

echo "🔥 State of Ashes - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Quick Commands:"
echo "   npm run dev   - Start development server"
echo "   npm run build - Build for production"
echo "   npm start     - Run production server"
echo ""
echo "📝 To edit content, open: siteConfig.ts"
echo ""
