# YOUMATTER API DOCUMENTATION

## Table of Contents
1. [Getting Started](#1-getting-started)
    1. [Prerequisites](#11-prerequisites)
    2. [Installation](#12-installation)
    3. [Configuration](#13-configuration)
2. [Testing](#2-testing)
    1. [Unit Tests](#21-unit-tests)
3. [Usage](#3-usage)
4. [LICENSE](#licence)


### 1. Getting Started
#### 1.1 Prerequisites
- [Node.js](https://nodejs.org) 18 or higher
- [Postgresql](https://www.postgresql.org/) 12.8 or higher
#### 1.2 Installation
- Step-by-step guide on how to set up the project locally.
```bash
git clone https://github.com/YouMetter/backend-api youmatter-backend

cd youmatter-backend

npm install

```

#### 1.3 Configuration
Before running the API, you need to set up the environment variables. Create a .env file based on the provided .env.example file. You can do this by running the following command:

```bash
cp .env.example .env
```

Instructions on how to configure environment variables and other settings.

```bash
# .env file
DATABASE_URL=postgres://user:password@localhost:5432/database
PORT=3000 #port application running

# DATABASE
DB_HOST=
DB_PORT= 5432 # default post postgres
DB_PASSWORD=
DB_DATABASE=
DB_USER=

JWT_SECRET= #random value
BCRYPT_SALT=8 #development value bcrypt salt
```

### 2. Testing
#### 2.1 Unit Tests
Instructions on running unit tests.

```bash 
npm run test
``` 

### 6. Usage

To start the API, run the following command in the terminal:

```bash

npm run dev #run as usual

```

The API server will start, and you can access the endpoints at http://localhost:3000 (assuming the default port is used).

### LICENCE
MIT Lincense