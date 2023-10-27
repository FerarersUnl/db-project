# CUCEITS

Basic CRUD application for Database Systems course.

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)

## Installation

There are 2 major steps for installing and running the application

### Build the container

Execute the following commands to build, run and log the container:

```bash
# For building the postgres container
docker build -t my-postgres .

# For running the postgres container
docker run -d --name my-postgres-container -p 5432:5432 my-postgres

# For displaying the logs of the postgres container
docker exec -it my-postgres-container bash

# For connecting to the postgres container
psql -U admin -d app

# For displaying all tables
\dt
```

### Install the dependencies

Run the following command to install the dependencies:

```npm install```

And then run the following command to start the application:

```npm run dev```