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

Taskcontrollers.delete= function(req,res,next){
    let {id}=req.params;

    Task.deleteOne({_id:id}, function(err){
        if(err)
            return res.status(400);
        return res.status(200).json({"message": "eliminado con exito"});

    })
};

Taskcontrollers.buscar=function(req,res,next){
    let {id}=req.params;

    Task.findById(id, function(err,tarea){
        if(err)
            return res.status(400);
        return res.status(200).json(tarea);

    })
};

Taskcontrollers.update= async function(req,res,next){
    let {id}=req.params;
    await Task.update({_id:id}, req.body);
    return res.status(200).json({tareas});
}

module.exports=Taskcontrollers;