
app.controller('board.page.ctrl', function ($scope, $rootScope, $window, $stateParams, boardService,  toastr, $location, $ngConfirm, appContextService, config) {

    // if ($stateParams.articleType === 'un-sdsn') $scope.viewTitle = "UN SDSN 소식";
    // if ($stateParams.articleType === 'korea-sdsn') $scope.viewTitle = "Korea SDSN 소개";

    // $rootScope.menu = $window.localStorage.getItem('menu');
    // $scope.viewTitle = $window.localStorage.getItem('boardTitle');
    // $scope.apiUrl = vm.appContext.apiUrl;

    // $rootScope.menu = menuService.get($stateParams).menu;
    // $scope.viewTitle = menuService.get($stateParams).boardTitle;

    // console.log($rootScope.menu);
    // console.log($stateParams.articleType);

    var vm = this;
    vm.appContext = appContextService.context;


    vm.delete = function (id) {

        $ngConfirm({
            boxWidth: '30%',
            useBootstrap: false,
            title: 'Delete confirm',
            content: 'Delete it?',
            scope: $scope,
            buttons: {
                confirm: {
                    text: 'delete',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {

                        boardService.delete(id).then(
                            function (result) {
                                // window.history.back();
                                getPage();
                            }, function (err) {
                                alert(err);
                            }
                        )

                    }
                },
                cancel: {
                    text: 'cancel',
                    btnClass: 'btn-orange',
                    // action: function (scope, button) {
                    // }
                },
            }
        });

    }

    var getPage = function() {
        boardService.getPage($stateParams.sub_menu).then(
            function (result) {
                // console.log(result);
                vm.item = result.data;
            }, function (err) {
                console.log(err);
            }
        )
    }

    getPage();
    // console.log($location.$$url);
    // $scope.id = $location.$$url;

})
