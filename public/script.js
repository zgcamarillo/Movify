const form = document.querySelector('#search_form');
const resultsContainer = document.querySelector('#results');
const mainContent = document.querySelector('#main_content');
const IMAGE_BASE ='https://image.tmdb.org/t/p/w200';
const searchBar = document.querySelector('#search_bar');
const mainWrapper = document.querySelector('#main_wrapper')

//window loading- fade in for main content
window.addEventListener('load', () => {
    setTimeout(() => {
        mainContent.classList.add('show');
    }, 3000);
});
//pause video when donee
document.querySelector('#bgvideo').addEventListener('ended', () => {
    video.pause();
});
//searching...
document.querySelector('#search_btn').addEventListener('click', (e) => {
    e.preventDefault(); //stop refreshing

    mainContent.classList.remove('show'); //removing main
    mainWrapper.classList.add('hide');

    setTimeout(() => {
        searchBar.classList.remove('hidden');
        searchBar.classList.add('show');
    }, 500);

    const searchInput = document.querySelector('#search').value 
    fetch(`/api/search?q=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            resultsContainer.innerHTML = '';

            data.forEach(movie => {
                const li = document.createElement('li')
                li.classList.add('movie-item');
                    //image available?
                if (movie.poster_path) {
                    const img = document.createElement('img');
                    img.src = IMAGE_BASE + movie.poster_path;
                    img.alt = movie.title;
                    img.classList.add('movie-poster');
                    li.appendChild(img);
                }
                //title
                const title = document.createElement('p');
                title.textContent = movie.title;
                li.appendChild(title);

                resultsContainer.appendChild(li);
            })
        })
        .catch(err => console.error(err))
})
//searching w bar
document.querySelector('#search_form-bar').addEventListener('submit', e => {
    e.preventDefault();

    const query = document.querySelector('#search-bar').value;

    fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
            const ul = document.querySelector('#results');
            ul.innerHTML = '';

            data.forEach(movie => {
                const li = document.createElement('li');
                li.classList.add('movie-item');

                const img = document.createElement('img');
                img.src = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    :'assets/no-poster.png';
                img.classList.add('movie-poster')

                const title = document.createElement('p');
                title.textContent = movie.title;

                li.appendChild(img);
                li.appendChild(title);
                ul.appendChild(li);
            });
        });
});