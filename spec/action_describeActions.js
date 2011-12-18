var specHelper = require('../specHelper.js').specHelper;
var suite = specHelper.vows.describe('API general function');
var apiObj = {};

suite.addBatch({
  'specHelper.prepare':{
    topic: function(){ var cb = this.callback; specHelper.prepare(function(api){ apiObj = specHelper.cleanAPIObject(api); cb(); }) },
    'api object should exist': function(){ specHelper.assert.isObject(apiObj); } }
});

suite.addBatch({
  "Actions array": {
    topic: function(){ specHelper.apiTest.get('/actionsView', {} ,this.callback ); },
    'error' : function(res, b){ specHelper.assert.equal("OK", res.body.error); },
    'actions' : function(res, b){ specHelper.assert.isArray(res.body.actions); },
  }
});

suite.addBatch({
  "Actions have the right parts": {
    topic: function(){ specHelper.apiTest.get('/actionsView', {} ,this.callback ); },
    'actions' : function(res, b){ 
	    for(var i in res.body.actions){
	    	var action = res.body.actions[i];
	    	specHelper.assert.isString(action.name); 
	    	specHelper.assert.isString(action.description); 
	    	specHelper.assert.isObject(action.inputs); 
	    	specHelper.assert.isArray(action.inputs.required); 
	    	specHelper.assert.isArray(action.inputs.optional); 
	    	specHelper.assert.isObject(action.outputExample); 
	    } 
	},
  }
});

// export
suite.export(module);