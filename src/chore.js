class Chore {
  constructor({id, title, duration, priority}, adapter) {
    this.id = id
    this.title = title
    this.duration = duration
    this.priority = priority
    this.adapter = adapter
    this.renderCard()
  }

  createCard() {
    const choreCard = document.createElement('div')
    choreCard.classList.add('chore-card')
    choreCard.innerHTML = `
      <button class="delete-button" data-id=${this.id}>x</button>
      <h3>${this.title}</h3>
      <p> Duration: ${this.duration}</p>
      <input value="${this.priority}" >
    `
    const deleteButton = choreCard.querySelector('button')
    deleteButton.addEventListener('click', (evt) => this.removeCard(evt))

    const inputTag = choreCard.querySelector('input')
    inputTag.addEventListener('blur', (evt) => this.updatePriority(evt))
    return choreCard
  }

  renderCard() {
    const choreCard = this.createCard()
    const choreList = document.querySelector('#chore-list')
    choreList.append(choreCard)

    return choreCard
  }

  removeCard(evt) {
    alert('This will delete a card')
    console.log(this);
    this.adapter.deleteChore(this.id)
      .then(res => {
        evt.target.parentElement.remove()
      })
  }

  updatePriority(evt) {
    const newPriority = evt.target.value
    const body = {priority: newPriority}
    this.adapter.patchChore(this.id, body)
  }
}
