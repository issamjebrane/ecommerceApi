require("dotenv").config()
const produitRouter = require('./produit')
const userRouter = require('./user')
const express  = require('express')
const bodyParser = require('body-parser');
const cors  = require("cors")
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/produits',produitRouter)
app.use('/users',userRouter)


// function authentificateToken(req,res,next){
//         const authHeader = req.headers['authorization']
//         const token  = authHeader && authHeader.split(' ')[1]

//         if(token == null) return res.sendStatus(401)
        
//         jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//             if(err) return res.sendStatus(403)
//             req.user = user
//             next()
//         })
// }






  
app.listen(3000,()=>{
    console.log("listening on port: 30000")
})