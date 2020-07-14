const urlConditional = () => {
  if(window.location.href.includes('com')){
    return 'https://3.14.139.189:8000'
  } else {
    return "http://localhost:8000";
  }
}
const baseUrl = urlConditional()
// const baseUrl = "http://localhost:8000";
// const baseUrl = "http://13.58.195.142:8000";

const authManager = {
  async loginUser(userCredentials) {
    const resp = await fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    return await resp.json();
  },
  async loginAdmin(userCredentials) {
    const resp = await fetch(`${baseUrl}/admin_login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    return await resp.json();
  },
};

export default authManager;
