function getArrayFromValuesOfObject(obj) {
  var result = [];
  for(var key in obj) {
    result.push(obj[key]);
  }
  return result;
}

function createObjectFromArrays(arr1, arr2) {
  if(arr1.length === arr2.length) {
    var result = {};
    arr1.forEach(function(elem, i) {
      result[elem] = arr2[i];
    });
  }
  return result;
}

String.prototype.addSubStr = function(pos, str) {
  var beforeStr = this.substring(0, pos); 
  var afterStr = this.substring(pos, this.length);
  return beforeStr + str + afterStr;
}

angular.module('SampleApp', ['ngSanitize'])
.directive('header', function() {
  return function(scope, element, attrs) {
    var settingCustom     = angular.element(element[0].querySelector('span.setting-custom'));
    var settings          = angular.element(element[0].querySelector('#settings'));
    var closeSettingsBtn  = angular.element(element[0].querySelector('.close'));
    
    settingCustom.on('click', function() {
      settings.addClass('show');
    });

    closeSettingsBtn.on('click', function() {
      settings.removeClass('show');
    });
  }
})
.controller('SampleCtrl', function($scope, $http) {

  // modes
  $scope.modes = {
    small: { 
      id:           true,
      name:         true,
      description:  false,
      category:     false,
      price:        true,
      currency:     true,
      quantity:     false,
      manufacturer: false
    },
    big: { 
      id:           true,
      name:         true,
      description:  false,
      category:     false,
      price:        true,
      currency:     true,
      quantity:     true,
      manufacturer: true
    },
    custom: { 
      id:           true,
      name:         true,
      description:  true,
      category:     true,
      price:        true,
      currency:     true,
      quantity:     true,
      manufacturer: true
    } 
  }

  $scope.$watch('selectedMode', function(newVal) {
    if(angular.isDefined(newVal)) {
      $scope.currentView = $scope.modes[newVal];
      $scope.showData = true;
    }
  });

  $scope.$watch('search', function(newVal) {
    if(angular.isDefined(newVal)) {
      var isFoundItem = false;
      $scope.data.forEach(function(item, i) {
        var isFoundProperty = false;
        for(var key in item) {
          item[key] = item[key].replace(/(<mark>|<\/mark>)/g, '');
          var pos = item[key].indexOf(newVal);
          if(pos >= 0 && $scope.currentView[key]) {
            if(newVal.length) {
              item[key] = item[key].addSubStr(pos + newVal.length, '</mark>');
              item[key] = item[key].addSubStr(pos, '<mark>');
            }
            isFoundProperty = true;
            isFoundItem = true;
          }
        }
        item.show = (isFoundProperty) ? true : false;
        $scope.showData = (isFoundItem) ? true : false;
      });
    }
  });

  $scope.sortBy = function(property) {
    console.log(property);
  }

  // get data from file
  $scope.getData = function() {
    $http.get('data.json').success(function(response) {
      var headers = response.splice(0, 1)[0];
      var data = response;

      var arrayOfObjectsData = [];
      data.forEach(function(elem, i) {
        var objectItem = createObjectFromArrays(Object.keys(headers), elem);
        Object.defineProperty(objectItem, 'show', {
          value: true,
          writable: true,
          enumerable: false
        });
        arrayOfObjectsData.push(objectItem);
      });

      $scope.headers = headers;
      $scope.data = arrayOfObjectsData;
    });
  }

  // get full description of selected product
  $scope.getDescription = function(productObject) {

    delete productObject.$$hashKey;
    
    var headers = getArrayFromValuesOfObject($scope.headers);
    var productArray = getArrayFromValuesOfObject(productObject);
    
    $scope.currentProduct = createObjectFromArrays(headers, productArray);

  }

  $scope.getData();

});

/*
  Во view для таблицы вывода товаров надо передать с учетом фильтров такие данные:
  (пример для маленького набора):

  $scope.headers = { id: 'ID', name: 'Название', price: 'Цена', currency: 'Валюта' };

  $scope.data = [
    {
      id:       '1',
      name:     'Материнская плата Asus Z97-A',
      price:    '4299',
      currency: 'грн'
    },
    {
      id:       '2',
      name:     'Процессор LGA 1150 Intel Pentium G3240 Box',
      price:    '63',
      currency: '$'
    }
  ];
*/