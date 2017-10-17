'use strict'

var db = require('./../models');

exports.createUser = (user,callback)=>{
    db.User.create(user)
        .then((user)=>{callback(this.getUserById(user.id,callback));})
        .catch((error)=>{callback(error);
    });
}

exports.getUserById = (id,callback)=>{
    db.User.findById(id)
        .then((user)=>{
            callback(null,user);
        }).catch((error)=>{
            callback(error);
    });
}

exports.deleteUser = (ids,callback)=>{
    db.User.destroy({
        where:{
            id:ids
        }
    }).then(()=>{
        callback();
    }).catch((error)=>{
        callback(error);
    })
}

exports.getUserList = (callback)=>{
    db.User.findAll().then((users)=>{
        callback(null,users);
    }).catch((error)=>{
        callback(error);
    })
}