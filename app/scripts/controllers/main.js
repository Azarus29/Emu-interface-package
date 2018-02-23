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
    $scope.bs = bufferService;

    $scope.$watch('bs.getAudioBuffer()', function(newVal,oldVal){
            if(newVal!==oldVal){
              $scope.levels = [];
            }
    });


  	$scope.$watch('as.getAnnot()', function(newVal,oldVal){
  		if(newVal!==oldVal){
  			$scope.levels = [];
  			//Ici ajouter les directives pour les levels - Extraire SEGMENTS et EVENT et les rajouter dans levels
  			newVal.levels.forEach(function(level){
  				if(level.type==="SEGMENT" || level.type==="EVENT"){
  					$scope.levels.push(level);
  				}
  			});
  		}
  	});
  });
