# Binary Web Services

Amazon Web Services wrapper

## Table of contents

[1. Introduction](#1-Introduction)

&nbsp;&nbsp;[1.1 Useful Links](#11-useful-links)

[2. Domain](#2-Domain)

[3. Database Schema](#3-Database-Schema)

[4. Architecture](#3-Architecture)

&nbsp;&nbsp;[4.1 Global](#41-Global)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1.1 Technologies](#411-Technologies)

&nbsp;&nbsp;[4.2 Frontend](#42-Frontend)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.1 Technologies](#421-Technologies)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2.2 Folder Structure](#422-Folder-Structure)

&nbsp;&nbsp;[4.3 Backend](#43-Backend)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.1 Technologies](#431-Technologies)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3.2 Folder Structure](#432-Folder-Structure)

&nbsp;&nbsp;[4.4 Shared Package](#44-Shared-Package)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.1 Reason](#431-Reason)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4.2 Technologies](#442-Technologies)

[5. How to Run](#5-How-to-Run)

&nbsp;&nbsp;[5.1 Manually](#51-Manually)

&nbsp;&nbsp;[5.2 In Docker](#52-In-Docker)

[6. Deployment](#6-Deployment)

## 1. Introduction

### 1.1 Useful Links

- Pay attention, that we have certain [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md), which we should follow during application development.

- [Development deployment](https://development.bws-cloud.com/)

## 2. Domain

TODO: explain domain

## 3. Database Schema

Database schema is available [here](https://dbdiagram.io/d/61dc0204f8370f0a2eebc133). There is a couple of conventions:

1. Data is divided into several [schemas](https://www.postgresql.org/docs/9.1/ddl-schemas.html). Tables are named as follows: `{schema}___{table}`. In postgres it should be converted into `{schema}.{table}`.

## 4. Architecture

### 4.1 Global

#### 4.1.1 Technologies

1. [Typescript](https://www.typescriptlang.org/)

### 4.2 Frontend

#### 4.2.1 Technologies

1. [React](https://reactjs.org/) as a frontend library
2. [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) as a state manager

#### 4.2.2 Folder Structure

1. Assets - static assets (images, global styles)
2. Common - common/shared files (types, enums)
3. Components - plain react components
4. Exceptions
5. Helpers
6. Services - api accessing services
7. Store - redux store with all features as sub folders
8. Validation-schemas - schemas that used for forms validation

### 4.3 Backend

#### 4.3.1 Technologies

1. [Fastify](https://www.fastify.io/) as a backend framework
2. [Knex](https://knexjs.org/) as a query builder
3. [Objection](https://vincit.github.io/objection.js/) as an ORM

#### 4.3.2 Folder Structure

1. Api - rest endpoints. **There should be no domain logic**
2. Common - common/shared files (types, enums)
3. Data - everything related to data access (migrations, models, repositories)
4. Exceptions
5. Helpers
6. Services - domain logic
7. Validation-schemas - schemas that used for input data validation

### 4.4 Shared Package

#### 4.4.1 Reason

As we are already using js on both frontend and backend it would be useful to share some contracts and code between them.

#### 4.4.2 Technologies

1. [Joi](https://github.com/sideway/joi) as a schema validator

## 5. How to Run

### 5.1 Manually (with hot reload)

1. Create and fill all .env files. These files are:

- .env/frontend.env
- .env/backend.env
- .env/postgres.env

You should use .env.example folder as a reference.

2. Install dependencies (node_modules). Run `npm run install:all` in the root folder.

3. Install pre-commit hooks: `npx simple-git-hooks` in the root folder. This hook is used to verify code style on commit.

4. Run database. You can either run it in docker using command `cd ./docker/bws && docker-compose -f docker-compose.services.yml up --build` or by installing postgres on your computer. Docker variant is preferred.

5. Apply migrations and seeds: `cd backend && npm run migrate:dev`

6. Run backend: `cd backend && npm run start:dev`

7. Run frontend: `cd frontend && npm run start`

### 5.2 In Docker (without hot reload)

1. Create and fill all .env files. These files are:

- .env/frontend.env
- .env/backend.env
- .env/postgres.env

You should use .env.example folder as a reference.

2. Run docker: `cd .docker/bws && docker-compose -f docker-compose.yml up --build`

## 6. Deployment

All code is hosted in docker containers on AWS. CI/CD implemented using Github Actions
