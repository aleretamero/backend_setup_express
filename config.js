/**
 * APENAS DE EXEMPLO PARA PASSAR ALGUNS INSIGHTS
 */

const { execSync } = require('child_process');
const {
  copyFileSync,
  appendFileSync,
  readFileSync,
  truncateSync,
  existsSync,
  mkdirSync,
} = require('fs');
const { resolve } = require('path');

// ========================== { Base } ========================== //

if (!existsSync(resolve('src'))) {
  mkdirSync(resolve('src'));
}

if (!existsSync(resolve('.husky'))) {
  mkdirSync(resolve('.husky'));
}

// ====================== { Instalação } ======================= //

// Instalar as dependências

const dependencies = ['express'];

execSync(`npm install ${dependencies.join(' ')}`, { encoding: 'utf-8' });

// Instalar as dependências de desenvolvimento

const devDependencies = [
  'typescript @types/node',
  'ts-node nodemon',
  'prettier eslint eslint-config-prettier',
  'husky lint-staged',
  'jest @types/jest ts-jest',
  '@commitlint/config-conventional @commitlint/cli',
  '@types/express',
];

execSync(`npm install ${devDependencies.join(' ')} --save-dev`, {
  encoding: 'utf-8',
});

// ===================== { Configuração } ====================== //

const tsConfig = `"compilerOptions": {
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
}`;

const jestConfig = `import type { Config } from 'jest';

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
  '.+\\\\.ts$': ['ts-jest', { isolatedModules: true }],
},
};

export default config;`;

const eslintConfig = `{
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
}`;

const gitIgnoreConfig = `node_modules
coverage
dist
build

.env`;

// Copiar arquivos de configuração

appendFileSync(
  resolve('node_modules', '.gitignore'),
  gitIgnoreConfig,
);
appendFileSync(resolve('tsconfig.json'), tsConfig);
appendFileSync(resolve('jest.config.ts'), jestConfig);
appendFileSync(resolve('.eslintrc.json'), eslintConfig);

// ================= { Configuração pela CLI } ================= //

// Não necessita executar pois o arquivo de configuração já foi criado

// TSC

// execSync('npx tsc --init', { encoding: 'utf-8' });

// ESLINT

// const eslintAnswers = [
//   'To check syntax and find problems',
//   'JavaScript modules (import/export)',
//   'None of these',
//   'Yes',
//   'Node',
//   'JSON',
//   'Yes',
//   'npm',
// ].join('\n');

// execSync(`echo "${eslintAnswers}" | npx eslint --init`, { stdio: 'inherit' });

// JEST

// const jestAnswers = ['Yes', 'Yes', 'node', 'Yes', 'v8', 'Yes'].join('\n');

// execSync(`echo "${jestAnswers}" | npx jest --init`, { stdio: 'inherit' });

// ====================== { Estrutura } ======================= //

copyFileSync(
  resolve('node_modules', 'setup_express', '.husky', 'commit-msg'),
  resolve('.husky', 'commit-msg'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', '.husky', 'pre-commit'),
  resolve('.husky', 'pre-commit'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', '.husky', 'pre-push'),
  resolve('.husky', 'pre-push'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', 'src', 'index.ts'),
  resolve('src', 'index.ts'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', 'src', 'sum.spec.ts'),
  resolve('src', 'sum.spec.ts'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', '.gitattributes'),
  resolve('.gitattributes'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', '.lintstagedrc.json'),
  resolve('.lintstagedrc.json'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', 'commitlint.config.js'),
  resolve('commitlint.config.js'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', 'tsconfig.eslint.json'),
  resolve('tsconfig.eslint.json'),
);
copyFileSync(
  resolve('node_modules', 'setup_express', '.prettierrc.json'),
  resolve('.prettierrc.json'),
);


// =============== { Configurar Package.json } ================= //

const stringifiedPackage = readFileSync(resolve('package.json'));
const jsonPackage = JSON.parse(stringifiedPackage);

jsonPackage.scripts = {
  ...jsonPackage.scripts,
  start: 'node dist/index.js',
  build: 'tsc',
  'start:dev': 'nodemon --exec ts-node ./src/index.ts',
  prepare: 'husky install',
  lint: 'eslint src/**/*.ts --fix',
  format: 'prettier --write  src/**/*.ts',
  test: 'jest --passWithNoTests',
  'test:watch': 'npm test -- --watch --onlyChanged',
  'test:staged': 'npm test -- --findRelatedTests',
  'test:push': 'npm test -- --coverage',
};

truncateSync(resolve('package.json'));
appendFileSync(resolve('package.json'), JSON.stringify(jsonPackage, null, 2));

// ==================== { Adicionar Hooks } ==================== //

execSync(
  'git init',
  { encoding: 'utf-8' },
);
execSync(
  `npx husky add .husky/commit-msg  "npx --no -- commitlint --edit '\${1}'"`,
  { encoding: 'utf-8' },
);
execSync('npx husky add .husky/pre-push "npm run test:push"', {
  encoding: 'utf-8',
});
execSync('npx husky add .husky/pre-commit "npx lint-staged"', {
  encoding: 'utf-8',
});
execSync('npm run prepare', { encoding: 'utf-8' });
