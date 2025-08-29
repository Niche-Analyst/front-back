/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 외부 이미지 URL을 사용하기 위해 호스트네임을 등록합니다.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // placehold.co의 모든 경로를 허용합니다.
      },
      {
        // globals.css에서 사용하는 배경 이미지 호스트도 추가합니다.
        protocol: 'https',
        hostname: 'www.script-tutorials.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
