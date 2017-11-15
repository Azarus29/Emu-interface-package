'use strict';

angular.module('testApp')
	.directive('osci', function (Drawhelperservice, fileService) {
		return {
			templateUrl: 'views/osci.html',
			restrict: 'E',
			replace: true,
			scope: {},
			link: function postLink(scope, element) {
				var canvas = document.getElementById("osci");
				scope.fs = fileService;
				//get the canvas and draw the buffer when available
				scope.$watch('fs.getAudioBuffer()', function(newValue, oldValue){
					if(newValue!==oldValue) {
						Drawhelperservice.freshRedrawDrawOsciOnCanvas(canvas, 0, fileService.audioBuffer.length, true);
					}
				}, true);
			}
		};
	});
