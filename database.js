let sqlite3 = require('sqlite3')

// "Database" method (capital 'D') used to access database.run() , database.all()
// 		can look at node_modules --> sqlite3 ---> to see methods
// use 'new' because its a new database for our project
let database = new sqlite3.Database('./database.db')

// Book table attributes
//    Think about what your attributes are going to be. Pain in the ass to restart db

//  - title  	    TEXT
//  - author 	    TEXT
//  - image  	    TEXT
//  - release_date  TEXT
//  - page_count    INTEGER


//  make a table query for books attributes
const createTableBookQuery = `CREATE TABLE IF NOT EXISTS books (
title TEXT, 
author_id INTEGER, 
image TEXT, 
release_date TEXT, 
page_count INTEGER)`;

// make a table query for authors attribute
const createTableAuthorQuery = `CREATE TABLE IF NOT EXISTS authors (
name TEXT)`;

// make a table query for categories attribute
const createTableCategoriesQuery = `CREATE TABLE IF NOT EXISTS categories (
name TEXT)`;

// make a table query for  attribute
const createTableBooksCategoriesQuery = `CREATE TABLE IF NOT EXISTS books_categories (
book_id INTEGER,
category_id INTEGER)`;

// database.run doens't send anything back to client, just has error in callback
database.run(createTableBookQuery, (err)=>{
	// creating a new instance of an error with the "new Error" syntax
	if(err) console.log(new Error("Create books table failed"))
	else console.log("Create books table succeeded")
});

database.run(createTableAuthorQuery, (err)=>{
	// creating a new instance of an error with the "new Error" syntax
	if(err) console.log(new Error("Create authors table failed"))
	else console.log("Create authors table succeeded")
});

database.run(createTableCategoriesQuery, (err)=>{
	// creating a new instance of an error with the "new Error" syntax
	if(err) console.log(new Error("Create categories table failed"))
	else console.log("Create categories table succeeded")
});

database.run(createTableBooksCategoriesQuery, (err)=>{
	// creating a new instance of an error with the "new Error" syntax
	if(err) console.log(new Error("Create join table failed"))
	else console.log("Create join table succeeded")
});
 
module.exports = database


