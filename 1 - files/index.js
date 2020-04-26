const fd = require('fs')

// blocking, synchronous way
/*
const txt = fd.readFileSync('./txt/input.txt', 'utf-8')

const txtout = `This is the definition: ${txt}.\nCreate on ${Date.now()}`
fd.writeFileSync("./txt/output.txt", txtout)
console.log("File created!")
*/

// asynchronous way | callback functions
fd.readFile('./txt/start.txt','utf-8', (error, data1) => {
    if (error) return console.log('An error occured!')
    fd.readFile(`./txt/${data1}.txt`,'utf-8', (error, data2) => {
        fd.readFile(`./txt/append.txt`,'utf-8', (error, data3) => {
            fd.writeFile('./txt/output.txt', `${data2}\n${data3}`, error => {
                console.log('File Created!')
            })
        })
    })
})

console.log('reading..')