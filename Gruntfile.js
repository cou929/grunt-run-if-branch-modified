/*
 * grunt-run-if-branch-modified
 * https://github.com/kosei/grunt-run-if-branch-modified
 *
 * Copyright (c) 2014 Kosei Moriyama
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['tmp']
        },

        run_if_branch_modified: {
            default: {
                options: {
                    cmd: 'echo default'
                },
                file_patterns: ['*.test'],
                tasks: ['invoke_check:default']
            },
            match: {
                options: {
                    cmd: 'echo sample.txt; echo another.txt'
                },
                file_patterns: ['*.txt'],
                tasks: ['invoke_check:match']
            },
            unmatch: {
                options: {
                    cmd: 'echo sample.js; echo another.json'
                },
                file_patterns: ['*.txt'],
                tasks: ['invoke_check:unmatch']
            }
        },

        nodeunit: {
            tests: ['test/*_test.js']
        },

        invoke_check: {
            default: {
                dest: 'tmp/default.txt'
            },
            match: {
                dest: 'tmp/match.txt'
            },
            unmatch: {
                dest: 'tmp/unmatch.txt'
            }
        }

    });

    grunt.registerMultiTask('invoke_check', 'Write log when invoked. Just for testing.', function() {
        this.files.forEach(function(file) {
            var path = file.dest;
            grunt.log.writeln('Writing file: ' + path);
            grunt.file.write(path, '1');
        });
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.registerTask('test', ['clean', 'run_if_branch_modified', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'test']);
};
