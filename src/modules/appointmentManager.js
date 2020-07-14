const urlConditional = () => {
  if(window.location.href.includes('com')){
    return 'http://13.58.195.142:8000'
  } else {
    return "http://localhost:8000";
  }
}
const baseUrl = urlConditional()
// const baseUrl = "http://13.58.195.142:8000";
// const baseUrl = "http://localhost:8000";

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
  },
  deleteAppointment(appointment){
    return fetch(`${baseUrl}/appointment/${appointment.id}`, {
      "method": "DELETE",
            "headers": {
                "Authorization": `Token ${sessionStorage.getItem("token")}`
            }
        })
  },
  updateAppointment(updatedAppointment, appointmentId) {
    return fetch(`${baseUrl}/appointment/${appointmentId}`, {
      "method": "PUT",
      "headers": {
        "Accept": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("token")}`
      },
      "body": updatedAppointment
    })
  }, reminderEmail(appointmentId){
      return fetch(`${baseUrl}/appointment_reminder/${appointmentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`,
        }
      }).then((resp) => resp.json());
  }
};

export default appointmentManager;