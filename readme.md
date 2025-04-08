Pleaase do the following after you clone the project:  
(Not sure what is still there after I delete node_modules, but if you  
go through all the lines it should be ok)  
(yes the mongoose & dotenv are redundant, I did all 3 and all 3 added files)

at root (Default)  
npm init -y  
npm install express  
npm install mongoose  
npm install dotenv  
npm install mongoose dotenv  
to run:  
node server/app.js  ||   npm start  

2030-project  
===============  
1. Implement the following web GUI design patterns using Bootstrap  
classes: (12 marks)  
(a) Navigation Bar (2 marks)  
(b) Grid Layout (2 marks)  
(c) Responsive Design (2 marks)  
(d) Card (2 marks)  
**(e)** Slider (2 marks)  
**(f)** Modal Window (2 marks)  
**2.** Implement the following programming design patterns: (48 marks)  
(a) The module design patter (4 marks)  
    break js into small files n import/export  
(b) The singleton design patter (4 marks)  
    only 1 instance of a class/obj created n shared  
(c) The factory method design pattern to generate the mapper objects of your  
data (10 marks)
    func generate obj based on input  
(d) The Model-View-Controller (MVC) design pattern to develop your full-stack website using the (see figure 1 on page 4) (30 marks)  
    (i) Appropriate modules in models directory (10 marks)  
    (ii) Appropriate modules in views directory (10 marks)  
    (iii) Appropriate modules in controllers directory (10 marks)  

to hide certain sections, so that multiple 'pages' are 1 page  
document.querySelector('#post').style.display = 'none'  

validation for text field length  
<textarea maxlength="280" minlength="50">  

for actions  
<form class="row " action="addPost" method="post">  
and then in abcController.js
memberController.post('/addPost',  async (req, res, next) => {  

mongodb  
// this is for remote conection, bc code is setup for local conection by default, user/pwd does not matter right now  
(() => {  
    const config = {}  
    config.SERVER = process.env.PORT || 8080;  
    config.USERNAME = 'ying'  
    config.PASSWORD = 'mongodb'  
    config.DATABASE = 'web'  
    module.exports = config  
})()  
DATABASE name == name of database in compass whne u add new database  


models/util.js  
    const getMongoClient = (local = false) => {  
true/false == default if local or remote connection  