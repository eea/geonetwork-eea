#!/bin/bash
NEWCATALOGUE_DIR="/tmp/cataloguestore/metadata_data"

# For each folder, move content of private and public folder into the parent folder
for folder in "$NEWCATALOGUE_DIR"/*; do
  if [ -d "$folder" ]; then
    echo "Processing folder: $folder"

    # Move content from public to parent folder
    if [ -d "$folder/public" ]; then
      echo "Moving content from $folder/public to $folder"
      mv "$folder/public/"* "$folder/"
      rmdir "$folder/public"
    fi

    # Move content from private to parent folder
    if [ -d "$folder/private" ]; then
      echo "Moving content from $folder/private to $folder"
      mv "$folder/private/"* "$folder/"
      rmdir "$folder/private"
    fi
  fi
done
