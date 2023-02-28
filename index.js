const express = require('express');
const cors = require('cors')
const app = express();

const PORT = 3000;

//DATABASE
const db = require('./sequilize')

const bodyParser = require("body-parser");
//VALIDATION
const { celebrate, errors, Segments } = require('celebrate');
const cokieparser = require('cookie-parser');

//ROUTES
const authRoutes = require('./routes/authRoutes')
const gymRoutes = require('./routes/gymRouters')
const sessionRoutes = require('./routes/sessionRoutes')
const trainerRoutes = require('./routes/trainerRoutes')






//middleware
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json());
app.use(authRoutes);
app.use(gymRoutes)
app.use(sessionRoutes)
app.use(trainerRoutes)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(errors());
app.use(cokieparser());











db.sequelize.sync({alter:true}).then(console.log('DB is synced'));





app.listen(PORT, () => {        
    console.log(`listening on PORT ${PORT}`)
          
    })