const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;
const swaggerOptions = {
  swaggerDefinition: './swagger.yaml',
  apis: [],
};

app.use(express.json());
app.use(express.static('public'));  // Serve static files from the public directory

// Set up Sequelize and PostgreSQL connection
const sequelize = new Sequelize('envelope_budget', 'username', 'password', {
host: 'localhost',
dialect: 'postgres'
});

// Define Envelope model
const Envelope = sequelize.define('Envelope', {
name: {
type: DataTypes.STRING,
allowNull: false
},
value: {
type: DataTypes.DECIMAL,
allowNull: false
}
}, {
timestamps: true,
createdAt: 'created_at',
updatedAt: 'updated_at'
});

// Define Transaction model
const Transaction = sequelize.define('Transaction', {
envelope_id: {
type: DataTypes.INTEGER,
references: {
model: Envelope,
key: 'id'
}
},
date: {
type: DataTypes.DATE,
allowNull: false
},
amount: {
type: DataTypes.DECIMAL,
allowNull: false
},
recipient: {
type: DataTypes.STRING,
allowNull: false
},
description: {
type: DataTypes.STRING
}
}, {
timestamps: true,
createdAt: 'created_at'
});

// Sync the database
sequelize.sync();

// Endpoint to create a new budget envelope
app.post('/envelopes', async (req, res) => {
const { name, value } = req.body;

if (!name || value === undefined) {
return res.status(400).json({ error: 'Name and value are required' });
}

try {
const newEnvelope = await Envelope.create({ name, value });
res.status(201).json(newEnvelope);
} catch (error) {
res.status(500).json({ error: 'Failed to create envelope' });
}
});

// Endpoint to get all envelopes
app.get('/envelopes', async (req, res) => {
try {
const envelopes = await Envelope.findAll();
res.status(200).json(envelopes);
} catch (error) {
res.status(500).json({ error: 'Failed to retrieve envelopes' });
}
});

// Endpoint to get total budget
app.get('/total-budget', async (req, res) => {
try {
const envelopes = await Envelope.findAll();
const totalBudget = envelopes.reduce((sum, envelope) => sum + parseFloat(envelope.value), 0);
res.status(200).json({ totalBudget });
} catch (error) {
res.status(500).json({ error: 'Failed to retrieve total budget' });
}
});

// Endpoint to get a specific envelope
app.get('/envelopes/', async (req, res) => {
const envelopeId = req.params.id;

try {
const findEnvelope = await Envelope.findByPk(envelopeId);
if (findEnvelope) {
res.status(200).json(findEnvelope);
} else {
res.status(404).send(Envelope ID ${envelopeId} does not exist.);
}
} catch (error) {
res.status(500).json({ error: 'Failed to retrieve envelope' });
}
});

// Endpoint to update a specific envelope
app.put('/envelopes/', async (req, res) => {
const envelopeId = req.params.id;
const { name, value, transaction_type } = req.body;

try {
const findEnvelope = await Envelope.findByPk(envelopeId);
if (findEnvelope) {
let amount = value;
if (transaction_type === 'withdraw') {
amount = -value;
}

  await findEnvelope.update({
    name: name || findEnvelope.name,
    value: findEnvelope.value + (amount || 0)
  });

  res.status(200).send(`Envelope ${findEnvelope.name}'s current balance is ${findEnvelope.value}`);
} else {
  res.status(404).send(`Envelope ID ${envelopeId} does not exist.`);
}

} catch (error) {
res.status(500).json({ error: 'Failed to update envelope' });
}
});

// Endpoint to delete a specific envelope
app.delete('/envelopes/', async (req, res) => {
const envelopeId = req.params.id;

try {
const deletedEnvelope = await Envelope.destroy({ where: { id: envelopeId } });
if (deletedEnvelope) {
res.status(200).send(Envelope ID ${envelopeId} was deleted.);
} else {
res.status(404).send(Envelope ID ${envelopeId} does not exist.);
}
} catch (error) {
res.status(500).json({ error: 'Failed to delete envelope' });
}
});

// Endpoint to create a new transaction
app.post('/transactions', async (req, res) => {
const { envelope_id, date, amount, recipient, description } = req.body;

if (!envelope_id || !date || !amount || !recipient) {
return res.status(400).json({ error: 'Envelope ID, date, amount, and recipient are required' });
}

try {
const findEnvelope = await Envelope.findByPk(envelope_id);
if (findEnvelope && findEnvelope.value >= amount) {
await findEnvelope.update({ value: findEnvelope.value - amount });
const newTransaction = await Transaction.create({ envelope_id, date, amount, recipient, description });
res.status(201).json(newTransaction);
} else {
res.status(400).send('Insufficient funds or envelope not found.');
}
} catch (error) {
res.status(500).json({ error: 'Failed to create transaction' });
}
});

// Endpoint to get all transactions
app.get('/transactions', async (req, res) => {
try {
const transactions = await Transaction.findAll();
res.status(200).json(transactions);
} catch (error) {
res.status(500).json({ error: 'Failed to retrieve transactions' });
}
});

// Endpoint to get a specific transaction
app.get('/transactions/', async (req, res) => {
const transactionId = req.params.id;

try {
const transaction = await Transaction.findByPk(transactionId);
if (transaction) {
res.status(200).json(transaction);
} else {
res.status(404).send(Transaction ID ${transactionId} does not exist.);
}
} catch (error) {
res.status(500).json({ error: 'Failed to retrieve transaction' });
}
});

// Endpoint to update a specific transaction
app.put('/transactions/', async (req, res) => {
const transactionId = req.params.id;
const { date, amount, recipient, description } = req.body;

try {
const transaction = await Transaction.findByPk(transactionId);
if (transaction) {
await transaction.update({
date: date || transaction.date,
amount: amount || transaction.amount,
recipient: recipient || transaction.recipient,
description: description || transaction.description
});
res.status(200).json(transaction);
} else {
res.status(404).send(Transaction ID ${transactionId} does not exist.);
}
} catch (error) {
res.status(500).json({ error: 'Failed to update transaction' });
}
});

// Endpoint to delete a specific transaction
app.delete('/transactions/', async (req, res) => {
const transactionId = req.params.id;

try {
const deletedTransaction = await Transaction.destroy({ where: { id: transactionId } });
if (deletedTransaction) {
res.status(200).send(Transaction ID ${transactionId} was deleted.);
} else {
res.status(404).send(Transaction ID ${transactionId} does not exist.);
}
} catch (error) {
res.status(500).json({ error: 'Failed to delete transaction' });
}
});

// Endpoint to transfer budget between envelopes
app.post('/envelopes/transfer//', async (req, res) => {
const { value } = req.body;
const fromId = req.params.from;
const toId = req.params.to;

try {
const fromEnvelope = await Envelope.findByPk(fromId);
const toEnvelope = await Envelope.findByPk(toId);

if (fromEnvelope && toEnvelope) {
  if (fromEnvelope.value >= value) {
    await fromEnvelope.update({ value: fromEnvelope.value - value });
    await toEnvelope.update({ value: toEnvelope.value + value });

    res.status(200).send(`$${value} was transferred from ${fromEnvelope.name} to ${toEnvelope.name}.`);
  } else {
    res.status(400).send(`Insufficient funds in ${fromEnvelope.name}.`);
  }
} else {
  res.status(404).send('One or both envelopes not found.');
}

} catch (error) {
res.status(500).json({ error: 'Failed to transfer funds' });
}
});

app.listen(port, () => {
console.log(Server is running on http://localhost:${port});
});