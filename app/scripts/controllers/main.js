'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('EMUInterface')
  .controller('MainCtrl', function ($scope,$rootScope, bufferService,AnnotService) {
  	$scope.as = AnnotService;

  	$scope.$watch('as.getAnnot()', function(newVal,oldVal){
  		if(newVal!==oldVal){
  			//Ici ajouter les directives pour les levels - Extraire SEGMENTS et EVENT et les rajouter dans levels
  			console.log("New val is "+newVal);
  			$scope.levels = newVal;
  		}
  	});
  });
