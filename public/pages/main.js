app.controller('main.ctrl', function ($scope, userService, boardService, appContextService, toastr, config) {

    var vm = this;
    vm.appContext = appContextService.context;
    vm.appContext.pageTitle = config.pageTitle;
    vm.appContext.appTitle = config.appTitle;
    vm.appContext.email = config.email;
    vm.appContext.address1 = config.address1;
    vm.appContext.address2 = config.address2;
    vm.appContext.apiUrl = config.apiUrl;

    vm.appContext.menuArray = angular.copy(config.menuArray);
    if (!vm.appContext.user || vm.appContext.user.role != 'admin') {
        _.remove(vm.appContext.menuArray, {
            adminRequired: true
        });
    }

    userService.list().then(function (res) {
        vm.appContext.users = res.data;
        // if (!res.data.length) {
        //     toastr.info('ctrl. No admin users are registered.')
        // }
    });

    vm.appContext.styleName = 'green.theme.css';

    vm.changeStyle = function (styleName) {
        vm.appContext.styleName = styleName + '.css';
    };

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        vm.appContext.isLocalhost = true;
    }

    $scope.main = {};

    boardService.list('related_links', 1, 100, -1, '').then(
        function (results) {
            $scope.main.relatedLinks = results.data.list;
        },
        function (err) {
            console.log(err);
        }
    );



})