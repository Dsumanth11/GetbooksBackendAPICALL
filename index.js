const express=require("express");
const app=new express();
const path=require("path");
const {open}=require('sqlite');
const sqlite3 =require("sqlite3");
const filepath=path.join(__dirname,"goodreads.db");
let db=null;
const initialize_database_and_server=async()=>{
    try 
    {
        db=await open({
            filename:filepath,
            driver:sqlite3.Database
        });
        app.listen(3000,()=>
        {
            console.log("server set up at port number 3000");
        });
    } 
    catch (e) 
    {
        console.log(`failed to connect database ${e}`);
        process.exit(1);
    }
};
initialize_database_and_server();

app.get('/getBooks',async(request,response)=>{
    const sqlquery=`
    select * from book
    order by book_id;
    `;
    const booksarrayele=await db.all(sqlquery);
    response.send(booksarrayele);
});
app.get("/resume",(request,response)=>{
    response.sendFile(__dirname+"/index.html");
});