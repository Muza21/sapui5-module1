sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
      onInit() {
        const oViewModel = new JSONModel({
          currency: "EUR",
        });
        this.getView().setModel(oViewModel, "view");

        const oStatus = {
          statuses: [
            { key: "ALL", text: "All" },
            { key: "A", text: "New" },
            { key: "B", text: "In Progress" },
            { key: "C", text: "Done" },
          ],
          defaultKey: "ALL",
        };
        const oStatusModel = new JSONModel(oStatus);
        this.getView().setModel(oStatusModel, "status");
      },

      onFilterInvoices(oEvent) {
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(
            new Filter("ProductName", FilterOperator.Contains, sQuery)
          );
        }

        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },

      onFilterInvoicesByStatus(oEvent) {
        const sSelectedKey = oEvent.getParameter("selectedItem").getKey();
        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items");
        const aFilter = [];

        if (sSelectedKey !== "ALL") {
          aFilter.push(new Filter("Status", FilterOperator.EQ, sSelectedKey));
        }

        oBinding.filter(aFilter);
      },

      onPress(oEvent) {
        const oItem = oEvent.getSource();
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
          invoicePath: window.encodeURIComponent(
            oItem.getBindingContext("invoice").getPath().substring(1)
          ),
        });
      },
    });
  }
);
