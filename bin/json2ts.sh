#!/bin/bash -e
set -e

# set pwd to parent directory
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."

for file in $(find src -type f -name '*.schema.json');
do
  yarn json2ts -i "${file}" -o "${file/.json/.d.ts}";
done
