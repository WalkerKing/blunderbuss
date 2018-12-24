/**
 * ReplaceFileStr是一个读取文件并将文件中特定字符串进行替换的工具类
 * @param {String} filename 需要读取的文件的绝对路径
 * @param {Array}  replaceArr 需要替换的字符串数组，数组中每一个对象代表一对替换字符串，属性o代表将被替换的字符串，d代表被替换成什么字符串
 * @example:
 * {
 *     {
            o: '../common/jquery-1.12.4.js',
            d: '//cdn.bootcss.com/jquery/3.3.1/jquery.js'
        },
        {
            o: '../bootstrap-3.3.6/dist/js/bootstrap.js',
            d: '//cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.js'
        },
        {
            o: '../bootstrap-3.3.6/dist/css/bootstrap.css',
            d: '//cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.css'
        } 
 * }
 */
const fs = require('fs')

class ReplaceFileStr {
    constructor(filename, replaceArr) {
        this.filename = filename
        this.replaceArr = replaceArr
        this.init()
    }
    init() {
        this.readFile()
            .then(() => {
                this.rmOriginFile()
            })
            .then(() => {
                this.rename()
            })
            .catch(err => {
                console.log(err)
            })
    }
    readFile() {
        return new Promise((resolve, reject) => {
            let myReadScream = fs.createReadStream(this.filename, { encoding: 'utf8' });
            let myWriteScream = fs.createWriteStream(this.filename + '.bak');
            myReadScream.on('data', chunk => {
                console.log(chunk);
                for (let i = 0; i < this.replaceArr.length; i++) {
                    let replaceObj = this.replaceArr[i];
                    let reg = new RegExp(replaceObj.o, 'g')
                    chunk = chunk.replace(reg, replaceObj.d)
                }
                myWriteScream.write(chunk, 'utf8')
            })
            myReadScream.on('end', () => {
                resolve(this.filename)
            })
            myReadScream.on('error', err => {
                reject(err)
            })
        })
    }
    rename() {
        return new Promise((resolve, reject) => {
            fs.rename(this.filename + '.bak', this.filename, (err, file) => {
                if (err) reject(err)
                resolve(file)
            })
        })
    }
    rmOriginFile() {
        return new Promise((resolve, reject) => {
            fs.unlink(this.filename, (err, file) => {
                if (err) reject(err)
                resolve(file)
            });
        })
    }
}

const readdir = dir => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err)
            resolve(files)
        })
    })
}
const replace = function (dir, linkArr) {
    readdir(dir)
        .then(files => {
            for (let i = 0; i < files.length; i++) {
                new ReplaceFileStr(dir + files[i], linkArr)
            }
        })
}

let linkArr = [
    {
        o: '../common/jquery-1.12.4.js',
        d: '//cdn.bootcss.com/jquery/3.3.1/jquery.js'
    },
    {
        o: '../bootstrap-3.3.6/dist/js/bootstrap.js',
        d: '//cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.js'
    },
    {
        o: '../bootstrap-3.3.6/dist/css/bootstrap.css',
        d: '//cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.css'
    }
]
// 将文件中的下划线命名改为驼峰命名
linkArr = [
    {
        o: /(\_)(\w{1})/,
        d: (function () {
            var i = 0;
            return function (arr, a1, a2) {
                i++;    
                console.log(i);   
                return a2.toUpperCase();
                     
            }
        })()
    }
]

// replace('/Users/walkerking/test/blunderbuss/09-download-upload/', linkArr)
new ReplaceFileStr('/Users/walkerking/test/blunderbuss/55-node-study/17-util/test', linkArr)

