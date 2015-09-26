angular.module('temds.app.controllers')

.controller('SideMenuCtrl', function ($scope, $localstorage, AuthService) {
        $scope.user = $localstorage.getObject('user');

        /*/this will represent our logged user
        var user = {
            about: "Design Lead of Project Fi. Love adventures, green tea, and the color pink.",
            name: "Brynn Evans",
            picture: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
            _id: 0,
            followers: 345,
            following: 58
        };*/

        //save our logged user on the localStorage
        //AuthService.saveUser(user);
        //$scope.loggedUser = user;
    })
    .controller('ProfileCtrl', function ($scope, $stateParams, PostService, $ionicHistory, $state, $ionicScrollDelegate) {

        $scope.$on('$ionicView.afterEnter', function () {
            $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
        });

        var userId = $stateParams.userId;

        $scope.myProfile = $scope.loggedUser._id == userId;
        $scope.posts = [];
        $scope.likes = [];
        $scope.user = {};

        PostService.getUserPosts(userId).then(function (data) {
            $scope.posts = data;
        });

        PostService.getUserDetails(userId).then(function (data) {
            $scope.user = data;
        });

        PostService.getUserLikes(userId).then(function (data) {
            $scope.likes = data;
        });

        $scope.getUserLikes = function (userId) {
            //we need to do this in order to prevent the back to change
            $ionicHistory.currentView($ionicHistory.backView());
            $ionicHistory.nextViewOptions({
                disableAnimate: true
            });

            $state.go('app.profile.likes', {
                userId: userId
            });
        };

        $scope.getUserPosts = function (userId) {
            //we need to do this in order to prevent the back to change
            $ionicHistory.currentView($ionicHistory.backView());
            $ionicHistory.nextViewOptions({
                disableAnimate: true
            });

            $state.go('app.profile.posts', {
                userId: userId
            });
        };

    })