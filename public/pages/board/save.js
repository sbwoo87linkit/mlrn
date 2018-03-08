// var getStuff = function () {
//     var outside = angular.element(document.getElementById('stuff')).scope();
//     console.log('getStuff', outside) // retrieved "outside" of AngularJS
// }



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
            vm.isUploading = false;
            // vm.data.images.push({ url: "/files/" + res.data });
            // vm.data.images = [];
            vm.data.images.push(res.data);
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });


    };

    vm.deleteFile = function (index, list) {
        // vm.data.files.splice(index, 1)
        list.splice(index, 1)
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
            vm.data.files.push(res.data);
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });
    };

    //thumbnailChanged
    $scope.thumbnailChanged = function (element, item) {
        vm.isUploading = true;
        var file = element.files[0];
        var fd = new FormData();
        fd.append('file', file);
        $http.post(vm.appContext.apiUrl + '/api/files/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            // vm.data.files.push(res.data);
            
            console.log('item ..... ', item)
            console.log('vm.selectedItem ..... ', vm.selectedItem)
            console.log('res.data ..... ', res.data)
            vm.selectedItem.thumbnail = res.data.filename;
            console.log('vm.data.files ~~~~~~~~~',vm.data.files);
            vm.isUploading = false;
        }, function (err) {
            console.log("error", err)
            vm.isUploading = false;
        });
    };

    vm.deleteThumbnail = function(file) {
        console.log('vm.deleteThumbnail 1', file);
        delete file.thumbnail; 
        console.log('vm.deleteThumbnail 2', file);
    }

    vm.save = function () {
        if (!vm.data.title) {
            toastr.error("Title required.");
            return;
        }
        if (vm.sub_menu.urlRequired && !vm.data.url) {
            toastr.error("URL required.");
            return;
        }

        if (vm.sub_menu.imageRequired && vm.data.images.length == 0) {
            toastr.error("Image required.");
            return;
        }
        if (vm.sub_menu.thumbnailRequired) {
            function withoutThumbnail(item, index, array) {
                return !item.thumbnail;
            }
            let filesWithoutThumbnail = vm.data.files.filter(withoutThumbnail) 
            if (filesWithoutThumbnail.length > 0) {
                toastr.error("Thubmnail image required.");
                return;
            }
        }
        if ($stateParams.articleId) {
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

    var load = function() {
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
                articleType: $stateParams.sub_menu,
                title: '',
                url: '',
                content: ``,
                date: new Date(),
                images: [],
                files: []
            }

            if (vm.appContext.isLocalhost) {
                vm.data.title = `${vm.sub_menu.title} - TEST`
                vm.data.url = 'http://ojeri.korea.ac.kr/ko/';
            }
        }
    }

    load();


    vm.copyToClipboard = function (text_to_share) {
        console.log('text_to_share', text_to_share)
        // var text_to_share = "hello world";

        // create temp element
        var copyElement = document.createElement("span");
        copyElement.appendChild(document.createTextNode(text_to_share));
        copyElement.id = 'tempCopyToClipboard';
        angular.element(document.body.append(copyElement));

        // select the text
        var range = document.createRange();
        range.selectNode(copyElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // copy & cleanup
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        copyElement.remove();

        toastr.success('Link URL has been copyed to clipboard.');
    }

})

