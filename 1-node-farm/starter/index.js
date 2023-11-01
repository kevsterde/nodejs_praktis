
const http = require('http');
const url = require('url');
const fs = require('fs');




const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProd = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PROPS.NAME%}/g,product.productName);
    output = output.replace(/{%PROPS.PLACE%}/g,product.from);
    output = output.replace(/{%PROPS.IMG%}/g,product.image);
    output = output.replace(/{%PROPS.NUTRI%}/g,product.nutrients);
    output = output.replace(/{%PROPS.QTY%}/g,product.quantity);
    output = output.replace(/{%PROPS.PRICE%}/g,product.price);
    output = output.replace(/{%PROPS.DESC%}/g,product.description);
    output = output.replace(/{%PROPS.ID%}/g,product.id);

    if(!product.organic) output = output.replace(/{%PROPS.ORGANIC%}/g,'not-organic');

    return output;


}



const server = http.createServer((req,res)=>{
    console.log(req.url);

    const pathname = req.url;

    if(pathname === '/overview' || pathname === '/')
    {

        res.writeHead(200,{
            'Content-type':'text/html',
        });


        const cardsHTML = dataObj.map(item=> replaceTemplate(tempCard,item)).join('');
        const finalOverView = tempOverview.replace(/{%PRODUCT_CARDS%}/g,cardsHTML);

        res.end(finalOverView);




    }
    else if(pathname === '/product')
    {


        res.writeHead(200,{
            'Content-type':'text/html',
        });

        res.end(tempProd);



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