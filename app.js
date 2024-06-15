const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Global variables to store information about envelopes and total budget
let envelopes = [];
let totalBudget = 0;

// Function to generate unique ID for envelopes
const  generateID = () => {
    return (envelopes.length) ? envelopes[envelopes.length - 1].id + 1 : 1;
};

// Function to get an envelope by the ID
const getEnvelopeById = (num) => {
    return envelopes.find(envelope => envelope.id === parseInt(id));
};

// Endpoint to create a new budget envelope
app.post('/envelopes', (req, res, next) => {
    const { name, value } = req.body;

    if (!name || value === undefined) {
        return res.status(400).json({ error: 'Name and value are required' });
    }

    const newEnvelope = {
        id: generateID(),
        name: name,
        value: value
    };

    envelopes.push(newEnvelope);
    totalBudget += value;

    res.status(200).json(newEnvelope);
});

// Endpoint to get all envelopes
app.get('/envelopes', (req, res, next) => {
    res.status(200).json(envelopes);
});

app.get('/total-budget', (req, res, next) => {
    res.status(200).json(totalBudget);
});

app.get('/:id', (req, res, next) => {
    const envelopeId = req.params.id;

    if (envelopeId) {
        findEnvelope = getEnvelopeById(envelopeID);
        res.status(201).send(findEnvelope);
    } else {
        res.status(404).send(`Envelope ID does not exist.`);
    }
    
})

/*app.get('/', (req, res) => {
    res.send("Hello, World");
})*/



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});