
app.controller('board.save.ctrl', function ($scope, $rootScope, $window, $http, $stateParams, boardService, toastr, config, appContextService) {

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

    if (!vm.sub_menu) {
        toastr.error('vm.sub_menu not defined.')
        return;
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


        console.log(vm.data)

        if (!vm.data.title) {
            toastr.error("Title required.");
            return;
        }

        // console.log(vm.sub_menu, vm.data);
        // if (vm.sub_menu.imageRequired &&  vm.data.images.length == 0) {
        if (vm.sub_menu.imageRequired && vm.data.images.length == 0) {
            toastr.error("Image required.");
            return;
        }

        // return;
        
        if ($stateParams.articleId) {
            // 서버에서 req.body를 저장하기 위해서, _id를 삭제하고 전송한다.
            delete vm.data._id;

            console.log(vm.data)
            // return;

            boardService.update($stateParams.articleId, vm.data).then(
                function () {
                    window.history.back();
                },
                function (err) {
                    alert(JSON.stringify(err));
                    window.history.back();
                }
            )

        } else {

            boardService.post(vm.data).then(
                function () {
                    window.history.back();
                },
                function (err) {
                    alert(err);
                    window.history.back();
                }
            )

        }
    }

    if ($stateParams.articleId) {
        boardService.get($stateParams.articleId).then(
            function (result) {
                console.log(result);
                vm.data = result.data;
            }, function (err) {
                alert(err);
            }
        )
    } else {
        // vm.data = {};

        vm.data = {
            "articleType": $stateParams.sub_menu,
            // "image": "article2.jpg",
            "title": "",
            // "content": `<h1 style="color: rgb(0, 0, 0);"><font color="#5c5c5c">H1 Title font</font></h1><p>l<img src="http://ojeri.korea.ac.kr/wp-content/themes/ojeri_new/img/logo.png" style="width: 273px;"></p><p><a href="http://ojeri.korea.ac.kr/wp-content/themes/ojeri_new/img/logo.png" target="_blank">Image link</a>&nbsp;&nbsp;<a href="http://google.com">http://google.com</a><font face="Segoe UI, Arial, sans-serif"><span style="font-size: 36px;">&nbsp;</span></font></p><p><span style="color: rgb(92, 92, 92);">The project will now focus on supporting the development of long-term low-emission development strategies, as agreed in the Paris Agreement. Energy research institutions from other countries are welcome to join the project. For more information please go to the</span><a href="http://www.deepdecarbonization.org/" target="_blank" style="background-color: rgb(255, 255, 255); box-sizing: border-box; color: rgb(51, 122, 183);">project’s website</a><span style="color: rgb(92, 92, 92);">.</span></p>`,
            "content": ``,
            "date": new Date(),
            "images": [],
            "files": []
        }

        console.log(vm.appContext.isLocalhost)
        if (vm.appContext.isLocalhost) {
            vm.data.title = `${vm.sub_menu.title} - TEST`
        }
    }

})

