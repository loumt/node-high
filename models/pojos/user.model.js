/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
    var user =  sequelize.define('user', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,  //唯一约束
            comment:'用户Id'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:""
        },
        disabled: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: "0"
        },
        ctime: {
            type: DataTypes.TIME,
            allowNull: false,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        timestamps: false,
        tableName: 'user',
        underscored:false, //转换列名的驼峰命名规则为下划线命令规则
        charset:'utf8',
        comment:'用户表',
        // initialAutoIncrement:1,//AUTO_INCREMENT的初始值
    });

    user.sync({force:false}).then((result)=>{
        //to do
    });

    return user;
};
