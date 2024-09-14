# Quake Log Parser

An API to create reports from quake log files using Node.js.

## Description

A solution build on top of [Nest](https://github.com/nestjs/nest) framework to compile and exposes games data. Using DDD aproach with concepts of SOLID and unit testing.

## Architecture

To setup the project we use 'Nest framework'.

We base on DDD concepts to segregate domain and with clean architecture we create the following folders:

- domain: Contains the core business rules and its makes the interfaces for service and repository.
- repository: The implementation of the contract provided by domain to save and retrieve data.
- service: The implementation of the contract provided by domain to proccess data.
- api: To expose resources using REST principles. Makes use of service interfaces.

Using interfaces to segregate controllers, services, repository layers and domain to be isolated from every other layers.

For unit testing, we will be using Jest, with e2e and unit testing. the Solution has the cover report too.

To read files from line to line, the projetct makes use of the n-readlines lib, its more efficiently than reading the entire file *(1).

## Solution details

First we start by reading the lines for the next game in the log.

We use the 'ClientUserinfoChanged' keyword to find out the line containing the player name, then by separating the initial 'n\' and end with '\t' pattern.

As a similar way the line containing the kills by the pattern 'Kill:' after the next ': ' we have the name of the player who killed and the one killed by the pattern 'killed [X]'

As the lines are being read we set the players array and the kill data for each real player (except 'world')

For the total kill amount its calculated by the sum of every player including world. 

For every kill by world players get kills count decrease by one, if the player kill itself its not counted.


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode | with Hot reload
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

API to demonstrated purpose only.

## Stay in touch

- Author - [Alfredo Carvalho](www.linkedin.com/in/alfredo-carvalho-neto)

## License

[MIT licensed](LICENSE).

## References

*(1) https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/
