# Binary Web Services

Amazon Web Services wrapper

## Table of contents

[1. Introduction](#1-Introduction)

&nbsp;&nbsp;[1.1 Useful Links](#11-useful-links)

[2. Domain](#2-Domain)

[3. Database Schema](#2-Database-Schema)

[4. Architecture](#4-Architecture)

[5. List of Technologies](#5-List-of-Technologies)

[6. How to Run](#6-How-to-Run)

## 1. Introduction

### 1.1 Useful Links

- Pay attention, that we have certain [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md), which we should follow during application development.

## 2. Domain

TODO: explain domain

## 3. Database Schema

Database schema is available [here](https://dbdiagram.io/d/61dc0204f8370f0a2eebc133). It uses a couple of conventions:
1. Data is splitted into several [schemas](https://www.postgresql.org/docs/9.1/ddl-schemas.html). Tables are named as follows: `{schema}___{table}`. In postgres it should be converted into `{schema}.{table}` (this modelling tool does not support dots in table names).

## 4. Architecture

TODO: explain architecture decisions

## 5. List of Technologies

TODO: write list of used technologies

## 6. How to Run

TODO: explain how to run app locally
