#!/bin/bash

set -exuo pipefail

# Run the find and replace
docker build -t explicit-any . && docker run -v $(pwd):/app -it explicit-any

# check that nothing broke
bash check_correctness.sh
