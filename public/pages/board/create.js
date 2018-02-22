app.controller('board.create.ctrl', function ($scope, $window, $rootScope, $stateParams, $http, boardService, toastr, appContextService, $timeout) {

    var vm = this;
    vm.appContext = appContextService.context;

    var main_menu = vm.appContext.menuArray.find(function(menu){
        return menu.name === $stateParams.main_menu;
    }); 

    if ( main_menu) {
        vm.sub_menu = main_menu.list.find(function (menu) {
            return menu.name === $stateParams.sub_menu;
        }); 
    } 

    if (!vm.sub_menu) {
        toastr.error('vm.sub_menu not defined.')
        return;
    }

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
    if (vm.appContext.isLocalhost) {

        vm.data.title = `${$stateParams.sub_menu} - Test Title`; 
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
            vm.isUploading = false;
            vm.data.images.push({ url: "/files/" + res.data });
        }, function (err) {
            vm.isUploading = false;
            console.log("error", err)
        });

    };


    vm.deleteFile = function (index) {
        vm.data.files.splice(index, 1)
    }

    vm.isUploading = false;

    $scope.fileChanged = function (element) {

        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.appContext.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            console.log(res.data);
            vm.data.files.push({ url: "/files/" + res.data });
            vm.isUploading = false;
        }, function (err) {
            vm.isUploading = false;
            console.log("error", err)
        });
    };

    vm.save = function () {


        if (vm.sub_menu.mode === 'board' && !vm.data.title) {
            toastr.error("제목을 추가해 주세요");
            return;
        }


        if (vm.sub_menu.imageRequired && vm.data.images.length === 0) {
                toastr.error("이미지 파일을 추가해 주세요");
                return;
        }

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
    vm.goBack = function () {
        window.history.back();
    }

})

