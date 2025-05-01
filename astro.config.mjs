// @ts-check
import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind'; // Importación correcta para Tailwind v3

export default defineConfig({
  integrations: [
    tailwind(), // Integración oficial de Tailwind para Astro
    alpinejs()
  ]
});