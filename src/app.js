import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';


const { jwtMiddleware } = require('./works/auth/token');

const HeroBasic = require('./models/HeroBasic');
const PlanTeam = require('./models/PlanTeam');
const PlayerMmr = require('./models/PlayerMmr');
const Comp = require('./models/Comp');



dotenv.config({ 
  path: './.env' 
});
const app = express();

/*
// still show error, but works in database
app.use( (req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/

/*
// https://velog.io/@sonaky47/XML-HttpRequest%EB%A1%9C-CROS-Domain-Cookie%EA%B0%92-%EC%9D%BD%EC%96%B4%EC%98%A4%EA%B8%B0-4tjnn15emy
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
*/


// https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275
app.use(cors({
  origin: true,
  credentials: true
}));


//app.use(cors());

/*
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
*/

//const corsOptions = {credentials: true, origin: true}
//app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/plan-team', require('./routes/plan-team'));
app.use('/player', require('./routes/player'));
app.use('/comp', require('./routes/comp'));

app.use('/hero-basic', require('./routes/hero-basic'));
app.use('/map', require('./routes/map'));

app.use('/auth-local', require('./routes/auth-local'));

mongoose
.connect(process.env.DB_URL, {
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});



const port = parseInt(process.env.PORT);
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);



/*
useFindAndModify: false
https://mongoosejs.com/docs/deprecations.html#findandmodify
*/


/*
const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'secret-key', { expiresIn: '7d' }, (err, token) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(token);
});
*/