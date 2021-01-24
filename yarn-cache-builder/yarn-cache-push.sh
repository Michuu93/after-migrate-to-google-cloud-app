lockChecksum=$(md5sum yarn.lock | cut -d' ' -f1)
cacheArchive=$(basename "$PWD").node_modules.${lockChecksum}.tar.gz

if gsutil -q stat ${1}/"$cacheArchive"; then
  echo "cache archive already exists (${cacheArchive})"
else
  tar -czf "$cacheArchive" node_modules
  gsutil -m cp "$cacheArchive" ${1}/
fi
