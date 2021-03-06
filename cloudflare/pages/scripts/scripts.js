var submitButton;
document.addEventListener('DOMContentLoaded', load);

function load() {
  submitButton = document.getElementById('submitButton');
  submitButton.onclick = validation;
}

async function validation(event) {
  event.preventDefault();
  document.getElementById("error-message").innerHTML = "";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("error-inputFqdn").innerHTML = "";
  document.getElementById("error-inputDnsServer").innerHTML = "";
  document.getElementById("error-inputRecordType").innerHTML = "";

  const regex = {
    fqdn: /(?=^.{1,254}$)(^(?:(?!\d+\.)[a-zA-Z0-9_\-]{1,63}\.?)+(?:[a-zA-Z]{2,})$)/,
    dnsServer: /^\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b$/
  };
  var fqdn = document.getElementById("inputFqdn").value;
  var dnsServer = document.getElementById("inputDnsServer").value;
  var recordType = document.getElementById("inputRecordType").value;
  var formerror = false;

  if (!regex.fqdn.test(fqdn)) {
    document.getElementById("error-inputFqdn").innerHTML = "Enter Valid FQDN";
    document.getElementById("inputFqdn").focus();
    formerror = true;
  }

  if (recordType == "") {
    document.getElementById("error-inputRecordType").innerHTML = "How did you make this blank?\n\tIt's a dropdown!!!!!!";
    document.getElementById("inputRecordType").focus();
    formerror = true;
  }


  if (dnsServer == "") {
    document.getElementById("error-inputDnsServer").innerHTML =
      "Server required";
    document.getElementById("inputDnsServer").focus();
    formerror = true;
  }

  if (((!regex.dnsServer.test(dnsServer)) && (dnsServer != "default") && (dnsServer != ""))) {
    document.getElementById("error-inputDnsServer").innerHTML =
    "Invalid Server Address";
    formerror = true;
  }

  if (formerror) {
    var error_message = document.getElementById("error-message");
    error_message.style.display = "block";
    error_message.innerHTML =
      "There is error on Form !!! Please Correct it before submitting again";
    return false;
  }
  var form = document.getElementById("dnsLookupForm");
  var formdata = new FormData(form);
  var resp = await fetch(window.location.href+"api/dns", {
    method: "POST",
    mode: 'cors',
    body: formdata,
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => console.error(error));
  console.log(resp);
  // document.getElementById('responseHeading').innerHTML ="<h3>" + resp.inputFqdn + "</h3>";
  document.getElementById('recordType').innerHTML ="<h5 class=\"card-title\" style=\"text-align:center\">Results</h5><ul id=\"records\"></ul>";
  let list = await document.getElementById("records");
  
  await resp.response.forEach((item)=>{
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  })
  document.getElementById('responseBox').style.display = "block";
}

function windowload() {
  if ((window.location.port == 80) || (window.location.port == 443)) {
      document.getElementById("navbarLink").setAttribute("href", window.location.protocol + "//" + window.location.hostname);
  } else {
    document.getElementById("navbarLink").setAttribute("href", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port);
  };
  var navLinkButton = document.getElementById("navbarLink");
  console.log(navLinkButton);
}

function getIP(json) {
  console.log("My public IP address is: ", json);
  console.log(document.getElementById("myIpAddress"));
  document.getElementById("myIpAddress").innerHTML = json.ip;
  document.getElementById('myIpAddressBlock').style.display = "block"
  // document.write("My public IP address is: ", json.ip);
}

function onLoadGetIP() {
  var el = document.createElement('script');
  el.src = "https://api.ipify.org?format=jsonp&callback=getIP"
  document.body.append(el)
}

