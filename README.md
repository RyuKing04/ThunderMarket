# Marketplace Project - Buy and Sell Management
This application is made to authenticate users, purchase and sale of objects

## Requirements

- Node.js v18.16.0 or higher
- Angular v16 or higher
- MySQL database
- Asynchronous flow management

- ## Installation and Execution

### Backend (Node.js - Server Folder)

1. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

2. Run database migrations:

   ``
   npx prisma migrate dev --name init
   ``

3. Run the server:

   ``
   npm run dev
   ``

### Frontend (Angular - Client Folder)

1. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

2. Run the application:

   ``
   ng serve
   ``

4. Open your browser and visit [http://localhost:4200](http://localhost:4200) to view the application.
