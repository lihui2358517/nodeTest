const http = require('http');
const chalk = require('chalk');
const path = require('path');
const config = require('./src/config/defaultConfig.js');
const router = require('./src/helper/router');
const server = http.createServer((req,res)=>{
	const filePath = path.join(config.root,req.url)
	router(req,res,filePath);
})



console.log('测试')
server.listen(config.port,config.hostname,()=>{
	const addr = `http://${config.hostname}:${config.port}`;
	console.info(`server started at ${chalk.green(addr)}`)
})


