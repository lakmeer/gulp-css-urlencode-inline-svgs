
var through     = require('through2');
var gutil       = require('gulp-util');

const PLUGIN_NAME = 'gulp-css-urlencode-inline-svgs';
const delimiter   = '}\n';
const detect      = /data:image\/svg\+xml/g;
const target      = /<svg.+\<\/svg\>/g;

function urlencodeSvgInText (input) {
  var lines = input.toString().split(delimiter);

  for (var i in lines) {
    if (lines[i].match(detect)) {
      lines[i] = lines[i].replace(target, encodeURIComponent);
    }
  }

  return lines.join(delimiter);
}

module.exports = function gulpCssUrlencodeInlineSvgs () {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      cb(new gutil.PluginError(PLUGIN_NAME, 'No support for streams.'));
    }

    if (file.isBuffer()) {
      file.contents = new Buffer( urlencodeSvgInText(file.contents) );
    }

    cb(null, file);
 });
}
