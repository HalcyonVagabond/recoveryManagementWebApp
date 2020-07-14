const urlConditional = () => {
  if(window.location.href.includes('com')){
    return 'http://13.58.195.142:8000'
  } else {
    return "http://localhost:8000";
  }
}
const baseUrl = urlConditional()
// const baseUrl = 'http://13.58.195.142:8000'
// const baseUrl = "http://localhost:8000";
const providerClientManager = {
  async getProviderClients() {
    return await fetch(`${baseUrl}/provider_client`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  async getClientsProviders(clientId){
    return await fetch(`${baseUrl}/client_providers?client_id=${clientId}`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  async createProviderClient(clientInfo) {
    return await fetch(`${baseUrl}/provider_client`, {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      },
      body:JSON.stringify(clientInfo)
    }).then((resp) => resp.json());
  },
  deleteProviderClient(providerClientId){
    return fetch(`${baseUrl}/provider_client/${providerClientId}`, {
      "method": "DELETE",
            "headers": {
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
  },
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
  },
  async getUnassignedClients() {
    return await fetch(`${baseUrl}/unassigned_clients`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  async getAllProviders() {
    return await fetch(`${baseUrl}/client`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  createNewProvider(providerInfo) {
    return fetch(`${baseUrl}/register_provider/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      }, 
      body:JSON.stringify(providerInfo)
    }).then((resp) => resp.json());
  },
  createNewClient(clientInfo) {
    return fetch(`${baseUrl}/register_client/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      }, 
      body:JSON.stringify(clientInfo)
    }).then((resp) => resp.json());
  }
};

export default providerClientManager;
