const path = require("path");
const glob = require("glob");
// const fs = require("fs")
//import fs
import * as fs from "fs";
// micromatch(list, patterns[, options]);
// const paths = micromatch([], ["*.md"], { cwd: path.join(__dirname, "/../../content/") })
// console.log(paths)
const contentPath = path.join(__dirname, "/../../content/");
console.log(glob.sync("**/*.md", { cwd: contentPath }));
// an array of the paths relative to the content directory
const paths = glob.sync("**/*.md", { cwd: contentPath });
// for each path, read the file. Using Foreach to not save everything in memory like map.
paths.forEach((fileName) => {
    const fileContent = fs.readFileSync(path.join(contentPath, fileName), "utf8");
    const replacedContent = fileContent.replace(/alias:\s*(@[a-zA-Z0-9]+)/, 'alias: "$1"');
    if (replacedContent !== fileContent) {
        fs.writeFileSync(path.join(contentPath, fileName), replacedContent);
    }
});
//
