BananaProject
=============

Description:
------------
A simple TypeScript project to parse delivery, usage, and inventory data, 
and generate a reconcile report.

Project Structure:
------------------
src/main/
--
  delivery/      -> Delivery service, controller, router(index.ts)
  
  usage/         -> Usage service, controller, router(index.ts)
  
  inventory/     -> Inventory service, controller, router(index.ts)
  
  reconcile/     -> Reconcile service, controller, router(index.ts)
  

src/test/
--
  mock-data/     -> data input files: delivery.txt, usage.csv, inventory.json
  
  TestEndpoints.test.ts -> Endpoint tests file using Jest & Supertest

Server runs on http://localhost:3000 starting at src/index.ts

API Endpoints:
--------------
GET /delivery/parse       -> Parses delivery.txt and returns items

GET /usage/parse          -> Parses usage.csv and returns items

GET /inventory/parse      -> Parses inventory.json and returns items

GET /reconcile/report     -> Generates reconcile report using all data


Note: Refer to Banana-Mystery.postman_collection.json added at root level to test the APIs
--
  Tests:
  ------
  npm test -> Validates all endpoints using Jest & Supertest
  Refer to TestEndpoints.test.ts for test cases
