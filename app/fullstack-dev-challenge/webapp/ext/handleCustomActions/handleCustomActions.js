sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
], function (MessageToast, Fragment, MessageBox) {
    'use strict';

    return {
        addQuestions: function (oEvent) {
            // MessageToast.show("Custom handler invoked.");
            // this.loadFragment({ type: "XML", name: "fullstackdevchallenge.ext.view.fragments.addQuestion" }).then(function (oDialog) {
            //     oDialog.open();
            // });

            let dialog = new sap.m.Dialog({

                id: "assignQuestionsToTest",
                title: 'Assign Questions to Test',
                type: 'Message',
                binding: "{/assignQuestionsToTest(...)}",
                content: [new sap.m.Label({ text: 'Number of Questions:', labelFor: 'event' }),

                new sap.m.Input('event', {
                    liveChange: function (oEvent) {
                        var eventName = oEvent.getParameter('value');
                        var parent = oEvent.getSource().getParent();
                        parent.getBeginButton().setEnabled(eventName.length > 0);
                    },
                    width: '100%',
                    type: sap.m.InputType.Number,
                })],
                beginButton: new sap.m.Button({
                    text: 'Submit',
                    enabled: false,
                    press: function () {
                        sap.ui.getCore().byId("assignQuestionsToTest").getObjectBinding().execute();
                        // var sText = sap.ui.getCore().byId('event').getValue();
                        // var event = {
                        //     "eventName": sText
                        // };
                        // var searchTerm = new sap.ui.model.json.JSONModel();
                        // searchTerm.setData(event);
                        // sap.ui.getCore().byId("__xmlview0").setModel(searchTerm);
                        dialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: 'Cancel',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();
        },
        addquestions1: function (oEvent) {
            //   MessageToast.show("Custom handler invoked.");

            var oFragmentController = {
                onInputChange: function () {

                },
                activateSubmit: function (oEvent) {
                    let eventName = oEvent.getParameter('value');
                    sap.ui.getCore().byId("submitButton").setEnabled(eventName.length > 0);
                },
                onCancel: function (oEvent) {
                    // delete this.pDialog;
                    sap.ui.getCore().byId("addQuestionDialog").close();
                },
                afterClose: function (oEvent) {
                    // sap.ui.getCore().byId("addQuestionDialog").destroy();
                },
                onSubmitDialog: function (oEvent) {
                    let oBinding = sap.ui.getCore().byId("submitButton").getObjectBinding();
                    let sCount = sap.ui.getCore().byId("questionsCount").getValue();
                    // obBinding.setParameter("questionsCount", parseInt(sCount)).execute().then(
                    //     function(response){
                    //         MessageToast.show(response);
                    //     }
                    // );
                    let sQuery = oBinding.setParameter("questionsCount", parseInt(sCount));
                    var response = sQuery.execute().then(
                        function (oResponse) {
                            MessageToast.show("Invoice created for sales order");
                            MessageBox.alert(`${sCount} question(s) successfully added to the test`, {
                                icon: MessageBox.Icon.INFORMATION,
                                title: "Information"
                            })
                        },
                        function (oError) {
                            MessageBox.alert(oError.message, {
                                icon: MessageBox.Icon.ERROR,
                                title: "Error"
                            });
                        });
                    sap.ui.getCore().byId("addQuestionDialog").getBindingContext().refresh();
                    console.log(response);
                    // MessageToast.show(response);
                    sap.ui.getCore().byId("addQuestionDialog").close();
                }
            }

            let mSettings = {
                type: "XML",
                name: "fullstackdevchallenge.ext.view.fragments.addQuestion",
                controller: oFragmentController,
                contextPath: oEvent.getPath()
            }

            if (!this.pDialog) {
                this.pDialog = this.loadFragment(mSettings);
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });

            // Fragment.load({
            //     type: "XML", 
            //     name: "fullstackdevchallenge.ext.view.fragments.addQuestion"
            // }).then(function (oDialog) {
            //     oDialog.open();
            // })
        }
    };
});
