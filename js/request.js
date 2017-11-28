/**
 * Created by Elaine on 2017/11/12 15:33.
 *
 */

/**
 * Error codes.
 */
// var VOTEDdata_ERROR_UNKNOWN = -1;


 var VOTE_URL_BASE = "http://111.200.54.178:8882/vote/vote1/";
//	var VOTE_URL_BASE = "http://localhost:7773/vote/vote1/";

/* public information */
var logi = function(str) {
    console.log("[ElaineLog-I ----] " + str);
}

/* debug information */
var logd = function(str) {
    console.log("[ElaineLog-D ----] " + str);
}

/* errors */
var loge = function(str) {
    console.log("[ElaineLog-E ----] " + str);
}

var VOTEDdata = (function() {
    var VoteInstance;

    function createInstance() {
        logi("VOTEDdata instance created.");

        return {
            getActivity: getActivity,
            getContestants: getContestants,
            getDetails: getDetails,
            getRanking: getRanking,
            getGiveVote: getGiveVote
        };
    }


    var makeRequest = function(urlBase, url, param, done, failure) {
        logd("MakeRequest: url=" + urlBase + url + ", param=" + JSON.stringify(param));
        $.ajax({
            type: "POST",
            url: urlBase + url,
            data: param,
            // dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                try{
                    data = JSON.parse(data);
                }catch(e) {
                    console.log(e);
                    console.log(typeof data);
                }
                console.log(data);
                console.log(typeof data);
                if(data&&data.msg){
                    if(data.msg=="success"){
                        done(data);
                        return;
                    }else{
                        failure(data.code, data.data.text);
                        return;
                    }
                }else{
                    done(data);
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errorCode = parseInt(jqXHR.responseText);
                loge("MakeRequest: failed, errorCode=" + errorCode);
                failure(errorCode);
            }
        });
    }



    /**
     * Get activity data.
     */
    var getActivity = function(done, failure) {
        makeRequest(VOTE_URL_BASE, "activity", {}, done, failure);
    }

    /**
     * Get contestants data.
     */
    var getContestants = function(params, done, failure) {
        makeRequest(VOTE_URL_BASE, "membersList", params, done, failure);
    }

    /**
     * Get details of contestants.
     */
    var getDetails = function(params, done, failure) {
        makeRequest(VOTE_URL_BASE, "detail", params, done, failure);
    }

    /**
     * Get ranking.
     */
    var getRanking = function(done, failure) {
        makeRequest(VOTE_URL_BASE, "topVote", {},done, failure);
    }

    /**
     * Give Vote.
     */
    var getGiveVote = function(id, done, failure) {
        makeRequest(VOTE_URL_BASE, "giveVote", id, done, failure);
    }

    return {
        /**
         * Get the singleton instance.
         */
        getInstance: function() {
            if (!VoteInstance) {
                VoteInstance = createInstance();
            }
            return VoteInstance;
        }
    };

})();




var Vote = VOTEDdata.getInstance();

