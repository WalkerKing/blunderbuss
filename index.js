//目标：项目太大,自动生成一个目录

const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const print = str => {
    console.log(str + ' ' + new Date().toLocaleString());
}

const RunShellCmd = (cmd) => {
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, () => {
            resolve();
        })
    });
};
const createIndex = (list) => {
    let str = jade.renderFile('./src/views/index.jade', {
        title: 'leetcode list',
        list
    });
    fs.writeFileSync(path.resolve('dist', 'index.html'), str);
}
fs.readdir(path.resolve(__dirname, './'), (err, filenames) => {
    filenames = filenames.filter(v => !isNaN(v.substring(0, 2) * 1)) // 如果前两个字符可以转换为数字,则保留
    let contentText = '#目录\n'
    filenames.forEach(v => {
        contentText += `- ${v}\n`
    }) 
    fs.writeFileSync('readme.md', contentText)
    // createHtml(files).then(res => {
    //     let app = express();
    //     app.use(express.static(path.resolve(__dirname, '../dist')));
    //     app.get('/', function (req, res) {
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.render('./dist/index.html');
    //         res.end();
    //     });
    //     app.listen(3000);
    //     console.log(`server run at http://localhost:3000`);
    // })
});

