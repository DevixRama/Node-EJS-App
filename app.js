const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Serve static files correctly
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
  fs.readdir(`./files`, (err, files)=>{
    res.render("index" ,{ files:files});
  })
});


app.get('/file/:name', (req, res) => {
 fs.readFile(`./files/${req.params.name}`,"utf-8",(err,data)=>{
  res.render("show",{name : req.params.name , data : data})
 })
});


app.get("/delete/:name" , (req,res)=>{
  fs.unlink(`./files/${req.params.name}`,(err)=>{
    res.redirect("/")
  })
})


app.get("/edit/:name" , (req,res)=>{
  res.render("edit" , {name : req.params.name})
})


app.post("/edit" , (req,res)=>{
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    res.redirect("/")
  })
})


app.post("/create" , (req,res)=>{
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.detail,()=>{
    res.redirect("/")
  })
})


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
