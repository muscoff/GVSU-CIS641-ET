const fs = require('fs')
const path = require('path')

const readJsonFile = filePath => {
    const dir_path = path.dirname(__dirname)
    const file_path = path.join(dir_path, 'config',filePath)
    try{
        if (!fs.existsSync(file_path)) {
            return []
        }
        const data = fs.readFileSync(file_path)
        return JSON.parse(data)
    }catch(err){
        return []
    }
}

const writeJsonFile = (filePath, data) => {
    const dir_path = path.dirname(__dirname)
    const file_path = path.join(dir_path, 'config', filePath)
    try{
        fs.writeFileSync(file_path, JSON.stringify(data))
        return true
    }catch(err){
        return false
    }
}

module.exports = {readJsonFile, writeJsonFile}

// module.exports = {
//     readJsonFile: (filePath) => {
//         return new Promise((resolve, reject) => {
//             fs.readFile(filePath, 'utf8', (err, data) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     try {
//                         resolve(JSON.parse(data))
//                     } catch (error) {
//                         reject(error)
//                     }
//                 }
//             })
//         })
//     },

//     writeJsonFile: (filePath, data) => {
//         return new Promise((resolve, reject) => {
//             fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve()
//                 }
//             })
//         })
//     }
// }