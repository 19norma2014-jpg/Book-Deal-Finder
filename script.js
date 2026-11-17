const books = [
  {
    title: "Prophet Yusuf and the Wolf",
    author: "Saadah Taib, Shazana Rosli",
    price: 3.68,
    rating: 5.00,
    ratingCount: 3,
    genre: "Children's activity",
    cover: "cover-activity",
    shopUrl: "https://bookshop.org/p/books/prophet-yusuf-and-the-wolf-saadah-taib/21ea0815d13742e2?ean=9780860377238",
    goodreadsUrl: "https://www.goodreads.com/book/show/52075257-prophet-yusuf-and-the-wolf"
  },
  {
    title: "All the World",
    author: "Liz Garton Scanlon, Marla Frazee",
    price: 8.38,
    rating: 4.23,
    ratingCount: 8273,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/all-the-world-liz-garton-scanlon/01587285fd38ec34?ean=9781481431217",
    goodreadsUrl: "https://www.goodreads.com/book/show/23309590-all-the-world"
  },
  {
    title: "Bear Snores On",
    author: "Karma Wilson, Jane Chapman",
    price: 8.38,
    rating: 4.28,
    ratingCount: 33161,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/bear-snores-on-karma-wilson/c5aa5680d5c3243f?ean=9781416902720",
    goodreadsUrl: "https://www.goodreads.com/book/show/1296579.Bear_Snores_On"
  },
  {
    title: "Grumpy Monkey Board Book",
    author: "Suzanne Lang, Max Lang",
    price: 8.38,
    rating: 4.41,
    ratingCount: 8126,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/grumpy-monkey-suzanne-lang/2fd830a7e9474e78?ean=9780593123997",
    goodreadsUrl: "https://www.goodreads.com/book/show/43727820-grumpy-monkey-board-book"
  },
  {
    title: "And Tango Makes Three",
    author: "Justin Richardson, Peter Parnell, Henry Cole",
    price: 8.38,
    rating: 4.36,
    ratingCount: 14430,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/and-tango-makes-three-justin-richardson/9e76a4a4768c9533?ean=9781481446952",
    goodreadsUrl: "https://www.goodreads.com/book/show/23604521-and-tango-makes-three"
  },
  {
    title: "We're Going on a Bear Hunt",
    author: "Michael Rosen, Helen Oxenbury",
    price: 9.31,
    rating: 4.29,
    ratingCount: 49106,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/we-re-going-on-a-bear-hunt-michael-rosen/95bf522b12856654?ean=9780689815812",
    goodreadsUrl: "https://www.goodreads.com/book/show/857447.We_re_Going_on_a_Bear_Hunt"
  },
  {
    title: "Go, Dog. Go!",
    author: "P.D. Eastman",
    price: 9.31,
    rating: 4.16,
    ratingCount: 97732,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/go-dog-go-p-d-eastman/8e08b7cae31ac55b?ean=9780394800202",
    goodreadsUrl: "https://www.goodreads.com/book/show/460548.Go_Dog_Go_"
  },
  {
    title: "One Fish, Two Fish, Red Fish, Blue Fish",
    author: "Dr. Seuss",
    price: 9.31,
    rating: 4.19,
    ratingCount: 220559,
    genre: "Picture books",
    cover: "cover-picture",
    shopUrl: "https://bookshop.org/p/books/one-fish-two-fish-red-fish-blue-fish-dr-seuss/fd030044fc9cd991?ean=9780394800134",
    goodreadsUrl: "https://www.goodreads.com/book/show/239973.One_Fish_Two_Fish_Red_Fish_Blue_Fish"
  },
  {
    title: "The Cat Who Saved Books",
    author: "Sōsuke Natsukawa, Louise Heal Kawai",
    price: 17.70,
    rating: 3.70,
    ratingCount: 95452,
    genre: "Fantasy",
    cover: "cover-fantasy",
    shopUrl: "https://bookshop.org/p/books/the-cat-who-saved-books-a-novel-sosuke-natsukawa/fc54146d38c91087?ean=9780063095731",
    goodreadsUrl: "https://www.goodreads.com/book/show/58884728-the-cat-who-saved-books"
  },
  {
    title: "Read Your Color",
    author: "Steven J. Reese",
    price: 17.71,
    rating: 4.11,
    ratingCount: 109,
    genre: "Nonfiction",
    cover: "cover-nonfiction",
    shopUrl: "https://bookshop.org/p/books/read-your-color-discover-your-reading-type-and-build-a-life-changing-love-of-books-steven-j-reese/2bf5cea1aae18a6f?ean=9798217155729",
    goodreadsUrl: "https://www.goodreads.com/book/show/247573535-read-your-color"
  }
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const averagePriceElement = document.querySelector("#average-price");
const expensiveGenreElement = document.querySelector("#expensive-genre");
const expensiveGenreCaption = document.querySelector("#expensive-genre-caption");
const bookCountElement = document.querySelector("#book-count");
const filterInput = document.querySelector("#rating-filter");
const filterValue = document.querySelector("#rating-value");
const resultsSummary = document.querySelector("#results-summary");
const bookList = document.querySelector("#book-list");
const emptyState = document.querySelector("#empty-state");

function getMostExpensiveGenre() {
  const pricesByGenre = new Map();

  for (const book of books) {
    const genrePrices = pricesByGenre.get(book.genre) ?? [];
    genrePrices.push(book.price);
    pricesByGenre.set(book.genre, genrePrices);
  }

  return [...pricesByGenre.entries()]
    .map(([genre, prices]) => ({
      genre,
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length
    }))
    .sort((a, b) => b.average - a.average || a.genre.localeCompare(b.genre))[0];
}

function renderSummary() {
  const average = books.reduce((sum, book) => sum + book.price, 0) / books.length;
  const expensiveGenre = getMostExpensiveGenre();
  averagePriceElement.textContent = currency.format(average);
  expensiveGenreElement.textContent = expensiveGenre.genre;
  expensiveGenreCaption.textContent = `${currency.format(expensiveGenre.average)} average listed price`;
  bookCountElement.textContent = String(books.length);
}

function createBookCard(book, index) {
  const card = document.createElement("article");
  card.className = "book-card";

  const cover = document.createElement("div");
  cover.className = `book-cover ${book.cover}`;
  cover.setAttribute("aria-hidden", "true");
  cover.textContent = book.title;

  const info = document.createElement("div");
  info.className = "book-info";

  const title = document.createElement("h3");
  title.className = "book-title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = `by ${book.author}`;

  const meta = document.createElement("div");
  meta.className = "book-meta";

  const genre = document.createElement("span");
  genre.className = "genre-tag";
  genre.textContent = book.genre;

  const rating = document.createElement("span");
  rating.className = "book-rating";
  rating.setAttribute("aria-label", `Goodreads rating ${book.rating.toFixed(2)} out of 5`);

  const star = document.createElement("span");
  star.className = "rating-dot";
  star.setAttribute("aria-hidden", "true");
  star.textContent = "★";

  const ratingText = document.createElement("span");
  ratingText.textContent = `${book.rating.toFixed(2)} · ${book.ratingCount.toLocaleString("en-US")} ratings`;
  rating.append(star, ratingText);
  meta.append(genre, rating);
  info.append(title, author, meta);

  const price = document.createElement("div");
  price.className = "book-price";

  const priceValue = document.createElement("span");
  priceValue.className = "price-value";
  priceValue.textContent = currency.format(book.price);

  const priceLabel = document.createElement("span");
  priceLabel.className = "price-label";
  priceLabel.textContent = `#${index + 1} lowest`;

  const links = document.createElement("span");
  links.className = "book-links";
  for (const [label, url] of [["Price", book.shopUrl], ["Rating", book.goodreadsUrl]]) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    link.setAttribute("aria-label", `${label} source for ${book.title}`);
    links.append(link);
  }

  price.append(priceValue, priceLabel, links);
  card.append(cover, info, price);
  return card;
}

function renderBooks() {
  const minimumRating = Number(filterInput.value);
  const matchingBooks = books
    .filter((book) => book.rating >= minimumRating)
    .sort((a, b) => a.price - b.price || a.title.localeCompare(b.title))
    .slice(0, 5);

  filterValue.textContent = minimumRating === 0 ? "Any" : minimumRating.toFixed(1);
  resultsSummary.textContent = `Showing ${matchingBooks.length} of the five lowest-priced books with a rating of ${minimumRating === 0 ? "any level" : `${minimumRating.toFixed(1)} or higher`}.`;
  bookList.replaceChildren(...matchingBooks.map(createBookCard));
  emptyState.hidden = matchingBooks.length > 0;
  bookList.hidden = matchingBooks.length === 0;
}

renderSummary();
renderBooks();
filterInput.addEventListener("input", renderBooks);
