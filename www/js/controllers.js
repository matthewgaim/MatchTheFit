angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$cordovaCamera,$colorThief,$http,$httpParamSerializerJQLike) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // var api = new ParseHub('tLXBAdzZLcOD');
  // api.getAllJobs(function(err, jobs)
  // {
  //   console.log(jobs);
  // });

  $scope.scrapeJob = function(){
    var form = {
      url: "https://www.parsehub.com/api/v2/projects/toEosfezbLtw/run",
      method: "POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:'',
      params: {
        api_key: "tLXBAdzZLcOD",
        start_url: "https://www.google.com/search?output=search&tbm=shop&q=light+orange+shirt+mens",
      },
    }
    $http(form).then(function successCallback(response) {
      console.log(response);
      $scope.runToken = response.data.run_token;
      $scope.startingURL = response.data.start_url;
      console.log($scope.runToken);
      console.log($scope.startingURL);
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  // $http.get("js/clothes.json")
  //   .success(function(response) {
  //     $scope.myDatas = response.selection1;
  //     console.log($scope.myDatas);
  //   });

  $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;

        }, function(err) {
            alert(err);
        });
    }

    //Get color via WolfRam
    $scope.getColors = function (){
      var colorThief = new ColorThief();
      document.getElementById("img").crossOrigin = "Anonymous";
      var c = colorThief.getColor( document.getElementById("img") );
      // window.open('http://www.wolframalpha.com/input/?i=rgb+(' + c + ')', '_system', 'location=yes'); return false;
      alert(c);
    }
    //Sending color to MatchTheFit site
    $scope.toWebsite = function (){
      var colorThief = new ColorThief();
      document.getElementById("img").crossOrigin = "Anonymous";
      var c = colorThief.getColor( document.getElementById("img") );
    }
    $scope.getPhoto = function() {
      var options = {
              quality: 75,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
              mediaType: Camera.MediaType.ALLMEDIA,
              targetWidth: 300,
              allowEdit : true,
              targetHeight: 300,
              saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
              document.getElementById("img").src = imageData;
              //Here you will be getting image data
          }, function(err) {
              alert(err);
          });

      };
    })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
