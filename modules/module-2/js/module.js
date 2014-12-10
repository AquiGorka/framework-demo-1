"use strict";

var Module2 = function () {}.mixWith(Module);

Module2.prototype._init = function () {
	this.super()._init('module-2');
	this.content = '<div>Module 2 Content</div>';
};
Module2.prototype.show = function () {
	this.super().show([this.getId()]);
};