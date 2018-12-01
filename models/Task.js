const mongoose= require('mongoose');
const {Schema}= mongoose;

const taskSchema= new Schema({
    nombre:{type: String, required:true},
    familia:{type:String, required:true},
    descubrimiento:{type:String, required:true}
});

module.exports= mongoose.model('tareas', taskSchema);