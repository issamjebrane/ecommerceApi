const express = require('express')
const router = express.Router()
const db = require('./db')
const jwt = require("jsonwebtoken")

router.get('/', async (req, res) => {
    try {
      const users = await query('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/login',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      const payload = { userId:  results[0].id};

      const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET)
      // Authentication successful, handle the login logic
      res.json({accessToken: accessToken,result:results[0]});
    });
})

router.post('/register',(req,res)=>{
    const sql = `INSERT INTO users ( nom, prenom, numTel, email, password)
             VALUES (?, ?, ?, ?, ?)`;
    const {nom, prenom, numTel, email, password}=req.body    
    db.query(sql,[ nom, prenom, numTel, email, password],(error, results) => {
        if (error) {
          console.error('Error inserting data into MySQL:', error);
          res.status(500).json({ error: error});
          return;
        }
        const query = 'SELECT * FROM users WHERE id = ?';

        db.query(query,[results.insertId],(erro,results)=>{

            // const payload  = {userId:results[0].id}
            // const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json(results[0]);
        })
      });
})


router.get('/user', async(req, res) => {
    const email = req.body.email;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query,[email],(error,results)=>{
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
      
          if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
          }
      
          // Authentication successful, handle the login logic
          res.json(results);
    })
  });

module.exports =router