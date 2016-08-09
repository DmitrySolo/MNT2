var jadeFile = "Build/jade_templates/layout.jade";
var targetHtml = "Production/MainPage/index.html";
var targetCSS = "Production/MainPage/main.css";
var scssFiles = "Build/SASS/*/*.scss";

module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        jade: { 
            options: {
                pretty : true
            },
            compile: {
                files: {
                    "Production/MainPage/index.html" : jadeFile
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'Production/MainPage/main.css': 'Build/SASS/main.scss'
                }
            }
        },
        watch: {
            jade: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['Build/jade_templates/*/*.jade'],
                tasks: ['jade'],
            },
            sass: {
                files: [scssFiles],
                tasks: ['sass']
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: { livereload: true },
                files: [targetHtml, targetCSS]
            },
        }
});
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};