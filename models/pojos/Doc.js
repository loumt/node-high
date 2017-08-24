/**
 * Created by loumt on 2017/8/23.
 */
/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
    var Doc =  sequelize.define('Doc', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            unique:true,  //唯一约束
            autoIncrement:true,
            primaryKey:true,
            comment:'用户Id'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        author:{
            type: DataTypes.STRING,
            allowNull: true
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        href: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false,
        tableName: 'DOC',
        underscored:false, //转换列名的驼峰命名规则为下划线命令规则
        charset:'utf8',
        comment:'文章表',
        // initialAutoIncrement:1,//AUTO_INCREMENT的初始值
    });

    Doc.sync({force:false}).then((result)=>{
        //to do
    });

    return Doc;
};
