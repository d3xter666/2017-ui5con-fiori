sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (jQuery, Controller, JSONModel) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.Master", {
		getPage: function () {
			return this.getView().byId("dynamicPageId");
		},
		onToggleFooter: function () {
			this.getPage().setShowFooter(!this.getPage().getShowFooter());
		}
	});
});
