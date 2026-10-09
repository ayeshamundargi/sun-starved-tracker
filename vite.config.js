import { defineConfig } from 'vite';

// Sun-Starved Tracker: Vite Development & Build Configuration
export default defineConfig({
  base: './',
  server: {
    // Port 3000 for local browser access (http://localhost:3000)
    port: 3000,
    // host: true enables easy testing on mobile devices on the same Wi-Fi
    host: true
  },
  build: {
    // Bundled production files will be output to /dist
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
