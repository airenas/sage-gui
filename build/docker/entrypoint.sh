#!/usr/bin/env sh
set -e

echo Updating base href to ${BASE_HREF}
cat /usr/share/nginx/html/index.html | envsubst '${BASE_HREF}' > /usr/share/nginx/html/index.html

