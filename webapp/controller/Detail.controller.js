sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller"
], function (jQuery, Controller) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.Detail", {
		onInit: function () {
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handlePress: function () {
			this.getRouter().navTo("detailDetailName", {
				"detail-detail-item": "item-inner1",
				"detail-item": "item1"
			});
		}
	});
});
