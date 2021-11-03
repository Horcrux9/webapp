#!/bin/bash

cd /home/ubuntu
pwd
ls -lrt
mkdir webapp
tar xvf webapp.tgz -C webapp
echo "#CSYE6225: doing after install: remove zip from webapp folder"
pwd
ls -lrt
cd ..

sleep 3