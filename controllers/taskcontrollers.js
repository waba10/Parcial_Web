const Task= require('../models/Task');
const Taskcontrollers= {};

Taskcontrollers.store= function(res,req,next){
    var task= new Task({

    });

    task.save(function(err){
        if(err)
            return res.status(400);
        return res.status(200).json({"message": "guardado con exito"});

    })
};

Taskcontrollers.getTareas=function(req,res,next){
    Task.find({},function(err, tareas){
        if(err)
            return res.status(400);
        return res.status(200).json({tareas});

    })
};



