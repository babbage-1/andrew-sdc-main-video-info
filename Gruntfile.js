/* eslint-disable func-names */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('awss3.json'),

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
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
