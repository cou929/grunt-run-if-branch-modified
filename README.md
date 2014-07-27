# grunt-run-if-branch-modified

[![Build Status](https://travis-ci.org/cou929/grunt-run-if-branch-modified.svg?branch=master)](https://travis-ci.org/cou929/grunt-run-if-branch-modified)

> Run grunt tasks according to changed files of the branch.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-run-if-branch-modified --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-run-if-branch-modified');
```

## The "run_if_branch_modified" task

### Overview
This plugin switches tasks to run or not according to changed files of current branch.

In your project's Gruntfile, add a section named `run_if_branch_modified` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  run_if_branch_modified: {
    your_target: {
      file_patterns: ['*.js', '*.json'],
      tasks: ['test']
    },
  },
});
```

The plugin executes `git diff --name-only HEAD master` and checks these files matches any file patterns. And executes tasks if any file has matched.

This plugin suppose to be used with the scenario such as Pull Request testing by CI. For instance, run the test which is taking long time, only when related codes are edited.

### Arguments

#### file_patterns
Type: `Array`

List of file globbing patterns. If any changed files of the branch is matched to these patterns, the plugin executes registered tasks. The format of patterns are same to `grunt.file.match`.


#### tasks
Type: `Array`

List of tasks to execute if the condition is matched.

### Usage Examples

In this example, the test task `full_test` takes very long time. Run the test only when the core source (`src/core/*.js`) is modified.

```js
grunt.initConfig({
  run_if_branch_modified: {
    full_test: {
      file_patterns: ['src/core/*.js'],
      tasks: ['full_test']
    },
  },
});

grunt.registerTask('full_test', ['some-very-long-test', 'another-long-test']);
```

```
# execute this in CI.
grunt run_if_branch_modified:full_test
```

## Release History

- `v0.1.0` Initial release.
