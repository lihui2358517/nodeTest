const fs = require('fs');
const path = require('path');
const config = require('../config/defaultConfig')
const handlebars = require('handlebars');
//util.promisify  让一个遵循异常优先的回调风格的函数，即 (err, value) => ... 回调函数是最后一个参数，返回一个返回值是一个 promise 版本的函数。
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);


const tplPath = path.join(__dirname,'../template/dir.tpl');
//同步方法，读取模版文件
const source = fs.readFileSync(tplPath,'utf-8');
const template = handlebars.compile(source)
module.exports = async function(req,res,filePath){
	try{
		const stats = await stat(filePath);
		if (stats.isFile()) {
			res.statusCode = 200;
			res.setHeader('Content-Type','text/plain');
			fs.createReadStream(filePath).pipe(res);
		}else if(stats.isDirectory()){
			const files = await readdir(filePath);
			res.statusCode = 200
			res.setHeader('Content-Type','text/html');
			const dir = path.relative(config.root,filePath)
			const data = {
				title:path.basename(filePath),
				files,
				dir:dir?`/${dir}`:'',
			}
			res.end(template(data))
		}
	} 
	catch (ex) {
		res.statusCode = 404;
		res.setHeader('Content-Type','text/plain');
		res.end(`${filePath} is not find!Becase ${ex.toString()}`);
	}
}