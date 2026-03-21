#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "[1] Remove backup folder if it exists..."
rm -rf ghosTech_backup

echo "[2] Ensure libs/qrcode.d.ts exists..."
mkdir -p libs
cat > libs/qrcode.d.ts << 'EOT'
declare module "qrcode";
EOT

echo "[3] Rewrite tsconfig.json includes to only compile libs and src..."
if [ -f tsconfig.json ]; then
  tmp_tsconfig=tsconfig.fixed.$$.json
  node - << 'EON'
const fs = require('fs');
const path = 'tsconfig.json';
const cfg = JSON.parse(fs.readFileSync(path, 'utf8'));
cfg.include = ["libs/**/*.ts", "src/**/*.ts"];
fs.writeFileSync(path, JSON.stringify(cfg, null, 2));
EON
else
  echo 'tsconfig.json not found, creating minimal one...'
  cat > tsconfig.json << 'EOT'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": ".",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["libs/**/*.ts", "src/**/*.ts"]
}
EOT
fi

echo "[4] Run TypeScript compile..."
npx tsc

echo "[5] Run built app..."
node dist/index.js || echo "Built, but dist/index.js did not run cleanly."
