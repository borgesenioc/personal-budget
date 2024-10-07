**Database Design for Envelope Budget Project**

To add a persistence layer to your Envelope Budget API, you will need to design a database that can store information about envelopes, transactions, and the overall budget structure. Here is a recommended approach using PostgreSQL:

### **Entities and Relationships**
The database design involves two main entities:

1. **Envelopes**: Stores information about individual budget categories.
2. **Transactions**: Records deposits, withdrawals, and transfers between envelopes.

These entities will have a one-to-many relationship, as each envelope can have multiple transactions, but each transaction is associated with a single envelope.

### **Database Schema**

#### **Envelopes Table**
This table keeps track of all the budget envelopes.
- **id** (Primary Key): Unique identifier for each envelope (INTEGER, Auto-incremented).
- **name**: The name of the envelope (VARCHAR, Not null).
- **value**: The current balance of the envelope (DECIMAL, Not null).
- **created_at**: Timestamp for when the envelope was created (TIMESTAMP, Not null).
- **updated_at**: Timestamp for when the envelope was last updated (TIMESTAMP, Not null).

#### **Transactions Table**
This table records all financial activities related to the envelopes, such as deposits, withdrawals, and transfers.
- **id** (Primary Key): Unique identifier for each transaction (INTEGER, Auto-incremented).
- **envelope_id** (Foreign Key): References the related envelope (INTEGER, Not null).
- **type**: The type of transaction: "deposit", "withdrawal", or "transfer" (VARCHAR, Not null).
- **amount**: The amount involved in the transaction (DECIMAL, Not null).
- **description**: Optional description or notes about the transaction (VARCHAR).
- **created_at**: Timestamp for when the transaction occurred (TIMESTAMP, Not null).

#### **Transfer Table (Optional)**
If you want to keep track of transfer details more explicitly, you can create a **Transfers** table.
- **id** (Primary Key): Unique identifier for each transfer (INTEGER, Auto-incremented).
- **from_envelope_id** (Foreign Key): The envelope from which the amount is transferred (INTEGER, Not null).
- **to_envelope_id** (Foreign Key): The envelope to which the amount is transferred (INTEGER, Not null).
- **amount**: The transferred amount (DECIMAL, Not null).
- **created_at**: Timestamp for the transfer (TIMESTAMP, Not null).

### **Entity-Relationship Diagram (ERD)**
1. **Envelopes** have **Transactions** (1:N).
2. **Envelopes** can be related to **Transfers** if you decide to maintain a separate transfer record.

### **Setting Up PostgreSQL Database**
- Use PostgreSQL to create the tables based on the above schema.
- Use Sequelize to interact with your database in a more intuitive and less error-prone way.

### **Sequelize Models**
You will need to create Sequelize models for **Envelopes**, **Transactions**, and (optionally) **Transfers**.
- Define the relationships between models using Sequelize’s `belongsTo`, `hasMany`, and `belongsToMany` methods.
- **Envelopes** will `hasMany` **Transactions**.
- **Transactions** will `belongsTo` **Envelopes**.

### **API Integration**
- Update your existing API endpoints to interact with the PostgreSQL database instead of in-memory arrays.
- For creating, updating, and deleting envelopes, you will need to add corresponding Sequelize methods to manipulate data in the **Envelopes** table.
- For transfers and transactions, use Sequelize methods to modify both **Envelopes** and **Transactions** tables and ensure data consistency.

### **Deployment on Render**
- After testing locally, you will need to deploy the database and the server.
- Create a PostgreSQL database on Render.
- Update the database credentials in your server application.
- Deploy the Node.js server on Render and make sure to connect to the PostgreSQL instance.

### **Documentation with Swagger**
To document the new transactions feature:
- Add details about transactions, including possible endpoints such as `/transactions` (to add a transaction) and `/envelopes/:id/transactions` (to get all transactions for a specific envelope).
- Document the transfer feature for better user clarity.

