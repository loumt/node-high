'use strict'

var db = require('./../models');
var async = require('async');

exports.createDocSafe = (doc,callback)=>{
    db.Doc.findCreateFind({
        where:{
            title:doc.title
        },
        defaults:doc
    }).then((doc)=>{
        callback(null,doc);
    }).catch((error)=>{
        callback(error);
    });
}

exports.createDoc = (doc,callback)=>{
    db.Doc.create(doc)
        .then((doc)=>{
            this.getDocById(doc.id,callback)
        })
        .catch((error)=>{callback(error);
        });
}

exports.getDocByTitle = (title,callback)=>{
    db.Doc.findOne({
        where:{
            title:title
        }
    }).then(
        (doc)=>{
           callback(null,doc)
        }
    ).catch((error)=>{
        callback(error);
    });
}

exports.getDocById = (id,callback)=>{
    db.Doc.findById(id)
        .then((doc)=>{
            callback(null,doc);
        }).catch((error)=>{
            callback(error);
    });
}

exports.deleteDoc = (ids,callback)=>{
    db.Doc.destroy({
        where:{
            id:ids
        }
    }).then(()=>{
        callback();
    }).catch((error)=>{
        callback(error);
    })
}

exports.getDocList = (callback)=>{
    db.Doc.findAll().then((docs)=>{
        callback(null,docs);
    }).catch((error)=>{
        callback(error);
    })
}


exports.createDocs = (docs,callback)=>{
    db.Doc.bulkCreate(docs).then(()=>{
        callback(null,"Ok");
    }).catch((error)=>{
        callback(error);
    })
}