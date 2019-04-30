/* eslint-disable func-names */
require('dotenv').config({ path: './amazon.env' });

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      dist: {
        options: {
          bucket: 'sdc-andrew-static-files',
          signatureVersion: 'v4',
          region: 'us-east-1',
        },
        files: [
          {
            expand: true,
            cwd: 'client/dist/',
            src: ['**'],
            dest: '/',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.registerTask('deploy', 'aws_s3');
};


/* eslint-disable func-names */
// eslint-disable-next-line func-names
