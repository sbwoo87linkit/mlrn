
app.controller('board.list.ctrl', function ($scope, $rootScope, $window, $stateParams, boardService, appContextService, toastr, $log,  $ngConfirm) {

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


    vm.data = { "searchText": "" };


    vm.pagination = {
        maxSize: 5,
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 10,

    };

    vm.load = function (page) {

        // let sort = 
        boardService.list($stateParams.sub_menu, page, vm.pagination.itemsPerPage, vm.sub_menu.isAscending ? 1 : -1, vm.data.searchText).then(
            function (res) {
                // console.log('res', res);
                vm.items = res.data.list;
                vm.item = vm.items[0];
                if (vm.item) {
                    vm.tabId = vm.item._id;
                }
                // vm.items = res.data;
                // console.log('res....', res)
                vm.pagination.totalItems = res.data.count;
                if ($stateParams.sub_menu === 'related_links') {
                    console.log('related_links......', $scope.main.relatedLinks);
                    $scope.main.relatedLinks = vm.items;
                    console.log('related_links......', $scope.main.relatedLinks);
                }
            },
            function (err) {
                console.log(err);
            }
        );
    }

    // initial load & reset
    vm.load(vm.currentPage);

    vm.pageChanged = function () {
        console.log('Page changed to: ' + vm.pagination.currentPage);
        vm.load(vm.pagination.currentPage);
    };

    vm.search = function () {
        vm.pagination.currentPage = 1;
        vm.load(vm.pagination.currentPage);
    }

    vm.reset = function () {
        vm.pagination.currentPage = 1;
        vm.data.searchText = "";
        vm.load(vm.pagination.currentPage);
    }

    // vm.delete = function () {
    //     // alert('delete')
    //     // console.log(vm.data.selectedItem)

    //     boardService.delete(vm.data.selectedItem._id).then(
    //         function (result) {
    //             // window.history.back();
    //             vm.load(vm.currentPage);
    //         }, function (err) {
    //             alert(err);
    //         }
    //     )
    // }

    vm.delete = function (item) {

                        console.log(item)

                        $ngConfirm({
            boxWidth: '30%',
            useBootstrap: false,
            title: 'Confirm',
            content: 'Delete it?',
            // scope: vm,
            buttons: {
                confirm: {
                    text: 'Delete',
                    btnClass: 'btn-blue',
                    action: function (scope, button) {


                        boardService.delete(item._id).then(
                            function (result) {
                                window.history.back();
                            }, function (err) {
                                console.log(err);
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

})
