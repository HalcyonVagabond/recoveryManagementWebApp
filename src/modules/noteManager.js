const baseUrl = "http://127.0.0.1:8000";

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