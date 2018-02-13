'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('EMUInterface')
  .controller('MainCtrl', function ($scope,$rootScope, bufferService,annotService) {

  	$scope.$watch('annotService.getAnnot()', function(newVal,oldVal){
  		if(newVal!==oldVal){
  			//Ici ajouter les directives pour les levels - Extraire SEGMENTS et EVENT
  		}
  	});
  });
