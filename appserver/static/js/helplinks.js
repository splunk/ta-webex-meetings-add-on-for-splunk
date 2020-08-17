document.addEventListener("DOMNodeInserted", function (event) {

    if (event.target.className && event.target.className.startsWith("form-")) {
        h = event.target.querySelector('.help-block')
        if (h) {
            urlpat = "by clicking the below button";
            console.log("urlpat", urlpat)
            h.innerHTML = h.innerHTML.replace(urlpat, "<div><a href='#' class='btn btn-primary' onclick=clickEvent()>Generate Tokens</a>");
        }
    }
}, false);

function clickEvent() {
    let client_id = getInputValue('additional_parameters-client_id')
    let client_secret = getInputValue('additional_parameters-client_secret')

    var settings = {
        "url": "/en-US/splunkd/__raw/services/cisco-webex-meetings-oauth",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"

        },
        "data": $.param({ "client_id": client_id, "client_secret": client_secret }),
        // JSON.stringify() -> applicaiton/json
    };
    $.ajax(settings).done(function (response) {
        console.log("response", response["method"]);
    });
    // fetch / ajax / xhr
    let redirect_uri = "http://localhost:8000/en-US/splunkd/__raw/services/cisco-webex-meetings-oauth"
    url = `https://api.webex.com/v1/oauth2/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=all_read+meeting_modify+recording_modify+user_modify+setting_modify&state=abc&code_challenge=abc&code_challenge_method=plain`
    console.log("Clicked URL : " + url);
    window.open(url, 'popup', 'width=700,height=700');
    // window.open(url);
    return false;
}

function getInputValue(inputId) {
    let inputBox = document.getElementById(inputId);
    console.log(inputId, inputBox)
    inputBox.onkeyup = function () {
        let inputValue = this.value;
        console.log(inputId, inputValue)
        return inputValue
    }
    let inputValue = inputBox.onkeyup()
    return inputValue
}


