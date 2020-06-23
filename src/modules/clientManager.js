const baseUrl = "http://127.0.0.1:8000";

const clientManager = {
  async getAllClients() {
    return await fetch(`${baseUrl}/client`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  async retrieveClient(clientId){
    return await fetch(`${baseUrl}/client/${clientId}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("token")}`
        }
    })
    .then(resp => resp.json())
  }
};

export default clientManager;