app.constant('config', {
    appName: 'My App',
    appVersion: 1.0,
    pageTitle: 'MLRN',
    appTitle: 'Mid-Latitude Region Network',
    email: 'mlrn_ojeri@korea.ac.kr',
    userId: 'mlrn_ojeri@korea.ac.kr',
    password: 'admin1234',
    address1: '(02841) #317, East Bldg., College of Life Science, Korea University,',
    address2: 'Anam-ro 145, Seongbuk-gu, Seoul , KOREA',
    // apiUrl: 'http://127.0.0.1:1337',
    // apiUrl: 'http://ec2-13-125-112-144.ap-northeast-2.compute.amazonaws.com',
    apiUrl: 'http://mlrn.cafe24.com',
    menuArray: [{
            name: 'about',
            title: 'ABOUT',
            activeIndex: 0,
            list: [{
                    name: 'mlrn',
                    title: 'MLRN',
                    mode: 'page',
                    showTitle: false,
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'about_us',
                    title: 'ABOUT US',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'contact',
                    title: 'CONTACT US',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },
        {
            name: 'network',
            title: 'NETWORK',
            activeIndex: 0,
            list: [{
                    name: 'member',
                    title: 'MEMBER',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'partner',
                    title: 'PARTNER',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'group_networks',
                    title: 'GROUP NETWORKS',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'join_us',
                    title: 'JOIN US',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },

        {
            name: 'focus',
            title: 'FOCUS',
            activeIndex: 0,
            list: [{
                    name: 'nexus',
                    title: 'NEXUS',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'thematic_groups',
                    title: 'THEMATIC GROUPS',
                    mode: 'page',
                    titleRequired: false,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'meeting_outcomes',
                    title: 'MEETING OUTCOMES',
                    mode: 'board',
                    boardType: 'tabList',
                    // isAscending: true,
                    isTabList: true,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },
        {
            name: 'resources',
            title: 'RESOURCES',
            activeIndex: 0,
            list: [{
                    name: 'reports_papers',
                    title: 'REPORTS & PAPERS',
                    mode: 'board',
                    showContentInList: true,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    // fileRequired: true,
                    thumbnailRequired: true,
                },
                {
                    name: 'events',
                    title: 'EVENTS',
                    mode: 'board',
                    showContentInList: true,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    // fileRequired: true,
                    thumbnailRequired: true,
                },
            ]
        },

        /*

        NOTICE 게시판은 제목/날짜/no. 등 기본정보만 보이는 리스트형 게시판 (내용노출X)
        MLRN Activities, Issue Brief 게시판 스타일: 제목/ 내용 일부/ 만 보이도록 깔끔하게

        */


        {
            name: 'news',
            title: 'NEWS',
            activeIndex: 1,
            list: [{
                    name: 'notice',
                    title: 'NOTICE',
                    mode: 'board',
                    showContentInList: false,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
                {
                    name: 'activities',
                    title: 'ACTIVITIES',
                    mode: 'board',
                    showContentInList: true,
                    titleRequired: true,
                    contentRequired: true,
                    htmlEdit: true,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },
        {
            name: 'SETTINGS',
            title: 'SETTINGS',
            activeIndex: 0,
            adminRequired: true,
            list: [{
                    name: 'main_banner',
                    title: 'MAIN BANNER',
                    mode: 'board',
                    showContentInList: false,
                    titleRequired: true,
                    contentRequired: false,
                    htmlEdit: false,
                    imageRequired: true,
                    fileRequired: false,
                },
                {
                    name: 'link_banner',
                    title: 'LINK BANNER',
                    mode: 'board',
                    showContentInList: false,
                    titleRequired: true,
                    contentRequired: false,
                    urlRequired: true,
                    htmlEdit: false,
                    imageRequired: true,
                    fileRequired: false,
                },
                {
                    name: 'related_links',
                    title: 'RELATED LINKS',
                    mode: 'board',
                    showContentInList: false,
                    titleRequired: true,
                    contentRequired: false,
                    urlRequired: true,
                    htmlEdit: false,
                    imageRequired: false,
                    fileRequired: false,
                },
            ]
        },
    ],
});