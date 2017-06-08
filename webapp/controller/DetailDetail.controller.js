sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller"
], function (jQuery, Controller) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.DetailDetail", {
		onInit: function () {
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	});
});