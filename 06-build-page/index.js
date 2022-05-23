const path = require ('path');
const fs = require('fs');
const { resolve } = require ('path');
const { copyFile } = require ('fs');
const dist = path.join (__dirname, 'project-dist');
const components = path.resolve (__dirname, 'components');
const styles = path.resolve (__dirname, 'styles');
const assets = path.resolve (__dirname, 'assets');
const copy = path.resolve (dist, 'assets');

async function componentsBuild () {
    await fs.promises.mkdir(dist), {recursive: true};
    const template = await fs.promises.readFile (resolve (__dirname, 'template.html'), 'utf-8');
    const componentsItems = await fs.promises.readdir (components);
    let compData = template;
    for (let item of componentsItems) {
        const componentsStat = await fs.promises.stat(resolve(components, item));
        if ((componentsStat.isFile()) && (path.extname (item) === '.html')){
            const data = await fs.promises.readFile (resolve(components, item), 'utf-8');
            compData = compData.replace(`{{${path.parse(resolve(components, item)).name}}}`, data);
       }
    }
    await fs.promises.writeFile (path.join (dist, 'index.html'), compData);
}

async function stylesBuild (){
    await fs.promises.writeFile (resolve (dist, 'style.css'), '');
    const input_files = await fs.promises.readdir(styles);
    for (let file of input_files) {
        const fileInfo = await fs.promises.stat(resolve (styles, file));
        if ((fileInfo.isFile()) && (path.extname (file) === '.css')){
            let data = '';
            fs.createReadStream(resolve(styles, file)).on('data', chunk => data += chunk). on ('end', () => 
            fs.promises.appendFile(path.resolve(dist, 'style.css'), data))
        }
    }
}

async function copyDir(assets, copy) {
    const sourceStat = await fs.promises.stat(assets);
    if (!sourceStat.isFile()) {
        await fs.promises.mkdir(copy), {recursive: true};
        for (item of await fs.promises.readdir(assets)) {
        copyDir(path.resolve(assets, item), path.resolve (copy, item))
        }
    } else {
        await fs.promises.copyFile(assets, copy);
    }
}

async function updateFolder(assets, copy) {
    await fs.promises.rm(copy, { recursive: true, force: true });
    copyDir(assets, copy);
}

async function Build() {
    await fs.promises.rm(dist, { recursive: true, force: true });
    componentsBuild();
    stylesBuild();
    updateFolder(assets, copy);
}

Build();