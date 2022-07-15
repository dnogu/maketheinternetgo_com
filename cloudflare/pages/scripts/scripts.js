var submitButton;
document.addEventListener('DOMContentLoaded', load);

function load() {
  submitButton = document.getElementById('submitButton');
  submitButton.onclick = validation;
}

function validation(event) {
  event.preventDefault();
  document.getElementById("error-message").innerHTML = "";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("error-inputFqdn").innerHTML = "";
  document.getElementById("error-inputDnsServer").innerHTML = "";
  document.getElementById("error-inputRecordType").innerHTML = "";

  const regex = {
    fqdn: /(?=^.{1,254}$)(^(?:(?!\d+\.)[a-zA-Z0-9_\-]{1,63}\.?)+(?:[a-zA-Z]{2,})$)/,
    dnsServer: /^\b(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b$/
    // password: /^\w+$/
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
  // console.log(formerror)

  if (recordType == "") {
    document.getElementById("error-inputRecordType").innerHTML = "How did you make this blank?\n\tIt's a dropdown!!!!!!";
    document.getElementById("inputRecordType").focus();
    formerror = true;
  }
  // console.log(formerror)

//   if (recordType) {
//     recordType = recordType.trim();
//   }

  if (dnsServer == "") {
    document.getElementById("error-inputDnsServer").innerHTML =
      "Server required";
    document.getElementById("inputDnsServer").focus();
    formerror = true;
  }
  // console.log(formerror)

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

  // var form = document.getElementById("dnsLookupForm");
  // // var formvalue = form;
  // var formdata = new FormData(form);
  // // console.log(document.getElementById("inputFqdn").value);
  // console.log(formdata.entries());
  // // for (var [key, value] of formdata.entries()) { 
  // //   console.log(key, value);
  // // }
  // fetch("/echo", {
  //   method: "POST",
  //   body: formdata
  // })
  //   .then((response) => response.text())
  //   .then((text) => console.log(text))
  //   .catch((error) => console.error(error));
}