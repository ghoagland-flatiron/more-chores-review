const URL = 'http://localhost:3000/chores'

document.addEventListener('DOMContentLoaded', init)


function init() {
  const adapter = new Adapter(URL)
  adapter.getAllChores()
    .then(choreList => {
      choreList.forEach(chore => {
        const newChore = new Chore(chore, adapter)
      })
    })

  const choreForm = document.getElementById('new-chore-form')

  choreForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const {title, priority, duration} = evt.target
    const formChore = {
      title: title.value,
      priority: priority.value,
      duration: duration.value
    }
    adapter.postChore(formChore).then(newChore => {
      const chore = new Chore(newChore, adapter)
    })

  })


}


class Chore {
  constructor({id, title, priority, duration}, adapter) {
    this.title = title
    this.id = id
    this.priority = priority
    this.duration = duration
    this.renderChore()
    this.adapter = adapter
  }

  renderChore() {
    const choreContainer = document.getElementById('chore-list')
    const choreCard = document.createElement('div')
    choreCard.classList.add('chore-card')
    choreCard.innerHTML = `
      <button class='delete-button' data-id=${this.id}>x</button>
      <h3> ${this.title} </h3>
      <p> Duration: ${this.duration} </p>
    `
    const choreInput = document.createElement('input')
    choreInput.value = this.priority
    choreCard.append(choreInput)
    const deleteButton = choreCard.querySelector('button')
    deleteButton.addEventListener('click', (e) => this.remove(e))
    choreContainer.append(choreCard)
  }

  remove(evt) {
    this.adapter.deleteChore(this.id)
      .then(() => {
        evt.target.parentNode.remove()
      })
  }


}

class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => res.json())
  }

  getAllChores() {
    return this.get(this.baseURL)
  }

  post(path, payload) {
    return fetch(path, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'applicaton/json'
      }
    }).then(res => res.json())
  }

  patch(path, payload) {
    return fetch(path, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'applicaton/json'
      }
    }).then(res => res.json())
  }

  delete(path) {
    return fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'applicaton/json'
      }
    }).then(res => res.json())
  }

  postChore(payload) {
    return this.post(this.baseURL, payload)
  }

  deleteChore(id) {
    return this.delete(`${this.baseURL}/${id}`)
  }

  patchChore(id, payload) {
    return this.patch(`${this.baseURL}/${id}`, payload)
  }

}
