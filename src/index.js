const URL = 'http://localhost:3000/chores'

document.addEventListener('DOMContentLoaded', () => {
  const adapter = new Adapter(URL)
  adapter.getAll().then(choreList => {
    choreList.forEach(chore => {
      new Chore(chore, adapter)
    })
  })

  const form = document.getElementById('new-chore-form')

  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const {title, duration, priority} = evt.target
    const chore = {
      title: title.value,
      duration: duration.value,
      priority: priority.value
    }
    adapter.postChore(chore)
      .then(newChore => {
        new Chore(newChore, adapter)
      })
    title.value = ''
    duration.value = ''
    priority.value = ''
  })
})
