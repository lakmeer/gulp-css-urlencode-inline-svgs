
# `gulp-css-urlencode-inline-svgs`

Data URIs make sprites easier. SVGs make resolution independence easier.
Putting them together seems like an obvious win. You might think that because
the contents of an SVG is just XML text, you could just paste them right into
your stylesheets! But the spec says that `data:image/xml+svg` must be URL
encoded. So you still need to pass them through an encoding stage like you
would for base64'ing other image types.

Here's a gulp plugin that does that. It works on plain CSS so put it in your
pipe after your compiler and autoprefixer, but before your minifier.


## Example Usage

``` javascript
var urlencode = require('gulp-css-urlencode-inline-svgs');

gulp.task('styles', function () {
  gulp.src('src/styles/index.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(urlencode())    // New hotness
    .pipe(cssmin())
    .pipe(gulp.dest('public'));
});
```

#### Input

``` css
background-image: url('data:image/svg+xml;utf8, <svg version="1.1" ... etc
```

#### Output

``` css
background-image: url('data:image/svg+xml;utf8, %3Csvg%20version%3D%22 ... etc
```

## Features

- Enables cross-browser compatibility for inlining SVG data-URIs
- That's the only thing it does, because that's what gulp plugins are supposed to do.
- It also has the most unwieldy name of any gulp plugin, so there's also that.

## TODO

- Support streams? I guess
- Default line delimiter is `}\n`. Might want to provide a different one.
- Needs tests for proper plugin compliance.

