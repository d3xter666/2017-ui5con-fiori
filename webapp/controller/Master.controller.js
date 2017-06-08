sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Label"
], function (jQuery, Controller, JSONModel, Label) {
	"use strict";

	return Controller.extend("ui5confUI5Conf.controller.Master", {
		onInit: function () {
			this.aKeys = ["Name", "Category", "SupplierName"];
			this.oSelectName = this.getSelect("slName");
			this.oSelectCategory = this.getSelect("slCategory");
			this.oSelectSupplierName = this.getSelect("slSupplierName");
		},
		onExit: function () {
			this.aKeys = [];
			this.aFilters = [];
		},
		onSelectChange: function () {
			var aCurrentFilterValues = [];

			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectSupplierName));

			this.filterTable(aCurrentFilterValues);
		},
		filterTable: function (aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
			this.updateFilterCriterias(this.getFilterCriteria(aCurrentFilterValues));
		},
		getModel: function () {
			var oView = this.getView();

			return oView.getModel();
		},
		updateFilterCriterias: function (aFilterCriterias) {
			var oModel;

			if (aFilterCriterias.length > 0) { /* We can`t use a single label and change only the model data, */
				oModel = this.getModel("i18n");

				this.removeSnappedLabel();
				/* because in case of label with an empty text, */
				this.addSnappedLabel();
				/* a space for the snapped content will be allocated and can lead to title misalignment */
				oModel.setProperty("/Filter/text", this.getFormattedSummaryText(aFilterCriterias));
			} else {
				this.removeSnappedLabel();
			}
		},
		addSnappedLabel: function () {
			this.getPageTitle().addSnappedContent(this.getSnappedLabel());
		},
		removeSnappedLabel: function () {
			this.getPageTitle().destroySnappedContent();
		},
		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];

			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new sap.ui.model.Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},
		getFilterCriteria: function (aCurrentFilterValues) {
			return this.aKeys.filter(function (el, i) {
				if (aCurrentFilterValues[i] !== "") {
					return el;
				}
			});
		},
		getFormattedSummaryText: function (aFilterCriterias) {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sMessage = oBundle.getText("master.title.filteredBy", aFilterCriterias.join(", "));

			return sMessage;
		},
		getTable: function () {
			return this.getView().byId("idProductsTable");
		},
		getTableItems: function () {
			return this.getTable().getBinding("items");
		},
		getSelect: function (sId) {
			return this.getView().byId(sId);
		},
		getSelectedItemText: function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
		getPageTitle: function () {
			return this.getPage().getTitle();
		},
		getSnappedLabel: function () {
			return new Label({text: "{/Filter/text}"});
		},
		getPage: function () {
			return this.getView().byId("dynamicPageId");
		},
		onToggleFooter: function () {
			this.getPage().setShowFooter(!this.getPage().getShowFooter());
		}
	});
});
