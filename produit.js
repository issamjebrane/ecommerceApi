const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/',(req,res)=>{
    const query = "SELECT * FROM produit"

    db.query(query,(err,result)=>{
        if(err){
            console.error("internal error",err)
            res.sendStatus(404)
        }
        if(result.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result)
    })
})
router.get('/:type',(req,res)=>{
    const type=req.params.type.split(',')
    const placeholders = type.map(() => '?').join(',');

    const query = `SELECT * FROM produit WHERE type IN (${placeholders})`
    db.query(query,type,(err,result)=>{
        if(err){
            console.error("internal error",err)
            res.sendStatus(404)
        }
        if(result.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result)
    })
})
router.get('/id/:id',(req,res)=>{
    const id = req.params.id.split(',')
    const placeholders = id.map(()=>'?').join(',')
    const query = `SELECT * FROM produit WHERE id IN (${placeholders})`
    db.query(query,id,(err,result)=>{
        if(err){
            console.error("internal error",err)
            res.sendStatus(404)
        }
        if(result?.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result)
    })
})
router.get('/trier/:type',(req,res)=>{
    const type = req.params.type
    const query = "SELECT * FROM produit WHERE type=?"
    db.query(query,[type],(error,result)=>{
        if(error){
            console.error("internal error",error)
            res.sendStatus(404)
        }
        if(result.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result[0])
    })
})
router.get('/produit/:id',(req,res)=>{
    const id = req.params.id
    const query = "SELECT * FROM produit WHERE id = ?"

    db.query(query,[id],(err,result)=>{
        if(err){
            console.error("internal error",err)
            res.sendStatus(404)
        }
        if(result.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result[0])
    })
})
router.get('/page/:page',(req,res)=>{
    const page = (req.params.page)*6
    const countQuery = 'SELECT COUNT(*) as total FROM produit';
    db.query(countQuery, (err, countResult) => {
        if (err) {
          console.error('Error executing count query:', err);
          return;
        }
      
        const totalRows = countResult.rows[0].total;
    })
    const query = `SELECT * FROM produit LIMIT ?,6`
    db.query(query,[page],(err,result)=>{
        if(err){
            console.error("internal error",err)
            res.sendStatus(404)
        }
        if(result?.length==0){
            console.error("not data found")
            res.sendStatus(401)
        }
        res.json(result)
    })
})
module.exports =router