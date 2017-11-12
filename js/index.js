/**
 * Created by Elaine on 10/11/2017.
 */

$(document).ready(function(){
    // tab切换
    $('#tabWrapper li').click(function (e) {
        $('#tabWrapper li').css('background','#ffc213');
        $(e.target).css('background','#393a9b');
    })
    // 调用全部参赛者接口 渲染数据



/* tab控制 **************************************据说这是一个很不错的选择*/
    // 全、部参赛者
    $('#allBtn').click(function (e) {
        $(".content").hide();
        $("#contentMain").show();
        // 调用全部参赛者接口 渲染数据

    })
    // 当前排名
    $('#bankingBtn').click(function (e) {
        $(".content").hide();
        $("#contentRanking").show();
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
    // 点击进详情
    $("contestantWrapper").on("click", "li", function(){
        $("contestantWrapper").hide();
        $("detailWrapper").show();
        // 调用详情接口
        // 渲染详情页数据
    })
});