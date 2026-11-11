/*
 * Copyright (C) 2001-2026 Food and Agriculture Organization of the
 * United Nations (FAO-UN), United Nations World Food Programme (WFP)
 * and United Nations Environment Programme (UNEP)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 *
 * Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
 * Rome - Italy. email: geonetwork@osgeo.org
 */

(function () {
  goog.provide("gn_datastorebrowser_directive");

  var module = angular.module("gn_datastorebrowser_directive", []);

  /**
   * Convert a size in bytes into a human readable string (eg. '1.2 MB').
   */
  function humanizeSize(bytes) {
    var n = Number(bytes);
    if (bytes === null || angular.isUndefined(bytes) || !isFinite(n) || n < 0) {
      return "";
    }
    if (n === 0) {
      return "0 Bytes";
    }
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    var i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), sizes.length - 1);
    return parseFloat((n / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Pick a Font Awesome icon for a file, based on its MIME type or extension.
   */
  function fileIcon(r) {
    var mime = (r.mimeType || "").toLowerCase();
    var ext = ((r.filename || "").split(".").pop() || "").toLowerCase();
    if (mime.indexOf("image/") === 0) {
      return "fa-file-image-o";
    }
    if (mime === "application/pdf" || ext === "pdf") {
      return "fa-file-pdf-o";
    }
    if (
      /zip|compressed|tar|gzip|7z|rar/.test(mime) ||
      /^(zip|gz|tgz|7z|rar|tar)$/.test(ext)
    ) {
      return "fa-file-zip-o";
    }
    if (/spreadsheet|excel|csv/.test(mime) || /^(xls|xlsx|ods|csv)$/.test(ext)) {
      return "fa-file-excel-o";
    }
    if (/presentation|powerpoint/.test(mime) || /^(ppt|pptx|odp)$/.test(ext)) {
      return "fa-file-powerpoint-o";
    }
    if (/wordprocessing|msword/.test(mime) || /^(doc|docx|odt)$/.test(ext)) {
      return "fa-file-word-o";
    }
    if (/json|xml|javascript/.test(mime) || /^(json|xml|geojson|gml|kml)$/.test(ext)) {
      return "fa-file-code-o";
    }
    if (mime.indexOf("text/") === 0) {
      return "fa-file-text-o";
    }
    return "fa-file-o";
  }

  /**
   * Build a folder tree from the flat list of a record's attachments. Each resource
   * filename may contain "/"-separated folders (eg. "a/b/file.csv").
   *
   * @param {Array} resources The flat list of resources returned by the attachments API.
   * @return {Object} The root node: {name, path, folders: [], files: [], size, count}.
   */
  function buildTree(resources) {
    var root = { name: "", path: "", folders: [], files: [], size: 0, count: 0 };
    var index = { "": root };

    function getFolder(path) {
      if (index[path]) {
        return index[path];
      }
      var lastSlash = path.lastIndexOf("/");
      var parent = getFolder(lastSlash === -1 ? "" : path.substring(0, lastSlash));
      var folder = {
        name: path.substring(lastSlash + 1),
        path: path,
        folders: [],
        files: [],
        size: 0,
        count: 0,
        expanded: false
      };
      parent.folders.push(folder);
      index[path] = folder;
      return folder;
    }

    (resources || []).forEach(function (r) {
      var filename = (r.filename || "").replace(/^\/+/, "");
      var lastSlash = filename.lastIndexOf("/");
      var folderPath = lastSlash === -1 ? "" : filename.substring(0, lastSlash);
      var folder = getFolder(folderPath);
      folder.files.push(
        angular.extend({}, r, {
          name: filename.substring(lastSlash + 1),
          humanSize: humanizeSize(r.size),
          icon: fileIcon(r)
        })
      );

      // Aggregate size and file count on every ancestor folder
      var path = folderPath;
      while (true) {
        index[path].size += Number(r.size) || 0;
        index[path].count++;
        if (path === "") {
          break;
        }
        var i = path.lastIndexOf("/");
        path = i === -1 ? "" : path.substring(0, i);
      }
    });

    (function sortAndHumanize(node) {
      node.humanSize = humanizeSize(node.size);
      node.folders.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      node.files.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      node.folders.forEach(sortAndHumanize);
    })(root);

    return root;
  }

  /**
   * @ngdoc directive
   * @name gn_datastorebrowser.directive:gnDatastoreBrowser
   *
   * @description
   * Display the attachments (datastore files) of a record as a folder tree,
   * with a link to download each file.
   *
   * Usage:
   * <div data-gn-datastore-browser="mdView.current.record.uuid"
   *      data-on-load="nbOfFiles = count"></div>
   *
   * The optional on-load callback is called with the number of files once the
   * list is loaded (count = 0 if the record has none, null if loading failed),
   * so that the parent can hide its own container when there is nothing to show.
   */
  module.directive("gnDatastoreBrowser", [
    "$http",
    function ($http) {
      return {
        restrict: "A",
        scope: {
          uuid: "=gnDatastoreBrowser",
          onLoad: "&?"
        },
        templateUrl:
          "../../catalog/components/datastorebrowser/partials/datastorebrowser.html",
        link: function (scope) {
          scope.tree = null;
          scope.loading = false;
          scope.error = null;

          scope.rows = [];
          // The root ("Direct download") is collapsed on load
          scope.rootExpanded = false;

          scope.toggleRoot = function () {
            scope.rootExpanded = !scope.rootExpanded;
          };

          /**
           * Flatten the visible part of the tree (expanded folders only) into
           * a list of rows, each with its depth, so it can be rendered as a
           * Bootstrap list-group.
           */
          function refreshRows() {
            var rows = [];
            (function walk(node, depth) {
              node.folders.forEach(function (folder) {
                rows.push({ type: "folder", item: folder, depth: depth });
                if (folder.expanded) {
                  walk(folder, depth + 1);
                }
              });
              node.files.forEach(function (file) {
                rows.push({ type: "file", item: file, depth: depth });
              });
            })(scope.tree, 0);
            scope.rows = rows;
          }

          scope.indent = function (row) {
            return { "padding-left": 15 + row.depth * 25 + "px" };
          };

          scope.toggle = function (folder) {
            folder.expanded = !folder.expanded;
            refreshRows();
          };

          function setExpanded(node, expanded) {
            node.folders.forEach(function (f) {
              f.expanded = expanded;
              setExpanded(f, expanded);
            });
          }
          scope.expandAll = function () {
            setExpanded(scope.tree, true);
            scope.rootExpanded = true;
            refreshRows();
          };
          scope.collapseAll = function () {
            setExpanded(scope.tree, false);
            scope.rootExpanded = false;
            refreshRows();
          };

          function notify(count) {
            if (scope.onLoad) {
              scope.onLoad({ count: count });
            }
          }

          function load(uuid) {
            scope.tree = null;
            scope.rows = [];
            scope.rootExpanded = false;
            scope.error = null;
            if (!uuid) {
              return;
            }
            scope.loading = true;
            $http
              .get("../api/records/" + encodeURIComponent(uuid) + "/attachments", {
                headers: { Accept: "application/json" }
              })
              .then(
                function (response) {
                  if (scope.uuid !== uuid) {
                    return; // A newer request was issued for another record
                  }
                  scope.tree = buildTree(response.data);
                  refreshRows();
                  notify(scope.tree.count);
                },
                function (response) {
                  if (scope.uuid !== uuid) {
                    return;
                  }
                  scope.error =
                    (response.data &&
                      (response.data.message || response.data.description)) ||
                    response.statusText ||
                    "Error";
                  notify(null);
                }
              )
              .finally(function () {
                if (scope.uuid === uuid) {
                  scope.loading = false;
                }
              });
          }

          scope.$watch("uuid", load);
        }
      };
    }
  ]);
})();
