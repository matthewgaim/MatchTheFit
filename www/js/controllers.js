angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats,$cordovaCamera,$colorThief,$http, $httpParamSerializerJQLike) {
  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

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
  $scope.scrapeJob = function(color){
    var form = {
      url: "https://www.parsehub.com/api/v2/projects/toEosfezbLtw/run",
      method: "POST",
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: $httpParamSerializerJQLike({
        'api_key': "tLXBAdzZLcOD",
        'start_url': "https://www.google.com/search?output=search&tbm=shop&q=" + $scope.color[1] + " shirt".replace(" ", "+"),
      }),
    };
    $http(form).then(function successCallback(response) {
      console.log(response);
      $scope.runToken = response.data.run_token;
      $scope.startingURL = response.data.start_url;
      console.log($scope.runToken);
      console.log($scope.startingURL);

    }, function errorCallback(response) {
      console.log(response);
    });
    // var scrape = new XMLHttpRequest();
    // scrape.open("POST", "https://www.parsehub.com/api/v2/projects/toEosfezbLtw/run?api_key=tLXBAdzZLcOD", true);
    // scrape.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // scrape.send({
    //   start_url: "https://www.google.com/search?output=search&tbm=shop&q=light%20orange%20shirt%20mens",
    // });


  }
  $scope.readFile = function(){
    var params = {
      // url: "https://www.parsehub.com/api/v2/runs/tRk3uU8LBV57/data?api_key=tLXBAdzZLcOD",
      method: "GET",
    };
    $http.get("https://www.parsehub.com/api/v2/runs/" + $scope.runToken + "/data?api_key=tLXBAdzZLcOD", params).then(function successCallback(response){
      console.log(response.data.selection1);
      $scope.clothesList = response.data.selection1;
    }, function errorCallback(response){
      alert(response.status);
    });
    // $http.get("js/clothes.json")
    //   .success(function(response) {
    //     $scope.myDatas = response.selection1;
    //     console.log($scope.myDatas);
    //   });
  }

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

    $scope.rgbToHex = function(r,g,b){
        var bin = r << 16 | g << 8 | b;
        return (function(h){
            return new Array(7-h.length).join("0")+h
        })(bin.toString(16).toUpperCase())
    }


    //Get color via WolfRam
    $scope.getColors = function (){
      var colorThief = new ColorThief();
      document.getElementById("img").crossOrigin = "Anonymous";
      var c = colorThief.getColor( document.getElementById("img") );
      alert(c);
      var second = $scope.rgbToHex(c[0], c[1], c[2]);
      alert(second);
      $scope.color  = ntc.name(second);
      alert($scope.color[1]);
      $scope.scrapeJob($scope.color[1]);
    }
    //Sending color to MatchTheFit site
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
