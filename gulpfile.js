var gulp = require("gulp");
var ts = require("gulp-typescript");
var jasmine = require("gulp-jasmine");
var merge = require("merge-stream");

gulp.task('ts', function () {
	var stream1 = gulp.src("src/**/*.ts")
		.pipe(ts({
			module: "commonjs",
			target: "es5"
		}))
		.pipe(gulp.dest("src"));

	var stream2 = gulp.src("spec/**/*.ts")
		.pipe(ts({
			module: "commonjs",
			target: "es5"
		}))
		.pipe(gulp.dest("spec"));

	return merge(stream1, stream2);
});

gulp.task('test', gulp.series('ts', function () {
	return gulp.src('spec/**/*.spec.js')
		.pipe(jasmine());
}));

gulp.task('watch', function () {
	gulp.watch(['spec/**/*.spec.ts','src/**/*.ts']).on('change', gulp.series('test'));
});
