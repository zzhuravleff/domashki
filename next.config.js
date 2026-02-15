/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
    // ВНИМАНИЕ: Это позволяет успешно собрать проект, даже если есть ошибки ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
