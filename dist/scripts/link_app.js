var startDraw = function(){
	var bufferService = angular.element(document.body).injector().get('bufferService');
	var browserDetector = angular.element(document.body).injector().get('browserDetector');
	var file = document.getElementById('fileEntry').files[0];
	var reader = new FileReader();
	var res; 

	reader.readAsArrayBuffer(file);

	reader.onloadend = function (evt) {
		if (evt.target.readyState === FileReader.DONE) {
			if (browserDetector.isBrowser.Firefox()) {
				res = evt.target.result;
			} else {
				res = evt.currentTarget.result;
			}
			bufferService.setAudioBufferFromArray(res);
		}
	};


};