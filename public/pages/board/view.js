
app.controller('board.view.ctrl', function ($scope, $rootScope, $window, $stateParams, boardService, toastr, $location, $ngConfirm, config, appContextService) {

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


    vm.delete = function () {

        $ngConfirm({
            boxWidth: '30%',
            useBootstrap: false,
            title: 'confirm',
            content: 'Delete it?',
            scope: $scope,
            buttons: {
                confirm: {
                    text: 'Delete',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {

                        boardService.delete($stateParams.articleId).then(
                            function (result) {
                                window.history.back();
                            }, function (err) {
                                alert(err);
                            }
                        )

                    }
                },
                cancel: {
                    text: 'Cancel',
                    btnClass: 'btn-orange',
                    // action: function (scope, button) {
                    // }
                },
            }
        });

    }

    boardService.get($stateParams.articleId).then(
        function (result) {
            // console.log(result);
            vm.item = result.data;
        }, function (err) {
            console.log(err);
        }
    )

    // console.log($location.$$url);
    // $scope.id = $location.$$url;

})
