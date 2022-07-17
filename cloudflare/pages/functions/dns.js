export async function onRequestPost(context) {
  var env = context.env.env
  if (env == "prod") {
    var apiUrl = "https://api.maketheinternetgo.com/dns?"
  } else {
    var apiUrl = "https://" + env + "-api.maketheinternetgo.com/dns?"
  };
  try {
    let input = await context.request.formData();
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    };
    console.log("preapi");
    let resp = await fetch(apiUrl + new URLSearchParams(output), {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      })
        .then((response) => response.text())
        .then((text) => {
          return text;
        })
        .catch((error) => console.error(error));
    return new Response(resp, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
