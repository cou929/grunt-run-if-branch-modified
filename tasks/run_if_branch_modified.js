/*
 * grunt-run-if-branch-modified
 * https://github.com/cou929/grunt-run-if-branch-modified
 *
 * Copyright (c) 2014 Kosei Moriyama
 * Licensed under the MIT license.
 */

'use strict';

var execsyncs = require('execsyncs');

module.exports = function(grunt) {
    grunt.registerMultiTask('run_if_branch_modified', 'Run grunt tasks according to changed files of the branch.', function() {
        var options = this.options({
            cmd: 'git diff --name-only HEAD master'
        });

        var status = execsyncs('git status > /dev/null 2>&1; echo $?');
        if (parseInt(status, 10) !== 0) {
            grunt.log.warn('Not a git repository or no found git command. Skip.');
            return false;
        }

        var file_patterns = this.data.file_patterns;
        var should_run = (function() {
            var diff_res = execsyncs(options.cmd);
            diff_res = Buffer.isBuffer(diff_res) ? diff_res.toString() : diff_res;
            var updated_files = diff_res.split('\n').filter(function(file) { return file.length > 0; });

            grunt.verbose.writeflags(updated_files, 'Updated files');

            return updated_files.some(function(file) {
                return grunt.file.isMatch(file_patterns, file);
            });
        })();

        if (should_run) {
            var tasks = this.data.tasks;
            grunt.log.ok('Invoking tasks: ' + tasks.join(', '));
            return grunt.task.run(tasks);
        } else {
            grunt.log.ok('Skip tasks because not modified');
            return true;
        }
    });
};