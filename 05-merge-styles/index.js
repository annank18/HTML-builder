const path = require ('path');
const fs = require('fs');
const { resolve } = require ('path');

const fileCSS = path.resolve (__dirname, './styles');
const bundleCSS = path.resolve (__dirname, './project-dist');

async function MergeStyles (fileCSS, bundleCSS){
    await fs.promises.writeFile (resolve (bundleCSS, 'bundle.css'), '');
    const input_files = await fs.promises.readdir(fileCSS);
    for (let file of input_files) {
        const fileInfo = await fs.promises.stat(resolve (fileCSS, file));
        if ((fileInfo.isFile()) && (path.extname (file) === '.css')){
            let data = '';
            fs.createReadStream(resolve(fileCSS, file)).on('data', chunk => data += chunk). on ('end', () => 
            fs.promises.appendFile(path.resolve(bundleCSS, 'bundle.css'), data))
        }
    }
}

MergeStyles (fileCSS, bundleCSS);
