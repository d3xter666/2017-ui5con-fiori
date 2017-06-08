sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (jQuery, Controller, JSONModel) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.Detail", {
		onInit: function () {
			this.getRouter().attachRouteMatched(this._handleRouteChanged.bind(this));
		},
		_itemDetail: null,
		_handleRouteChanged: function (oEvent) {
			var oView = this.oView,
				oModel = this.oView.getModel(),
				oData = oModel.getData(),
				sProductId = oEvent.getParameter("arguments")["detail-item"],
				oItemData = oData["ProductCollection"].filter(function (oCurItem) {
					return oCurItem.ProductId === sProductId;
				})[0];

			this._itemDetail = sProductId;

			if (oItemData) {
				oView.setModel(new JSONModel(oItemData), "detail");
			}
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handlePress: function (oEvent) {
			var sId = oEvent.getParameter("id"),
				oSelectedItem = sap.ui.getCore().byId(sId),
				// It's important to point that we're getting the second model, not the default one
				oModel = oSelectedItem.getModel("detailDetail"),
				sPath = oSelectedItem.getBindingContextPath(),
				oData = oModel.getProperty(sPath);

			this.getRouter().navTo("detailDetailName", {
				"detail-detail-item": oData.ProductId,
				"detail-item": this._itemDetail
			});
		},
		toggleFooter: function () {
			var oObjectPageLayout = this.getView().byId("ObjectPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		}
	});
});
