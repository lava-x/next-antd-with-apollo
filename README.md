# NextJs Starter

> A Starter project for `NextJs` with Ant Design framework.

## How to run app

### Run development build

```bash
yarn
yarn dev
```

### Run production build with:

```bash
yarn build
yarn start
```

### Export as static HTML files

```
yarn build
yarn export

# To try on your local machine
# note: you'll need to install https://github.com/zeit/serve
cd out
serve -p 8080
```

## How to setup your code editor

### Visual Studio Code

**Extensions**
1. [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

**Preferences > Settings**  
To configure prettier, ensure the following are setup on your vscode settings.
```
"eslint.autoFixOnSave": true,
"editor.formatOnSave": false,
```

**Debugging**
Debugging > Add Configurations
Then paste & save the following json.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Next: Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Next: Node",
      "runtimeExecutable": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "port": 9229,
      "env": {
        "NODE_OPTIONS": "--inspect"
      },
      "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ],
  "compounds": [
    {
      "name": "Next: Full",
      "configurations": [
        "Next: Node",
        "Next: Chrome"
      ]
    }
  ]
}
```
[Reference](https://spectrum.chat/next-js/general/debugging-in-vscode~f93e5e29-6cce-4b43-8fed-e5a6d302d04e?m=MTU2NjA0ODgyMDU0Ng==)

