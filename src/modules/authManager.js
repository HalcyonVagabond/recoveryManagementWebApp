const baseUrl = "http://127.0.0.1:8000/";

const authManager = {
  async loginUser(userCredentials) {
    const resp = await fetch(`${baseUrl}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    return await resp.json();
  }
};

export default authManager;
