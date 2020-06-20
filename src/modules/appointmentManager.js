const baseUrl = "http://127.0.0.1:8000";

const appointmentManager = {
  async getAppointments() {
    return await fetch(`${baseUrl}/appointment`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },
  postNewAppointment(appointment) {
    return fetch(`${baseUrl}/appointment`, {
      method: "POST",
      headers: { 
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      }, 
      body:appointment
    }).then((resp) => resp.json());
  }
};

export default appointmentManager;