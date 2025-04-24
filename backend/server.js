import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';



const app = express();
const port = process.env.PORT || 4311;
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:5173'], // URL frontend
    credentials: true,
};

app.use(cors(corsOptions));


app.use('/api/user', userRouter); 

app.get('/', (req, res) => {
    res.send('API WORKING');
});


app.use((req, res, next) => {
    res.status(404).json({ error: 'API endpoint not found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});


app.listen(port, () => console.log(`Server started on port ${port}`));