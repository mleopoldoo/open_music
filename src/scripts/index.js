import { checkTheme } from "./theme.js";
import { albumList, genresList } from "./albumsDatabase.js";
import { handleCustomInputRange } from "./inputRange.js";

const renderGenreItems = (genres) => {
  const ulGenreList = document.querySelector(".genres__list");

  genres.forEach((element) => {
    const liGenre = document.createElement("li");
    liGenre.innerText = element;
    liGenre.classList.add("genre__item", "text3");
    if (element === "Todos") {
      liGenre.classList.add("active");
    }
    ulGenreList.appendChild(liGenre);
  });
};

const createAlbumCard = (albumData) => {
  // CRIANDO OS ELEMENTOS
  const card = document.createElement("li");

  const albumCoverContainer = document.createElement("figure");
  const albumCoverImg = document.createElement("img");
  const albumBand = document.createElement("span");
  const albumTitle = document.createElement("h3");
  const albumGenre = document.createElement("span");
  const albumDetails = document.createElement("div");
  const albumPriceContainer = document.createElement("div");
  const albumPrice = document.createElement("h3");
  const albumBuyButton = document.createElement("button");

  // CARD
  card.classList.add("album__item");
  card.classList.add("slide");

  // COVER IMG
  albumCoverContainer.classList.add("album__cover-container");
  albumCoverImg.classList.add("album__cover");
  albumCoverImg.src = albumData.img;
  albumCoverContainer.appendChild(albumCoverImg);

  // TITLE
  albumTitle.classList.add("album__name");
  albumTitle.innerText = albumData.title;

  // ALBUM INFO
  albumDetails.classList.add("album__details");

  albumBand.classList.add("album__band");

  albumGenre.classList.add("album__genre");

  albumBand.innerText = albumData.band;

  albumGenre.innerText = albumData.genre;
  albumDetails.append(albumBand, albumGenre);

  // PRICE CONTAINER
  albumPriceContainer.classList.add("album__price--container");

  albumPrice.classList.add("album__price");
  albumPrice.innerText = "R$ " + albumData.price;
  albumBuyButton.classList.add("album__buy--button");
  albumBuyButton.innerText = "Comprar";
  albumPriceContainer.append(albumPrice, albumBuyButton);
  // ADD ALL
  card.append(
    albumCoverContainer,
    albumTitle,
    albumTitle,
    albumDetails,
    albumPriceContainer
  );

  return card;
};

const renderAlbumCards = (albums) => {
  const ulAlbumList = document.querySelector(".albums__list");
  ulAlbumList.innerHTML = "";

  albums.forEach((element) => {
    const albumCard = createAlbumCard(element);
    ulAlbumList.appendChild(albumCard);
  });
};

const handleFilter = (albums, genreFilter = "Todos", priceFilter) => {
  return albums.filter((element) => {
    return (
      (element.genre === genreFilter || genreFilter === "Todos") &&
      element.price <= priceFilter
    );
  });
};

const removeActiveClass = (genres) => {
  genres.forEach((element) => {
    element.classList.remove("active");
  });
};

const handleFilterEvents = (albums) => {
  const genres = document.querySelectorAll(".genre__item");
  const inputPriceRange = document.querySelector(".price__input-range");
  const spanPriceValue = document.querySelector(".price-range__value--dynamic");

  let genreCategory = "Todos";
  let priceValue = inputPriceRange.valueAsNumber;

  genres.forEach((element) => {
    element.addEventListener("click", (event) => {
      removeActiveClass(genres);
      element.classList.add("active");
      genreCategory = event.target.innerText;

      const albumsToRender = handleFilter(albums, genreCategory, priceValue);
      renderAlbumCards(albumsToRender);
    });
  });

  inputPriceRange.addEventListener("input", (event) => {
    priceValue = event.target.value;
    spanPriceValue.innerText = "R$ " + priceValue;
    const albumsToRender = handleFilter(albums, genreCategory, priceValue);

    renderAlbumCards(albumsToRender);
  });
};

checkTheme();
handleCustomInputRange();
renderGenreItems(genresList);
handleFilterEvents(albumList);
renderAlbumCards(albumList);
