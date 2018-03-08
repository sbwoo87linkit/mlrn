app.controller('signup.ctrl', function ($scope, $rootScope, $state, $stateParams, $http, toastr, config, appContextService){

    var vm = this;
    vm.appContext = appContextService.context;

    vm.data = {
        // email: 'sdsn_korea@korea.ac.kr',
        email: config.userId,
        password: config.password,
        role: 'admin'
    }

    vm.roleChange = function(data) {
        // console.log('role', data);
        data.role === 'admin' ? data.email = config.userId : data.email = 'mlrn_korea_manager@korea.ac.kr' 
    }   

    vm.signup = function (user) {

        // admin 계정 :  sdsn_korea@korea.ac.kr 암호: admin1234
        console.log('user', user);

        // return;

         $http.post(vm.appContext.apiUrl + '/user/signup', user).then(function (res) {

            $state.go('signin')

        }, function (err) {
            console.log(err)
            var msg = 'Signup error.'
            if (err.status == 409) {
                msg = msg + ' Duplication. Email already exist.'
            }
            toastr.error(msg)
        })
    }


})
