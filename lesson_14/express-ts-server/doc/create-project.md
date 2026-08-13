# Создание проекта на ts
Инициализация проекта
`
npm init -y
`

Установка библиотек
`
npm i express
`
`
npm i -D typescript ts-node-dev @types/express @types/node
`

Создание tsconfig.json файла
`
npx tsc --init
`

Формирование папки node_modules
`
npm i
`

Внесли изменения в package.json

`
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
`
Внесли изменения в tsconfig.json

`
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "commonjs",
    "target": "es2020",

    // For nodejs:
    "lib": ["es2020"],

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Recommended Options
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
`
