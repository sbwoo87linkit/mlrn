/**
 * Created by mac on 18/02/2017.
 */
app.controller('home.ctrl', function ($scope, boardService, appContextService) {


    console.log('home ctrl')

    var vm = this;
    vm.appContext = appContextService.context;


    // vm.apiUrl = vm.appContext.apiUrl;
    // vm.myInterval = 3000;
    // vm.noWrapSlides = false;
    // vm.active = 0;


    vm.load = function (page) {
        vm.currentPage = page;
        boardService.load('main_banner', 1, 5, '').then(
            function (results) {
                vm.slides = results.data.list;
                if (vm.slides.length) {
                    $('#bannerCarousel').carousel({
                        interval: 5000
                    })
                }
            },
            function (err) {
                console.log(err);
            }
        );
        boardService.load('link_banner', 1, 100, '').then(
            function (results) {
                // vm.links = results.data.list;
                vm.links = [];
                let count = 5;
                for (let i =0; i < results.data.list.length; i++) {
                    if (i % count === 0) {
                        vm.links.push([]);
                    }
                    // console.log('vm.links', vm.links)
                    vm.links[Math.floor(i/count)].push(results.data.list[i]);
                }
                console.log('vm.links', vm.links)
                if (vm.links.length) {
                    $('#linkCarousel').carousel({
                        interval: 5000
                    })
                }
            },
            function (err) {
                console.log(err);
            }
        );

        boardService.load('notice', 1, 5, '').then(
            function (results) {
                //   console.log(results);
                vm.notice = results.data.list[0];

            },
            function (err) {
                console.log(err);
            }
        );

        boardService.load('reports', 1, 1, '').then(
            function (results) {
                //   console.log(results);
                vm.report = results.data.list[0];

            },
            function (err) {
                console.log(err);
            }
        );

        boardService.load('issue_brief', 1, 4, '').then(
            function (results) {
                //   console.log(results);
                vm.issue_brief = results.data.list[0];

            },
            function (err) {
                console.log(err);
            }
        );

        boardService.load('activities', 1, 4, '').then(
            function (results) {
                //   console.log(results);
                vm.activity = results.data.list[0];

            },
            function (err) {
                console.log(err);
            }
        );
    }

    // initial load & reset
    vm.load(vm.currentPage);

    // $('#media').carousel({
    //     // pause: true,
    //     interval: 50000,
    //     // interval: false,
    // });



    $(function () {
        // $('[data-toggle="tooltip"]').tooltip()


        // $('#myCarousel').on('slide', function (e) {
        //     var slideFrom = $(this).find('.active').index();
        //     var slideTo = $(e.relatedTarget).index();
        //     console.log(slideFrom + ' => ' + slideTo);
        // });



    })

})