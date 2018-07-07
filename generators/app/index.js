'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const _s = require('underscore.string');
const utils = require('./utils');

// Yeoman documents http://yeoman.io/authoring/running-context.html

module.exports = class extends Generator {
  initializing() {
    // Your initialization methods (checking current project state, getting configs, etc)
    this.spawnCommandSync('git', ['init']);
    this.option('org', {
      type: 'string',
      desc: 'Publish to a GitHub organization account',
    });

    this.option('coverage', {
      type: 'boolean',
      desc: 'Add code coverage with nyc',
    });

    this.option('codecov', {
      type: 'boolean',
      desc: 'Upload coverage to codecov.io (implies coverage)',
    });
  }

  prompting() {
    //  Where you prompt users for options (where you’d call this.prompt())
    this.log(
      yosay(
        `Welcome to the sensational ${chalk.red('generator-component-react')} generator!`
      )
    );
    return this.prompt([
      {
        name: 'moduleName',
        message: 'What do you want to name your module?',
        default: _s.slugify(this.appname),
        filter: x => utils.slugifyPackageName(x),
      },
      {
        name: 'moduleDescription',
        message: 'What is your module description?',
        default: 'A mediocre module.',
      },
      {
        name: 'name',
        message: 'What is your name?',
        store: true,
        when: () => !this.options.org,
      },
      {
        name: 'githubUsername',
        message: 'What is your GitHub username?',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide a username'),
        when: () => !this.options.org,
      },
      {
        name: 'website',
        message: 'What is the URL of your website?',
        store: true,
        validate: x => (x.length > 0 ? true : 'You have to provide a website URL'),
        filter: x => normalizeUrl(x),
      },
      {
        name: 'nyc',
        message: 'Do you need code coverage?',
        type: 'confirm',
        default: Boolean(this.options.codecov || this.options.coverage),
        when: () =>
          this.options.coverage === undefined && this.options.codecov === undefined,
      },
      {
        name: 'codecov',
        message: 'Upload coverage to codecov.io?',
        type: 'confirm',
        default: false,
        when: x => (x.nyc || this.options.coverage) && this.options.codecov === undefined,
      },
    ]).then(props => {
      // To access props later use this.props.someAnswer;
      const or = (option, prop) =>
        this.options[option] === undefined ? props[prop || option] : this.options[option];

      const codecov = or('codecov');
      const nyc = codecov || or('coverage', 'nyc');
      const repoName = utils.repoName(props.moduleName);
      const camelComponentName = _s.capitalize(
        _s.camelize(repoName.replace(/^react/, ''))
      );

      // Import generator-license
      this.composeWith(require.resolve('generator-license'), {
        name: props.name,
        email: props.email,
        website: props.website,
        defaultLicense: 'MIT',
      });
      this.tplContext = {
        moduleName: props.moduleName,
        moduleDescription: props.moduleDescription,
        camelComponentName,
        githubUsername: this.options.org || props.githubUsername,
        repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        website: props.website,
        humanizedWebsite: humanizeUrl(props.website),
        nyc,
        codecov,
      };
    });
  }

  configuring() {
    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  }

  default() {
    // If the method name doesn’t match a priority, it will be pushed to this group.
  }

  writing() {
    //  Where you write the generator specific files (routes, controllers, etc)
    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };
    this.fs.copyTpl(
      [`${this.templatePath()}/**`],
      this.destinationPath(),
      this.tplContext,
      null,
      { globOptions: { dot: true } }
    );

    // To fix the jest test error, seems multi package.json and .babelrc will cause some bug
    mv('_package.json', 'package.json');
    mv('_babelrc', '.babelrc');
  }

  conflicts() {
    // Where conflicts are handled (used internally)
  }

  install() {
    // Where installations are run (npm, bower)
    return this.installDependencies({
      bower: false,
    });
  }

  end() {
    // Called last, cleanup, say good bye, etc
  }
};
