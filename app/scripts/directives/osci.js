'use strict';

/**
* Add an osci of the signal of the fileService
*/
angular.module('testApp')
	.directive('osci', function (Drawhelperservice, fileService, appStateService) {
		return {
			templateUrl: 'views/osci.html',
			restrict: 'E',
			replace: true,
			scope: {},
			link: function postLink(scope, element) {
				var canvas = document.getElementById("osci");
				scope.fs = fileService;
				scope.ass = appStateService;

				
				scope.start = undefined; 
				scope.stop = undefined;
				

				//get the canvas and draw the buffer when available
				scope.$watch('fs.getAudioBuffer()', function(newValue, oldValue){
					if ((newValue!==undefined)&&(oldValue!==newValue)) {
						scope.start = 0;
						scope.stop = scope.fs.getAudioBuffer().length;
						Drawhelperservice.freshRedrawDrawOsciOnCanvas(canvas, scope.start, scope.stop, true);
					}
				});

				scope.$watch('ass.getStart()',function(newValue, oldValue){
					if ((newValue!==undefined)&&(oldValue!==newValue)) {
						scope.start = scope.ass.getStart();
						scope.stop = scope.ass.getStop();
						Drawhelperservice.freshRedrawDrawOsciOnCanvas(canvas, scope.start, scope.stop, true);
					}
				});

				scope.$watch('ass.getStop()',function(newValue, oldValue){
					if ((newValue!==undefined)&&(oldValue!==newValue)) {
						scope.start = scope.ass.getStart();
						scope.stop = scope.ass.getStop();
						Drawhelperservice.freshRedrawDrawOsciOnCanvas(canvas, scope.start, scope.stop, true);
					}
				});

			}
		};
	});
