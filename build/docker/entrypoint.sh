#!/usr/bin/env sh
set -e

echo Starting nginx
exec nginx -g 'daemon off;'
