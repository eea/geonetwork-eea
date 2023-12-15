#!/usr/bin/env bash

set -e -o pipefail

# Print the start time
echo "Script started at: $(date)"

webdav_dir=/var/local/gis_sdi
webdav_public=${webdav_dir}/webdav_public
public_dir=${webdav_dir}/datastore/public
restricted_dir=${webdav_dir}/datastore/restricted
internal_dir=${webdav_dir}/datastore/internal
todo_dir=${webdav_dir}/datastore/todo

mkdir -p "${public_dir}"
mkdir -p "${internal_dir}"
mkdir -p "${todo_dir}"
mkdir -p "${restricted_dir}"

# copy_and_create_links - Find directories matching a regular expression in a specified search path,
# move them to a target path, and create relative symbolic links at their original locations.

# Usage:
# copy_and_create_links <search_path> <target_path> <regexp>

# Parameters:
#   <search_path> - The path where the search for directories matching the regular expression begins.
#   <target_path> - The destination path where matched directories will be moved.
#   <regexp>      - Regular expression to match directories in the search path.
#   <logfile>     - File with the log of the changes made.

# Example:
# copy_and_create_links "/path/to/source" "/path/to/destination" ".*pattern.*"
copy_and_create_links() {
    # Check if the correct number of arguments is provided
    if [ "$#" -ne 4 ]; then
        echo "Usage: copy_and_create_links <search_path> <target_path> <regexp> <logfile>"
        return 1
    fi

    local search_path="$1"
    local target_path="$2"
    local regexp="$3"
    local logfile="$4"

    # Find directories matching the regular expression in the search path
    find "${search_path}" -type d \
      ! -path "${public_dir}/*" \
      ! -path "${internal_dir}/*" \
      ! -path "${restricted_dir}" \
      ! -path "${todo_dir}" \
      ! -path "${webdav_public}/*" \
      -regex "${regexp}" \
      -prune | \
      while read -r target_directory; do
          # Extract the directory name without the path
          link_name=$(basename "${target_directory}")
          # Get the relative path for the link
          target_dir_rel_path="$(realpath --relative-to="$(dirname "${target_directory}")" "${target_path}/${link_name}")"

          if [[ ! -e "${target_path}/${link_name}" ]]; then
            echo "${target_directory};${target_path}" >> "${logfile}"
            echo "Moving ${target_directory} to ${target_path}"
            mv "${target_directory}" "${target_path}"
            echo "Creating link ${target_directory} -> ${target_dir_rel_path}"
            ln -s "${target_dir_rel_path}" "${target_directory}"
          else
            echo "Skipping processing because ${target_path}/${link_name} already exists"
          fi
    done
}

current_log=/var/log/copy_and_create_links_$(date +"%d-%m-%Y").log
touch "${current_log}"
echo "Processing public resources"
copy_and_create_links "${webdav_dir}" "${public_dir}" ".*_p_.*" "${current_log}"
echo "Public files done."

echo "Processing internal resources"
copy_and_create_links "${webdav_dir}" "${internal_dir}" ".*_i_.*" "${current_log}"
echo "Internal files done."

echo "Processing restricted resources"
copy_and_create_links "${webdav_dir}" "${restricted_dir}" ".*_r_.*" "${current_log}"
echo "Restricted resources done."

echo "Script finished at: $(date)"
