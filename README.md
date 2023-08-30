# Movie Management App

This is a simple application that allows you to manage movies in a database.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/jonipievilainen/movie-rest.git
```

2. Navigate to the project directory:
```bash
cd movie-rest
```

3. Install dependencies using Node.js package manager:
```bash
npm install
```

4. Create a .env file in the root directory of the project and add the required environment variables:
```bash
API_URL=http://localhost:3000
API_KEY=
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=movies
DB_DIALECT=postgres
```
5. Start the application:
```bash
npm start
```
6. The application will start at http://localhost:3000

## Local Development Requirements
For local development, make sure you have PostgreSQL installed on your machine. If you haven't installed it yet, you can download it from [here](https://www.postgresql.org/download/).

## Usage
You can use the application through a browser or API tools (e.g., Postman) by sending HTTP requests to http://localhost:3000/movies.

### Endpoints
* GET /movies: Retrieves all movies from the database
* GET /movies/:name: Retrieves a movie based on its name
* POST /movies: Adds a new movie to the database

### Swagger Documentation
The application includes Swagger documentation, accessible at http://localhost:3000/api-docs. You can review and test API endpoints from there.

## Unit Tests
You can run unit tests with the following command:
```bash
mocha test.js
```

## Continuous Integration (CI) Pipeline
A CI pipeline has been set up using GitHub Actions. The pipeline includes unit tests that ensure the reliability of the application's core functionalities. The tests are automatically executed whenever code changes are pushed to the repository.

## Deployment
Once the CI pipeline successfully passes, the application is automatically deployed to Heroku.
