## CEMA-HIS BACKEND PROJECT
This is a backend application that allows doctors to:
Register new clients
Create health programs (e.g., TB, Malaria, HIV)
Enroll clients into programs
Search clients by name or contact info
View client profiles and enrolled programs

## PROJECT STRUCTURE
TypeScript was used for type safety and better code management.
Express.js framework powers the backend API.
MySQL is the database used to store client, program, and enrollment data.
Stored Procedures were created in MySQL to handle core database operations efficiently (like CreateClient, EnrollClient).
Winston is used for logging errors and important activities.
Joi is used for validating request payloads.

## RUNING THIS PROJECT
## LOCALLY
## 1.Clone and install
git clone https://github.com/your-username/cema-his.git
cd cema-his
npm install

## 2. Configure Environment
DB_HOST=localhost
DB_USER=mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database
PORT=3000

## 3. BUILD AND RUN
npm run build
npm run dev

## API TESTING
Import this Postman Collection to easily test all endpoints
/assets/postman_collection/cema-his-collection.json

## PROTOTYPE AND POWERPOINT PRESENTATION
View the attached PowerPoint and prototYpe for a walkthrough of the system's design, architecture, and functionality.
Located at:
/assets/prototype/

## DEPLOYMENT
The project attempted deployment on Render {https://cema-his.onrender.com/} . However, due to lack of a free MySQL hosting solution, the database connection could not be completed.
Therefore, full testing should be done locally.

