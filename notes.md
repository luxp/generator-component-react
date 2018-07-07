# First Yeoman generator
> record some learn steps

## Yeoman documents
- http://yeoman.io
- http://yeoman.io/authoring/index.html

### context and lifecycle
> http://yeoman.io/authoring/running-context.html

### copy file
After reading the source code, you can use `this.fs.copy` to copy files implemented with [mem-fs-editor](https://github.com/SBoudrias/mem-fs-editor) which use the [ejs](http://ejs.co/). So, you can use `<%= variable %>` in your file. You can checkout [this for demo]().

#### Problems encournted
- `this.fs.copyTpl` don't copy the dotfiles (like `.gitignore`) by default. You need to add the globOptions config like blow
```javascript
this.fs.copyTpl(
  [`${this.templatePath()}/**`],
  this.destinationPath(),
  this.tplContext,
  null,
  { globOptions: { dot: true } }
  )
```
For more options you can read the [documents](https://github.com/mrmlnc/fast-glob#options-1) 
