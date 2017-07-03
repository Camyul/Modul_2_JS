/* globals process*/

const gulp = require('gulp');

const nodemon = require('gulp-nodemon');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const app = require('./app');
    app.listen(3001, () => console.log(`Magic happen at: ${port}`));
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        task: ['server'],
        script: 'server.js',
    });
});
