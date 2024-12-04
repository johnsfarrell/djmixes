#!/bin/bash

CURRENT_DIR=$(pwd)

cd algorithm || exit
python -m unittest discover -s tests -p "*_test.py"
cd "$CURRENT_DIR" || exit

cd server || exit
npm test
cd "$CURRENT_DIR" || exit

cd server/dist/database/db_test || exit
node db_test.js
cd "$CURRENT_DIR" || exit