/**
 * 基础方法
 */
function Base() {

}
let paramsRegxp = /([^=&]+)(=([^&#]*))?/g

let toString = Object.prototype.toString,
		_window = window,
		_href = window.location.href,
		_prototype = Base.prototype;

// 获取params  string  url地址未传值取 `window.location.href`
let getParamsString = function(url) {
	let matchs,
        url = url || _href;
	return url && (matchs = url.match(/^[^\?#]*\?([^#]*)/)) && matchs[1]
};


/**
 * 检测类型函数
 */
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array', 'Object', 'Boolean'].forEach(function(name) {
	_prototype['is' + name] = (obj) => {
        return toString.call(obj) === `[object ${name}]`
	}
})

/**
 * 拷贝
 * @param {Boolean} [deep] `可选` 是否深度拷贝
 * @param {Object/Array} target 目标
 * @param {Object/Array} source 源对象，可为多个
 * @return {Object/Array} target
 */

_prototype.extend = function(traget, source) {
	let deep,
        args = Array.prototype.slice.call(arguments, 1),
        length
	
	if(this.isBoolean(traget)) {
		deep = traget
		traget = args.shift()
	}
	
	length = args.length
	for(let i = 0; i < length; i++) {
		source = args[i]
		for(let key in source) {
			if(source.hasOwnProperty(key)) {
				if(deep && (this.isArray(source[key]) || this.isObject(source[key]))) {
					if(this.isArray(source[key]) && !this.isArray(target[key])) {
						target[key] = []
					}
					if(this.isObject(source[key]) && !this.isObject(target[key])) {
						target[key] = {}
					}
					this.extend(deep, target[key], source[key])
				} else {
					(source[key] !== undefined) && (target[key] = source[key])
				}
			}
		}
	}
	return target
}


_prototype.setQuerystring = function(url, params, opts) {
    
}

// let url = 'http://h5.dev.weidian.com:9000/pages/privilege-center.html?d=2'

// // let a = url.match(paramsRegxp)

let core = new Base()
let b = []
console.log(core.isNumber(b))