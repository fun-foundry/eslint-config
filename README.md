# @fun-foundry/eslint-config

Opinionated ESLint configuration maintained by fun-foundry.

This package provides a shared ESLint configuration for JavaScript / TypeScript projects.  
It is intended to be simple, predictable, and easy to extend.

## Installation

```sh
npm install --save-dev @fun-foundry/eslint-config
```

## Usage

This package provides ESLint flat config presets.

In your `eslint.config.js` (or `eslint.config.mjs`):

```js
import { node, nextjs, vitest } from '@fun-foundry/eslint-config'

export default [
  ...node,
  ...nextjs,
  ...vitest,

  {
    rules: {
      // Example: restrict direct zod imports
      'no-restricted-imports': [
        'error',
        {
          paths: [{ name: 'zod', message: "Use '@/zod' instead." }]
        }
      ]
    }
  }
]
```

You can extend or override rules by appending additional config objects to the array.

## Design principles

- Prefer clarity over cleverness
- Avoid unnecessary rules
- Keep configuration small and composable
- Optimize for long-term maintainability
- Make it usable before making it perfect

## License

[MIT](LICENSE)
