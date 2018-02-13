
app.controller('board.edit.ctrl', function ($scope, $rootScope, $window, $http, $stateParams, boardService, toastr, config, appContextService) {

    var vm = this;
    vm.appContext = appContextService.context;


    var main_menu = vm.appContext.menuArray.find(function (menu) {
        return menu.name === $stateParams.main_menu;
    });

    if (main_menu) {
        vm.sub_menu = main_menu.list.find(function (menu) {
            return menu.name === $stateParams.sub_menu;
        });
    } 

    vm.goBack = function () {
        window.history.back();
    }

    vm.deleteImage = function (index) {
        vm.data.images.splice(index, 1)
    }

    $scope.imageChanged = function (element) {

        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.appContext.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            vm.data.images.push({ url: "/files/" + res.data });
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });


    };

    vm.deleteFile = function (index) {
        vm.data.files.splice(index, 1)
    }
    $scope.fileChanged = function (element) {

        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.appContext.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            vm.data.files.push({ url: "/files/" + res.data });
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });
    };

    vm.save = function () {

        if (!vm.data.title) {
            toastr.error("제목을 추가해 주세요");
            return;
        }
        // 서버에서 req.body를 저장하기 위해서, _id를 삭제하고 전송한다.
        delete vm.data._id;

        boardService.update($stateParams.articleId, vm.data).then(
            function () {
                window.history.back();
            },
            function (err) {
                alert(JSON.stringify(err));
                window.history.back();
            }
        )

    }


    boardService.get($stateParams.articleId).then(
        function (result) {
            console.log(result);
            vm.data = result.data;
        }, function (err) {
            alert(err);
        }
    )

})

