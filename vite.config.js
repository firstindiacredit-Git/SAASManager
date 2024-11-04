import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.min.js',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf.worker': ['pdfjs-dist/build/pdf.worker.entry']
        }
      }
    }
  }
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         // Ensure that the worker files are outputted correctly
//         assetFileNames: (assetInfo) => {
//           if (assetInfo.name.endsWith('.worker.js')) {
//             return 'workers/[name][extname]';
//           }
//           return '[name][extname]';
//         },
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       // Ensure that the pdf.worker is resolved correctly
//       'pdfjs-dist/build/pdf.worker': 'pdfjs-dist/es5/build/pdf.worker.js',
//     },
//   },
//   worker: {
//     // Configure workers to ensure they are bundled correctly
//     format: 'es', // or 'iife' based on your needs
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import ViteNode from 'vite-plugin-node';

// export default defineConfig({
//   plugins: [
//     react(),
//     ViteNode()
//   ],
// });
