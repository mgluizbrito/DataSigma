import { defineConfig } from "vite";

export default defineConfig({
    base: '/DataSigma/',

    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                table: 'table/index.html',
                text: 'text/index.html',
                classe: 'classe/index.html',
            },
        },
    },
});