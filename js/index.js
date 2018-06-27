/*
@author eva in 2017-12-13
**/

//课件预览
// require('angular');
// require('jquery');
// require('layer');
// var pop = require('../../../static/js/common/pop');
// var publicFn = require('../../../public/js/public');
// require('./preview-coursewareService');
var previewCoursewareServiceModule = angular.module('previewCoursewareServiceModule', []);

previewCoursewareServiceModule.factory('previewCoursewareService', ["$http", "$q", function($http, $q) {
    return {
        //获取课件信息
        getCourseware: function(courseId, courseCoursewarePurpose) {
            var deferred = $q.defer();
            $http({
                    method: "GET",
                    url: '',
                    dataType: "json",
                    timeout: httpConfig.timeout,
                    headers: httpConfig.headerJSON
                })
                .success(function(data, status, headers, config) {
                    //假数据
                    data = {
                        "code": 200,
                        "data": [{
                            "keyId": "2a27f01b609f4d708ea454f6b3adff1e",
                            "courseCoursewareName": "高效能人士的七个习惯（162P 经典课程）.ppt",
                            "courseCoursewareUrl": "./assets/高效能人士的七个习惯（162P 经典课程）.ppt",
                            "courseCoursewareType": 1
                        }, {
                            "keyId": "4f6f5bcd1f074ae8ae386531c7407889",
                            "courseCoursewareName": "1.jpg",
                            "courseCoursewareUrl": "./assets/1.jpg",
                            "courseCoursewareType": 0
                        }, {
                            "keyId": "80a9090621b741f785eea4de30ff5003",
                            "courseCoursewareName": "7.mp3",
                            "courseCoursewareUrl": "./assets/7.mp4",
                            "courseCoursewareType": 0
                        }, {
                            "keyId": "5b5e2b01b6bc4a628b3d4fb4b7e17238",
                            "courseCoursewareName": "login.mp4",
                            "courseCoursewareUrl": "./assets/login.mp4",
                            "courseCoursewareType": 0
                        }]
                    };
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
                    //假数据
                    data = {
                        "code": 200,
                        "data": [{
                            courseCoursewarePicUrl: "./assets/1_1.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/2_2.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/6_6.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/4_4.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/5_5.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/3_3.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/3_11.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/7_7.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/1_9.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/2_10.jpg",
                        }, {
                            courseCoursewarePicUrl: "./assets/8_8.jpg",
                        }]
                    }
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    httpConfig.errorDeal(data, status, headers, config);
                });
            return deferred.promise;
        },
    }
}]);

var previewCoursewareModule = angular.module('previewCoursewareModule', ['previewCoursewareServiceModule']);

previewCoursewareModule.controller('previewCoursewareController', ['$scope', '$http', '$interval', '$sce', '$previewCoursewareServiceModule', function($scope, $http, $interval, $sce, $previewCoursewareServiceModule) {
    $scope.sce = $sce.trustAsResourceUrl;
    $scope.move_bottom;
    $scope.slideDotsNumber;


    $scope.slideNumber;
    $scope.coursewareList;
    $scope.coursewareImgList;
    $scope.coursewareImgListNumber;
    $scope.rangeValue = 0;
    //判断当前音频是否播放
    $scope.isPlay = false;
    //视频地址
    $scope.VideoCourseCoursewareUrl = '';

    //判断文件类型
    //ppt:1  word:2  图片:3  音频:4  视频:5  其他:6
    $scope.getFileSuffix = function(filename) {
        var ext = null;
        var docExt = new Array(".doc", ".docx"); //word文件的后缀名
        var imgExt = new Array(".png", ".jpg", ".jpeg", ".jpe", ".bmp", ".gif"); //图片文件的后缀名
        // var audioExt = new Array(".mp3", ".aac", ".wav", ".wma", ".ogg", ".wv", ".mp2"); //音频文件的后缀名
        var audioExt = new Array(".mp3"); //音频文件的后缀名
        // var videoExt = new Array(".mp4", ".rmvb", ".rm", ".wmv", ".avi", ".mkv", ".mpeg", ".mov", "flv"); //视频文件的后缀名
        var videoExt = new Array(".mp4"); //视频文件的后缀名
        var name = filename.toLowerCase();
        var i = name.lastIndexOf(".");
        if (i > -1) {
            var ext = name.substring(i);
            if ($scope.ifContain(ext, docExt)) {
                return 2
            } else if ($scope.ifContain(ext, imgExt)) {
                return 3
            } else if ($scope.ifContain(ext, audioExt)) {
                return 4
            } else if ($scope.ifContain(ext, videoExt)) {
                return 5
            } else {
                return 6
            }
        }
        return false
    }

    //判断数组是否包含某个值
    $scope.ifContain = function(data, array) {
        for (var i = 0; i < array.length; i++) {
            if (data == array[i]) {
                return true;
            }
        }
    }

    $scope.getFormatMinuteSeconds = function formatSeconds(value) {
            var theTime = parseInt(value); // 秒
            var theTime1 = 0; // 分
            if (theTime >= 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
            }
            if (theTime1 < 10) {
                theTime1 = "0" + theTime1
            }
            if (theTime < 10) {
                theTime = "0" + theTime
            }
            var result = theTime;
            if (parseInt(theTime1) > 0) {
                result = theTime1 + ":" + result;
            }
            return result;
        }
        //预览
    $scope.previewCourseware = function(courseId, courseCoursewarePurpose, courseItem, isMyclass) {

        $scope.topSlideIndex = 0;
        $scope.windowWidth = $(window).width();
        $scope.windowHeight = $(window).height();
        $scope.box_width = 0.8 * $scope.windowWidth;
        $scope.box_height = 0.92 * $scope.windowHeight;
        $scope.inner_width = 0.78 * $scope.box_width;
        $scope.inner_height = 0.73 * $scope.box_height;
        $scope.inner_bottom_width = 0.12 * $scope.box_width;
        $scope.inner_bottom_height = 0.12 * $scope.box_height;
        previewCoursewareService.getCourseware(courseId, courseCoursewarePurpose)
            .then(function(data) {
                if (data.code == 200 && data.data) {
                    // if (isMyclass) {
                    //     previewCoursewareService.getUpdateUserCourseStepPromise({
                    //         courseId: courseItem.keyId,
                    //         step: 0
                    //     }).then(function(data) {
                    //         if (data.code == 200) {
                    //             $scope.courseListInfo[courseItem.i].isDownloadCourseware = true;
                    //         }
                    //     })
                    // }

                    var Courseware = data.data;
                    //假数据
                    // var Courseware = [{
                    //     courseCoursewareType: 0,
                    //     courseCoursewareName: "高效能人士的七个习惯（162P 经典课程）.ppt",
                    //     keyId: 11111,
                    //     courseCoursewareUrl: "./assets/高效能人士的七个习惯（162P 经典课程）.ppt",


                    // }];
                    for (var i = 0; i < Courseware.length; i++) {
                        //区分非ppt的情况
                        if (!Courseware[i].courseCoursewareType) {
                            // Courseware[i].courseCoursewareName = "https://teenagercdn.speakhi.com/courseware/one2one/Module 1-Level 1/7820b8d5920e4d8d9f3504e327e7c991.mp4";

                            Courseware[i].courseCoursewareType = $scope.getFileSuffix(Courseware[i].courseCoursewareName);
                        }
                        Courseware[i].courseType = "";
                    }
                    $scope.coursewareList = Courseware;

                    if ($scope.coursewareList.length == 0) {
                        pop.surePop("该课程没有课件");
                    } else if ($scope.coursewareList.length == 1) {
                        if ($scope.coursewareList[0].courseCoursewareType == 1) {
                            $scope.previewInformationDetail($scope.coursewareList[0].keyId);
                        } else {
                            window.open($scope.coursewareList[0].courseCoursewareUrl, "_blank");
                        }
                    } else {
                        layer.open({
                            type: 1,
                            skin: 'preview-courseware-main',
                            content: $(".preview-courseware-main"),
                            title: "学习资料",
                            shade: 0.3,

                            yes: function(index) {
                                if (callback) {
                                    callback();
                                }
                                layer.close(index);
                            }
                        })
                        $(".preview-courseware-main-ul").perfectScrollbar();
                    }

                }
            })
        $scope.init();
    };

    //设置duration
    $scope.init = function() {
        setTimeout(function() {
                var audio = $(".showTimeControl audio");
                var audioDurationText = $(".showTimeControl .audio-duration")
                for (var i = 0; i < audio.length; i++) {
                    audioDurationText[i].innerHTML = $scope.getFormatMinuteSeconds(audio[i].duration);
                }
            }, 500)
            //根据滑块所在位置填充进度条
    }


    //预览详情课件
    $scope.previewInformationDetail = function(courseCoursewareId) {
        $scope.topSlideIndex = 0;
        layer.closeAll();
        $scope.move_bottom = 0;
        $scope.slideDotsNumber = 0;
        previewCoursewareService.getCoursewareImg(courseCoursewareId)
            .then(function(data) {
                if (data.code == 200) {
                    var CoursewareImg = data.data;
                    //依据获取的url地址命名里的序号排序
                    for (var i = 0; i < CoursewareImg.length; i++) {
                        var name = CoursewareImg[i].courseCoursewarePicUrl;
                        name = name.substring(name.lastIndexOf("_")).replace('_', '');
                        CoursewareImg[i].index = parseInt(name.substring(0, name.lastIndexOf("."))) - 1;
                    }
                    var imgList = [];
                    for (var k = 0; k < CoursewareImg.length; k++) {
                        for (var m = 0; m < CoursewareImg.length; m++) {
                            if (CoursewareImg[m].index == k) {
                                imgList[k] = CoursewareImg[m];
                            }
                        }
                    }
                    $scope.coursewareImgList = imgList;
                    $scope.coursewareImgListNumber = $scope.coursewareImgList.length;
                    $scope.slideNumber = [];
                    var slideNumber_ = Math.ceil($scope.coursewareImgListNumber / 8);
                    for (var j = 0; j < slideNumber_; j++) {
                        $scope.slideNumber[j] = j;
                    }
                    if (CoursewareImg.length < 8) {
                        $('.downPic').width($('.pic-slide'));
                    }
                    $('.preview-courseware-detail-main').css("display", "block").animate({
                        "left": "0",
                        "top": "0",
                        "width": "100%",
                        "height": "100%"
                    }, 300, function() {
                        $(this).find('.inner-content').css("display", "block")
                            .find('.preview-courseware-center').css({
                                "display": "block",
                                "width": $scope.box_width,
                                "height": $scope.box_height
                            });
                        $('.picBox').css({
                            "height": $scope.inner_height
                        });
                        $('.pic-slide li').css({
                            "width": $scope.inner_bottom_width,
                            "height": $scope.inner_bottom_height,
                            "marginLeft": 0.0025 * $scope.box_width,
                            "marginRight": 0.0025 * $scope.box_width,
                            "marginTop": 0.2 * $scope.inner_bottom_height,
                            "marginBottom": 0.2 * $scope.inner_bottom_height
                        });
                    })

                }
            })
    };

    //播放视频
    $scope.playVideoDetails = function(courseCoursewareUrl) {
        $scope.VideoCourseCoursewareUrl = courseCoursewareUrl;
        layer.closeAll();
        var videoDom = document.getElementById("videoDom");
        $('.preview-courseware-detail-main').css("display", "block").animate({
            "left": "0",
            "top": "0",
            "width": "100%",
            "height": "100%"
        }, 300, function() {
            $(this).find('.inner-content').css("display", "block")
                .find('.play-Video-center').css({
                    "display": "block",
                });
            videoDom.currentTime = 0;
            videoDom.play();
        })

    };


    /**
     * @method 播放音频
     * @param  {$event:事件对象(event/dom对象),type：事件类型}
     * @author  
     */

    $scope.playAudioDetails = function($event, type) {
        if (type == "event") {
            var target = $event.currentTarget;
        } else if (type == "target") {
            target = $event;
        }
        if ($(target).find("img.pause").hasClass("hidden")) {
            $scope.isPlay = true;
        } else {
            $scope.isPlay = false;
        }
        if (type == "target") {
            //点击进度条即默认播放
            $scope.isPlay = true;
        }
        // 暂停函数
        var allAudioDoms = document.querySelectorAll("audio.audioDom");
        var playBtnDom = document.querySelectorAll("img.play");
        var pauseBtnDom = document.querySelectorAll("img.pause");
        for (var j = 0; j < playBtnDom.length; j++) {
            playBtnDom[j].className = "play";
            pauseBtnDom[j].className = "pause hidden";
            allAudioDoms[j].pause();
        }

        var audioDom = $(target).siblings(".showTimeControl").find(".audioDom")[0];
        //播放
        if ($scope.isPlay) {
            $(target).find("img").removeClass("hidden");
            $(target).find("img.play").addClass("hidden");
            audioDom.play();
        }
        var controlDom = $(target).siblings(".showTimeControl").find(".control")[0];
        var progressDom = $(target).siblings(".showTimeControl").find(".progress")[0];
        console.log("$scope.isPlay", $scope.isPlay)
        clearInterval(timer);
        var timer = setInterval(function() {
            console.log("setInterval")
            let rate = parseInt(374 * audioDom.currentTime / audioDom.duration) - 5;
            controlDom.style.left = rate + "px";
            progressDom.style.width = rate + "px";
            if ($scope.isPlay == false || audioDom.currentTime == audioDom.duration) {
                clearInterval(timer);
                $(target).find("img").removeClass("hidden");
                $(target).find("img.pause").addClass("hidden");
            }
            if (audioDom.currentTime >= audioDom.duration) {
                audioDom.currentTime = 0;
                controlDom.style.left = "0px";
                progressDom.style.width = "0px";
                $scope.isPlay = false;
            }
        }, 1000);
    };

    //点击进度条
    $scope.playAudioShowVal = function($event) {
        var target = $event.currentTarget;
        //鼠标相对progress-bar的横向相对位移
        var offsetLeft = $event.clientX - target.getBoundingClientRect().left - 5;
        var controlDom = $(target).find(".control")[0];
        var progressDom = $(target).find(".progress")[0];
        controlDom.style.left = offsetLeft + "px";
        progressDom.style.width = offsetLeft + "px";
        var audioDom = $(target).siblings(".audioDom")[0];
        audioDom.currentTime = parseInt(audioDom.duration * offsetLeft / 374);
        // $scope.isPlay = false;
        var target_ = $(target).parent().siblings(".control-btn")[0];
        $scope.playAudioDetails(target_, "target");
    };

    //关闭预览
    $scope.closePreview = function() {
        $scope.topSlideIndex = 0;
        $('.preview-courseware-detail-main').css({
            "display": "none",
            "left": "50%",
            "top": "50%",
            "width": "0",
            "height": "0"
        }).find('.inner-content').css("display", "none").find('.play-Video-center').css("display", "none");
        $(".preview-courseware-center").css("display", "none");
        $scope.move_bottom = 0;
        $scope.slideDotsNumber = 0;
        $('.pic-slide').css("left", 0);
        $(".slideDots li").eq($scope.slideDotsNumber).addClass("chosen").siblings().removeClass("chosen");
        var videoDom = document.getElementById("videoDom");
        videoDom.pause();
    }

    //向右的按钮
    $scope.slideRightButton = function(number) {
        if (0 <= $scope.topSlideIndex && $scope.topSlideIndex < number - 1) {
            $scope.topSlideIndex += 1
        }
        if ($scope.move_bottom > (1 - $scope.coursewareImgListNumber)) {
            $scope.move_bottom--;
            $('.pic-slide li').eq(-$scope.move_bottom).addClass("chosen").siblings().removeClass("chosen");
            $('.pic-slide li span').eq(-$scope.move_bottom).addClass("chosen").parent().siblings().find("span").removeClass("chosen");
            if ($scope.move_bottom % 8 == 0) {
                $scope.slideDotsNumber++;

                $('.pic-slide').animate({
                    "left": parseInt($scope.move_bottom / 8) * $scope.box_width
                }, 500);
                $(".slideDots li").eq($scope.slideDotsNumber).addClass("chosen").siblings().removeClass("chosen");
            }
        }

    }

    //向左的按钮
    $scope.slideleftButton = function() {
        $scope.topSlideIndex > 0 && $scope.topSlideIndex--;
        if ($scope.move_bottom < 0) {
            $scope.move_bottom++;
            $('.pic-slide li').eq(-$scope.move_bottom).addClass("chosen").siblings().removeClass("chosen");
            $('.pic-slide li span').eq(-$scope.move_bottom).addClass("chosen").parent().siblings().find("span").removeClass("chosen");
            if ($scope.move_bottom % 8 == 7 || $scope.move_bottom % 8 == -7) {
                $scope.slideDotsNumber--;
                $('.pic-slide').animate({
                    "left": parseInt($scope.move_bottom / 8) * $scope.box_width
                }, 500);
                $(".slideDots li").eq($scope.slideDotsNumber).addClass("chosen").siblings().removeClass("chosen");
            }
        }

    }

    //点击图片跳转
    $scope.gotoPic = function(num, evt) {
        $scope.topSlideIndex = num;
        $scope.move_bottom = -num;
        var target = $(evt.currentTarget);
        target.addClass("chosen").siblings().removeClass("chosen");
        $('.pic-slide li span').eq(-$scope.move_bottom).addClass("chosen").parent().siblings().find("span").removeClass("chosen");
    }

    //点击下方按钮
    $scope.gotoPagePic = function(num, evt) {
        $scope.topSlideIndex = num * 8;
        var target = $(evt.currentTarget);
        $scope.slideDotsNumber = num;
        $scope.move_bottom = -num * 8;
        target.addClass("chosen").siblings().removeClass("chosen");
        $('.pic-slide li').eq(-$scope.move_bottom).addClass("chosen").siblings().removeClass("chosen");
        $('.pic-slide li span').eq(-$scope.move_bottom).addClass("chosen").parent().siblings().find("span").removeClass("chosen");
        $('.pic-slide').animate({
            "left": parseInt($scope.move_bottom / 8) * $scope.box_width
        }, 500);

    }

}])