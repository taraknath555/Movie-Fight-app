const debounce = (func,delay) => {
    let timerID;
    return (...args) => {
        if(timerID) clearTimeout(timerID)
        timerID = setTimeout(() => {
            func.apply(null,args)
        },delay)
    }
}

const movieTemplet = (movieDetails) => {
    const {
        Title,
        Genre,
        Plot,
        Awards,
        Metascore,
        imdbRating,
        imdbVotes,
        Director,
        Actors,
        Language,
        Released
    } = movieDetails
    
    const awardsValue = Awards.split(' ').reduce((curVal,nextVal) => {
      const value = parseInt(nextVal)
      if(isNaN(value)) return curVal 
      else return curVal + value 
    },0)
    
    
    //In some response BoxOffice is not defined so why
    //have to take this approach
    let BoxOffice = movieDetails.BoxOffice
    let boxOfficeValue
    if(BoxOffice){
      boxOfficeValue = parseInt(BoxOffice.replace(/\$/g,'').replace(/,/g,''))
    }else{
      boxOfficeValue = 'N/A'
      BoxOffice = 'N/A'
    }
    
    const metascoreValue = parseInt(Metascore)
    const imdbRatingValue = parseFloat(imdbRating)
    const imdbVotesValue = parseInt(imdbVotes.replace(/,/g,''))
    const Poster = movieDetails.Poster === 'N/A' ? 'https://i.ya-webdesign.com/images/no-image-png.png': movieDetails.Poster
    
    return `
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${Poster}" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1>${Title}</h1>
            <h4>${Genre}</h4>
            <p>${Plot}</p>
          </div>
        </div>
      </article>
      <article data-value=${awardsValue} class="notification is-primary big-row to-compare">
        <p class="title">${Awards}</p>
        <p class="subtitle">Awards</p>
      </article>
      <article data-value=${boxOfficeValue} class="notification is-primary to-compare">
        <p class="title">${BoxOffice}</p>
        <p class="subtitle">Box Office</p>
      </article>
      <article data-value=${metascoreValue} class="notification is-primary to-compare">
        <p class="title">${Metascore}</p>
        <p class="subtitle">Metascore</p>
      </article>
      <article data-value=${imdbRatingValue} class="notification is-primary to-compare">
        <p class="title">${imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
      </article>
      <article data-value=${imdbVotesValue} class="notification is-primary to-compare">
        <p class="title">${imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
      </article>

      <article class="info notification">
        <p class="title">${Director}</p>
        <p class="subtitle">Director</p>
      </article>
      <article class="info big-row notification">
        <p class="title">${Actors}</p>
        <p class="subtitle">Actors</p>
      </article>
      <article class="info notification">
        <p class="title">${Language}</p>
        <p class="subtitle">Languages</p>
      </article>
      <article class="info notification">
        <p class="title">${Released}</p>
        <p class="subtitle">Releasing Date</p>
      </article>
  `;
}