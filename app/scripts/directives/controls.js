'use strict';

angular.module('testApp')
	.directive('controls', function (fileService,playService) {
		return {
			templateUrl: 'views/controls.html',
			restrict: 'E',
			scope: {},
			link: function postLink(scope,element){

				scope.zoomIn = function(){
					console.log("zoomIn");
					//if start / stop !== undefined
					//then change them
				};

				scope.zoomOut = function(){
					console.log("zoomOut");
					//if start / stop !== undefined
					//change them
				};

				scope.toLeft = function(){
					console.log("toLeft");
					//if start / stop !== undefined
					//change them
				};

				scope.toRight = function(){
					console.log("toRight");
					//if start / stop !== undefined
					//change them
				};		

				scope.play = function(){
					//if audioBuffer !== undefined
					//play it
					if(fileService.getAudioBuffer()!==undefined){
						playService.playFromTo(0,fileService.getAudioBuffer().length);
					}
				};

				scope.pauseResume = function(){
					if(fileService.getAudioBuffer()!==undefined){
						playService.pauseResume();
					}
				}
			}
		};
	});