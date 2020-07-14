const urlConditional = () => {
  if(window.location.href.includes('com')){
    return 'https://3.14.139.189:8000'
  } else {
    return "http://localhost:8000";
  }
}
const baseUrl = urlConditional()
// const baseUrl = "http://13.58.195.142:8000";
// const baseUrl = "http://localhost:8000";

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
  },
  async getFilteredClients() {
    return await fetch(`${baseUrl}/filtered_clients`, {
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