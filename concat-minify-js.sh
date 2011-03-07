
# Concatenate all javascript files then minify using YUI Compressor

cd public/js
cat flickr.js greader.js twitter.js lastfm.js github.js dailymile.js jd.js > jd.concat.js
cd ../..
java -jar lib/yuicompressor-2.4.2.jar public/js/jd.concat.js -o public/js/jd.min.js --nomunge --charset utf-8
rm -rf public/js/jd.concat.js
