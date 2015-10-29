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
            },
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        },

        less: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.less'],
                    dest: 'public/stylesheets',
                    ext: '.css'
                }],
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
                    files: {'public/stylesheets/style.css': 'public/stylesheets/style.less'},
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
            dev: ['jshint', 'less:dev', 'nodemon:dev', 'watch'],
            prod: ['jshint', 'less:prod', 'nodemon:prod', 'watch'],
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
                        PORT: 3310
                    },

                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    }
                }
            },
            prod: {
                script: 'bin/www',
                options: {
                    nodeArgs: [],
                    env: {
                        PORT: 80
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                //require('open')('http://localhost:5455');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
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
    grunt.registerTask('prod', ['concurrent:prod']);
};