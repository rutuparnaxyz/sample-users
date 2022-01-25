const express = require('express')
require('./db/mongoose.js')
const router = require('./router.js');
const PORT = 3000
const app = express()

app.use(express.json())
app.use(router)

app.get('/', (req, res)=>{
    res.status(200).send(`Server is up and running on ${PORT}!!!`)
})

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}!!!`)
})