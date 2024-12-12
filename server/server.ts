import express from 'express';
import cors from 'cors'
import 'dotenv/config'
// App Config
const app = express();
const port = process.env.PORT || 9000;
// Middlewares
app.use(express.json())
app.use(cors())
// API endpoints
app.get('/',(req,res)=>{
  res.send("Api Working")
})
app.listen(port, () => console.log('Server started on PORT : '+ port));