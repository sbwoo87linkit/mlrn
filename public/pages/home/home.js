/**
 * Created by mac on 18/02/2017.
 */
app.controller('home.ctrl', function ($scope, boardService, appContextService) {


    var vm = this;
    vm.appContext = appContextService.context;


    // vm.apiUrl = vm.appContext.apiUrl;
    // vm.myInterval = 3000;
    // vm.noWrapSlides = false;
    // vm.active = 0;

    // MEETING OUTCOMES, NOTICE, REPORTS & PAPERS, MLRN ACTIVITIES

    vm.contents = [
        [{
            title: 'MEETING OUTCOMES',
            main_menu: 'focus',
            sub_menu: 'meeting_outcomes',
            sort: -1,
        }, {
            title: 'NOTICE',
            main_menu: 'news',
            sub_menu: 'notice',
            sort: 1,
        }],
        [{
            title: 'REPORTS & PAPERS',
            main_menu: 'resources',
            sub_menu: 'reports_papers',
            sort: 1,
        }, {
            title: 'MLRN ACTIVITIES',
            main_menu: 'news',
            sub_menu: 'activities',
            sort: 1,
        }]
    ];

    vm.contents2 = [{
        header: 'MEETING OUTCOMES',
        main_menu: 'focus',
        sub_menu: 'meeting_outcomes',
        sort: -1,
    }, {
        header: 'NOTICE',
        main_menu: 'news',
        sub_menu: 'notice',
        sort: -1,
    }, {
        header: 'REPORTS & PAPERS',
        main_menu: 'resources',
        sub_menu: 'reports_papers',
        sort: -1,
    }, {
        header: 'MLRN ACTIVITIES',
        main_menu: 'news',
        sub_menu: 'activities',
        sort: -1,
    }];

    // MLRN?,  Nexus, Thematic Groups, Contact
    vm.menus = [{
            title: 'MLRN?',
            main_menu: 'about',
            sub_menu: 'mlrn'
        },
        {
            title: 'Nexus',
            main_menu: 'focus',
            sub_menu: 'nexus'
        },
        {
            title: 'Thematic Groups',
            main_menu: 'focus',
            sub_menu: 'thematic_groups'
        },
        {
            title: 'Contact',
            main_menu: 'about',
            sub_menu: 'contact'
        },
    ];

    vm.getContents = function () {
        vm.contents2.forEach((element, index) => {
            // console.log('aaa', index, element)
            boardService.list(element.sub_menu, 1, 4, element.sort, '').then(
                function (res) {
                    // console.log('element.title', element.title);
                    // console.log('res.data', res.data)
                    // vm.notice = res.data.list[0];
                    console.log('index', index);
                    if (res.data.list.length) {
                        element._id = res.data.list[0]._id;
                        element.title = res.data.list[0].title;
                        element.list = res.data.list;
                        // console.log('res', element)
                    }
                    if (index === vm.contents2.length -1) {
                        // console.log('vm.contents2', vm.contents2)
                        vm.contents = _.chunk(vm.contents2, 2); 
                        console.log('vm.contents', vm.contents)
                        // var data = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13"];
                        // var data2 = _.chunk(data, 3); 
                        // console.log(data2)
                    }

                },
                function (err) {
                    console.log(err);
                }
            );
        });
    }
    vm.getContents();



    vm.getBanners = function (page) {
        vm.currentPage = page;
        boardService.list('main_banner', 1, 100, -1, '').then(
            function (results) {
                vm.slides = results.data.list;
                if (vm.slides.length) {
                    // $('#bannerCarousel').carousel({
                    //     interval: 5000
                    // })
                }
            },
            function (err) {
                console.log(err);
            }
        );
        boardService.list('link_banner', 1, 100, -1, '').then(
            function (results) {
                vm.links = results.data.list;
            },
            function (err) {
                console.log(err);
            }
        );

        // boardService.list('notice', 1, 5, '').then(
        //     function (results) {
        //         //   console.log(results);
        //         vm.notice = results.data.list[0];

        //     },
        //     function (err) {
        //         console.log(err);
        //     }
        // );

        // boardService.list('reports', 1, 1, '').then(
        //     function (results) {
        //         //   console.log(results);
        //         vm.report = results.data.list[0];

        //     },
        //     function (err) {
        //         console.log(err);
        //     }
        // );

        // boardService.list('issue_brief', 1, 4, '').then(
        //     function (results) {
        //         //   console.log(results);
        //         vm.issue_brief = results.data.list[0];

        //     },
        //     function (err) {
        //         console.log(err);
        //     }
        // );

        // boardService.list('activities', 1, 4, '').then(
        //     function (results) {
        //         //   console.log(results);
        //         vm.activity = results.data.list[0];

        //     },
        //     function (err) {
        //         console.log(err);
        //     }
        // );
    }
    vm.getBanners(vm.currentPage);


})