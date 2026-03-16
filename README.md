# @fun-foundry/eslint-config

Opinionated ESLint configuration maintained by fun-foundry.

This package provides a shared ESLint configuration for JavaScript / TypeScript projects.

## Installation

Install both ESLint and this configuration package.

```sh
npm install --save-dev eslint @fun-foundry/eslint-config
```

or

```sh
yarn add -D eslint @fun-foundry/eslint-config
```

or

```sh
pnpm add -D eslint @fun-foundry/eslint-config
```

## Usage

This package provides three ESLint flat config presets.

| Preset    | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `node`    | Base rules for Node.js / TypeScript projects                   |
| `nextjs`  | Additional rules for Next.js projects (React, Testing Library) |
| `vitest`  | Additional rules for test files using Vitest                   |

Create an `eslint.config.js` (or `eslint.config.mjs`) and import the presets you need.

Example: `eslint.config.js`

```js
import { node } from '@fun-foundry/eslint-config/node'
import { nextjs } from '@fun-foundry/eslint-config/nextjs'
import { vitest } from '@fun-foundry/eslint-config/vitest'

export default [
  ...node,
  ...nextjs,
  ...vitest
]
```

## Customization

You can extend the presets and override individual rules in your project.

Example: `eslint.config.js`

```js
import { node } from '@fun-foundry/eslint-config/node'

export default [
  ...node,

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

This is useful when you want to keep the base style from this package while adapting a few rules for a specific project.

## Peer dependencies

The `nextjs` and `vitest` presets require optional peer dependencies. Install them as needed.

For `nextjs`:

```sh
npm install --save-dev @next/eslint-plugin-next eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-testing-library
```

For `vitest`:

```sh
npm install --save-dev @vitest/eslint-plugin
```

## Requirements

- Node.js >= 18.18.0
- ESLint >= 9

## License

[MIT](LICENSE)
