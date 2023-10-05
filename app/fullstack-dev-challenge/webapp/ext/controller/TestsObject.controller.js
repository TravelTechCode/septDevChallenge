sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('fullstackdevchallenge.ext.controller.TestsObject', {

		afterClose: function () {
			this.byId("addQuestionDialog").close().destroy();
		},
		onCloseDialog:function(){
			this.byId("addQuestionDialog").close();
		},
		addquestions1: function() {
			MessageToast.show("Custom handler invoked.");
			this.loadFragment({type: "XML", name: "fullstackdevchallenge.ext.view.fragments.addQuestion"}).then(function(oDialog) {
				oDialog.open();
			});
		},
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf fullstackdevchallenge.ext.controller.TestsObject
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			}
		}
	});
});
