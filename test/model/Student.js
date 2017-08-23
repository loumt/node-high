/**
 * Created by loumt on 2017/8/18.
 */

let toString = 'toString';

var hander = {
    get(target,key,receiver){
        console.log('Getting ${key}....');
        Reflect.get(target,key,receiver);
    }
}


class Student {

    constructor(name,age,degree){
        this._name = name;
        this._age = age;
        this._degree = degree;
        return new Proxy(this,hander);
    }

    [toString](){
        return _name +':'+_age+':'+_degree;
    }
}

module.exports = Student;

