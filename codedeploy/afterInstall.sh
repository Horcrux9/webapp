#!/bin/bash

cd /home/ubuntu
pwd
ls -lrt
mkdir webapp
tar xvf webapp.tgz -C webapp

cd /home/ubuntu/webapp
npm i -g sequelize-cli@6.2.0
sequelize db:migrate

ls -lrt

sleep 3