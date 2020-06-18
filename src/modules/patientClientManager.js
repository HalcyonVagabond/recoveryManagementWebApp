const baseUrl = "http://127.0.0.1:8000";

const patientClientManager = {
  async getProviderClients() {
    return await fetch(`${baseUrl}/provider_client`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  }
};

export default patientClientManager;
