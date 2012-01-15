#!/bin/bash
rake generate
rake deploy
git add .
git commit -m 'Changed some stuff'
git push origin source
