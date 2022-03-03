<h1 align="center">
    <img alt="Rentx" src="./rentxLogo.png" />
    <br>
    Rentx Application using NodeJs
</h1>

<h4 align="center">
  A app backend to rental of the cars.
</h4>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/static/v1?label=TypeScript&message=97.8%&color=blue">

   <img alt="GitHub" src="https://img.shields.io/static/v1?label=Licence&message=MIT&color=blue"/>

  <a href="https://www.linkedin.com/in/walleks-r-miranda-b291bb1aa/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=Made%20by&message=Walleks%20M&color=blueviolet">
  </a>

</p>

Start with [Express](https://github.com/expressjs/express), a framework for NodeJS.

## 📌 Project About

Is a application programming interface - API - to cars rental, was develop to fictitious company called Rentx. It's has some feature:

- User registration
- User authentication and token generation
- Car registration and car-related items such as specifications and categories
- Car rental and return
- User password recovery via email.

## 🚀 Technologies

Technologies I used this project.

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [CSV-Parse](https://github.com/adaltas/node-csv)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
- [Multer](https://github.com/expressjs/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible)
- [Swagger](https://swagger.io)
- [AWS SDK](https://github.com/aws/aws-sdk-js)
- [Sentry](https://sentry.io)
- [dotenv](https://github.com/motdotla/dotenv)
- [Postgres](https://www.postgresql.org)
- [Redis](https://redis.io)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Babel](https://babeljs.io)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Get Started

To run this backend application in your machine follow some requirement below:

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Postgres](https://www.postgresql.org)
- [Redis](https://redis.io)

> Obs.: I recommend you use the tool [Docker Compose](https://docs.docker.com/compose/)

**Clone this project and access the folder**

```bash
$ git clone https://github.com/WalleksMR/rentax.git && cd rentax
```

**Follow step to step below**

```bash
# Install the dependencies
$ yarn

# Make a copy of .env.example to .env
# and config your database to run locally
# according to the config the file docker-compose.yml

$ cp .env.example .env

# Now run this command below
$ docker-compose up -d

# When the services are running, you should run this command to create the tables in the database
$ yarn typeorm migration:run

# Run your server
$ yarn dev

# Good Job👏, application is running!
```

## Functional Requirement

In software engineering and system engineering, a functional requirement defines a function of a system or its component, where a function is defcribed as a specification of behavior between inputs and outputs. [FuncionalRequirement](./FuncionalRequirement.md)

## Documentation API

Access the router **http:localhost:3333/api-docs**
