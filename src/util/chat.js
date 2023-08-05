
var config={
    accessTokenUrl:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials",
    baseUrl:"https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/",
    client_id:"****",
    client_secret:"****",
    accessToken:""
}

var getAccessToken = function(){

    uni.request({
        url: config.accessTokenUrl+"&client_id="+config.client_id+"&client_secret="+config.client_secret,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          config.accessToken = res.data.access_token;
        },
        fail: (err) => {
            console.log("get accessToken error:"+res.data);
        }
      });


}



  // api.js
  var createTextConversation = function createTextConversation(messages, successCallback, errorCallback) {
    uni.request({
      url: config.baseUrl+'chat/eb-instant?access_token='+config.accessToken,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        stream: false,
        messages:messages
      },
      success: (res) => {
        successCallback(res.data);
      },
      fail: (err) => {
        errorCallback(err);
      }
    });
  }



  module.exports = {
    getAccessToken:getAccessToken,
    createTextConversation:createTextConversation
  }
  