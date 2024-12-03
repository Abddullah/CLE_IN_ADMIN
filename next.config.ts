import type { NextConfig } from "next";

const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig:NextConfig = {
    eslint:{
        ignoreDuringBuilds: true
    }
   
};
 
module.exports = withNextIntl(nextConfig);
