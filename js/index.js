/**
 * Created by Elaine on 10/11/2017.
 */

$(function () {
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
            var params={"id":condition}
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
        console.log($(e.target))
        console.log($(e.target))
        console.log($(e.target))
        console.log($(e.target))
        logd("ID=" + id);
        // 调用详情接口
        Vote.getDetails(id, getDetailsDone, getDetailsFailure)
    })


    // 点击投票 调用投票接口
    $('#detailWrapper').on("click", "#giveVote", function(e){
        console.log("点击投票")
        var id = $(e.target).data("id");
        console.log("Id="+id);
        Vote.getGiveVote(id, getGiveVoteDone, getGiveVoteFailure)
    })
    /* ******************callback function*********************** */
    /* getActivity */
    function getActivityDone(data) {
        logd('getActivity success');
        logd('Activity Data:');
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
        console.log("数据刷新了")
        // 渲染详情页数据
        console.log(data)
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
        console.log("投票成功")
        logd('getGiveVote success');
        logd('getGiveVote Data:' + JSON.stringify(data));
        showTip("投票成功！");
        // 刷新数据
        var id = $("#ticketCount").data("id")
        Vote.getDetails(id, getDetailsDone, getDetailsFailure)
    }

    function getGiveVoteFailure(err, errMsg) {
        loge('getGiveVote fail' + err);
        showTip("投票失败 " + errMsg);
    }


    /* ******************util*********************** */
    function showTip(tiptext) {
        tip.text(tiptext).show();
        setTimeout(function () {
            tip.text("").hide();
        },1000)
    }
});
