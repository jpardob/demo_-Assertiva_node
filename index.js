const express = require('express')
const app = express()
const port = 8000;
let plurales = (...words)=>{
    words=words.flat()
    let rules=[
        {r:0,regex:/(a|e|i|o|u)$/i,mod:(e)=>e+"s"},
        {r:1,regex:/(s|x)$/i,mod:(e)=>e},
        {r:2,regex:/z$/i,mod:(e)=>e.replace(/z$/i,"ces")},
        {r:3,regex:/([^a,e,i,o,u,s,x,z]$)/i,mod:(e)=>e+"es"}
    ]
    let result = words.map(w=>{
        let rm=rules.filter(r=>(w && typeof w == "string")?w.match(r.regex):"")
        return (rm && rm.length>0)?{nw:rm[0].mod(w).toLowerCase(),rn:rm[0].r}:false
    })
    return {
        words:result.map(r=>r.nw),
        rules:[...Array(4)].map((e,i)=>result.filter(r=>r.rn==i).length)
    }
    
}

app.use(express.json());
// respond with "hello world" when a GET request is made to the homepage
app.post('/plural', (req, res) => {
    console.log(req.body)
  res.json(plurales(req.body))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })