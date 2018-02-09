'use strict';

/**
* Add an osci of the signal of the fileService
*/
angular.module('EMUInterface')
	.directive('osci', function (Drawhelperservice, bufferService, appStateService) {
		return {
			templateUrl: 'views/osci.html',
			restrict: 'E',
			replace: true,
			scope: {},
			link: function postLink(scope, element) {
				var canvas = document.getElementById("osci");
				scope.bs = bufferService;
				scope.ass = appStateService;

				
				scope.start = undefined; 
				scope.stop = undefined;
				

				//watching when the audio signal is available
				scope.$watch('bs.getAudioBuffer()', function(newValue, oldValue){
					if ((newValue!==undefined)&&(oldValue!==newValue)) {
						scope.start = 0;
						scope.stop = scope.bs.getAudioBuffer().length;
						Drawhelperservice.freshRedrawDrawOsciOnCanvas(canvas, scope.start, scope.stop, true);
					}
				});

				//watching when zooming or shifting
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
