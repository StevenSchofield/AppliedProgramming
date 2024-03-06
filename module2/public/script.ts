import { getDatabase, ref, push, set } from "firebase/database";

function hold(){
    const db = getDatabase();

    const postListRef = ref(db, "posts");
    const newPostRef = push(postListRef);
    set(newPostRef, {

    });
};

function whatDoWeGet(){
    const db = getDatabase();

    console.log(db);
};