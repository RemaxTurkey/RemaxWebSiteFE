/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@use "abstracts/variables" as *; @use "abstracts/mixins" as *;`,
  },
}

module.exports = nextConfig 