README.md

# Envelope Budgeting

## Project Description
This project is a simple envelope budgeting application that allows users to create, view, update, delete, and transfer funds between budget envelopes. It uses an Express.js server to handle the backend operations and serves a static frontend interface.

## Project Structure

project-root/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
├── README.md
└── swagger.yaml


## Prerequisites
- Node.js
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/borgesenioc/personal-budget.git
cd personal-budget

2. Install Dependencies

npm install

3. Start the Server

node server.js

The server will start running on http://localhost:3000.

Project Files

public/index.html

This file contains the HTML structure for the frontend interface. It includes forms for creating, updating, deleting, and transferring funds between envelopes.

public/styles.css

This file contains the CSS styles for the frontend interface to make it clean and responsive.

public/script.js

This file contains the JavaScript code to handle form submissions and communicate with the backend API.

server.js

This file contains the Express.js server code that handles the backend operations, including creating, viewing, updating, deleting, and transferring funds between envelopes.

swagger.yaml

This file contains the Swagger documentation for the API, describing all endpoints and their expected parameters and responses. This allows for easy exploration and testing of the API.

API Endpoints

Create a New Envelope

URL: /envelopes

Method: POST

Body:

{
  "name": "Groceries",
  "value": 200
}

Response: 201 Created

Get All Envelopes

URL: /envelopes

Method: GET

Response: 200 OK

Get Total Budget

URL: /total-budget

Method: GET

Response: 200 OK

Get a Specific Envelope

URL: /envelopes/:id

Method: GET

Response: 200 OK or 404 Not Found

Update a Specific Envelope

URL: /envelopes/:id

Method: PUT

Body:

{
  "name": "New Groceries",
  "value": 50,
  "transaction_type": "withdraw"
}

Response: 200 OK or 404 Not Found

Delete a Specific Envelope

URL: /envelopes/:id

Method: DELETE

Response: 200 OK or 404 Not Found

Transfer Funds Between Envelopes

URL: /envelopes/transfer/:from/:to

Method: POST

Body:

{
  "value": 50
}

Response: 200 OK or 404 Not Found

Create a New Transaction

URL: /transactions

Method: POST

Body:

{
  "envelope_id": 1,
  "date": "2024-10-01",
  "amount": 100,
  "recipient": "Vendor A",
  "description": "Payment for supplies"
}

Response: 201 Created

Get All Transactions

URL: /transactions

Method: GET

Response: 200 OK

Get a Specific Transaction

URL: /transactions/:id

Method: GET

Response: 200 OK or 404 Not Found

Update a Specific Transaction

URL: /transactions/:id

Method: PUT

Body:

{
  "date": "2024-10-02",
  "amount": 150,
  "recipient": "Vendor B",
  "description": "Updated payment"
}

Response: 200 OK or 404 Not Found

Delete a Specific Transaction

URL: /transactions/:id

Method: DELETE

Response: 200 OK or 404 Not Found

Deployment on Render

Steps to Push to GitHub and Deploy on Render

Push to GitHub

Initialize Git (if not already initialized)

git init

Add all changes to Git

git add .

Commit your changes

git commit -m "Added Swagger documentation and database integration"

Add your remote repository (if not done yet)
Replace <repository-url> with your actual GitHub repository URL.

git remote add origin <repository-url>

Push the changes to the remote repository

git push -u origin main

If your branch is not named "main," adjust accordingly.

Deploy to Render

Create an Account

Go to Render.com and create an account if you haven't done so already.

Create a New Web Service

Click New + > Web Service.

Connect GitHub Repository

Connect your GitHub account to Render, and select the repository you just pushed.

Configure Deployment Settings

Enter a name for your service.

Choose the branch you want to deploy (typically main).

Set the Environment to Node.

Specify the Build Command as:

npm install

Specify the Start Command as:

node server.js

Make sure to add the necessary Environment Variables:

DATABASE_URL: Your PostgreSQL connection URL (you can create a managed PostgreSQL instance through Render as well).

Deploy

Click Create Web Service.

Render will start building and deploying your application.

Set up PostgreSQL Database on Render (if needed)

Add PostgreSQL Instance: From the Render dashboard, click New + > PostgreSQL.

Update Environment Variables: Add the DATABASE_URL to your Web Service’s environment variables using the PostgreSQL credentials.

Usage

Open a browser and navigate to http://localhost:3000.

Use the forms on the webpage to interact with the envelope budgeting application.

Swagger Documentation

To document the API, Swagger has been configured in the application.

The documentation can be accessed at /api-docs after running the server locally or in Render.

Alternatively, use the swagger.yaml file to define the API specification, which provides an easy way to manage documentation outside the code.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

License

This project is licensed under the MIT License.

