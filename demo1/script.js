const express = require("express"); //import express
const joi = require("joi"); //import joi
const app = express(); //creating app
app.use(express.json());

const customers =[
    {title: 'n1',id: 1},
    {title: 'n2',id: 2},
    {title: 'n3',id: 2},
    {title: 'n4',id: 4}
]

function validate(customer){
    const filter = {
        title : joi.string().min(3).required()
    }
    return joi.validate(customer,filter);
}


app.get('/',(req,res) => {
    res.send("Welcome to REST api");
});

app.get('/api/customers',(req,res)=>{
    res.send(customers);
});

app.get('/api/customers/:id',(req,res)=>{
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2>No customer with id:${id}</h2>');
    console.log(customer+"fs");
    res.send(customer);
});

app.post('/api/customers',(req,res)=>{
    const out_ = validate(req.body);

    if(out_.error){
        console.log(out_.error);
        // console.log(validate(req.body));
    }else{
        const customer = {
            id: customers.length + 1,
            title: req.body.title
        }
        customers.push(customer);
    }
    res.send(customers)
});

//put and delete needed

const port = process.env.POST || 8082;
app.listen(port, () => console.log(`Listening on port ${port}......`));
