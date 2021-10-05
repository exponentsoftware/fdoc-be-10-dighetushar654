const db = require("../models");
const Coments = db.coments;
const User = db.user;
const Todo = db.todo;

exports.addComment = async (req, res) => {
    try{
        const {username, password, text, todo_id} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        console.log(data.id)
        if(data){
            // const coment = {
            //     posted_by: data.id,
            //     text: text
            // }
            const comentData = Coments.build({ posted_by: data.id, todo_id: todo_id, text: text, username: username});
            // const comentData = await Coments.create(coment);
            const saveComent = await comentData.save()
            res.status(200).json(saveComent);
        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }

    }catch(err){
        res.status(400).json(err);
    }
}


exports.getTodoComment = async (req, res) => {
    try{
            const data = await Todo.findAll({
                attributes:['username', 'todoTitle', 'status'],
                include:[
                    {
                        model: Coments,
                        as:'todo_comments',
                        attributes:['username', 'text']
                    }
                ]
            })
        res.status(200).json(data);  
    }catch(err){
        res.status(404).json(err);
    }
}