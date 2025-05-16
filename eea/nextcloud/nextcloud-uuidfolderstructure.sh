#!/bin/bash

# This script migrate resource identifier folder structure to UUID folder structure
# The content of folder webdav/public/{resourceIdentifier} is moved in a folder cataloguestore/metadata_data/{uuid}
# UUID is retrieved if a file is named {uuid}.xml eg. eab0eaa5-d840-486a-b139-ab722d442330.xml
# A symbolic link is created for webdav/public/{resourceIdentifier} pointing to cataloguestore/metadata_data/{uuid}.

# Base directories
WEBDAV_DIR="data/webdav/public"
CATALOGUE_DIR="data/cataloguestore/metadata_data"

# Iterate through each resourceIdentifier folder in webdav/public
for resourceIdentifier in "$WEBDAV_DIR"/*; do
  if [ -d "$resourceIdentifier" ]; then
    echo "Processing folder: $resourceIdentifier"
    resourceIdentifierCode=$(basename "$resourceIdentifier")

    # Find the UUID by looking for a file named {uuid}.xml
    uuidFile=$(find "$resourceIdentifier" -maxdepth 1 -name "*.xml" | head -n 1)
    if [ -z "$uuidFile" ]; then
          echo "No UUID file found in $resourceIdentifier. Skipping."
          continue
    fi

    # Extract the UUID from the filename
    uuid=$(basename "$uuidFile" .xml)
    echo "Found UUID: $uuid"

    # Check the file is UUID pattern eg. eab0eaa5-d840-486a-b139-ab722d442330
    if [[ ! "$uuid" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ ]]; then
      echo "No valid UUID pattern $uuid found in $resourceIdentifier. Skipping."
      continue
    fi

    # Create the target directory if it doesn't exist
    targetDir="$CATALOGUE_DIR/$uuid"
    mkdir -p "$targetDir"

    # Move the content of the resourceIdentifier folder to the target directory
    mv "$resourceIdentifier"/* "$targetDir"
    rm -rf "$resourceIdentifier"

    # Create a symbolic link from the original folder to the target directory
    (cd $WEBDAV_DIR; ln -sfn ../../cataloguestore/metadata_data/"$uuid" "$resourceIdentifierCode")

    echo "Migrated $resourceIdentifier to $targetDir and created symbolic link."
  fi
done

echo "Migration completed."
