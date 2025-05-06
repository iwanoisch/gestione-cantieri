import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import * as fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    /**
     * Configurazione della cartella pubblica principale
     * - Contiene gli asset statici come immagini, font, favicon
     * - I file qui vengono serviti così come sono e copiati in dist/
     */
    // Specifica la cartella public dove mettere .htaccess
    publicDir: 'public',
    /**
     * Configurazione del build
     */
    build: {
        /**
         * Opzioni per Rollup (il bundler sottostante)
         */
        rollupOptions: {
            // Punto di ingresso principale
            input: {
                main: resolve(__dirname, 'index.html')
            },
            /**
             * Configurazione dell'output
             */
            output: {
                manualChunks: {
                    // Crea chunk separati per le librerie più grandi
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'state-management': ['@reduxjs/toolkit', 'react-redux'],
                    'ui-libs': ['@headlessui/react', 'framer-motion'],
                    'charts': ['react-google-charts'],
                    'icons': ['@heroicons/react'],
                    'utils': ['date-fns', 'axios']
                },

                // Configurazione aggiuntiva per gli asset
                assetFileNames: 'assets/[name].[ext]'
            },
            /**
             * Plugin personalizzato per copiare .htaccess dalla cartella static/
             * - Viene eseguito solo durante il build di produzione
             */
            plugins: [{
                name: 'copy-htaccess',
                generateBundle() {
                    try {
                        const htaccessContent = fs.readFileSync('static/.htaccess', 'utf-8');
                        this.emitFile({
                            type: 'asset',
                            fileName: '.htaccess',
                            source: htaccessContent
                        });
                        console.log('.htaccess copiato con successo');
                    } catch (error) {
                        console.error('Errore nella copia di .htaccess:', error);
                    }
                }
            }]
        },
        // Copia .htaccess nella cartella dist Non includere gli asset nella build (copia così come sono)
        assetsInlineLimit: 0,

        // Abilita la copia della cartella public
        copyPublicDir: true
    },
    /**
     * Configurazione delle dipendenze da pre-ottimizzare
     */
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            '@headlessui/react',
            'framer-motion'
        ]
    },
    /**
     * Configurazione del server di sviluppo
     */
    server: {
        // Abilita l'accesso da altri dispositivi in rete locale
        host: true,

        // Configurazione aggiuntiva per il proxy se necessario
        proxy: {
            // Esempio: '/api': 'http://localhost:3000'
        }
    },

    /**
     * Risoluzione dei percorsi (alias)
     */
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './public/assets')
        }
    }
})
