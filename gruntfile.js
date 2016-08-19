var jadeMain = "Build/Jade/layout.jade";
var targetHtml = "Production/Pages/main.html";
var targetCSS = "Production/main.css";
var scssFiles = "Build/SASS/*";

module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        jade: { 
            options: {
                pretty : true
            },
            compile: {
                files: {
                    "Production/Pages/main.html" : jadeMain,
                    "Production/Pages/catalog.html" : "Build/Jade/catalogPage.jade",
                    "Production/Pages/whereBuy.html" : "Build/Jade/wherebuy.jade",
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'Production/main.css': 'Build/SASS/main.scss'
                }
            }
        },
        watch: {
            jade: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['Build/Jade/*.jade','Build/Jade/*/*.jade','Build/Jade/Pages/*/*.jade','Build/Jade/*/*.jade','Build/Jade/includes/blocks/*.jade'],
                tasks: ['jade'],
            },
            sass: {
                files: ['Build/SASS/*.scss','Build/SASS/*/*.scss'],
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