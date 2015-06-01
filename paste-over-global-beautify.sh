DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# parenthesized matches will be different depending on which match is made, hence why i'm turning the match variable into an array
#   then grabbing the second value.  There should only ever be the entire match plus a sub-match.
if [[ "${PATH}" =~ ^(.*".nvm"[^:]*):|:([^:]*".nvm".*)$|:([^:]*".nvm"[^:]*): ]]; then
	matches=( ${BASH_REMATCH[@]} )
	match="${matches[1]}"
fi

cp "${DIR}/js/lib/beautify.js" "${match}/../lib/node_modules/js-beautify/js/lib/beautify.js"
