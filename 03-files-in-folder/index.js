const path = require('path');
const filePath = path.resolve (__dirname, './secret-folder');
const { parse, resolve} = require('path');
const fs = require('fs');

  async function secretFolder (filePath){
    const files = await fs.promises.readdir(filePath);
    console.log("\nCurrent directory files:");
        for (let file of files) {
            const fileInfo = await fs.promises.stat(resolve (filePath,file)); 
            if (fileInfo.isFile()){
               console.log(`${parse(file).name} - ${parse(file).ext.slice(1)} - ${(fileInfo.size / 1024).toFixed(2) + 'kb'}`);
            }
        } 
  }

 secretFolder(filePath);
