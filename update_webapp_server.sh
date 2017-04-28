git pull origin master
rm -rf node_modules/
find ./ -type f -exec sed -i -e 's/http\/\/localhost:8080/htt
p:\/\/34.210.7.210:8080/g' {} \;
pm2 stop 0
pm2 delete 0
pm2 start server.js
