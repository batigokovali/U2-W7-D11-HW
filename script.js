//Fetching data
const getSongs = (url) => {
    fetch(url, {method: "GET",})
    .then(rawSongs => rawSongs.json()) //also a promise
	.then(jsonSongs => {
        renderSongs(jsonSongs.data)
        countUnique(jsonSongs.data)
    } )
	.catch(err => console.log(err));
}

getSongs("https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica")
getSongs("https://striveschool-api.herokuapp.com/api/deezer/search?q=pinkfloyd")
getSongs("https://striveschool-api.herokuapp.com/api/deezer/search?q=daftpunk")

let metallicaContainer = document.getElementById("metallica");
let pinkFloydContainer = document.getElementById("pink-floyd");
let daftPunkContainer = document.getElementById("daft-punk");


const renderSongs = (fetchedSongs) => {
    let container = null;
    for (i = 0; i<fetchedSongs.length; i++)
    {
        switch(fetchedSongs[i].artist.name){
            case "Metallica":
                container = metallicaContainer;
                break;

            case "Pink Floyd":
                container = pinkFloydContainer;
                break;
            case "Daft Punk":
                container = daftPunkContainer;
                break;
        }
        const singleSong = fetchedSongs[i]
        container.innerHTML += `<div class="card col-3" style="width: 18rem">
        <img src="${singleSong.album.cover_big}" class="card-img-top" alt="..." />
        <div class="card-body d-flex flex-column align-items-center">
        <p class="card-title">
        ${singleSong.artist.name}
        </p>
          <p class="card-text">
          ${singleSong.title_short}
          </p>
          <p class="card-title"><a href="${singleSong.preview}" target="__blank">Preview</a></p>
          </div>
          </div>
        </div>
      </div>`
    }
}


let uniqueCount = 0;
const countUnique = (songDataArray) => {
  let albumIDArray = [];
  for (song of songDataArray) {
    if (!albumIDArray.includes(song.album.id)) {
      albumIDArray.push(song.album.id);
    }
  }
  return (uniqueCount += albumIDArray.length);
};

const consoleLogUniqueCount = () => {
  console.log("The number of unique albums in the page is: ", uniqueCount);
};

const createSongList = () => {
    let songListOl = document.querySelector("#songListModalBody ol");
    songListOl.innerHTML = "";
    let songTitlesArray = document.querySelectorAll(
      ".card-text"
    );
    for (songTitle of songTitlesArray) {
      let listItem = document.createElement("li");
      listItem.innerText = songTitle.innerText;
      songListOl.appendChild(listItem);
    }
  };


