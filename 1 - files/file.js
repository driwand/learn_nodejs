/*
 * Lets rename evrything!!! for a good sorted files
 * Downloaded cours videos got some files named 1,2.. 9 and 10...100
 * this is ugly, right!?...
 * We need all of them to start with zeros to make a good playlist on media player
 * So here is the solution
 * Start 'node.js file.js [path to folder]'
 * and you will get a propely named files
*/

const fs = require('fs')
const pt = require('path')
const args = process.argv

let path

if (process.argv.length != 3)
    path = '.'
else
    path = args.slice(2)[0]; // path to directory

fs.stat(path, (err, info) => {
    if (err)
    {
        console.log('Check the path');
        process.exit(1)
    }
    if (!info.isDirectory())
    {
        console.log("Path must be a directory!");
        process.exit(1)
    }
})

fs.readdir(path, (err, dir) => {
    if (err) return console.log('Error occured!')
    let lenzeros = 0;

    dir.forEach(file => {
        if (file.match(/^\d/))
        {
            const num = file.split('.').slice(0)[0]
            if (num.length > lenzeros)
                lenzeros = num.length;
        }
    });
    
    dir.forEach(file => {
        if (pt.extname(file) == '.srt' || pt.extname(file) == '.mp4')
        {
            const num = file.split('.')[0];
            const rest = file.split('.').splice(1).join('.')
            
            const res = num.split('');
            let fillzero = new Array(lenzeros - res.length).fill('0');
            let newarr = fillzero.concat(res);
        
            let vr = newarr.join('')
            let newname = `${args.slice(2)[0]}\\${vr}.${rest}`
            var fromname = `${args.slice(2)[0]}\\${file}`
            if (newname != fromname)
            {           
                fs.rename(fromname, newname, (err) => {
                    if (err) throw err
                    console.log(`Renamed File : ${vr}.${rest}`)
                })
            }
        }
    });
});