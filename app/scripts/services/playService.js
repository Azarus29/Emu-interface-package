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
			if (typeof(audioContext) === 'undefined') {
				initAudioContext();
			}
			if (sServObj.isPlaying) {
				sServObj.isPlaying = false;
				curSource.stop(0);
			} else if(typeof(curSource) === 'undefined'){
				if (fileService.getAudioBuffer().length > 0) { // if wav file is not empty
					sServObj.isPlaying = true;
					sServObj.decodeAndPlay(sampleStart, endSample);
				}
			} else if(audioContext.state=="suspended"){
				sServObj.isPlaying = true;
				audioContext.resume();
			} else {
				sServObj.isPlaying = true;
				sServObj.decodeAndPlay(sampleStart,endSample);
			}

		};

		sServObj.decodeAndPlay = function (sampleStart, endSample) {
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

		sServObj.pauseResume = function() {
			if (typeof(audioContext) !== 'undefined') {
				if(sServObj.isPlaying){
					sServObj.isPlaying = false;
					audioContext.suspend();
				} else if(audioContext.state=="suspended"){
					sServObj.isPlaying = true;
					audioContext.resume();
				}
			}
		};


		return sServObj;

});
