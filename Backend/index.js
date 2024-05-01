
const express = require('express');
const app = new express();
app.use(express.json());
require('dotenv').config()
require('./config/connection');
const PORT = process.env.PORT || 3001;

// Imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/property');
const pageRoutes = require('./routes/page');
const cors = require('cors');
const path = require('path');
const { engine } = require('express-handlebars');

// Static paths and handlebars
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');
app.use(express.static(path.join(__dirname,'website')))

// Swagger integration
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())

//routes
app.use('/user',userRoutes);
app.use('/property',propertyRoutes);
app.use('/page',pageRoutes)

// 404
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'website/index.html'))
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});