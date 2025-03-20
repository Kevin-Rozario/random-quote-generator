// API and configuration settings
const QUOTE_API_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const THROTTLE_DELAY_MS = 2000;
const API_OPTIONS = { method: "GET", headers: { accept: "application/json" } };
const BACKGROUND_IMAGES = [
  "./assets/bg1.jpg",
  "./assets/bg2.jpg",
  "./assets/bg3.jpg",
  "./assets/bg4.jpg",
  "./assets/bg5.jpg",
  "./assets/bg6.jpg",
  "./assets/bg7.jpg",
];

// Utility: Generate a random integer between min and max (inclusive)
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + Math.ceil(min);
}

// Fetch a random quote from the API
async function fetchQuote() {
  try {
    const response = await fetch(QUOTE_API_URL, API_OPTIONS);
    const data = await response.json();

    if (!data || !data.data) throw new Error("Invalid data received");
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

// Throttle function to limit API calls
function throttle(fn, delay) {
  let timeoutId = null;
  let lastResult = null;

  return async (...args) => {
    if (timeoutId === null) {
      lastResult = await fn(...args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
    return lastResult;
  };
}

const throttledFetchQuote = throttle(fetchQuote, THROTTLE_DELAY_MS);

// Change the page background to a random image
function changeBackground() {
  const randomIndex = getRandomIntInclusive(0, BACKGROUND_IMAGES.length - 1);
  bodyElement.style.backgroundImage = `url(${BACKGROUND_IMAGES[randomIndex]})`;
  bodyElement.classList.add("fade-in");

  setTimeout(() => {
    bodyElement.classList.remove("fade-in");
  }, 1000);
}

// Handle fetching a new quote and updating both DOM and canvas
const handleNewQuote = async () => {
  const quoteData = await throttledFetchQuote();
  if (quoteData) {
    const newQuote = quoteData.data.content;
    const newAuthor = quoteData.data.author;
    quoteTextElement.textContent = newQuote;
    authorTextElement.textContent = newAuthor;
    drawQuoteOnCanvas(newQuote, newAuthor);
  } else {
    quoteTextElement.textContent = "Failed to fetch quote.";
  }
  changeBackground();
};

// Copy the current quote and author to the clipboard
const handleCopy = async () => {
  const textToCopy = `${quoteTextElement.innerText} - ${authorTextElement.innerText}`;
  try {
    await navigator.clipboard.writeText(textToCopy);
    copyTooltip.setAttribute("data-tip", "copied!");

    // Reset tooltip on mouseout
    const resetTooltip = () => {
      copyTooltip.setAttribute("data-tip", "copy");
    };
    copyButton.addEventListener("mouseout", resetTooltip, { once: true });
  } catch (error) {
    console.error("Failed to copy text:", error);
  }
};

// Canvas setup
const canvasElement = document.getElementById("quote-canvas");
const canvasContext = canvasElement.getContext("2d");
canvasElement.width = 800;
canvasElement.height = 400;

// Draw the quote and author onto the canvas
function drawQuoteOnCanvas(quote, author) {
  // Clear previous drawing
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Draw background box with rounded corners
  canvasContext.fillStyle = "rgba(255, 255, 255, 0.8)";
  canvasContext.strokeStyle = "#333";
  canvasContext.lineWidth = 3;
  drawRoundedRectangle(canvasContext, 40, 40, canvasElement.width - 80, canvasElement.height - 80, 20);
  canvasContext.fill();
  canvasContext.stroke();

  // Add subtle shadow for text readability
  canvasContext.shadowColor = "rgba(0, 0, 0, 0.2)";
  canvasContext.shadowOffsetX = 2;
  canvasContext.shadowOffsetY = 2;
  canvasContext.shadowBlur = 4;

  // Draw quote text (centered)
  canvasContext.font = "28px Oswald, sans-serif";
  canvasContext.fillStyle = "black";
  canvasContext.textAlign = "center";
  wrapText(canvasContext, `"${quote}"`, canvasElement.width / 2, canvasElement.height / 2 - 20, canvasElement.width - 150, 36);

  // Draw author text below the quote
  canvasContext.font = "22px Oswald, sans-serif";
  canvasContext.fillStyle = "black";
  canvasContext.fillText(`- ${author}`, canvasElement.width / 2, canvasElement.height / 2 + 80);

  // Reset shadow settings
  canvasContext.shadowColor = "transparent";
}

// Helper: Wrap text within a specified width on canvas
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  words.forEach((word) => {
    const testLine = line + word + " ";
    if (context.measureText(testLine).width > maxWidth && line !== "") {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });
  lines.push(line);

  lines.forEach((l, i) => {
    context.fillText(l, x, y + i * lineHeight);
  });
}

// Helper: Draw a rounded rectangle on canvas
function drawRoundedRectangle(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Save the canvas image as a PNG file
const handleSaveImage = (event) => {
  event.preventDefault();
  const downloadAnchor = document.getElementById("download-link");
  downloadAnchor.href = canvasElement.toDataURL("image/png");
  downloadAnchor.download = "quote.png";
  downloadAnchor.click();

  saveTooltip.setAttribute("data-tip", "saved!");
  const resetTooltip = () => {
    saveTooltip.setAttribute("data-tip", "save");
  };
  saveButton.addEventListener("mouseout", resetTooltip, { once: true });
};

// Open a tweet window with the current quote and author
const handleTweet = () => {
  const tweetContent = `${quoteTextElement.innerText} - ${authorTextElement.innerText}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
  window.open(tweetUrl, "_blank");
};

// Element references from the DOM
const quoteTextElement = document.getElementById("quote");
const authorTextElement = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("get-quote");
const copyButton = document.getElementById("copy-button");
const copyTooltip = document.getElementById("copy-tooltip");
const saveButton = document.getElementById("save-button");
const saveTooltip = document.getElementById("save-tooltip");
const tweetButton = document.getElementById("tweet-button");
const bodyElement = document.querySelector("body");

// Set up event listeners
copyButton.addEventListener("click", handleCopy);
saveButton.addEventListener("click", handleSaveImage);
tweetButton.addEventListener("click", handleTweet);
newQuoteButton.addEventListener("click", handleNewQuote);
