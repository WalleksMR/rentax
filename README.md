<h1 align="center">
    <img alt="Rentx" src="./rentxLogo.png" />
    <br>
    Rentx Application Starter with Express and Postgres
</h1>

<h4 align="center">
  A app backend to rental of the cars.
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/badge/TypeScript-99.7%25-blue">
  </a>
</p>

Start with [Express](https://github.com/expressjs/express), a framework for NodeJS.

## Installation

We use **yarn** by default, but if you want, you can use **npm**, just make sure to delete `yarn.lock`, then run `npm install`, and you will need of the Docker installed in your machine.

```bash
$ yarn install

# if changing to npm
$ npm install
```

## Running the app

### Configuration

Make sure to setup your .env file. See [env.example](.env.example), and config the file `docker-compose.yml`
inside [docker-compose.yml](./docker-compose.yml), configuration just the `environment` of image `postgres`.

Now just run `docker-compose up` to create the images and containers.

### Database migration

You need to run migrations, there you can see an example. After config, just run `yarn run typeorm:run`, and the [existing migrations](src/shared/infra/typeorm/migrations) will be executed.

## Development

Make changes to the code in watch mode, and see them take effect right away. Any changes you make to database entities, either are they adding, changing, removing fields, relations or other entities, you're able to automatically create the migrations using `yarn run typeorm:migrate <MigrationName>` script.

**Example**:

```bash
$ yarn run typeorm:migrate CreatePostsTable
```

## Functional Requirement

In software engineering and system engineering, a functional requirement defines a function of a system or its component, where a function is defcribed as a specification of behavior between inputs and outputs. [FuncionalRequirement](./FuncionalRequirement.md)

# Packages we <3

- [express](https://github.com/expressjs/express)
- [typeorm](https://github.com/typeorm/typeorm)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [csv-parse](https://github.com/adaltas/node-csv)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [multer](https://github.com/expressjs/multer)
- [dotenv](https://github.com/motdotla/dotenv)
- [tsyringe](https://github.com/Microsoft/tsyringe)
- [typescript](https://github.com/microsoft/TypeScript)
