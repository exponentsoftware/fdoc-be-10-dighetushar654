const db = require("../models");
const Tag = db.tags;
const User = db.user;
const Todo = db.todo;
const todo_Tag = db.todo_tags;

exports.addTag = async (req, res) => {
    try{
        const {username, password, title, category, todo_id} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        console.log(data.id)
        if(data){
            const tagData = Tag.build({ title: title, category: category, username: username});
            // const comentData = await Coments.create(coment);
            const saveTag = await tagData.save()
            if(saveTag) {
                const todoTagData = todo_Tag.build({todo_id: todo_id, tag_id: saveTag.id});
                console.log(todoTagData)
                await todoTagData.save();
                res.status(200).json(saveTag);
            }
            else
                res.status(404).json(`anable to tag with ${data.id}`)
        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }
    }catch(err){
        res.status(400).json(`user not found with username: ${username} and password: ${password}`);
    }
}


exports.getTodoTag = async (req, res) => {
    try{
            const data = await Todo.findAll({
                attributes:['username', 'todoTitle', 'status'],
                include:[
                    {
                        model: Tag,
                        attributes:['username', 'title', 'category']
                    }
                ]
            })
        res.status(200).json(data);  
    }catch(err){
        res.status(404).json(err);
    }
}