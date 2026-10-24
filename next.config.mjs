/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is entirely client-side, so build it to plain files in out/
  // and let nginx serve them. No Node process, no port.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  // next/image optimisation needs a server; the export has none.
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
