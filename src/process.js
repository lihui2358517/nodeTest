console.log(process.argv)
process.stdout.write('process.stdout')

process.stdin.resume(); 
process.stdin.on('data', function(data) { 
 process.stdout.write('read from console: ' + data.toString()); 
});

console.trace()