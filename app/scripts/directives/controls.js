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
						var distance = appStateService.getStop()-appStateService.getStart();
						var distance2 = distance * 4/3; //zoom of 25%
						appStateService.setStartStop(appStateService.getStart()-(distance2-distance)*0.5,appStateService.getStop()+(distance2-distance)*0.5);
	
					}
				};

				scope.toLeft = function(){
					console.log("toLeft");
					//if start / stop !== undefined
					//change them  (start/stop -x if start > min);
					if((appStateService.getStart!==undefined)&&(appStateService.getStop!==undefined)){
						var newStartS = appStateService.getStart() - ~~((appStateService.getStop() - appStateService.getStart()) / 4);
						var newEndS = appStateService.getStop() - ~~((appStateService.getStop() - appStateService.getStart()) / 4);
						if(newStartS>0){
							appStateService.setStartStop(newStartS,newEndS);	
						}else{
							appStateService.setStartStop(0,appStateService.getStop()-appStateService.getStart());	
						}

					}

				};

				scope.toRight = function(){
					console.log("toRight");
					//if start / stop !== undefined
					//change them (start/stop + x if stop < max)
					if((appStateService.getStart!==undefined)&&(appStateService.getStop!==undefined)){
						var newStartS = appStateService.getStart() + ~~((appStateService.getStop() - appStateService.getStart()) / 4);
						var newEndS = appStateService.getStop() + ~~((appStateService.getStop() - appStateService.getStart()) / 4);
						if(newEndS<fileService.audioBuffer.length){
							appStateService.setStartStop(newStartS,newEndS);	
						}else{
							appStateService.setStartStop(appStateService.getStart()+(fileService.audioBuffer.length-appStateService.getStop()),fileService.audioBuffer.length);	//pas bon si déjà au bout
						}
					}
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