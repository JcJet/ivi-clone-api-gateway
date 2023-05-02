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

3. Persons microservice
   - [x] GET all persons or filter
   - [x] POST person
   - [x] DELETE person
   - [x] PUT person
   - [x] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

4. Profile microservice
   - [ ] GET all profiles
   - [ ] DELETE profile & user
   - [ ] PUT profile
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

5. Authorization microservice
   - [ ] POST (register) user & profile
   - [ ] Login user (get both tokens)
   - [ ] Update access token
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

6. Files microservice
   - [ ] POST file
   - [ ] DELETE file
   - [ ] DELETE many files (???)
   - [ ] GET file (???)
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

7. Comments microservice
   - [ ] POST comment
   - [ ] PUT comment
   - [ ] GET comments (???)
   - [ ] DELETE comment
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

8. Swagger API
   - [x] Register Swagger in main.ts 
   - [ ] Add Movies module (entities, API, DTOs) 
   - [ ] Add Genre module (entities, API, DTOs)
   - [ ] Add User module (entities, API, DTOs)
   - [ ] Add Profile module (entities, API, DTOs)

9. Errors handler
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