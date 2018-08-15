#!/bin/bash
find ./debs -type f -name '*.deb' -delete
find . -name '.DS_Store' -type f -delete
rm -r packages.bz2
