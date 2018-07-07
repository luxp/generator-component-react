'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-component-react:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app/index.js')).withPrompts({
      moduleName: 'test',
      moduleDescription: 'desc',
      name: 'name',
      githubUsername: 'githubUserName',
      nyc: false,
      codecov: false,
      website: 'https://github.com',
    });
  });

  it('creates files', () => {
    assert.file(['package.json', '.babelrc', 'README.md', 'src', 'stories']);
  });
});
