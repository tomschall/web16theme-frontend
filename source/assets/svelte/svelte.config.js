const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({ tsConfigFile: './tsconfig.json' }),
};
