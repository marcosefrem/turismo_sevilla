module.exports = function(grunt) {

	//secrets: grunt.file.readJSON('secrets.json'),    
	
	require('time-grunt')(grunt);	
	require('jit-grunt')(grunt, {
		juice: 'grunt-juice-email',
		sftp: 'grunt-ssh',
	});
	
	//Variables de paths
	
	// Sin CMS
	// system: html
	// tplPath: html
	// tpl: php
	// web: localhost/basemaquetacion/web/
	// 
	// Drupal:
	// system: drupal/sites/all/themes/custom/site/
	// tplPath: ./
	// tpl: php
	// web: ./
	// 
	// Wordpress:
	// system: wordpress/wp-content/themes/site/
	// tplPath: ./ 
	// tpl: php
	// web: dominio.dev
	// 
	// Magento:
	// system: 
	// tplPath: ./
	// tpl: php
	// web: dominio.dev
	
	var globalConfig = {
		system: 'html/',
		tplPath: 'src/',
		tpl: 'html',
		web: 'localhost/turismo_sevilla/html/'
	};	
	
	//Necesario para el updater de dependencias
	//require('load-grunt-tasks')(grunt);	
	
	// Project configuration.
	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		globalConfig: globalConfig,
		//secrets: grunt.file.readJSON('secrets.json'), 
		//Usamos watch para controlar cambios en archivos
		watch: {			
		    zetzer: {
		        files: ['src/**/*.html'],
		        tasks: ['zetzer'],
		        options: {
		            spawn: false,
		            livereload: false,
		        },
		    },		

		    juiceHtml: {
		        files: ['mails/src/*.html'],
		        tasks: ['juice'],
		        options: {
		            spawn: false,
		            livereload: true,
		        },
		    },		

		    juiceCss: {
		        files: ['mails/src/css/**/*.css'],
		        tasks: ['juice'],
		        options: {
		            spawn: false,
		            livereload: true,
		        },
		    },	
		    
		    
		    sftp: {
		        files: ['mails/src/img/*'],
		        tasks: ['newer:sftp'],
		        options: {
		            spawn: false,
		            livereload: true,
		        },
		    },		

		    	

		    jshint: {
		        files: ['<%= globalConfig.tplPath  %>/js/site/*.js'],
		        tasks: ['newer:jshint'],
		        reporterOutput: "",
		        options: {
		            spawn: false,
		            livereload: true,
		        },
		    },
		    uglify: {
		        files: ['<%= globalConfig.tplPath  %>/js/**/*.js'],
		        tasks: ['newer:uglify'],
		        options: {
		            spawn: false,
		            livereload: false,
		        },
		    },
			imagemin: {
			  files: ['html/**/*.{png,jpg,gif}'],
			  tasks: ['newer:imagemin'],
			  options: {
			      spawn: false,
			      livereload: false,
			  }
			},  		    
			less: {
			    files: ['<%= globalConfig.tplPath  %>/less/**/*.less'],
			    //No funciona bien si hay imports y usamos newer:
			    tasks: ['less'],
			    options: {
		          spawn: false,
		          livereload: false,
		      	}
			},
			svgmin: {
			    files: ['<%= globalConfig.tplPath  %>/svg/**/*.svg'],
			    tasks: ['newer:svgmin'],
			    options: {
		          spawn: false,
		          livereload: false,
		      	}
			},			
			//webfont: {
			//    files: ['<%= globalConfig.system  %>/svg/svg-iconfont/*.svg'],
			//    tasks: ['webfont'],
			//    options: {
		    //      spawn: false,
		    //      livereload: false,
		    //  	}
			//},
			//webfontLess: {
			//    files: ['<%= globalConfig.system  %>/svg/svg-iconfont/*.svg'],
			//    tasks: ['less'],
			//    options: {
		    //      spawn: false,
		    //      livereload: false,
		    //  	}
			//},
			grunticon: {
			    files: ['<%= globalConfig.tplPath  %>/svg/svg-icon/*.svg'],
			    tasks: ['grunticon'],
			    options: {
		          spawn: false,
		          livereload: false,
		      	}
			},
			grunticonLess: {
			    files: ['<%= globalConfig.tplPath  %>/svg/svg-icon/*.svg'],
			    tasks: ['less'],
			    options: {
		          spawn: false,
		          livereload: false,
		      	}
			},
			
			autoprefixer: {
			    files: ['<%= globalConfig.system  %>/css/*.css'],
			    tasks: ['autoprefixer'],
			    options: {
		          spawn: false,
		          livereload: false,
		      	}
			},
			
		},
		
		browserSync: {
		  bsFiles: {
		      src : ['<%= globalConfig.system  %>/css/*.css','<%= globalConfig.system  %>/js/*.js','<%= globalConfig.system  %>/**/*.<%= globalConfig.tpl  %>']
		  },
		  options: {
		    proxy: "<%= globalConfig.web  %>",
			    watchTask : true,
		  }
		},
		svgmin: {
		    options: {
		        plugins: [
		            {
		                removeViewBox: false
		            }, {
		                removeUselessStrokeAndFill: false
		            }
		        ]
		    },
			multiple: {
				files: [{
					expand:true,
					cwd: '<%= globalConfig.tplPath  %>/svg',
					src: ['**/*.svg'],
					dest: '<%= globalConfig.tplPath  %>/svg/'
				}]
			}

		},		
		uglify: {
			options: {
				mangle: false,
				beautify: false,
				wrap: true,
			},						
			critical: {
			  files: {
			    '<%= globalConfig.system  %>js/critical.js':
			    [
				    
				//JS que es necesario cargar al inicio de la página    
				    
				//'<%= globalConfig.tplPath  %>/js/vendor/jquery-1.11.2.min.js',	
				'<%= globalConfig.tplPath  %>/js/vendor/jquery-2.1.3.min.js',	
				
				'<%= globalConfig.tplPath  %>/js/bootstrap/affix.js',				
				'<%= globalConfig.tplPath  %>/js/bootstrap/carousel.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/scrollspy.js',	
															
				'<%= globalConfig.tplPath  %>/js/site/helpers.js',
				'<%= globalConfig.tplPath  %>/js/site/main.js',
				'<%= globalConfig.tplPath  %>/js/site/pages/home/home.js',
				
				
			    ],
			  },
			},
			async: {
			  files: {
			    '<%= globalConfig.system  %>/js/async.js':
			    [
				//JS que no es necesario cargar al inicio de la página, .click .focus, etc..
				//Bootstrap			    
				'<%= globalConfig.tplPath  %>/js/bootstrap/transition.js',				    
				'<%= globalConfig.tplPath  %>/js/bootstrap/alert.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/button.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/collapse.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/dropdown.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/modal.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/tooltip.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/popover.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap/tab.js',
				
				//Plugins
				//'<%= globalConfig.tplPath  %>/js/vendor/add2home.js',
				'<%= globalConfig.tplPath  %>/js/vendor/lazysizes.js',

				//'<%= globalConfig.tplPath  %>/js/vendor/masonry.pkgd.min.js',
				//'<%= globalConfig.tplPath  %>/js/vendor/jquery.touchSwipe.js',
				
				
				//Plugins Bootstrap
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-tabdrop.js',	
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/responsive-tabs.js',				
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-slider.js',					
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-select.js',	
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/jqBootstrapValidation.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-datepicker/bootstrap-datepicker.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js',
				'<%= globalConfig.tplPath  %>/js/bootstrap-plugins/bootstrap-datepicker/locales/bootstrap-datepicker.en-GB.min.js',
				
				//Plugins site
				//'<%= globalConfig.tplPath  %>/js/site/plugins/parallax.js',		
				//'<%= globalConfig.tplPath  %>/js/site/plugins/ajax-forms.js',	
				'<%= globalConfig.tplPath  %>/js/site/plugins/off-canvas.js',	
				//'<%= globalConfig.tplPath  %>/js/site/plugins/create-nav-bar.js',
				
									
				'<%= globalConfig.tplPath  %>/js/site/helpers_async.js',
				'<%= globalConfig.tplPath  %>/js/site/main_async.js',
				
										
				
			    ],
			  },
			}
		},
		imagemin: {
			options: {
			cache: false
			},
			dist: {
				files: [{
				  expand: true,
				  cwd: '<%= globalConfig.system  %>/img/',
				  src: ['**/*.{png,jpg,gif}'],
				  dest: '<%= globalConfig.system  %>/img/'
				}]
			}
		},
		less: {
		  production: {
		    options: {
		      paths: ["css"],			    
		      cleancss: true,
		      yuicompress: true,
		      modifyVars: {
			      siteVersion : grunt.template.today('ddmmyyyy')
			      
		      }		      
		    },
	        files:[
		       {
					expand: true,
					cwd: "<%= globalConfig.tplPath  %>/less",
					src: "*.less",
					dest: "<%= globalConfig.system  %>/css",
					ext: ".min.css",
				}
	        ]
		  }
		},	
		
		jshint: {
		   //all: ['<%= globalConfig.tplPath  %>/js/site/*.js']
		   all: ['/js/site/*.js']

		},
		
		//webfont: {
		//    icons: {
		//        src: '<%= globalConfig.system  %>/svg/svg-iconfont/*.svg',
		//        dest: '<%= globalConfig.system  %>/fonts',
		//        destCss: '<%= globalConfig.system  %>/less/components/',
		//        options: {
		//            stylesheet: 'less',
		//            relativeFontPath: '../fonts',
		//            htmlDemo: false,
		//            embed: true,
		//            syntax: 'bootstrap'
		//        }
		//    }
		//},		
				
		grunticon: {
		    myIcons: {
		        files: [{
		            expand: true,
		            cwd: '<%= globalConfig.tplPath  %>/svg/svg-icon',
		            src: ['*.svg', '*.png'],
		            dest: "<%= globalConfig.tplPath  %>/css/grunticon"
		        }],
		        options: {
			        pngfolder :'ie8-icon',
			        enhanceSVG: true,
			        cssprefix:'.icon-',
		        }
		    }
		},	
		
		autoprefixer: {
			
			options: {
			      browsers: ['last 2 versions']
			},			
			no_dest: {
		      src: '<%= globalConfig.system  %>/css/*.css', // -> src/css/file1.css, src/css/file2.css
		    },			
			
		},
		

		zetzer: {
		    main: {
		      options: {
		        env: {
		          title: "Zetzer",
		        },
		        partials: "src/includes/",
		        templates: "templates",
		        
		        dot_template_settings:{
			        strip: false,
			        
		        }
		      },
		      files: [
		        {
		          expand: true,
		          cwd: "src/",
		          src: "*.html",
		          dest: "html",
		          ext: ".html",
		          flatten: false
		        }
		      ]
		    },
		  },


		critical: {
		  dist: {
		    options: {
		      base: 'html/',
		      dimensions: [{
		        width: 1024,
		        height: 768
		       },
		       {
		        width: 320,
		        height: 480
		      }]
		    },
		  // Para declarar archivos de uno en uno
		  //  files: [
		  //	  //Listado de páginas de primer nivel 
		  //    {src: ['html/home.html'], dest: 'html/css/critical-home.css'}
		  //  ]
		  //  
	        files:[
		       {
					expand: true,
					cwd: "html/",
					src: "*.html",
					dest: "html/inline-critical/",
					ext: ".html",
				}
	        ]
		    
		  }
		},
		
	    juice: {
	      your_target: {
	        options: {
	          preserveMediaQueries: true,
	          applyAttributesTableElements: true,
	          applyWidthAttributes: true,
	          preserveImportant: true,
	          webResources: {
	            images: false
	          }
	        },
	        files:[
		       {
					expand: true,
					cwd: "mails/src/",
					src: "*.html",
					dest: "mails/inline/",
					ext: ".html",
				}
	        ]
	      }
	    },
	    
	    
  				
		devUpdate: {
	        main: {
	            options: {
					updateType: 'prompt', //just report outdated packages
	                reportUpdated: false, //don't report up-to-date packages
	                semver: true, //stay within semver when updating
	                packages: {
	                    devDependencies: true, //only check for devDependencies
	                    dependencies: false
	                },
	                packageJson: null, //use matchdep default findup to locate package.json
	                reportOnlyPkgs: [] //use updateType action on all packages            
	            }
	        }
	    }
		
	});


	// Registramos tareas
	grunt.registerTask('default',
		["browserSync", "watch"]
	
	);

};