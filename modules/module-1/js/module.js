"use strict";

var Module1 = function () {}.mixWith(Module);

Module1.prototype._init = function () {
	this.super()._init('module-1');
	this.content = '<div>Module 1 Content</div>';
};
Module1.prototype.show = function () {
	this.super().show([this.getId()]);
};