#!/bin/bash

cd /home/ubuntu
sudo rm -rf webapp
echo "process id"
PID=`ps aux | grep "node app.js" | grep -v grep | awk '{print $2}'`
echo "process id not empty ? $PID"
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  sudo kill -9 $PID
fi