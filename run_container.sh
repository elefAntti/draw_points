#!/bin/bash
docker build . -t points_container
docker run -it --rm \
     -p 8080:8080 \
     points_container
