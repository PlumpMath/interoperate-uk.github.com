#!/bin/bash
rake generate
rake deploy
git add .
git commit -m 'updated'
git push origin source
