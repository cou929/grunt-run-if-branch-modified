'use strict';

var grunt = require('grunt');

exports.run_if_branch_modified = {
    default: function(test) {
        test.ok(!grunt.file.exists('tmp/default.txt'));
        test.done();
    },
    match: function(test) {
        test.ok(grunt.file.exists('tmp/match.txt'));
        test.done();
    },
    unmatch: function(test) {
        test.ok(!grunt.file.exists('tmp/unmatch.txt'));
        test.done();
    }
};
