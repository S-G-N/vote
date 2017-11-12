/**
 * Created by Elaine on 10/11/2017.
 */

$(function () {
    console.log(111111)
    Vote.getActivity(getActivityDone, getActivityFailure)
    Vote.getContestants(getContestantsDone, getContestantsFailure)




    // Session
    // if (!dfData.getSessionData("isFirstRun")) {
    //     dfData.setSessionData("isFirstRun", "true");
    //     $("#welcome").show();
    // }
    
    // tab切换
    $('#tabWrapper li').click(function (e) {
        $('#tabWrapper li').css('background','#ffc213');
        $(e.target).css('background','#393a9b');
    })



/* tab控制 ***************************************/
    // 全、部参赛者
    $('#allBtn').click(function (e) {
        $(".content").hide();
        $("#contentMain").show();
        // 调用全部参赛者接口 渲染数据
        Vote.getContestants(getContestantsDone, getContestantsFailure)

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
        var text = $("#searchInput").val();
        if (text) {
            // 调用搜索接口
        }
    })
    // 投票
    $('#voteBtn').click(function (e) {
            // 调用投票接口
            // 参数id
            var id = 1;
            Vote.getGiveVote(id, getGiveVoteDone, getGiveVoteFailure)
    })
    // 点击进详情
    $("contestantWrapper").on("click", "li", function(){
        $("contestantWrapper").hide();
        $("detailWrapper").show();
        // 调用详情接口
        Vote.getDetails(getDetailsDone, getDetailsFailure)
        // 渲染详情页数据
    })
    
    /* ******************callback function*********************** */
    /* getActivity */
    function getActivityDone(data) {
        logd('getActivity success');
        logd('Activity Data:' + JSON.stringify(data));
        var html = template('tep_activity', data);
        document.getElementById('activity').innerHTML = html;
    }

    function getActivityFailure(data) {
        logd('getActivity fail');
    }

    /* getContestants */
    function getContestantsDone(data) {
        logd('getContestants success');
        console.log(data)
        var html = template('tep_contestantWrapper', data);
        document.getElementById('contestantWrapper').innerHTML = html;
    }

    function getContestantsFailure(data) {
        logd('getActivity fail');
    }

    /* getDetails */
    function getDetailsDone(data) {
        logd('getDetails success');
        logd('getDetails Data:' + JSON.stringify(data));
        // var html = template('tep_activity', data);
        // document.getElementById('activity').innerHTML = html;
    }

    function getDetailsFailure(data) {
        logd('getDetails fail');
    }

    /* getRanking */
    function getRankingDone(data) {
        logd('getRanking success');
        logd('getRanking Data:' + JSON.stringify(data));
        // var html = template('tep_activity', data);
        // document.getElementById('activity').innerHTML = html;
    }

    function getRankingFailure(data) {
        logd('getRanking fail');
    }

    /* getGiveVote */
    function getGiveVoteDone(data) {
        logd('getGiveVote success');
        logd('getGiveVote Data:' + JSON.stringify(data));
        // var html = template('tep_activity', data);
        // document.getElementById('activity').innerHTML = html;
    }

    function getGiveVoteFailure(data) {
        logd('getGiveVote fail');
    }
});