"use strict";

// Array
Array.prototype.find = Array.prototype.find || function(testFunction) {
    return this.filter(testFunction)[0];
};
// Object
Object.getPrototypeObject = function(constructor) {
    var F = function() {};
    F.prototype = constructor.prototype;
    return new F;
};
Object.mix = function() {
    var ret = {};
    for(var i = 0; i < arguments.length; i++) {
        var src = arguments[i];
        for(var propertyName in src) {
            ret[propertyName] = src[propertyName];
        }
    }
    return ret;
};
// Function
Function.prototype.mixWith = function(trait) {
    var originalConstructor = this;
    var Constructor = function() {
    trait.apply(this, arguments);
    originalConstructor.apply(this, arguments);
};
Function.prototype.and = function(callback) {
    return (function(oldFn) {
        return function(a, b, c, d, e, f, g) {
            oldFn(a, b, c, d, e, f, g);
            callback(a, b, c, d, e, f, g);
        };
    })(this);
};
// Constructor
Constructor.prototype = Object.mix(Object.getPrototypeObject(originalConstructor),
    Object.getPrototypeObject(trait));
    Constructor.prototype.super = function() {
        var that = this, ret = {}, parentPrototype = Object.getPrototypeObject(trait);
        for(var superMethodName in parentPrototype) {
            if(typeof parentPrototype[superMethodName] == 'function') {
                ret[superMethodName] = (function(methodName) {
                    return function() {
                        return parentPrototype[methodName].apply(that, arguments);
                    };
                })(superMethodName);
            }
        }
        return ret;
    };
    return Constructor;
};
// jQuery
$.ajaxSetup({
    dataType: "json",
    xhrFields: {
        withCredentials: true
    }
});
$.postJSON = function (options) {
    var err = function (err, status) {
        if (status === "abort") {
            return;
        }
        if (typeof options.error === "function") {
            options.error(err, status);
        }
    };
    $.ajax({
        url: options.url,
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(options.data),
        success: options.success,
        error: err
    });
};
