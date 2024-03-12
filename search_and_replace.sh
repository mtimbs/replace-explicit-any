#!/bin/bash

set -exuo pipefail

find . \( -name '*.tsx' -o -name '*.ts' \) -exec sed -i "s/: any/: unknown/g" {} +

