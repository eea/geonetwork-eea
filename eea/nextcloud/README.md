
### Nextcloud

Run Nextcloud in Docker:

```bash
mkdir datashare
docker run  \
 -e NEXTCLOUD_ADMIN_USER=admin \
 -e NEXTCLOUD_ADMIN_PASSWORD=admin \
 -e OVERWRITEWEBROOT=/ \
  -p 88:80 \
  -u 1000:1000 \
  -v ./datashare:/var/www/html \
  --name=nextcloud --rm  \
  nextcloud
```

Go to http://localhost:88/


### Misc. 

Use OCC to scan files when filesystem is modified directly:

```bash
docker exec --user www-data nextcloud ./occ files:scan --all
```


### Webdav access

* For a user

dav://localhost:88/datashare/remote.php/dav/files/admin

* For a shared folder

dav://tn3eifq4YjNzrTB@localhost:88/public.php/webdav/

* Share link

http://localhost:88/s/tn3eifq4YjNzrTB

* Internal share link

http://localhost:88/f/172
http://localhost:88/s/XNKQX4ifdaNb67s
