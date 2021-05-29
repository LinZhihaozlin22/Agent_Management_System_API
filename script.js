const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

//require SendGrid/mail service and setup API_key
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//import data sample from 'data.json' file
const agents = require("./data.json");

//READ homepage
app.get('/', (req, res)=> {
    res.send('Welcome to Agent Management System created by Zhihao Lin');
});

//READ all agents info
app.get('/api/agents', (req, res)=> {
    res.send(agents);
});

//READ with Pagination
app.get('/api/agents/page', (req, res)=> {
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const resultAgent = agents.slice(startIndex, endIndex);
    res.json(resultAgent);
});

//Searching by memberId
app.get('/api/agents/id/:memberId', (req, res) => {
    const agent = agents.find(c => c.memberId === parseInt(req.params.memberId));
    if(!agent) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cannot find the agent with this memberId</h2>');
    res.send(agent);
});

//Searching by username
app.get('/api/agents/username/:username', (req, res) => {
    const agent = agents.find(c => c.username === req.params.username);
    if(!agent) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cannot find the agent with this username</h2>');
    res.send(agent);
});

//CREATE integrates with email api
app.post('/api/agents', (req, res) => {
    const { error } = validateAgent(req.body);
    if(error) {
        res.status(400).send(error.detail[0].message)
        return;
    }
    const agent = {
        username: req.body.username,
        email: req.body.email,
        memberId: agents.length + 1
    };
    agents.push(agent);

    //email content setup
    const msg = {
        to: agent.email,
        from: 'zhihaolinsde@gmail.com', // Change to your verified sender
        subject: 'Hello from Antai Global Inc.',
        text: `Dear ${agent.username}, \n
        Thank you for your registration. Your member id is ${agent.memberId}.
        Hope you enjoy our web services!\n
        Best,
        Antai Global Inc.`,
        html: agent.body,
      }
    //sending email
    sgMail
    .send(msg)
    .then(() => {}, error => {
    console.error(error);
    if (error.response) {
        console.error(error.response.body)
    }
    });

    res.send(agent);
});

//UPDATE agent using memberId
app.put('/api/agents/:memberId', (req, res) => {
    const agent = agents.find(c => c.memberId === parseInt(req.params.memberId));
    if(!agent) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Agent Not Found</h2>');
    
    const { error } = validateAgent(req.body);
    if(error) {
        res.status(400).send(error.detail[0].message)
        return;
    }

    agent.username = req.body.username;
    agent.email = req.body.email;
    res.send(agent);
});

//DELETE agent using memberID
app.delete('/api/agents/:memberId', (req, res) => {
    const agent = agents.find(c => c.memberId === parseInt(req.params.memberId));
    if(!agent) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Agent Not Found</h2>');
    
    const index = agents.indexOf(agent);
    agents.splice(index,1);

    res.send(agent);
});

//Validate username & email
function validateAgent(agent){
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email()
    });
    const validation = schema.validate(agent.body);
    return validation;
}

//port setup
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));