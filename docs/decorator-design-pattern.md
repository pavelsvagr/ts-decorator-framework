```typescript
type Message = string // Imagine stg cooler

interface Notifier {
  send: (msg: Message) => Promise<void>
}

type NotifierDecorator = (notifier: Notifier) => Notifier

const createNotifier: () => Notifier = () => ({
  send: async (msg: Message) => {
    // format message, chose emails, templates
    await getEmailClient().send(msg)
  }
})

const addSlackNotification: NotifierDecorator = (notifier: Notifier) => {
  const origin = notifier
  return {
    send: async (msg: Message) => {
      // slack formatting etc...
      await Promise.all([
        origin.send(msg),
        getSlackClient().send(msg)
      ])
    }
  }
}

// Usage in some module
const notifyUsers = async (notifier: Notifier, users: User) =>
  users.map(user => notifier.send(`${users.name} hello!`))

export const sendNotifications = async (action: any) => {
  let notifier = createNotifier()
  if (action.slackEnabled) {
    notifier = addSlackNotification(notifier)
  }
  if (action.facebookEnabled) {
    // you know what to do
  }
  // ...

  const users = await getNotificationUsers(action)
  notifyUsers(notifier, users)
}
```
