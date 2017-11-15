'use strict';

angular.module('testApp')
	.directive('spectro', function (Drawhelperservice, fileService, mathHelperService) {
		return {
			templateUrl: 'views/spectro.html',
			restrict: 'E',
			replace: true,
			scope: {},
			link: function postLink(scope, element) {
				scope.fs = fileService;
				scope.dhs = Drawhelperservice;
				// select the needed DOM elements from the template
				var canvas = document.getElementById("spectro");
				scope.context = canvas.getContext('2d');

				// FFT default vars
				// default alpha for Window Function
				scope.alpha = 0.16;
				scope.devicePixelRatio = window.devicePixelRatio || 1;

				// Spectro Worker
				scope.primeWorker = new SpectroDrawingWorker();


				///////////////
				// watches

				//
				scope.$watch('fs.getAudioBuffer()', function(newValue, oldValue){
					if (oldValue!==newValue) {
						scope.redraw();
					}
				},true);

				///////////////
				// bindings

				scope.redraw = function () {
					scope.context.clearRect(0, 0, canvas.width, canvas.height);
					scope.drawSpectro(scope.fs.audioBuffer.getChannelData(0));
				};

				scope.drawSpectro = function (buffer) {
					scope.killSpectroRenderingThread();
					scope.startSpectroRenderingThread(buffer);
				};

				scope.calcSamplesPerPxl = function () {
					//return (scope.vs.curViewPort.eS + 1 - scope.vs.curViewPort.sS) / scope.canvas0.width;
					return (0 + 1 - scope.fs.audioBuffer.length) / canvas.width;
				};

				scope.clearAndDrawSpectMarkup = function () {
					scope.markupCtx.clearRect(0, 0, canvas.width, canvas.height);
					scope.drawSpectMarkup();
				};

				scope.drawSpectMarkup = function () {
					// draw moving boundary line if moving
					//Drawhelperservice.drawMovingBoundaryLine(scope.context);
					// draw current viewport selected
					Drawhelperservice.drawCurViewPortSelected(scope.context, true);
					// draw min max vals and name of track
					//Drawhelperservice.drawMinMaxAndName(scope.context, '', 0, scope.fs.audioBuffer.length, 2);
                    // only draw corsshair x line if mouse currently not over canvas
					//Drawhelperservice.drawCrossHairX(scope.context, 0);

                };

				scope.killSpectroRenderingThread = function () {
					scope.context.fillStyle = "#E7E7E7";
					scope.context.fillRect(0, 0, canvas.width, canvas.height);
					// draw current viewport selected
					scope.dhs.drawCurViewPortSelected(scope.context, false);
					//fontScaleService.drawUndistortedText(scope.context, 'rendering...', ConfigProviderService.design.font.small.size.slice(0, -2) * 0.75, ConfigProviderService.design.font.small.family, 10, 50, ConfigProviderService.design.color.black, true);
					if (scope.primeWorker !== null) {
						scope.primeWorker.kill();
						scope.primeWorker = null;
					}
				};

				scope.setupEvent = function () {
					var imageData = scope.context.createImageData(canvas.width, canvas.height);
					scope.primeWorker.says(function (event) {
						if (event.status === undefined) {
							if (scope.calcSamplesPerPxl() === event.samplesPerPxl) {
								var tmp = new Uint8ClampedArray(event.img);
								imageData.data.set(tmp);
								scope.context.putImageData(imageData, 0, 0);
								scope.drawSpectMarkup();
							}
						} else {
							console.error('Error rendering spectrogram:', event.status.message);
						}
					});
				};

				scope.startSpectroRenderingThread = function (buffer) {
					if (buffer.length > 0) {
						scope.primeWorker = new SpectroDrawingWorker();
						var parseData = [];
						var fftN = mathHelperService.calcClosestPowerOf2Gt(scope.fs.audioBuffer.sampleRate * 0.01);
						console.log("fftN : "+fftN);
						// fftN must be greater than 512 (leads to better resolution of spectrogram)
						if (fftN < 512) {
							fftN = 512;
						}
						console.log("fftN : "+fftN);
						// extract relavant data
						parseData = buffer.subarray(0, scope.fs.audioBuffer.length);

						var leftPadding = [];
						var rightPadding = [];

						// check if any zero padding at LEFT edge is necessary
						var windowSizeInSamples = scope.fs.audioBuffer.length;
						if (0 < windowSizeInSamples / 2) {
							//should do something here... currently always padding with zeros!
						}
						else {
							leftPadding = buffer.subarray(0 - windowSizeInSamples / 2, 0);
						}
						// check if zero padding at RIGHT edge is necessary
						if (scope.fs.audioBuffer.length + fftN / 2 - 1 >= scope.fs.audioBuffer.length) {
							//should do something here... currently always padding with zeros!
						}
						else {
							rightPadding = buffer.subarray(scope.fs.audioBuffer.length, scope.fs.audioBuffer.length + fftN / 2 - 1);
						}
						// add padding
						var paddedSamples = new Float32Array(leftPadding.length + parseData.length + rightPadding.length);
						paddedSamples.set(leftPadding);
						paddedSamples.set(parseData, leftPadding.length);
						paddedSamples.set(rightPadding, leftPadding.length + parseData.length);

						if (0>= fftN / 2) {
							// pass in half a window extra at the front and a full window extra at the back so everything can be drawn/calculated this also fixes alignment issue
							parseData = buffer.subarray(0 - fftN / 2, scope.fs.audioBuffer.length + fftN);
						} else {
							// tolerate window/2 alignment issue if at beginning of file
							parseData = buffer.subarray(0, scope.fs.audioBuffer.length + fftN);
						}
						scope.setupEvent();
						scope.primeWorker.tell({
							'windowSizeInSecs': 0.01,
							'fftN': fftN,
							'alpha': scope.alpha,
							'upperFreq': 5000,
							'lowerFreq': 0,
							'samplesPerPxl': scope.calcSamplesPerPxl(),
							'window': 5,
							'imgWidth': canvas.width,
							'imgHeight': canvas.height,
							'dynRangeInDB': 70,
							'pixelRatio': scope.devicePixelRatio,
							'sampleRate': scope.fs.audioBuffer.sampleRate,
							'transparency': 255,
							'audioBuffer': paddedSamples,
							'audioBufferChannels': 1,
							'drawHeatMapColors': false,
							'preEmphasisFilterFactor': 0.97,
							'heatMapColorAnchors': [
					            [255, 0, 0],
					            [0, 255, 0],
					            [0, 0, 0]
					        ]
						}, [paddedSamples.buffer]);
					}
				};
			}
		};
	});
