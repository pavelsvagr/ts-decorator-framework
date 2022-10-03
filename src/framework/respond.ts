export default (res: any, fn: () => Promise<any>) => {
  try {
    fn().then(result => res.send(result)).catch(error => {
      res.status(500).send(error)
    })
  } catch (err) {
    res.status(404).send(err)
  }
}
