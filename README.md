# Covid Resource Search

Covid resource search is the full text desktop based search engine powered by elastic search, build on top of 1000+ data sets collected from different sources this will be the one point solution for searching resource quickly and efficiently

## Features
1. Full text search engine.
2. Download data dump as csv format.
3. Sort or resize grid view.

# Tech stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Angular CLI: 12.0.0
Node: 12.16.3
Package Manager: npm 6.14.4
Angular: 12.0.0

## PostgreSQL

This project is using RDBMS to store and manage data.

## Python script

Python script to refresh index in elastic search for data update [ES Script](https://gist.github.com/Vishmitashetty/3b2a5ef7877f2ea73a4329a476dadaa3)

## Elastic search
1. Multi match query to search term across multiple fields in given document.
2. Fuzzy search: This will handle typo upto 2 term displacement.
3. Ranking: Based on the relevant matches.

## Third part libraries
1. Ag-grid
2. Font awesome

# Deployment
This project is deployed in Heroku [App](https://covidresourcesearch.herokuapp.com/)

# Project Demo

https://user-images.githubusercontent.com/8758234/118628244-0fc91a00-b7ea-11eb-94eb-f5834c3420fd.mov



