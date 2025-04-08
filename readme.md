2030-project  
===============  
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
npm install bcryptjs jsonwebtoken  (if not intalling, try doing it separately like mongoose and dotenv above)  

 
to run:  
npm start || node server/app.js   


2 ready made accounts in collection
user: member1
pwd: member1
type: member

user: admin1
pwd: admin1
type: admin


bcryptjs for pwd hasdhes
jsonwebtoken for tokens