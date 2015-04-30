#!/usr/bin/env bash -eu

wd=../../node_modules/wd

# we need the required dev tools
(cd $wd && npm install)
# make sure the mapper saves the json
if [ ! -f $wd/doc/mapping-builder.bak.js ]; then
  cp $wd/doc/mapping-builder.js $wd/doc/mapping-builder.bak.js
  echo ';fs.writeFileSync("doc/full-map.json", JSON.stringify(resMapping, null, 2));' >> $wd/doc/mapping-builder.js
fi

# run their docs
(cd $wd && make full_mapping > /dev/null)
# clean their mapping
node scrape.js $wd/doc/full-map.json $wd/package.json