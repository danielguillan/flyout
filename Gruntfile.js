module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '\
/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n\
 * <%= pkg.homepage %>\n\
 *\n\
 * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>; */\n\n'
    },

    sass: {
      dist: {
        files: {
          'dist/css/flyout.css': 'src/scss/flyout.scss',
          'test/css/demo.css': 'test/scss/demo.scss'
        }
      }
    },

    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['src/js/flyout.js'],
        dest: 'dist/js/flyout.js'      
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/js/flyout.min.js': ['dist/js/flyout.js']
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        expr: true,
        newcap: true,
        quotmark: 'single',
        regexdash: true,
        trailing: true,
        undef: true,
        unused: true,
        maxerr: 100,
        eqnull: true,
        sub: false,
        browser: true,
        node: true,
        globals: {
          define: false
        }
      },
      dist: {
        src: ['dist/js/flyout.js']
      }
    },

    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat'],
        options: {
          interrupt: true
        }
      },
      sass: {
        files: ['src/scss/*.scss','test/scss/*.scss'],
        tasks: ['sass'],
        options: {
          interrupt: true
        }

      }
    },

    tagrelease: {
      file: 'package.json',
      commit: true,
      message: 'Release %version%',
      prefix: 'v',
      annotate: false
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-tagrelease');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['sass','concat', 'uglify', 'test']);

};
