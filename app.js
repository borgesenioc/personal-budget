const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Global variables to store information about envelopes and total budget
let envelopes = [];
let totalBudget = 0;

// Function to generate unique ID for envelopes
const generateID = () => {
  return envelopes.length ? envelopes[envelopes.length - 1].id + 1 : 1;
};

// Function to get an envelope by the ID
const getEnvelopeById = (id) => {
  return envelopes.find(envelope => envelope.id === parseInt(id));
};

// Function to deposit or withdraw from an envelope
const withdrawOrDeposit = (num, str) => {
  if (str === 'withdraw') {
    num = -num;
  }
  return num;
};

// Function to delete an envelope by ID
const deleteEnvelopeById = (id) => {
  const index = envelopes.findIndex(envelope => envelope.id === parseInt(id));
  if (index !== -1) {
    const deletedEnvelope = envelopes.splice(index, 1)[0];
    totalBudget -= deletedEnvelope.value; // Adjust total budget
    return deletedEnvelope;
  }
  return null;
};

// Endpoint to create a new budget envelope
app.post('/envelopes', (req, res) => {
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

  res.status(201).json(newEnvelope);
});

// Endpoint to get all envelopes
app.get('/envelopes', (req, res) => {
  res.status(200).json(envelopes);
});

// Endpoint to get total budget
app.get('/total-budget', (req, res) => {
  res.status(200).json({ totalBudget });
});

// Endpoint to get a specific envelope
app.get('/envelopes/:id', (req, res) => {
  const envelopeId = req.params.id;
  const findEnvelope = getEnvelopeById(envelopeId);

  if (findEnvelope) {
    res.status(200).json(findEnvelope);
  } else {
    res.status(404).send(`Envelope ID ${envelopeId} does not exist.`);
  }
});

// Endpoint to update a specific envelope
app.put('/envelopes/:id', (req, res) => {
  const envelopeId = req.params.id;
  const findEnvelope = getEnvelopeById(envelopeId);

  if (findEnvelope) {
    const { name, value, transaction_type } = req.body;

    if (value !== undefined && transaction_type) {
      const amount = withdrawOrDeposit(value, transaction_type);
      findEnvelope.value += amount;
      totalBudget += amount;
    }

    if (name) {
      findEnvelope.name = name;
    }

    res.status(200).send(`Envelope ${findEnvelope.name}'s current balance is ${findEnvelope.value}`);
  } else {
    res.status(404).send(`Envelope ID ${envelopeId} does not exist.`);
  }
});

// Endpoint to delete a specific envelope
app.delete('/envelopes/:id', (req, res) => {
  const envelopeId = req.params.id;
  const deletedEnvelope = deleteEnvelopeById(envelopeId);

  if (deletedEnvelope) {
    res.status(200).send(`Envelope ID ${envelopeId} was deleted.`);
  } else {
    res.status(404).send(`Envelope ID ${envelopeId} does not exist.`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
