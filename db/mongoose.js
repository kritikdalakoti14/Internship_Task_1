const mongoose=require('mongoose')

mongoose.connect('***********',  // your mongodb url     process.env.MongodbUrl
{useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true })
