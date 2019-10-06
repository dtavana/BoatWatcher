#!/bin/bash
cd ~/Coding/TS/BoatWatcher || exit
git pull
git checkout master
sudo docker-compose up -d
