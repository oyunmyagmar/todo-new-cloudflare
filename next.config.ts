/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Build хийх үед ESLint алдаа гарсан ч үргэлжлүүлнэ
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript-ийн алдааг мөн адил үл тоосно
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
