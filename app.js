const autoCompleteConfig = {
  async fetchData (searchTerm){
    const response = await axios.get('http://www.omdbapi.com/',{
        params:{
            apikey:'4f0ea4c2',
            s: searchTerm
        }
    })
    if(response.data.Error) return []
    return response.data.Search
  },

  renderOption(movie){
    const moviePoster = movie.Poster === 'N/A' ? '' : movie.Poster
    return `
      <img src = '${moviePoster}'>
      ${movie.Title}(${movie.Year})
    `;
  },
  
  inputValue(movie){
    return movie.Title
  }
}

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie,summaryElement,side) => {
  const response = await axios.get('http://www.omdbapi.com/',{
        params:{
            apikey: '4f0ea4c2',
            i : movie.imdbID
        }
    })
  summaryElement.innerHTML = movieTemplet(response.data)
  
  if (side === 'left') leftMovie = movie
  else rightMovie = movie

  if(leftMovie && rightMovie) runCompareFunction()

}

const runCompareFunction = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .to-compare')
  const rightSideStats = document.querySelectorAll('#right-summary .to-compare')

  leftSideStats.forEach((leftStat,index) => {
    const rightStat = rightSideStats[index]

    let leftSideValue = parseFloat(leftStat.dataset.value)
    let rightSideValue = parseFloat(rightStat.dataset.value)


    if (isNaN(leftSideValue)) leftSideValue = 0
    if (isNaN(rightSideValue)) rightSideValue = 0

    if(leftSideValue > rightSideValue){
      leftStat.classList.add('is-primary')
      leftStat.classList.remove('is-warning')
      leftStat.classList.remove('is-success')
      rightStat.classList.remove('is-primary')
      rightStat.classList.remove('is-success')
      rightStat.classList.add('is-warning')
    }else if(rightSideValue>leftSideValue){
      rightStat.classList.add('is-primary')
      rightStat.classList.remove('is-warning')
      rightStat.classList.remove('is-success')
      leftStat.classList.remove('is-primary')
      leftStat.classList.remove('is-success')
      leftStat.classList.add('is-warning')
    }else{
      leftStat.classList.remove('is-primary')
      leftStat.classList.remove('is-warning')
      rightStat.classList.remove('is-primary')
      rightStat.classList.remove('is-warning')
      leftStat.classList.add('is-success')
      rightStat.classList.add('is-success')
    }
  })
}

createAutoComplete({
  ...autoCompleteConfig,
  root : document.querySelector('#left-autocomplete'),
  onOptionSelect(movie){
    onMovieSelect(movie,document.querySelector('#left-summary'),'left')
    document.querySelector('.tutorial').classList.add('is-hidden')
  }
});

createAutoComplete({
  ...autoCompleteConfig,
  root : document.querySelector('#right-autocomplete'),
  onOptionSelect(movie){
    onMovieSelect(movie,document.querySelector('#right-summary'),'right')
    document.querySelector('.tutorial').classList.add('is-hidden')
  }
});

