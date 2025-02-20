const express = require("express");
const app = express();
app.use(express.json());
const userData =[
    {username: "alice", age: 25, email: "alice@example.com"},
    {username: "bob", age: 30, email: "bob@example.com"},
    {username: "charlie", age: 28, email: "charlie@example.com"},
];

app.post('/add-user', (req, res) => {
    const {username, age, email} = req.body;
    if(username.length>=10){
        return res.send("Username should conatin less than 11 characters");
    }
    if(!(email.includes("@") && email.includes("."))){
        return res.send("Invalid email format")
    }

    userData.push({
        username:username,
        age:age,
        email:email
    })
    res.status(200).json({ message: "User Added Successfully", data:userData})
})

app.get('/user', (req,res) => {
    const {email} = req.query;
    if(!email){
        return res.status(400).json({ message: "Email is required"})
    }

    const user = userData.find(user => user.email === email);
    if(!user){
        return res.status(404).json({ message: "Email Not Found"})
    }
     res.status(200).json({ message: "User found", user})
})

app.get('/', (req,res) => {
    res.send("<h1>This is the backend<h1 />")
})

app.listen(8080, () => {
    console.log("App is listening at https://localhost:8080");
})