
module.exports = function(grunt) {
    
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // this is where you set up your Sass settings. Once you know what you're doing, you can change thse.
    sass: {
        dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'style.css': 'sass/style.scss'
            }
        }
    }
});
grunt.loadNpmTasks('grunt-sass');

// this is where you have Grunt compile your Sass when you type "grunt" into the terminal
grunt.registerTask('default', ['sass']);
}