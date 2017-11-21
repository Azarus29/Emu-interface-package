'use strict';

angular.module('testApp')
	.factory('appStateService', function ($rootScope) {
		var sServObj = {};

		sServObj.startSignal = undefined;
		sServObj.stopSignal = undefined;

		sServObj.startMin = undefined;
		sServObj.stopMax = undefined;

		sServObj.setStartStop = function(newStart,newStop){
			if(newStart<sServObj.startMin){
				newStart = 0;
			}
			if(newStop>sServObj.stopMax){
				newStop=sServObj.stopMax;
			}
			sServObj.startSignal = newStart;
			sServObj.stopSignal = newStop;
			console.log(newStart+" "+newStop);
		}

		sServObj.setMinMax = function(newMin,newMax){
			sServObj.startMin = newMin;
			sServObj.stopMax = newMax;
		}

		sServObj.getStart = function(){
			return sServObj.startSignal;
		}

		sServObj.getStop = function(){
			return sServObj.stopSignal;
		}



		return sServObj;
});