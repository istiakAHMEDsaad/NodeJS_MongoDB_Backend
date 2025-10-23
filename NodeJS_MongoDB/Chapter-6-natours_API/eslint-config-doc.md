- **ESLint Prettier (VSCode Setting)**:
  - [eslint](https://www.npmjs.com/package/eslint),
  - [prettier](https://www.npmjs.com/package/prettier),
  - [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier),
  - [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier?activeTab=versions),
  - [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb),
  - [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)

```
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
```

- extra plugin (necessary in order to make the airbnb style guide)
  - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
  - [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
  - [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

- ".eslintrc.json" config file:
```
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "off",
    "spaced-comment": "off",
    "no-console": "warn",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```