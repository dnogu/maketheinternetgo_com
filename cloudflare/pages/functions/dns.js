export async function onRequestPost(context) {
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
    }
    let pretty = JSON.stringify(output, null, 2);
    let resp = await fetch('https://dev-api.maketheinternetgo.com/dns?' + new URLSearchParams(output), {
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