# More Chores

What better way to keep track of your chores than this?
Here you’re going to be creating chore cards, which contain the chore id, title, duration and priority.

## Deliverables:
Chores from the server should be rendered onto the page when it loads
User should be able to create a new Chore Card by submitting the Form
A card should have a `div` tag with a class of “chore-card”, a `button` tag with class  ‘delete-button’, an `h3` tag with the title, a `p` tag for the Duration, and an `input` tag for the priority (which should show what the priority of the chore currently is).
User should be able to delete Chore Card
User should be able to update the priority on the card in the `input` tag (using Event Listener ‘blur’)

### Example Chore Card

```
<div class=’chore-card’>
<button class='delete-button' data-id=${chore.id}>x</button>
<h3> ${chore.title} </h3>
<p> Duration: ${chore.duration} </p>
<input value=’${chore.priority}/>
</div>
```

### Routes
```
#=> Getting all Chores
GET /chores

#=> Creating a Chore
POST /chores

headers: {
‘Content-Type’: ‘application/json’,  
Accept: ‘application/json’
             }

#=> Deleting a Chore
DELETE /chores/:id

headers: {
‘Content-Type’: ‘application/json’,  
Accept: ‘application/json’
             }
```
