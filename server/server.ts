import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb'
import connectCloudinary from './config/cloudinary'
import userRouter from './routes/userRoutes'
import newsletterRoutes from './routes/newsletterRoutes';
// App Config
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()
// Middlewares
app.use(express.json())
app.use(cors())
// API endpoints
app.use('/api/user', userRouter)
app.use('/api/newsletter', newsletterRoutes)
app.get('/',(req,res)=>{
  res.send("Api Working")
})
app.listen(port, () => console.log('Server started on PORT : '+ port));