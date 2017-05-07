

function VerioCheck(API_KEY, API_AUTH) {	
  this.API_KEY = API_KEY;
  this.API_AUTH = API_AUTH;
  this.API_URL = "https://www.veriocheck.com/api/v1/";
  
	callAPI(this, "isKeyPublic", null, function(err, resp){
		if(!err && resp != null){
			if(resp.isKeyPublic == false){
			  alert("VerioCheck Error: Warning! You have set your secret API key in a public client-side code. Please use your public key!");
			}
		}
	});
}

VerioCheck.prototype.addressCheck = function(params, callback){
	callAPI(this, "address", params, function(err, resp){
		callback(err, resp);
		return;	
	});
};


VerioCheck.prototype.smsVerifyCode = function(params, callback){
	callAPI(this, "sms_verifycode", params, function(err, resp){
		callback(err, resp);
		return;	
	});
};


VerioCheck.prototype.nameCheck = function(params, callback){
	callAPI(this, "namecheck", params, function(err, resp){
		callback(err, resp);
		return;	
	});
};

VerioCheck.prototype.emailCheck = function(params, callback){
	callAPI(this, "emailcheck", params, function(err, resp){
		callback(err, resp);
		return;	
	});
};

VerioCheck.prototype.ipCheck = function(params, callback){
	callAPI(this, "ipcheck", params, function(err, resp){
		callback(err, resp);
		return;	
	});
};


function callAPI(thisClass, apimethod, params, callback){

	var serializedParams = "?publickey=" + thisClass.API_KEY + "&auth=" + thisClass.API_AUTH + "&";
	if(params != null){
			serializedParams += Object.keys(params).map(function(k) {
											 return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
										}).join('&');
	}

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
					callback(null, JSON.parse(xmlhttp.responseText));
           }else{
               callback(xmlhttp.status, xmlhttp.responseText);
           }
        }
    };

	 xmlhttp.open("GET", thisClass.API_URL + apimethod + '/' + serializedParams, true);
    xmlhttp.send();

};
