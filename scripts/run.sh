node "$(dirname "$0")/runCli.js" "$input"
   echo "Script: $? - Successfull"
if [ $? != 0 ]; then                   
   echo "${?}\n". 1>&2 && exit 1
fi