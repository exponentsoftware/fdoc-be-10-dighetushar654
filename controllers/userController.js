const { user, todo } = require("../models");
const db = require("../models");
const User = db.user;
const Todo = db.todo;
const Premium = db.premium;
const Coments = db.coments;
const Tag = db.tags;
const Op = db.Sequelize.Op;
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dighetushar654@gmail.com',
      pass: process.env.password
    }
  });

  var mailOptions = {
    from: 'dighetushar654@gmail.com',
    to: 'dighetushar654@gmail.com',
    subject: 'Todo Premium Account',
    text: 'Your Payment Is Successfull!'
  };


// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
        message: "Content can not be empty!"
        });

        return;
    }

    // Create a user
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        userRole: req.body.userRole,
        accountType:req.body.accountType
    };


  // Save Todo in the database
    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
        });
    });
  
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
  
    User.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};



 // Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {where: { id: id }}).then(num => {
        if (num == 1) {
            res.send({message: "user was updated successfully."});
        } else {
            res.send({message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`});
        }
    }).catch(err => {
        res.status(500).send({message: "Error updating user with id=" + id});
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({ where: { id: id }}).then(num => {
        if (num == 1) {
            res.send({message: "user was deleted successfully!"});
        } else {
            res.send({message: `Cannot delete user with id=${id}. Maybe user was not found!`});
        }
    }).catch(err => {
        res.status(500).send({message: "Could not delete user with id=" + id});
    });
};

// Find a single user with an id:

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: "Error retrieving user with id=" + id});
    });
};


exports.getTodos = async (req, res) => {
    try{
        const {username, password} = req.body;
        const data = await User.findOne({where : {username:username, password:password}});
        if(data){
            const todos = await User.findAll({
                attributes:['username', 'email', 'phone'],
                include:[
                    {
                        model: Todo,
                        as:'todoDetails',
                        attributes:['todoTitle', 'status']
                    }
                ],
                where:{id:data.id}
            })
            res.status(200).json(todos);

        }else{
            res.status(404).json(`user not found with username: ${username} and password: ${password}`)
        }

    } catch(err){
        res.status(404).json(err);
    }
}

exports.getAllInfo = async (req, res) => {
    try{
            const {username, password} = req.body;
            const data = await User.findOne({where : {username:username, password:password}});
            if(data.userRole == 'Admin'){
                const todos = await User.findAll({
                    attributes:['username', 'email', 'phone'],
                    include:[
                        {
                            model: Todo,
                            as:'todoDetails',
                            attributes:['todoTitle', 'status'],
                            include:[
                                {
                                    model: Coments,
                                    as:'todo_comments',
                                    attributes:['username', 'text'],
                                },
                                {
                                    model:Tag,
                                    attributes:['username', 'title', 'category'] 
                                }        
                            ]
                        }
                    ]
                    // where:{id:data.id}
                })
                res.status(200).json(todos);
    
            }else{
                res.status(404).json(`only Admin can access this API`)
            }
    }catch(err){
        res.status(500).json(err);
    }
}



exports.buyPremium = (req, res) => {
    const {user_id, amount, premiumType} = req.body;
    const premiumUser = {
        user_id: user_id,
        amount: amount,
        premiumType: premiumType
    };

    Premium.create(premiumUser).then(data => {
        // res.send(data);
        User.update(
            {accountType:premiumType},
            {where: {id: user_id}}
        );
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.status(200).json(`Account Updated With User Id ${user_id}`);
    }).catch(err => {
        res.status(500).send({message: "Error"});
    });
};

exports.allTransactions = async (req, res) => {
 try {
    const {username, password} = req.body;
    const data = await User.findOne({where : {username:username, password:password}});
    if(data.userRole == 'Admin'){
        const transc = await Premium.findAll();
        res.status(200).json(transc);
    } else {
        res.status(400).json("UnAuthorized User");
    }   
 } catch(err) {
     res.status(500).json(err);
 }
}