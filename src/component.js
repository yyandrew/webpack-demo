export default (text = 'Hello World') => {
  const element = document.createElement('div')
  element.className = 'pure-button'

  const { first, second, ...others } = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }

  element.innerHTML = `first: ${first}, second: ${second}`
  element.onclick = () =>
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default
      })
      .catch(err => {
        console.log(err)
      })

  return element
}
