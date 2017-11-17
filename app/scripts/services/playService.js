'use strict';

angular.module('testApp')
	.factory('playService', function (fileService) {
		var curSource;
		var sServObj = {};
		var audioContext;
		sServObj.isPlaying = false;

		function initAudioContext() {
			try {
				window.AudioContext = window.AudioContext || window.webkitAudioContext;
				audioContext = new AudioContext();
			} catch (e) {
				alert('Error loading the AudioContext (could mean your browser does not support the HTML5 webaudio API):' + e);
			}
		};

		sServObj.playFromTo = function (sampleStart, endSample) {
			//var cutWavBuff = this.extractRelPartOfWav(sampleStart, endSample);
			if (sServObj.isPlaying) {
				sServObj.isPlaying = false;
				curSource.stop(0);
			} else {

				sServObj.isPlaying = true;
				if (fileService.getAudioBuffer().length > 0) { // if wav file is not empty
					sServObj.decodeAndPlay(sampleStart, endSample);
				}
			}

		};

		sServObj.decodeAndPlay = function (sampleStart, endSample) {
			if (typeof(audioContext) === 'undefined') {
				initAudioContext();
			}
			var audioBuffer = fileService.getAudioBuffer();
			if(audioBuffer !== undefined){
					var startTime = sampleStart / audioBuffer.sampleRate;
		            var endTime = endSample / audioBuffer.sampleRate;
					var durTime = endTime - startTime;
					curSource = audioContext.createBufferSource();
					curSource.buffer = audioBuffer;
					curSource.connect(audioContext.destination);
					curSource.start(0, startTime, durTime);
					curSource.onended = function () {
						sServObj.isPlaying = false;
					};
			}
		
		};

		//Not working
		sServObj.stopPlaying = function (){
			if(sServObj.isPlaying){
				curSource.stop();
				sServObj.isPlaying = false;			
			} else if(audioContext.state=="suspended"){
				audioContext.resume();
				curSource.stop();
				sServObj.isPlaying = false;
			}
		}

		sServObj.pauseResume = function() {
			if(sServObj.isPlaying){
				sServObj.isPlaying = false;
				audioContext.suspend();
			} else if(audioContext.state=="suspended"){
				sServObj.isPlaying = true;
				audioContext.resume();
			} else {

			}
		}


		return sServObj;

});
