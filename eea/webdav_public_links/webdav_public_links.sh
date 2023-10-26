#!/usr/bin/env bash

set -e -o pipefail

# Print the start time
echo "Script started at: $(date)"

webdav_dir=/var/local/gis_sdi
public_dir=/var/local/gis_sdi/webdav_public

mkdir -p "${public_dir}"

# First delete broken links
echo "Deleting broken links from ${public_dir}"
find -P "${public_dir}" -type l -exec test ! -e {} \; -print | while read -r file; do
    rm -v "$file"
done
echo "Done..."


echo "Creating symlinks if they don't exist yet"
cd "${webdav_dir}"
mkdir -p "${public_dir}"
find "${webdav_dir}" -type d ! -path "$public_dir/*" -regex '.*_p_.*' -prune | while read -r target_directory; do
    target_dir_rel_path="$(realpath --relative-to=${public_dir} "${target_directory}")"
    link_name=$(basename "${target_directory}")

    if [ ! -L "${public_dir}/${link_name}" ]
    then
        echo "New target_directory found: ${target_directory}"
        ln -s "${target_dir_rel_path}" "${public_dir}/${link_name}"
    fi
done
echo "Done."
# Print the end time
echo "Script finished at: $(date)"