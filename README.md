# Expense Tracker

A full-stack web application built with React, Vite, and Node.js.
# LedgerStream Rupee Core (Mini Expense Tracker)

A production-ready, industry-grade Full Stack Expense Tracker application built using a layered architecture pattern. This solution fulfills 
**Exercise 2: Mini Expense Tracker** from the Studio Graphene Full Stack Developer assessment specification. 

The application enables real-time tracking of personal financial streams, featuring granular categorization, date-range filtration, intuitive multi-page context routing, interactive data visualizations (Bar and Pie distribution charts), full client/server data model validation, and automated environment-aware API configuration routing.

## 🌟 Features Implemented
* **Dual-Stream Tracking**: Records both incoming amounts (Credits/Income) and daily spending (Debits/Expenses).
* **Granular Filters**: Advanced data-set filtration by individual Categories or custom Date Ranges.
* **Aggregated Dashboard**: Active summary panels mapping out total monthly spending, incoming streams, net savings balance, and highest recorded debits.
* **Data Visualization**: Interactive data distribution rendering via responsive Bar Charts and round Pie Charts.
* **Persistent Local Ledger**: Bonus criteria met using local file-system serialization (`expenses.json`) ensuring full data preservation across server cycles.
* **Layered Structural Separation**: Strict multi-tier modular boundaries for separation of concerns.

---

## 🛠️ Tech Stack & Architecture Rationales

### Frontend (Client Tier)
* **React & Vite**: Chosen for blazing-fast Hot Module Replacement (HMR) speeds and optimal deployment builds.
* **Tailwind CSS (v4)**: Modern utility-first CSS framework implemented to craft an accessible, responsive, and uncluttered dashboard UI.
* **Recharts**: Integrated for handling SVG-based canvas analytics rendering due to its modular component declarative model.
* **Lucide React**: Lightweight icon asset system for consistent visual indicators.

### Backend (Server Tier)
* **Node.js & Express**: Extensible asynchronous framework enabling stable high-performance network binding.
* **Layered Industry-Standard Architecture**: Divided into isolated domains to promote unit testability and easy refactoring:
  * `Model Layer`: Enforces domain object schema attributes and structural integrity.
  * `Repository Layer`: Manages native local I/O file-system streams (`fs` engine).
  * `Service Layer`: Pure detached business logic and analytical math aggregation.
  * `Controller Layer`: Evaluates incoming HTTP request blocks and issues sanitized JSON wrappers.

---

## 📁 Project Structure

```text
expense-tracker/
├── server/                 # Node.js + Express Backend Tier
│   ├── src/
│   │   ├── controllers/    # Network request/response routing handlers
│   │   ├── models/         # Object schema templates & validation blueprints
│   │   ├── repositories/   # File system data stream managers (I/O)
│   │   └── services/       # Core business logic rules & financial aggregators
│   ├── expenses.json       # Persistent JSON local file ledger database store
│   ├── index.js            # Main system server initialization boot file
│   └── package.json        # Server configuration matrices & scripts
├── client/                 # React + Vite Frontend Tier
│   ├── src/
│   │   ├── api/            # Centralized network API proxy wrappers
│   │   ├── components/     # Reusable global layout & skeleton loading states
│   │   ├── dashboard/      # Page segment views & data visualizers
│   │   ├── App.jsx         # State orchestration center & shell layout
│   │   ├── index.css       # Tailwind directive stylesheets injection point
│   │   └── main.jsx        # Frontend compilation entry point mount
│   └── package.json        # Frontend web asset modules & dependencies
└── .gitignore              # Monorepo version control tracking configuration

**Api Documentation
1. Fetch Filtered Expenses
Method: GET
Path: /api/expenses
Query Parameters (Optional):
category (Food, Transport, Bills, Entertainment, Salary, Investment, Other)
startDate (YYYY-MM-DD)
endDate (YYYY-MM-DD)
Response Shape (200 OK):

2. Get Aggregated Analytics Metrics
Method: GET
Path: /api/summary
Response Shape (200 OK):

3. Record a New Transaction
Method: POST
Path: /api/expenses
Request Body:

4. Modify an Existing Transaction
Method: PUT
Path: /api/expenses/:id
Request Body: Pass any properties requiring modification (amount, category, date, note).

5. Remove a Transaction File Record
Method: DELETE
Path: /api/expenses/:id
Response Shape (200 OK): {"message": "Expense deleted successfully!"}