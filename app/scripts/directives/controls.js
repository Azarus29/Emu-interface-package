'use strict';

angular.module('testApp')
	.directive('controls', function (fileService,playService,appStateService) {
		return {
			templateUrl: 'views/controls.html',
			restrict: 'E',
			scope: {},
			link: function postLink(scope,element){

				scope.zoomIn = function(){
					console.log("zoomIn");
					//if start / stop !== undefined
					//then change them (stop/2)
					if((appStateService.getStart()!==undefined)&&(appStateService.getStop()!==undefined)){
						var distance = appStateService.getStop()-appStateService.getStart();
						var distance2 = distance * 3/4; //zoom of 25%
						appStateService.setStartStop(appStateService.getStart()+(distance-distance2)*0.5,appStateService.getStop()-(distance-distance2)*0.5);
					}
				};

				scope.zoomOut = function(){
					console.log("zoomOut");
					//if start / stop !== undefined
					//change them (start-stop / 2)
					if((appStateService.getStart!==undefined)&&(appStateService.getStop!==undefined)){
						//appStateService.setStartStop(appStateService.getStart(),appStateService.getStop()/2);
						var distance = appStateService.getStop()-appStateService.getStart();
						var distance2 = distance * 4/3; //zoom of 25%
						appStateService.setStartStop(appStateService.getStart()-(distance2-distance)*0.5,appStateService.getStop()+(distance2-distance)*0.5);
	
					}
				};

				scope.toLeft = function(){
					console.log("toLeft");
					//if start / stop !== undefined
					//change them  (start/stop -x if start > min);
				};

				scope.toRight = function(){
					console.log("toRight");
					//if start / stop !== undefined
					//change them (start/stop + x if stop < max)
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