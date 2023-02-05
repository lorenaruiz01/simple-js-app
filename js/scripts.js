// alert('Hello world');//

// INITIAL CODE (EXERCISE 1.1)
// let myName = 'Bob';
// document.write(myName);


// TESTING OUT CODE IN REVERSE
// document.write(myName);
// let myName = 'Bob';

// TESTING OUT TWO COMMANDS WITH VALUE REPLACED*
// let myName = 'Bob';
// document.write(myName);
// myName = 'John Doe';
// document.write(myName);
//  * THIS CODE WILL WRITE 'BobJohn Doe' IN HTML PAGE 


            // SYNTAX - SEMICOLONS
// NOT RECOMMENDED
// let myName = 'Anne'
// alert(myName)

// RECOMMENDED
// let myName = 'Anne';
// alert(myName);


            // SYNTAX - WRITE EACH COMMAND ON A SEPARATE LINE
// NOT RECOMMENDED
// let myName = 'Fred';alert(myName);

// RECOMMENDED
// let myName = 'Fred';
// alert(myName);


// COMMENTS
// There are two types of comments in JavaScript: single-line comments and multi-line comments. You use forward slashes for both. Take a look at some examples below:

javascript
// Note: We didn’t capitalize the title as this fits our style better
let title = 'this is the title';

/* This is a longer comment.
It might explain, in detail, why we made a certain decision.
Or, it could show examples about how to use the following code snippet. */

let title2 = 'Hello!'; // Everything after the slashes is ignored

// *** comments are generally written before the piece of code they reference

let simpleAddition = 2 + 2;
document.write(simpleAddition);

let size = 100;
let doubleSize = size * 2; 
document.write(doubleSize);