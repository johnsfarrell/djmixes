#!/bin/bash

CURRENT_DIR=$(pwd)

cd algorithm || exit
python -m unittest discover -s tests -p "*_test.py"
cd "$CURRENT_DIR" || exit