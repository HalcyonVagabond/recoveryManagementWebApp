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

const noteManager = {
  async getClientNotes(client_id) {
    return await fetch(`${baseUrl}/note?client_id=${client_id}`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },

  async getNoteTemplates() {
    return await fetch(`${baseUrl}/note_template`, {
      "method": "GET",
      "headers": {
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem("token")}`
      }
  })
  .then(resp => resp.json())
  },

  postNewNote(note) {
    return fetch(`${baseUrl}/note`, {
      method: "POST",
      headers: { 
        Accept: "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      }, 
      body:note
    }).then((resp) => resp.json());
  },
  updateNote(updatedNote, noteId) {
    return fetch(`${baseUrl}/note/${noteId}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("token")}`
      },
      "body": JSON.stringify(updatedNote)
    })
  }
};

export default noteManager;