var gulp = require("gulp"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	minifyCss = require("gulp-clean-css");

gulp.task("uglify", function(){
	gulp.src("src/*.js")
		.pipe(uglify({compress:true}))
		.pipe(rename({
			suffix : ".min"
		}))
		.pipe(gulp.dest("dist/js"));
});

gulp.task("minifycss", function(){
	gulp.src("src/*.css")
		.pipe(minifyCss())
		.pipe(rename({
			suffix : ".min"
		}))
		.pipe(gulp.dest("dist/css"));
})

gulp.task("default", ["uglify", "minifycss"]);