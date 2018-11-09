# Password Generator

[![CircleCI](https://circleci.com/gh/tes-inc/password-generator.svg?style=svg&circle-token=4eb991edfbe8f83f8776c66f19bdbdc1a1d208c3)](https://circleci.com/gh/tes-inc/password-generator)

パスワード自動生成サイトです。

[Nuxt.js](https://nuxtjs.org/) と [Vuetify](https://vuetifyjs.com/) によって作られています。

## Required

- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### Versions

```bash
$ docker -v
Docker version 18.06.1-ce, build e68fc7a
```

```bash
$ docker-compose -v
docker-compose version 1.22.0, build f46880f
```

## Build Setup

```bash
# install dependencies
$ docker-compose build

# serve with hot reload at localhost:3000
$ docker-compose up

# generate static project
$ docker-compose run --rm nuxt yarn run generate
```
