/**
 * Created by halfthin on 2015/10/27.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['app.js', 'routes/*.js', '*.js'],
            options: {
                globals: {exports: true}
            }
        },

        watch: {
            less: {
                files: ['public/stylesheets/*.less'],
                tasks: ['less:dev'],
                options: {nospawn: true}
            }
        },

        less: {
            dev: {
                files: {'public/stylesheets/style.css': 'public/stylesheets/style.less'},
                options: {
                    paths: ['public/assets/css'],
                    compress: false,
                    yuicompress: false,
                    strictMath: true,
                    strictUnits: true,
                    strictImports: true
                }
            },
            prod: {
                options: {
                    files: ['public/stylesheets/style.css', 'public/stylesheets/style.less'],
                    paths: ['assets/css'],
                    plugins: [
                        new require('less-plugin-autoprefix')({browsers: ['last 2 versions']}),
                        new require('less-plugin-clean-css')()
                    ],
                    modifyVars: {
                        imgPath: '',
                        bgColor: ''
                    }
                }
            }
        },

        concurrent: {
            dev: ['jshint', 'less:dev', 'nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },

        nodemon: {
            dev: {
                script: 'bin/www',
                options: {
                    nodeArgs: [],
                    env: {
                        'NODE_ENV': 'development'
                    },

                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    }
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:dev']);
};