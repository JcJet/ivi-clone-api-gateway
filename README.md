## Description

API Gateway for Ivi clone project.\
Access PORT: 3111.

## Progress list
1. Movies microservice
   - [x] GET all movies or filter
   - [x] POST movie
   - [x] DELETE movie
   - [x] PUT movie
   - [x] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

2. Genres microservice
   - [x] GET all genres or filter
   - [x] POST genre
   - [x] DELETE genre
   - [x] PUT genre
   - [x] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

3. Swagger API
   - [x] Register Swagger in main.ts 
   - [ ] Add Movies module (entities, API, DTOs) 
   - [ ] Add Genre module (entities, API, DTOs)
   - [ ] Add User module (entities, API, DTOs)
   - [ ] Add Profile module (entities, API, DTOs)

4. Errors handler
   - [ ] ???

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```