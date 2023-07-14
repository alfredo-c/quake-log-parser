
# Quake Log Parser

## Description

Quake log parser using [Nest](https://github.com/nestjs/nest) framework to compile and exposes games data

## Solution details

First we start by reading the lines for the next game in the log.

We use the 'ClientUserinfoChanged' keyword to find out the line containing the player name, then by separating the initial 'n\' and end with '\t' pattern.

As a similar way the line containing the kills by the pattern 'Kill:' after the next ': ' we have the name of the player who killed and the one killed by the pattern 'killed [X]'

As the lines are being read we set the players array and the kill data for each real player (except 'world')

The total kill amount is the sum of every player including world. For every kill by world players get kills count decrease by one.

## Solution architecture

To setup the project we use 'Nest framework'.
Using clean architecture we create the following folders:

- api for the controllers,
- services for utilities like reading a file
- domain, tha has domain classes for the core business

Using interfaces to segregate services layers and domain to be isolated from every other layers.

For unit testing, we will be using Jest, but its good to know that Nest provides agnostic tools for this.

We use the n-readlines lib for read files from line to line, its more efficiently than reading the entire file.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
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

Feel free to contact me

## Stay in touch

- Author - [Alfredo Carvalho](https://www.linkedin.com/in/alfredo-de-carvalho-neto-0b671721/)

## License

[MIT licensed](LICENSE).
