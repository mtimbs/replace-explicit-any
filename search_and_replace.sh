#!/bin/bash

set -exuo pipefail

# For an example of a broken pattern match try and uncomment the following line.
# This will just delete any usage of ": any". It will cause your code to break because of the existence of types like ": any[]"
# find . \( -name '*.tsx' -o -name '*.ts' \) -exec sed -i "s/: any//g" {} +

find . \( -name '*.tsx' -o -name '*.ts' \) -exec sed -i \
'
s/?: any\[\]/?/g;
s/: any\[\] | undefined//g;
s/: any\[\] | null//g;
s/= any;/= unknown;/g
s/: Promise<any> | void//g;
s/: Promise<any> | any//g;
s/: Promise<any>\[\]//g;
s/: Promise<any>//g;
s/=> Promise<any>/=> Promise<unknown>/g;
s/: Promise<any\[\]>//g;
s/=> Promise<any\[\];/=> Promise<unknown\[\]/g;
s/: Array<any>//g;
s/<any>//g;
s/<any\[\]>//g;
s/=> any;/=> unknown;/g;
s/<any | undefined>//g;
s/: any | undefined//g;
s/<any | null>//g;
s/: any | null//g;
s/: any | string//g;
s/?: any/?/g;
s/: any\[\]\[\]\[\]//g;
s/: any\[\]\[\]//g;
s/: any\[\]//g;
s/: any//g;
s/<any/<unknown/g;
s/, any,/, unknown,/g;
s/any>/unknown>/g;
s/ as any\[\]//g;
s/ as any//g;
' \
{} +

##########################################################
#    before                 |   after
# ----------------------------------------
#   ?: any[]                |   ?
#   : any[] | undefined     |
#   : any[] | null          |
#   = any;                  |   = unknown;
#   : Promise<any> | void   |
#   : Promise<any> | any   |
#   : Promise<any>[]        |
#   : Promise<any>          |
#   => Promise<any>         |   => Promise<unknown>
#   : Promise<any[]>        |
#   => Promise<any[]>       |   => Promise<unknown[]>
#   : Array<any>            |
#   <any>                   |
#   <any[]>                 |
#   => any;                 |   => unknown;
#   <any | undefined>       |
#   : any | undefined       |
#   <any | null>            |
#   : any | null            |
#   : any | string          |
#   ?: any                  |   ?
#   : any[][][]             |
#   : any[][]               |
#   : any[]                 |
#   : any                   |
#   <any                    |   <unknown
#   , any,                  |   , unknown,
#   any>                    |   unknown>
#    as any[]               |
#    as any                 |
##########################################################


