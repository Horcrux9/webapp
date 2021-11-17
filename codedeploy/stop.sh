#!/bin/bash

#Stopping existing node servers
if pgrep node; then pkill -fe node; else echo "no node process was running"; fi
