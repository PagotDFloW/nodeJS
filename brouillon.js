const fs = require('fs');

//-------------------------------STREAM--------------------------------------//
fs.appendFileSync('myFile.txt', 'toto');
let stream = fs.createReadStream('large-file.json', 'utf8')
let jsString = ''
stream.on('data', function (result){
    jsString +=  result.toString();
})
stream.on('end', function (){
    console.log('Fini Mgl')
})

let writeStream = fs.createWriteStream('myFile.txt',"utf-8")

stream.pipe(writeStream)
stream.push('Le contenu de ta MERE \n')


//---------------------------PROCESS-----------------------------------------//
console.log(process.argv, process.cwd(), process.pid, process.version)

//---------------------------CMD EXEC---------------------------------------//
const{ exec } = require("child_process");

exec ('dir',(error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr){
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: \n${stdout}`);
})   

//----------------------------EVEN EMITTER/LISTENER-------------------------//
var events = require('events')

// Emitter Object
var eventEmitter = new events.EventEmitter();


//Listener
var ListenerHandler1 = function ListenerHandler1(who){
    console.log('\n')
    console.log('Le tel sonne frero.......')

    console.log(" "+ who +" c lui qui sonne.")
    if(who == 'Alex'){
        console.log('eh clc je rep pas')
    }
    console.log("Yo mon gars sur "+ who+ " ça dit quoi?")
}

var yaPersonneHandler = function yaPersonneHadler(){
    console.log("\n")
    console.log("Ouais jsuis pas la laisse pas de message jtm pas")
}

eventEmitter.addListener('PhoneRinging', ListenerHandler1)

eventEmitter.addListener('yaPersonne', yaPersonneHandler)

eventEmitter.emit('PhoneRinging', 'Alex')


//----------------------------WORKER----------------------------------//
/*
* Cf workers.js 
*/

const { Worker } = require('worker_threads')
const fs = require('fs')


function executeWorker(file){
    return new Promise((resolve, reject) => {
        const worker = new Worker(file)

        worker.on('message', workerMessage => {
            console.log(workerMessage)
            let readFileSync = fs.readFileSync('./workerFile.txt',{encoding: 'utf8', flag: 'r'})
            console.log()
            console.log(readFileSync)
            resolve()

        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    })
}


(async function prog(){
    await executeWorker('./worker.js')
})()



//-------------------------------CRON AND OBJECTS----------------------//
/*
* Cf objects.js
* npm i cron and lodash
*/
const _ = require('lodash')
const {objectOne} = require('./objects')
var CronJob = require('cron').CronJob;

var job = new CronJob('*/5 * * * * *', function() {
    console.log('You will see this message every second');
}, null, true, 'UTC');
job.start();

let data = _.omit(objectOne, ['tonton'])

console.log(data)


//----------------------------EXPRESS------------------------------//
const express = require('express')
var app = express();

const items = [
    { id : '1', description : 'toto'},
    { id : '2', description : 'tata'},
    { id : '3', description : 'tutu'}


]

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/items/:id', function(req, res) {
    const item = items.find((el) => +el.id === +req.params.id)
    res.json(item);
});

app.post('/dogSave', function (req, res){
    console.log(req.body)
})

app.listen(3000, function() {
    console.log('Server starting')
})