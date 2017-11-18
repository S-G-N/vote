/**
 * Created by Elaine on 10/11/2017.
 */

$(function () {
    var h=$(window).height();
    $(window).resize(function() {
        if($(window).height()<h){
            $('.tabWrapper').hide();
        }
        if($(window).height()>=h){
            $('.tabWrapper').show();
        }
    });
    Vote.getActivity(getActivityDone, getActivityFailure)
    Vote.getContestants(null, getContestantsDone, getContestantsFailure)

    var tip = $("#tip");
    // tab切换
    $('#tabWrapper li').click(function (e) {
        $('#tabWrapper li').css('background','#ffc213');
        $(e.target).css('background','#393a9b');
    })

/* tab控制 ***************************************/
    // 全部参赛者
    $('#allBtn').click(function (e) {
        $(".content").hide();
        $("#contentMain").show();
        // 调用全部参赛者接口 渲染数据
        Vote.getContestants(null, getContestantsDone, getContestantsFailure)
        $("#contestantWrapper").show();
        $("#detailWrapper").hide();

    })

    // 当前排名
    $('#bankingBtn').click(function (e) {
        $(".content").hide();
        $("#contentRanking").show();
        // 调用排名接口
        Vote.getRanking(getRankingDone, getRankingFailure)
    })

    // 活动规则
    $('#ruleBtn').click(function (e) {
        $(".content").hide();
        $("#contentRule").show();
    })

    // 搜索
    $('#searchBtn').click(function (e) {
        var condition = $("#searchInput").val();
        if (condition) {
            // 调用搜索接口
            var params={"condition":condition}
            Vote.getContestants(params, getContestantsDone, getContestantsFailure)
        }else{
            showTip("请输入id")
        }
    })

    // 点击进详情
    $("#contestantWrapper").on("click", "li", function(e){
        // 参数id
        logi("进入详情")
        var id = $(e.target).data("id");
        console.log("点击首页投票按钮")
        logd("ID=" + id);
        var params={"id":id}

        if($(e.target).hasClass("voteBtn")){
            // 直接投票
            // 调用投票接口
            Vote.getGiveVote(params, getGiveVoteDone, getGiveVoteFailure)
            //刷新数据
            Vote.getContestants(null, getContestantsDone, getContestantsFailure)
        }else{
            // 进入详情
            Vote.getDetails(params, getDetailsDone, getDetailsFailure)
        }



        // 调用详情接口

    })

    // 点击首页投票按钮
    // $(".voteBtn").on("click",function(e){
    //     e.stopPropagation();、
    //     // 参数id
    //     var id = $(e.target).data("id");
    //     console.log("点击首页投票按钮")
    //     logd("ID=" + id);
    //     var params={"id":id};
    //     // 调用投票接口
    //     Vote.getGiveVote(params, getGiveVoteDone, getGiveVoteFailure)
    //     //刷新数据
    //     Vote.getDetails(params, getDetailsDone, getDetailsFailure)
    // })

    // 点击详情页投票
    $('#detailWrapper').on("click", "#giveVote", function(e){
        logd("点击投票")
        var id = $(e.target).data("id");
        logd("Id="+id);
        var params={"id":id};
        Vote.getGiveVote(params, getGiveVoteDone, getGiveVoteFailure)
    })
    /* ******************callback function*********************** */
    /* getActivity */
    function getActivityDone(data) {
        logd('getActivity success');
        logd('Activity Data:');
        console.log(data)
        console.log(typeof data)
        console.log(data.data.manage.endTime)
        var date =new Date(data.data.manage.endTime);
        data.y = date.getFullYear();
        data.M = date.getMonth() + 1;
        data.d = date.getDate();
        data.h = date.getHours();
        data.m = date.getMinutes();
        data.s = date.getSeconds();
        console.log(data.data.manage.content)
        $("#activityContent").html(data.data.manage.content)
        var html = template('tep_activity', data);
        document.getElementById('activity').innerHTML = html;
    }

    function getActivityFailure(err, errMsg) {
        logd('getActivity fail');
        showTip("服务器繁忙..." + errMsg);
    }

    /* getContestants */
    function getContestantsDone(data) {
        logd('getContestants success');
        $("#contestantWrapper").show();
        $("#detailWrapper").hide();
        var nowData = {"list": data};
        var html = template('tep_contestantWrapper', nowData);
        document.getElementById('contestantWrapper').innerHTML = html;
    }

    function getContestantsFailure (err, errMsg) {
        logd('getContestants fail' + err);
        showTip("服务器繁忙..." + errMsg);
    }

    /* getDetails */
    function getDetailsDone(data) {
        $("#contestantWrapper").hide();
        $("#detailWrapper").show();
        logd('getDetails success');
        logd("数据刷新了")
        // 渲染详情页数据
        logd(data)
        var html = template('tep_detailWrapper', data);
        document.getElementById('detailWrapper').innerHTML = html;
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
    function getGiveVoteDone(data) {
        logd("投票成功")
        logd('getGiveVote success');
        logd('getGiveVote Data:' + JSON.stringify(data));
        showTip("投票成功！");
        if(data.code=='000000'){
            //成功// 刷新数据
            var id = $("#ticketCount").data("id")
            var params={"id":id}
            Vote.getDetails(params, getDetailsDone, getDetailsFailure)
        }else if(data.code=='000001'){
            //已经投过
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
