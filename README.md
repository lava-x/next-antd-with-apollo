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

