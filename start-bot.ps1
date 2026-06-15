#!/usr/bin/env pwsh
# ClipCoreBot Startup Script

# Deactivate conda if active
if (Get-Command conda -ErrorAction SilentlyContinue) {
    conda deactivate
}

# Navigate to project
cd U:\ClipCore

# Run the bot
npm run dev
