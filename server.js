//import require packages
const express = require ('express')
const mongoose = require ('mongoose')
const app = express()
const Article = require('./models/article')
const methodOverride = require('method-override')
app.set('view engine', 'ejs')

// database connection
mongoose.connect('mongodb://localhost/blog', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true })
mongoose.connection.on( "connected", () => {
	console.log( "DB Connected" );
} );

// import routes
const articlesRouter = require('./routes/articles')
// middlewares
app.use(express.urlencoded({ extended : false }))
app.use(methodOverride('_method'))
// use routes middlewares
app.use('/articles', articlesRouter)



app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index', {articles : articles})
})

// server listen
const port = 8000
app.listen(port, (req, res) =>{
    console.log(`this server is running on port ${port}`)
})