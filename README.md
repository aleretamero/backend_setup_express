# Como criar o Setup passo a passo

## Instalar pacotes

1. Iniciar o projeto

```bash
git init
```

```bash
npm init -y
```

2. Instalar o TypeScript

```bash
npm install -D typescript @types/node
```

```bash
npx tsc --init
```

3. Instalar nodemon e ts-node

```bash
npm install -D ts-node nodemon
```

4. Instalar prettier e eslint

```bash
npm install -D prettier eslint eslint-config-prettier
```

```bash
npx eslint --init
```

```
    1. How would you like to use ESLint?
      - To check syntax and find problems
    2. What type of modules does your project use?
      - JavaScript modules (import/export)
    3. Which framework does your project use?
      - None of these
    4. Does your project use TypeScript?
      - Yes
    5. Where does your code run?
      - Node
    6. What format do you want your config file to be in?
      - JSON
    7. Would you like to install them now?
      - Yes
    8. Which package manager do you want to use?
      - npm
```

5. Instalar husky a lint-staged

```bash
npm install -D husky lint-staged
```

6. Instalar Jest

```bash
npm install -D jest @types/jest ts-jest
```

```bash
npx jest --init
```

```
    1. Would you like to use Jest when running "test" script in "package.json"?
      - Yes
    2. Would you like to use Typescript for the configuration file?
       - Yes
    3. Choose the test environment that will be used for testing
      - node
    4. Do you want Jest to add coverage reports?
      - Yes
    5. Which provider should be used to instrument code for coverage?
      - v8
    6. Automatically clear mock calls, instances, contexts and results before every test?
      - Yes
```

7. Instalar commitlint

```bash
npm install -D @commitlint/config-conventional @commitlint/cli
```

8. Setup básico Express

```bash
npm install express
```

```bash
npm install -D @types/express
```

## Criar e configurar arquivos

```bash
mkdir src
mkdir .husky
```

1. Criar arquivo index.ts

```bash
ni src/index.ts # powershell
# ou
touch src/index.ts # bash, zsh
```

```ts
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.status(200).send('Hello world!');
});

app.listen(3333, () => {
  console.log('Server running on PORT 3333');
});
```

2. Criar arquivo index.spec.ts

```bash
ni src/sum.spec.ts # powershell
# ou
touch src/sum.spec.ts # bash, zsh
```

```ts
it('should sum', () => {
  expect(2 + 2).toBe(4);
});
```

3. Criar arquivo .gitignore

```bash
ni .gitignore # powershell
# ou
touch .gitignore # bash, zsh
```

```gitignore
node_modules
coverage
dist
build

.env
```

4. Criar arquivo .lintstagedrc.json

```bash
ni .lintstagedrc.json # powershell
# ou
touch .lintstagedrc.json # bash, zsh
```

```json
{
  "*.ts": [
    "eslint 'src/**' --fix",
    "prettier --check 'src/**'",
    "npm run test:staged"
  ]
}
```

5. Criar arquivo commitlint.config.js

```bash
ni commitlint.config.js # powershell
# ou
touch commitlint.config.js # bash, zsh
```

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

6. Configurar tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },

  "exclude": [
    "jest.config.ts",
    "commitlint.config.js",
    "./node_modules",
    "./dist",
    "./coverage"
  ]
}
```

```bash
ni tsconfig.eslint.json # powershell
# ou
touch tsconfig.eslint.json # bash, zsh
```

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "jest.config.ts", "commitlint.config.js"],
  "exclude": ["./node_modules", "./dist", "./coverage"]
}
```

7. Configurar jest.config.ts

```ts
import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
};

export default config;
```

8. Configurar .eslintrc.json

```json
{
  "env": {
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.eslint.json"]
  },
  "plugins": ["@typescript-eslint"],
  "overrides": [
    {
      "files": ["./src/**/*.ts", "./node_modules", "./dist", "./coverage"],
      "parserOptions": {
        "project": "./tsconfig.eslint.json"
      }
    }
  ],
  "rules": {}
}
```

9. Criar arquivo .prettierrc.json

```bash
ni .prettierrc.json # powershell
# ou
touch .prettierrc.json # bash, zsh
```

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always",
  "trailingComma": "all",
  "printWidth": 80,
  "useTabs": false,
  "endOfLine": "lf"
}
```

10. Criar scripts no package.json

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "start:dev": "nodemon --exec ts-node ./src/index.ts",
    "prepare": "husky install",
    "lint": "eslint src/**/*.ts --fix",
    "format": "prettier --write  src/**/*.ts",
    "test": "jest --passWithNoTests",
    "test:watch": "npm test -- --watch --onlyChanged",
    "test:staged": "npm test -- --findRelatedTests",
    "test:push": "npm test -- --coverage"
  }
}
```

## Adicionar hooks

```bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

```bash
npx husky add .husky/pre-push "npm run test:push"
```

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

```bash
npm run prepare
```
