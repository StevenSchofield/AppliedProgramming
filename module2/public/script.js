//"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("firebase/database");
function hold() {
    var db = (0, database_1.getDatabase)();
    var postListRef = (0, database_1.ref)(db, "posts");
    var newPostRef = (0, database_1.push)(postListRef);
    (0, database_1.set)(newPostRef, {});
}
;
function whatDoWeGet() {
    var db = (0, database_1.getDatabase)();
    console.log(db);
}
;
