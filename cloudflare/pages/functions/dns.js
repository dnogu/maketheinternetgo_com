export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    let output = {};
    // for (let [key, value] of input) {
    //   let tmp = output[key];
    //   if (tmp === undefined) {
    //     output[key] = value;
    //   } else {
    //     output[key] = [].concat(tmp, value);
    //   }
    // }
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output.set(key, value);
      }
    }
    console.log("pre params");
    var params = {};
    console.log("preloop");
    console.log(Object.entries(output))
    // for (const [key1, value1] of Object.entries(output)) {
    //   if (key1 == "inputFqdn") {
    //     params.set("host", value1);
    //   } else if (key1 == "inputRecordType") {
    //     params.set("querytype", value1);
    //   } else if (key1 == "inputDnsServer") {
    //     params.set("server",  value1);
    //   } else {
    //     params.set("wtf", "wtf");
    //   };
    // };
    let pretty = JSON.stringify(output, null, 2);
    console.log("Prefetch");
    fetch('https://dev-api.maketheinternetgo.com', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      params: JSON.stringify(params),
      })
      .then((response) => response.text())
      .then((text) => console.log(text))
      .catch((error) => console.error(error));
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
  }

// async function resolve(request) {
//   var params = new Map();
//   for (var [key, value] of request.entries()) {
//     if (key == "inputFqdn") {
//       map1.set("host", value);
//     } else if (key == inputRecordType) {
//       map1.set("querytype", value);
//     } else if (key == "inputDnsServer") {
//       map1.set("server",  value)
//     };
//   fetch('https://dev-api.maketheinternetgo.com', {
//     method: "GET",
//     mode: 'cors',
//     body: params,
//   })
//     .then((response) => response.text())
//     .then((text) => console.log(text))
//     .catch((error) => console.error(error));
//   }
// }