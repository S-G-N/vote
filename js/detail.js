/**
 * Created by Elaine on 10/11/2017.
 */

$(function () {
    var isSearch = false;
    var h=$(window).height();
   /* var id = window.location.search;
    if(id.length>1){
    id = id.substring(4, id.length);
    if(id.indexOf("&fr")>-1){
    	id = id.split("&fr")[0];//浏览器里自动在邀请码后加上了&from=
        }
    }
    var params={"id":id}*/
    $(window).resize(function() {
        if($(window).height()<h){
            $('.tabWrapper').hide();
        }
        if($(window).height()>=h){
            $('.tabWrapper').show();
        }
    });
    Vote.getActivity(getActivityDone, getActivityFailure)
//    Vote.getDetails(params, getDetailsDone, getDetailsFailure)
//    Vote.getContestants(null, getContestantsDone, getContestantsFailure)

    var tip = $("#tip");
    // tab切换
   /* $('#tabWrapper li').click(function (e) {
        $('#tabWrapper li').css('background','#ffc213');
        $(e.target).css('background','#393a9b');
    })*/
    $('#tabWrapper').on("click","li",function (e) {
        $('#tabWrapper li').css('background','#ffc213');
        $("#"+$(this).data("itemid")).css('background','#393a9b');
    })

/* tab控制 ***************************************/
    // 全部参赛者
    $('#allBtn').click(function (e) {
        $(".content").hide();
        $("#contentMain").show();
        // 调用全部参赛者接口 渲染数据
//        $("#detailWrapper").show();
        window.location.href = "vote1/index";
    })

    // 当前排名
    $('#bankingBtn').click(function (e) {
        $(".content").hide();
        $("#contentRanking").show();
        // 调用排名接口
        //Vote.getRanking(getRankingDone, getRankingFailure)
        window.location.href = "vote1/index?action=banking";
    })

    // 活动规则
    $('#ruleBtn').click(function (e) {
        $(".content").hide();
        $("#contentRule").show();
    })

    
    // 点击详情页投票
    $('#detailWrapper').on("click", "#giveVote", function(e){
        logd("点击投票")
        var id = $(e.target).data("id");
        logd("Id="+id);
        var params={"id":id};
        Vote.getGiveVote(params, getGiveVoteInDetailDone, getGiveVoteFailure)
    })
    /* ******************callback function*********************** */
    /* getActivity */
    function getActivityDone(data) {
        logd('getActivity success');
        logd('Activity Data:');
//        console.log("showShareImg="+data.data.manage.showShareImg)
//        console.log(data)
//        console.log(typeof data)
//        console.log(data.data.manage.endTime)
        var date =new Date(data.data.manage.endTime);
        data.y = date.getFullYear();
        data.M = date.getMonth() + 1;
        data.d = date.getDate();
        data.h = date.getHours();
        data.m = date.getMinutes();
        data.s = date.getSeconds();
//        console.log(data.data.manage.content)
        
        $("#activityContent").html(data.data.manage.content)
        $("#shareImg").attr("src",data.data.manage.showShareImg)
        $("#banner").attr("src",data.data.manage.showBackground)
        $("#body").css("background-image","url("+data.data.manage.showCover+")")
        var html = template('tep_activity', data);
        document.getElementById('activity').innerHTML = html;
    }

    function getActivityFailure(err, errMsg) {
        logd('getActivity fail');
        showTip("服务器繁忙..." + errMsg);
    }


    /* getDetails */
    function getDetailsDone(data) {
        $("#detailWrapper").show();
        logd('getDetails success');
        logd("数据刷新了")
        // 渲染详情页数据
//        var html = template('tep_detailWrapper', data);
//        document.getElementById('detailWrapper').innerHTML = html;
    }

    function getDetailsFailure(err, errMsg) {
        loge('getDetails fail' + err);
        showTip("服务器繁忙..." + errMsg);
    }

    /* getRanking */
    function getRankingDone(data) {
        logd('getRanking success');
        logd('getRanking Data:' + JSON.stringify(data));
        var nowData = {"list": data};
        var html = template('tep_contentRanking', nowData);
        document.getElementById('contentRanking').innerHTML = html;
    }

    function getRankingFailure(err, errMsg) {
        loge('getRanking fail' + err);
        showTip("服务器繁忙..."  + errMsg);
    }

    /* getGiveVote */
    function getGiveVoteInDetailDone(data) {
        logd("详情页投票成功")
        logd('getGiveVote success');
        console.log(data);
        if(data.code=='000000'){
            showTip(data.data.text);
            // 成功// 刷新数据
            var id = $("#giveVote").data("id")
            var params={"id":id}
            document.getElementById('ticketCount').innerText=data.data.ticketCount;
//            Vote.getDetails(params, getDetailsDone, getDetailsFailure)
        }else if(data.code=='000001'){
            //已经投过
            showTip(data.data.text);
        }else if(data.code=='000002'){
            //没有投票选手
            showTip(data.data.text);
        }
    }

    function getGiveVoteDone(data) {
        logd("投票成功")
        logd('getGiveVote success');
        logd('getGiveVote Data:' + JSON.stringify(data));
        if(data.code=='000000'){
            showTip(data.data.text);
            //成功// 刷新数据
            var id = $("#giveVote").data("id")
            var params={"id":id}
            console.log(params)
            /* *
            * 判断刷新哪部分数据
            * 首页
            * 搜索结果
            * */
            if(!isSearch){
                Vote.getContestants(null, getContestantsDone, getContestantsFailure)
            }else{
                Vote.getContestants({"condition":id}, getContestantsDone, getContestantsFailure)
            }
        }else if(data.code=='000001'){
            //已经投过
            showTip(data.data.text);
        }else if(data.code=='000002'){
            //没有投票选手
            showTip(data.data.text);
        }
    }

    function getGiveVoteFailure(err, errMsg) {
        loge('getGiveVote fail' + err);
        showTip(errMsg);
    }


    /* ******************util*********************** */
    function showTip(tiptext) {
        tip.text(tiptext).show();
        setTimeout(function () {
            tip.text("").hide();
        },1000)
    }
})
