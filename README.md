# Packing List API

This repo was created to be used with the winter break advent calendar.

## Set Up

* Clone this down
* `cd` into the repository
* `npm install`
* `npm start`

## Endpoints

| Description | URL | Method | Required Properties for Request | Sample Successful Response |
|----------|-----|--------|---------------------|-----------------|
| Get all items |`http://localhost:3001/items`| GET  | none | An array containing all items |
| Add item |`http://localhost:3001/items` | POST  | `{ id: <number>, item: <string>, quantity: <number>, category: <string> }` | "Item #<id number here> has been added!" |
| Delete item| `http://localhost:3001/items{<id number here>}` | DELETE | none | "Item #<id number here> has been deleted"

