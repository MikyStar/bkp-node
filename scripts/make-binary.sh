#!/bin/sh

########################################

# Creates the final executable file

########################################

# Variables

buildCommand="pnpm build"
buildedFile="/dist/bkp.cjs.production.min.js"
binary="bin/cli.js"


########################################

# Functions

prefixShabang ()
{
	echo "#!/usr/bin/env node\n" | cat - $binary | tee $binary  &> /dev/null
}

########################################

# Main

mkdir -p build bin
$buildCommand

if [ -f "$binary" ]; then
	rm $binary
fi

cp $buildedFile $binary
prefixShabang