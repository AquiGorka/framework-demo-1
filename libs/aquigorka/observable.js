"use strict";

var Observable = function() {
	var that = this;
	this._observers = [];
	this._observers.notify = function(eventName, extra1, extra2, extra3) {
		if (eventName) {
			this.forEach(function (anObserver) {
				if(typeof anObserver == 'function') {
					anObserver(eventName, that, extra1, extra2, extra3);
				} else {
					anObserver.notify(eventName, that, extra1, extra2, extra3);
				}
			});
		}
		return that;
	};
};
Observable.prototype.subscribe = function(eventName, anObserver) {
	var observer = anObserver;
	if (eventName) {
		observer = function(anEventName, that, extra1, extra2, extra3) {
			if(eventName == anEventName) {
				anObserver(that, extra1, extra2, extra3);
			}
		};
	}
	this._observers.push(observer);
	return this;
};
