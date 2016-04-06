module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          'build/css/style.css': 'src/sass/style.scss'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/style.css'
      }
    },

    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: 'gzip'
      },
      target: {
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'build/img/'
        }]
      }
    },

    watch: {
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },

      options: {
        livereload: true
      },

      html: {
        files: ['src/*.html', 'src/*.php'],
        tasks: ['clean:html', 'copy:html'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      fonts: {
        files: ['src/fonts/**/*.*', 'src/fonts/*.*'],
        tasks: ['copy:fonts'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      style: {
        files: ['src/sass/**/*.scss', 'src/sass/*.scss', 'node_modules/font-awesome/scss/**/*.scss'],
        tasks: ['sass', 'cmq', 'postcss', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      img: {
        files: ['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.svg'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    clean: {
      build: ['build/css', 'build/fonts', 'build/img', 'build/*.html', 'build/*.php'],
      html: ['build/*.html', 'build/*.php']
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: [
            'fonts/**',
            '*.html',
            '*.php',
            'js/*.js'
          ],
          dest: 'build'
        }]
      },

      html: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.html', '*.php'],
          dest: 'build'
        }]
      },

      fonts: {
        files: [{
          expand: true,
          cwd: 'src/fonts',
          src: '*.*',
          dest: 'build/fonts'
        },
          {
            expand: true,
            cwd: 'node_modules/font-awesome/fonts',
            src: '*.*',
            dest: 'build/fonts'
          }
        ]
      }
    }
  };

  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'cmq',
    'postcss',
    'cssmin',
    'imagemin'
  ]);

  grunt.initConfig(config);

};
