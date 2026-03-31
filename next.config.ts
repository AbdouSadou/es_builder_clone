/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    output: 'export',
    basePath: "/es_builder_clone",
    assetPrefix: "/es_builder_clone/",
    images: {
        unoptimized: true,
    },


};

module.exports = nextConfig
