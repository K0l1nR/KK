  <p align="center">Kids key repository</p>

## Description

Kidskey EMS v0.0.1
To run the app you need to:

0. Install NodeJS (at least v18.0.0)
1. Clone repository;
2. Install docker & docker-compose (at least v24.0.0 for docker & v1.29.0 for docker-compose);
3. Install node_modules dependencies via yarn (yarn version at least v1.22.19);
4. Create docker-containers with .env & docker-compose.yaml;
4.1. Double check that uuid-extension was created (script in docker-compose.yaml should`ve created it but anyway);
5. Run app with yarn start:dev, double check connection to the docker-container;
6. Enjoy!;

## Installation

```bash
$ sudo docker compose up
```

```bash
$ yarn install
```

## Running the app

```bash
# backend
$ yarn run start:dev

# frontend
$ quasar dev

