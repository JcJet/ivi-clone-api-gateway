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
   - [x] POST (register) user & profile
   - [x] Login user (get both tokens)
   - [x] GET all profiles (???)
   - [x] GET profile by ID
   - [x] DELETE profile & user
   - [x] PUT profile
   - [x] Update access token (???)
   - [x] Logout
   - [x] Activate profile via email
   - [x] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

5. ~~Authorization microservice~~ (All endpoints moved to profile module)

6. Files microservice
   - [ ] POST file
   - [ ] DELETE file
   - [ ] DELETE many files (???)
   - [ ] GET file (???)
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

7. Comments microservice
   - [x] POST comment
   - [x] PUT comment (???)
   - [ ] GET comments (???)
   - [x] DELETE comment
   - [ ] Add transport
   - [ ] Add tests
   - [ ] Add roles guards

8. Swagger API
   - [x] Register Swagger in main.ts 
   - [x] Add Movies module (entities, API, DTOs) 
   - [x] Add Comment module (entities, API, DTOs)
   - [x] Add Genres module (entities, API, DTOs)
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