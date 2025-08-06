#!/bin/bash

# This script search for any folder or subfolder named using the oldId in the datastore
# check the access:
# * if access is "p", then move the content of the folder to the /public/newid
# * if access is "i", then move the content of the folder to the /internal/newid

# Base directories
DATASTORE_DIR="/var/local/gis_sdi/"

while IFS="," read -r oldId access newId; do
  echo "Processing oldId: $oldId with access: $access and newId: $newId"

  # Determine the target directory based on access type
  if [ "$access" == "p" ]; then
    TARGET_DIR="$DATASTORE_DIR/public/$newId"
  elif [ "$access" == "i" ]; then
    TARGET_DIR="$DATASTORE_DIR/internal/$newId"
  else
    echo "Unknown access type: $access. Skipping."
    continue
  fi

  # Create the target directory if it doesn't exist
  mkdir -p "$TARGET_DIR"

  # Find and move the folder or subfolder named using the oldId
  OLD_FOLDER=$(find "$DATASTORE_DIR" -type d -name "$oldId" -print -quit)
  if [ -z "$OLD_FOLDER" ]; then
    echo "No folder found for oldId: $oldId. Skipping."
    continue
  else
    echo "Found folder: $OLD_FOLDER for oldId: $oldId"
    # Move the content of the old folder to the target directory
    mv "$OLD_FOLDER"/* "$TARGET_DIR"
    rmdir "$OLD_FOLDER" 2>/dev/null || echo "Failed to remove old folder: $OLD_FOLDER, it may not be empty."
  fi

  echo "Moved $oldId to $TARGET_DIR"

done < list.csv
