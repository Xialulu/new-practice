
var gulp=require('gulp');

// 将less改为css合并压缩css

var less=require("gulp-less");
var  csso  = require('gulp-csso');
gulp.task("style",function(){
	gulp.src(['src/css/*.less','!src/css/_*.less'])
	.pipe(less())
	.pipe(csso())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload(
				{
					stream:true
				}
			));
});



// 将html压缩

var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/index.html')
	.pipe(htmlmin({collapseWhitespace: true,
					removeComments: true
					}))
	.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload(
				{
					stream:true
				}
			));
});


// 图片复制
gulp.task('image',function () {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload(
				{
					stream:true
				}
			));
})

// js复制压缩合并

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function () {
	gulp.src("src/js/*.js")
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload(
				{
					stream:true
				}
			));

});

var browserSync = require('browser-sync');

// Static server
gulp.task('serve', function() {
    browserSync(
    	{
    		server: {
    			baseDir:['dist']
    		},
    	},
     function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
});
    gulp.watch('src/css/*.less',['style']);
     gulp.watch('src/index.html',['html']);
      gulp.watch('src/js/*.js',['script']);
       gulp.watch('src/images/*.*',['image']);
});