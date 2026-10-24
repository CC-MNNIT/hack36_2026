{ pkgs ? import <nixpkgs> {} }:

# Toolchain for the HACK36 site: Next.js 16 needs Node >= 20.9, and the
# deploy host ships Node 18, so builds always run inside this shell.
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_22
  ];
}
