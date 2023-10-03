const cds = require("@sap/cds");
(async()=>{cds.app = require('express')()
cds.model = await cds.load('*')
cds.services = await cds.serve('all').from(cds.model).in(cds.app)
})()