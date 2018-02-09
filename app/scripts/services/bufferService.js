'use strict';


/**
* Service that contains the audioBuffer 
* May start the application (listeners to audioBuffer)
*/
angular.module('EMUInterface')
	.service('bufferService', function bufferService($rootScope,Wavparserservice,browserDetector,appStateService,AnnotService) {
		// shared service object
		var sServObj = {};
		sServObj.audioBuffer = undefined;


		//sets the audioBuffer from an arrayBuffer (either gotten from a file or a Base64 using BASE64ToArrayBuffer())
		sServObj.setAudioBufferFromArray = function(arrayBuffer){
				Wavparserservice.parseWavAudioBuf(arrayBuffer).then(function (audioBuffer) {
					sServObj.setAudioBuffer(audioBuffer);
					appStateService.setMinMax(0,audioBuffer.length);
					appStateService.setStartStop(0,audioBuffer.length);
					if(AnnotService.getTextGrid() !== undefined){
						AnnotService.convertTextGrid(audioBuffer.sampleRate);
					}
				}, function (errMess){
					console.log("Erreur " + errMess);						
				});
		}

		/**
		* Converts ArrayBuffer to base64
		*/
		sServObj.ArrayBufferToBASE64 = function(buffer){
			var binary = '';
			var bytes = new Uint8Array(buffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}
			var res = window.btoa(binary);
			return res;
		}

		/** 
		* Converts base64 to ArrayBuffer
		*/
		sServObj.BASE64ToArrayBuffer = function (stringBase64) {
			var binaryString = window.atob(stringBase64);
			var len = binaryString.length;
			var bytes = new Uint8Array(len);
			for (var i = 0; i < len; i++) {
				var ascii = binaryString.charCodeAt(i);
				bytes[i] = ascii;
			}
			return bytes.buffer;
		};

		/**
		* Sets the audioBuffer
		*/
		sServObj.setAudioBuffer = function(newBuffer){
			sServObj.audioBuffer = newBuffer;
			appStateService.setMinMax(0,sServObj.audioBuffer.length);
			appStateService.setStartStop(0,sServObj.audioBuffer.length);
			//Something has changed, so we call $apply manually
			$rootScope.$apply();
		};

		/**
		* Returns the audioBuffer
		*/
		sServObj.getAudioBuffer = function(){
			return sServObj.audioBuffer;
		};

		return sServObj;
	});
