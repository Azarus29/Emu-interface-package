'use strict';


/**
* Service that contains the audioBuffer 
* May start the application (listeners to audioBuffer)
*/
angular.module('EMUInterface')
	.service('AnnotService', function AnnotService($rootScope,Textgridparserservice,browserDetector,appStateService) {
		// shared service object
		var sServObj = {};
		sServObj.annot = undefined;

		sServObj.textGrid = undefined;



		/**
		* Sets the annotation
		*/
		sServObj.setAnnotFromTextGrid = function(text){
			console.log("TEST");
			sServObj.textGrid = text;
		};


		/**
		* Sets the annotation
		*/
		sServObj.setAnnotFromJSON = function(text){
			sServObj.annot = JSON.parse(text);
		};

		//Used after putting the wav file
		sServObj.convertTextGrid = function(sampleRate){
			Textgridparserservice.asyncParseTextGrid(sServObj.textGrid, sampleRate, "annotTextGrid", "annotTextGrid").then(function (parseMess) {
				sServObj.annot = parseMess;
				//Something has changed, so we call $apply manually -- removed because of bugs
				console.log(sServObj.annot);
			}, function (errMess) {
				console.log("error : "+errMess);
			});
		}

		/**
		* Returns the annotation
		*/
		sServObj.getAnnot = function(){
			return sServObj.annot;
		};

		sServObj.getTextGrid = function(){
			return sServObj.textGrid;
		};

		return sServObj;
	});
