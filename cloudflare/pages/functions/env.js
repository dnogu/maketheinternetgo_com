export async function onRequest({env}) {
    console.log(typeof env.env)
    return new Response(env.env)
  }