lockChecksum=$(md5sum yarn.lock | cut -d' ' -f1)
cacheArchive=$(basename "$PWD").node_modules.${lockChecksum}.tar.gz

if gsutil -q stat ${1}/"$cacheArchive"; then
  gsutil -m cp ${1}/"$cacheArchive" .
  tar -xzf "$cacheArchive"
fi
