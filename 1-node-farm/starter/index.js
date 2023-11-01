
const http = require('http');
const url = require('url');
const fs = require('fs');




const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

const dataObj = JSON.parse(data);


const server = http.createServer((req,res)=>{
    console.log(req.url);

    const pathname = req.url;

    if(pathname === '/overview' || pathname === '/')
    {

        res.end('This is the OVERVIEW');
    }
    else if(pathname === '/product')
    {

        res.end('This is the PRODUCTI');
    }
    else if (pathname === '/api')
    {

            res.writeHead(200,{
                'Content-type': 'application/json',
            });
            res.end(data);


    }
    else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Page Not Found!</h1>');
    }





});

server.listen(8000,'127.0.0.4',()=>{
    console.log('Listening to request on port 8000');
})