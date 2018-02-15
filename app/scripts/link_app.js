var startDraw = function(){
	var bufferService = angular.element(document.body).injector().get('bufferService');
	var annotService = angular.element(document.body).injector().get('AnnotService');
	var browserDetector = angular.element(document.body).injector().get('browserDetector');
	var files = document.getElementById('fileEntry').files;
	var reader = new FileReader();
	var reader2 = new FileReader();
	var reader3 = new FileReader();

	var res; 
	var bundle = {};
	var ext = "";
	for(var i = 0; i<files.length;i++){
		ext = files[i].name.substr(files[i].name.lastIndexOf('.') + 1).toUpperCase();
		if(ext==="TEXTGRID"){
			bundle.textgrid = files[i];
			// reader.readAsText(files[i]);
			// reader.onloadend = function (evt) {
			// 	if (evt.target.readyState === FileReader.DONE) {
			// 		if (browserDetector.isBrowser.Firefox()) {
			// 			res = evt.target.result;
			// 		} else {
			// 			res = evt.currentTarget.result;
			// 		}
			// 		bundle.textgrid = res;
			// 	}
			// }; //Need to put WAV first -- Maybe add it in buffer service after it's loaded
		} else if (ext==="WAV") {
			bundle.wav = files[i];
			// reader2.readAsArrayBuffer(files[i]);
			// reader2.onloadend = function (evt) {
			// 	if (evt.target.readyState === FileReader.DONE) {
			// 		if (browserDetector.isBrowser.Firefox()) {
			// 			res = evt.target.result;
			// 		} else {
			// 			res = evt.currentTarget.result;
			// 		}
			// 		bundle.wav = res;
			// 	}
			// };

		} else if (ext==="JSON") { //TODO
			bundle.json = files[i];
			// reader3.readAsArrayBuffer(files[i]);
			// reader3.onloadend = function (evt) {
			// 	if (evt.target.readyState === FileReader.DONE) {
			// 		if (browserDetector.isBrowser.Firefox()) {
			// 			res = evt.target.result;
			// 		} else {
			// 			res = evt.currentTarget.result;
			// 		}
			// 		bundle.json = res;
			// 	}
			// };
		}

	}

	if(bundle.wav !== undefined) {
		reader2.readAsArrayBuffer(bundle.wav);
		reader2.onloadend = function (evt) {
			if (evt.target.readyState === FileReader.DONE) {
				if (browserDetector.isBrowser.Firefox()) {
					res = evt.target.result;
				} else {
					res = evt.currentTarget.result;
				}
				bufferService.setAudioBufferFromArray(res);
				if(bundle.textgrid !== undefined) {
					reader.readAsText(bundle.textgrid);
					reader.onloadend = function (evt) {
						if (evt.target.readyState === FileReader.DONE) {
							if (browserDetector.isBrowser.Firefox()) {
								res = evt.target.result;
							} else {
								res = evt.currentTarget.result;
							}
							annotService.setAnnotFromTextGrid(res);
						}
					}
				} else if(bundle.json !== undefined)	{
					reader3.readAsText(bundle.json);
					reader3.onloadend = function (evt) {
						if (evt.target.readyState === FileReader.DONE) {
							if (browserDetector.isBrowser.Firefox()) {
								res = evt.target.result;
							} else {
								res = evt.currentTarget.result;
							}
							annotService.setAnnotFromJSON(res);
						}
					}	
				}
			}
		}
	}
}