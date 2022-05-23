const path = require('path');
const fs = require('fs');
const { exit } = require('process');
const { stdin, stdout } = process;
const filePath = path.resolve (__dirname, './test_file.txt');
const output = fs.createWriteStream(filePath);
stdout.write('Введите текст \n');
stdin.on('data', data => {
    if (data.toString().trim() == 'exit') return handler();
    output.write (data);
});
const handler = () => {
    output.close();
    console.log( `\nExiting... \n`);
    exit();
  };
process.on('SIGINT', handler);
process.on('exit', () => stdout.write('Удачи в изучении Node js!'));
