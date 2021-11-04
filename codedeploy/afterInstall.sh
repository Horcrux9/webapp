#!/bin/bash

#log files
touch /home/ubuntu/webapp/app.out.log
touch /home/ubuntu/webapp/app.err.log

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/webapp

#navigate into our working directory where we have all our github files
cd /home/ubuntu/webapp

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm i -g sequelize-cli@6.2.0

#migrate db
sequelize db:migrate