#!/bin/bash

# Start the first process
python3 api/app.py &
  
# Start the second process
python3 -m http.server &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?