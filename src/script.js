const QUOTE_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const THROTTLE_DELAY = 2000;
const options = { method: "GET", headers: { accept: "application/json" } };
const bgImages = [
  "./assets/bg1.jpg",
  "./assets/bg2.jpg",
  "./assets/bg3.jpg",
  "./assets/bg4.jpg",
  "..assets/bg5.jpg",
  "./assets/bg6.jpg",
  "./assets/bg7.jpg",
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchQuote() {
  try {
    const response = await fetch(QUOTE_URL, options);
    const data = await response.json();

    if (!data || !data.data) throw new Error("Invalid data received");

    return data;
  } catch (error) {
    console.error("Error occurred: ", error);
    return null;
  }
}

function throttleFn(fn, delay) {
  let timeId = null;
  let lastResponse = null;

  return async (...args) => {
    if (timeId === null) {
      lastResponse = await fn(...args);
      timeId = setTimeout(() => {
        timeId = null;
      }, delay);
    }
    return lastResponse;
  };
}

const throttledFetchFn = throttleFn(fetchQuote, THROTTLE_DELAY);

function changeBackground() {
  const number = getRandomIntInclusive(0, bgImages.length - 1);
  bodyBackground.style.backgroundImage = `url(${bgImages[number]})`;
  bodyBackground.classList.add("fade-in");

  setTimeout(() => {
    bodyBackground.classList.remove("fade-in");
  }, 1000);
}

const clickEvent = async () => {
  const quoteContent = await throttledFetchFn();
  if (quoteContent) {
    quote.textContent = quoteContent.data.content;
    author.textContent = quoteContent.data.author;
  } else {
    quote.textContent = "Failed to fetch quote.";
  }

  changeBackground(); // Call background change function
};

const copyEvent = async () => {
  const text = `${quote.innerText} -${author.innerText}`;
  try {
    await navigator.clipboard.writeText(text);
    copyTip.setAttribute("data-tip", "copied!");

    // Reset tooltip on mouseout
    const resetTooltip = () => {
      copyTip.setAttribute("data-tip", "copy");
    };
    cpButton.addEventListener("mouseout", resetTooltip, { once: true });
  } catch (error) {
    console.error("Failed to copy!");
  }
};

const sendTweet = () => {
  const tweetText = `${quote.innerText} - ${author.innerText}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(tweetUrl, "_blank");
};

const quote = document.getElementById("quote");
const getQuote = document.getElementById("get-quote");
const author = document.getElementById("quote-author");
const cpButton = document.getElementById("copy-button");
const copyTip = document.getElementById("copy-tooltip");
const tweetButton = document.getElementById("tweet-button");
const bodyBackground = document.querySelector("body");

cpButton.addEventListener("click", copyEvent);
tweetButton.addEventListener("click", sendTweet);
getQuote.addEventListener("click", clickEvent);
