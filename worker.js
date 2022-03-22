const fs = require('fs')
const { parentPort } = require('worker_threads')

let writeStream = fs.createWriteStream('workerFile.txt',"utf-8")

let count = 0
for (let i = 0; i < 10000000; i++) {
    count+=1
    writeStream.write(count+'\n')
}

console.log(`FIN: ${count}`)
const message = 'Tache intensive terminée, total:'+count

parentPort.postMessage(message)