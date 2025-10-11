## Tutor: Jonas_Schmedtmann

_Github_: [Repository](https://github.com/jonasschmedtmann/complete-node-bootcamp)

_NB:_ Using NodeJS [v22.20 LTS](https://nodejs.org/en/download)

### Chapter 2:

- [File system node document](https://nodejs.org/docs/latest-v22.x/api/fs.html)
- 3rd party module: [[slugify](https://www.npmjs.com/package/slugify), [nodemon](https://www.npmjs.com/package/nodemon)]
- npm package version update work _1(major).0(minor).0(patch)_ 
- How to update an outdated package & install specific package?
```
npm install slugify@1.0.0
npm outdated
```
```
"dependencies": {
    "slugify": "^1.6.6"
  },
```
> In <ins>package.json</ins> '^' means we accept all the patch & minor releases & '~' means only patch releases (safe option ~ due to only patch, major can break the code)
- How to uninstall package?
```
npm uninstall/remove express
```