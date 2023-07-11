## Description

Quake log parser using [Nest](https://github.com/nestjs/nest) framework TypeScript repository.

## Solution details

With the nest framework the initial setup is basically running de create project cmd.
Then structure some clean arquicteture for controller, services e entities domais.
Having Jest for unit testing

Using the native node.js for read files, first we start by reading the lines for the next game in the log.
We use the 'ClientUserinfoChanged' keyword to find out the line containing the player name, then by separating the initial 'n\' and end with '\t' pattern.
As a similar way the line containing the kills by the pattern 'Kill:' after the next ': ' has then name of the player who killed and then who killed with 'killed [X]'
After this mounts array for each real player (excetp 'world') and count every kill to setup the final resulting json.



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
