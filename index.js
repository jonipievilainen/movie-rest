require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Movie = require('./models/Movie'); // Lisää tämä
const fs = require('fs');


const app = express();
const PORT = process.env.API_PORT || 3000;
const Sequelize = require('sequelize');

// Swagger-konfiguraatio
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'API for managing movies'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
  },
  apis: [__filename] // Käytämme tämän tiedoston reittejä Swagger-dokumentaatiossa
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());

// Reitit
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of all movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of movies
 */
app.get('/movies', async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

/**
 * @swagger
 * /movies/{name}:
 *   get:
 *     summary: Get a movie by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the movie
 *     responses:
 *       200:
 *         description: Successful response with a movie
 *       404:
 *         description: Movie not found
 */
app.get('/movies/:name', async (req, res) => {
  const movieName = req.params.name;
  const movie = await Movie.findOne({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${movieName}%`
      }
    }
  });
  
  res.json(movie);
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Create a new movie.
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Movie'
 *     responses:
 *       200:
 *         description: Successful response with the added movie
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Movie already exists
 *       500:
 *         description: Adding movie to database failed
 * definitions:
 *   Movie:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         example: "Avengers Endgame"
 *       year:
 *         type: integer
 *         example: 2023 
 *       genres:
 *         type: array
 *         items:
 *           type: string
 *         example:
 *           - "Action"
 *           - "Adventure"
 *       ageLimit:
 *         type: integer
 *         example: 12
 *       rating:
 *         type: integer
 *         example: 4
 *       actors:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Actor'
 *       director:
 *         $ref: '#/definitions/Director'
 *       synopsis:
 *         type: string
 *         example: "Avengers Endgame synopsis"
 *   Actor:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *     example:
 *       firstName: "Jussi"
 *       lastName: "Vatanen"
 *   Director:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *     example:
 *       firstName: "Aki"
 *       lastName: "Kaurismaki"
 */

app.post('/movies', async (req, res) => {
  const movie = req.body;
  
  try {
    const movieExists = await Movie.findOne({
      where: {
        name: movie.name
      }
    });

    if (movieExists) {
      return res.status(409).json({
        error: 'Movie already exists'
      });
    }

    const addedMovie = await Movie.create(movie);
    return res.json(addedMovie);
  } catch (error) {
    return res.status(500).json({
      error: 'Adding movie to database failed'
    });
  }
});



// ... Muita reittejä ...

// Swagger UI reitti
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

