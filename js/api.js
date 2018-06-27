require('angular');
var httpConfig = require('../../../public/js/httpConfig');

var previewCoursewareServiceModule = angular.module('previewCoursewareServiceModule', []);

previewCoursewareServiceModule.factory('previewCoursewareService', ["$http", "$q", function($http, $q) {
    return {
        //获取课件信息
        getCourseware: function(courseId, courseCoursewarePurpose) {
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: '/api/speakhiTeenager/v1/CourseCourseware?courseId=' + courseId + '&courseCoursewarePurpose=' + courseCoursewarePurpose,
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON
                })
                .success(function(data, status, headers, config) {
                    // data = {
                    //     "code": 200,
                    //     "data": [{
                    //         "keyId": "2a27f01b609f4d708ea454f6b3adff1e",
                    //         "courseCoursewareName": "robot_framework学习心得.ppt",
                    //         "courseCoursewareUrl": "https://teenagertestcdn.speakhi.com/courseware/one2many/course_type102/0853b97ec744487fadb526a3b99f5a85.ppt",
                    //         "courseCoursewareType": 1
                    //     }, {
                    //         "keyId": "4f6f5bcd1f074ae8ae386531c7407889",
                    //         "courseCoursewareName": "QQ图片20170705185520.png",
                    //         "courseCoursewareUrl": "https://teenagertestcdn.speakhi.com/courseware/one2many/course_type102/9802712225da407b9448f3a37378f712.png",
                    //         "courseCoursewareType": 0
                    //     }, {
                    //         "keyId": "5b5e2b01b6bc4a628b3d4fb4b7e17238",
                    //         "courseCoursewareName": "QQ图片20171108145356.png",
                    //         "courseCoursewareUrl": "https://teenagertestcdn.speakhi.com/courseware/one2many/course_type102/e4895319736e41de899aa618dafb0135.png",
                    //         "courseCoursewareType": 0
                    //     }, {
                    //         "keyId": "80a9090621b741f785eea4de30ff5003",
                    //         "courseCoursewareName": "QQ图片20170626162958.jpg",
                    //         "courseCoursewareUrl": "https://teenagertestcdn.speakhi.com/courseware/one2many/course_type102/66140c6640a948cca16abad85e73dc83.jpg",
                    //         "courseCoursewareType": 0
                    //     }]
                    // };
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },

        //获取课件信息-ES
        getCoursewareES: function(courseId) {
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: '/api/speakhiTeenager/v1/CourseCourseware/ES?courseId=' + courseId,
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },

        //获取ppt图片地址
        getCoursewareImg: function(courseCoursewareId) {
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: '/api/speakhiTeenager/v1/CourseCoursewarePic?courseCoursewareId=' + courseCoursewareId,
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },
        //获取ppt图片地址
        getCoursewareImgES: function(courseCoursewareId) {
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: '/api/speakhiTeenager/v1/CourseCoursewarePic/ES?courseCoursewareId=' + courseCoursewareId,
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },

        //更新下载状态
        getUpdateUserCourseStepPromise: function(obj, name) {
            var deferred = $q.defer();
            $http({
                    method: "POST",
                    url: '/ucenter/updateUserCourseStep',
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON,
                    data: obj
                })
                .success(function(data, status, headers, config) {
                    httpConfig.successDeal(data, status, headers, config, name);
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },
    }
}]);