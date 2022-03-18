let searchBox = document.querySelector("#searches");
searchBox.innerHTML = "";

let inp = document.querySelector("input");
inp.addEventListener("input", function () {
  getSearch(inp.value);
});

async function getSearch(inp) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US&query=${inp}&page=1&include_adult=false`;
  let a = await fetch(url);
  let b = await a.json();
  if (inp == "") searchBox.classList.add("display");
  else displaySearch(b.results);
}

function displaySearch(arr) {
  searchBox.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let src;
    if (arr[i].poster_path)
      src = `https://image.tmdb.org/t/p/w220_and_h330_face/${arr[i].poster_path}`;
    else
      src =
        "https://th.bing.com/th/id/OIP.Ro3cYp7onBge22q_yJG_xgAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.25&pid=1.7";

    searchBox.innerHTML += ` <div id=${arr[i].id}>
                    <img src=${src} alt="">
                    <p>${arr[i].title}</p>
                    <p>${arr[i].release_date}</p>
                </div>`;
  }

  searchBox.classList.remove("display");
}

searchBox.addEventListener("click", function (e) {
  let tg = e.target.parentElement;
  if (tg.tagName == "DIV") {
    searchBox.classList.add("display");
    singleMovie(tg.id);
  }
  if (e.target.tagName == "DIV") {
    searchBox.classList.add("display");
    singleMovie(e.target.id);
  }
});

async function singleMovie(id) {
  let a = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7f27f853ad781602c5800b97bab7fef6&language=en-US`
  );
  let b = await a.json();
  let {
    overview,
    release_date,
    genres,
    runtime,
    spoken_languages,
    vote_average,
    title,
    poster_path,
    production_companies,
  } = b;
  let src;
  if (poster_path)
    src = `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`;
  else
    src =
      "https://th.bing.com/th/id/OIP.Ro3cYp7onBge22q_yJG_xgAAAA?w=182&h=182&c=7&r=0&o=5&dpr=1.25&pid=1.7";

  let sec = document.querySelector("#movie");
  sec.innerHTML = ` <img src=${src}
            alt="">
        <div>
            <h2>${title}</h2>
            <p>Released:${release_date} <span>Ratings: ${vote_average}/10</span></p>
            <h3><span>Genre:</span> ${getGenres(genres)}</h3>
            <h4><span>Writer:</span> ${getGenres(production_companies)}</h4>

            <h4><span>Actors:</span> Robert Downey Jr., Chris Evans, Scarlett Johansson</h4>

            <h4><span>Plot:</span>  ${overview}</h4>

            <h4 id="lang"><span>Language:</span> ${
              spoken_languages.length
                ? getLanguage(spoken_languages)
                : "English, Russian, Hindi"
            }</h4>
            <p><b><i class="fas fa-award"></i></b>Nominated for 1 Oscar. 38 wins & 80 nominations total</p>
        </div>`;
}

const getGenres = (genres) => {
  res = "";
  for (let i = 0; i < genres.length; i++) {
    res += genres[i].name + " ";
  }
  return res;
};

const getRunTime = (time) => {
  let h = Math.floor(time / 60);
  let min = time % 60;
  return `${h} Hours ${min} Minutes`;
};

const getDate = (str) => str.split("-").reverse().join("/");

const getLanguage = (lang) => {
  res = "";
  for (let i = 0; i < lang.length - 1; i++) {
    res += lang[i].english_name + ", ";
  }
  res += lang[lang.length - 1].english_name;
  return res;
};

document.body.addEventListener("click", function (e) {
  if (e.target.tagName !== "INPUT") {
    searchBox.classList.add("display");
  } else {
    if (e.target.value) getSearch(e.target.value);
    console.log(e.target.value);
    console.log("Harsjh");
  }
});
