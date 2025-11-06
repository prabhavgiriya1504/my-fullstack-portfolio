// postcss.config.mjs

const config = {
  plugins: {
    // 1. Use the standard stable Tailwind CSS plugin
    'tailwindcss': {}, 
    
    // 2. Autoprefixer is also required for browser compatibility
    'autoprefixer': {},
  },
};

export default config;