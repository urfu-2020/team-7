export async function fetchAuth () {
  const url = `${process.env.REACT_APP_SERVER_HOME_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/login/success`
  return await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(r => {
      if (r.status === 200) return r.json();
      throw new Error('Unauthorized!')
    })
    .then(r => {
      if (r.user) {
        return {logged: true, user: r.user}
      }
      return {logged: false, user: null}
    })
    .catch(() => {
      return {logged: false, user: null}
    });
}
