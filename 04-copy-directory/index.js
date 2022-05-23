const path = require ('path');
const fs = require('fs');
const { resolve } = require ('path');
const { copyFile } = require ('fs');

const files = path.resolve (__dirname, 'files');
const filesCopy = path.resolve (__dirname, 'files-copy');

async function copyDir(files, filesCopy) {
    const sourceStat = await fs.promises.stat(files);
    if (!sourceStat.isFile()) {
        await fs.promises.mkdir(filesCopy);
        for (item of await fs.promises.readdir(files)) {
        copyDir(path.resolve(files, item), path.resolve(filesCopy, item));
        }
    } else {
        await fs.promises.copyFile(files, filesCopy);
    }
}

async function updateFolder(files, filesCopy) {
    await fs.promises.rm(filesCopy, { recursive: true, force: true });
    copyDir(files, filesCopy);
}

updateFolder (files, filesCopy);

