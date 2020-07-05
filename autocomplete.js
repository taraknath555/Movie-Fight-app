const createAutoComplete = (configObj) => {
  const {
    root,
    fetchData,
    renderOption,
    onOptionSelect,
    inputValue,
  } = configObj
  root.innerHTML = dropdownTemplet()
  const dropdown = root.querySelector('.dropdown')
  const resultWrapper = root.querySelector('.results')
  const search = root.querySelector('input')
  
  const onInput = async (event) => {
    const items = await fetchData(event.target.value)
    if(!items.length){
      dropdown.classList.remove('is-active')
      return
    }
    dropdown.classList.add('is-active')
    resultWrapper.innerHTML = ''
    
    for(let item of items){
      const option = document.createElement('a')
      option.innerHTML = renderOption(item)
      option.classList.add('dropdown-item')
      resultWrapper.appendChild(option)

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active')
        search.value = inputValue(item)
        onOptionSelect(item)
      })
    }
  }
  
  search.addEventListener('input',debounce(onInput,500))
  document.addEventListener('click',(event) => {
      if(!root.contains(event.target)){
          dropdown.classList.remove('is-active')
      }
  })
}

const dropdownTemplet = () => {
  return `
  <label><b>Search For a Movie</b></label>
  <input type='text' class='input'/>
  <div class='dropdown'>
      <div class='dropdown-menu'>
          <div class='dropdown-content results'></div>
      </div>
  </div>
  `
}
