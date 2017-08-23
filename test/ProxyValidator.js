/**
 *
 * ES6 使用Proxy制作一个校验器
 * 在JavaScript中我们以_作为私有属性的命名,但并不是真正意义上的私有属性,通过Proxy我们可以将一个属性真正的私有化
 * Created by loumt on 2017/8/17.
 */

/**
 * 校验器
 * @param target
 * @param validator
 * @returns {*}
 */
function createValidator(target, validator) {
    return new Proxy(target, {

        _validator: validator,

        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let validator = this._validator[key];
                if (!!validator(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`Cannot set ${key} to ${value}. Invalid.`);
                }
            } else {
                throw Error(`${key} is not a valid property`)
            }
        }
    });
}


/**
 * 决策者
 * @type {{name: ((val?)), age: ((val))}}
 */
const personValidators = {
    name(val) {
        return typeof val === 'string';
    },
    age(val) {
        return typeof age === 'number' && age > 18;
    }
}
//类
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        return createValidator(this, personValidators);
    }
}

const bill = new Person('Bill', 25);
// 以下操作都会报错
bill.name = 0;
bill.age = 'Bill';
bill.age = 15;


/**
 * 私有属性Proxy
 * @type {{has: ((target, key))}}
 */
var handler = {
    has(target,key){
        if(key[0] === '_'){
            return false;
        }
        return key in target;
    }
};

var target= {_pool:'foo',pool:'foo'};
var proxy = new Proxy(target,handler);

console.log('pool' in proxy);
console.log('_pool' in proxy);




