#!/bin/bash
# Renders the CV page to public/Rodrigo_Viola_CV.pdf with headless Chrome,
# using the page's own print stylesheet. Run after any change to the CV:
#   npm run pdf
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT=4199

npx next build > /dev/null
python3 -m http.server "$PORT" --directory out > /dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null' EXIT
sleep 1

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --print-to-pdf=public/Rodrigo_Viola_CV.pdf "http://localhost:$PORT/" 2>/dev/null

# Rebuild so the fresh PDF is part of the static export.
npx next build > /dev/null
echo "Wrote public/Rodrigo_Viola_CV.pdf"
