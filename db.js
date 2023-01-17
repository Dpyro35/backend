const mongoose=require('mongoose');
const uri='mongodb+srv://24Monggo:Datamine3@mycluster.nn7xxfr.mongodb.net/?retryWrites=true&w=majority';
const connecttomongo=()=>
{
    mongoose.connect(uri).then((data)=>{
        console.log('Connected to databse successfully '+ data.Connection.name)
    }).catch((err)=>{
        console.log(err);
    })
};
module.exports=connecttomongo;
