#!/bin/bash
# Deploy the HACK36 10.0 site (static Next.js export) to hack36.in.
#
# Pull, build inside the Nix shell, sanity-check the export, then publish it
# through the root-owned sync helper. The helper refuses to run unless
# out/index.html exists, so a failed build can never blank the live site.
#
# One-time host setup (see deploy/hack36.in.conf and deploy/README notes):
#   sudo install -m 755 deploy/hack36-deploy-sync /usr/local/bin/
#   sudo install -m 440 deploy/hack36-deploy.sudoers /etc/sudoers.d/hack36-deploy
#   sudo visudo -c
set -e

REPO_DIR="$HOME/repos/cc_club_mnnit/hack36_2026"
PUBLIC_ORIGIN="https://hack36.in"

echo "Starting Nix-powered HACK36 deployment..."

cd "$REPO_DIR"
echo "Operating in: $REPO_DIR"

# Pull first, then re-exec so an update to this very script is picked up.
if [ -z "${DEPLOY_PULLED:-}" ]; then
  echo "Pulling latest changes from Git..."
  git pull --ff-only origin main || git pull origin main
  export DEPLOY_PULLED=1
  exec bash "$0"
fi

. "$HOME/.nix-profile/etc/profile.d/nix.sh"

# CI avoids next build's anonymous usage telemetry prompt in a fresh shell.
echo "Installing dependencies and building inside Nix..."
nix-shell shell.nix --run "npm ci && NEXT_TELEMETRY_DISABLED=1 npm run build"

# The export writes out/. Absence means the build failed or was not an export.
if [ ! -f out/index.html ]; then
  echo "Build failed: out/index.html missing - leaving the live site untouched."
  exit 1
fi

echo "Syncing export to the web root..."
sudo /usr/local/bin/hack36-deploy-sync

echo "Deployment successful."
echo "  Prod: $PUBLIC_ORIGIN/"
