sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (jQuery, Controller, JSONModel) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.DetailDetail", {
		onInit: function () {
			this.getRouter().attachRouteMatched(this._handleRouteChanged.bind(this));
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_itemDetail: null,
		_handleRouteChanged: function (oEvent) {
			var oView = this.oView,
				// Be aware to fetch the proper model!
				oModel = this.oView.getModel("detailDetail"),
				oData = oModel.getData(),
				sProductId = oEvent.getParameter("arguments")["detail-detail-item"],
				oItemData = oData["ProductCollection"].filter(function (oCurItem) {
					return oCurItem.ProductId === sProductId;
				})[0];

			if (oItemData) {
				oView.setModel(new JSONModel(oItemData), "detail");
			}
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	});
});