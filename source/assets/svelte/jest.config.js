module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    'node_modules/svelte-markdown/.+\\.svelte?$': 'jest-transform-svelte',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)?$':
      'jest-transform-stub',
    '^.+\\.svelte?$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(svelte-markdown)/)'],
  moduleFileExtensions: ['js', 'svelte', 'ts'],
  bail: false,
  verbose: true,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};
