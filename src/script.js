const QUOTE_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const THROTTLE_DELAY = 3000;

const options = { method: 'GET', headers: { accept: 'application/json' } };

async function fetchQuote() {
    try {
        const response = await fetch(QUOTE_URL, options);
        const data = await response.json();
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
            lastResponse = await fn(...args)
            timeId = setTimeout(() => {
                timeId = null;
            }, delay);
        }
        return lastResponse;
    };
}

const throttledFetchFn = throttleFn(fetchQuote, THROTTLE_DELAY);

const clickEvent = async () => {
    const quoteContent = await throttledFetchFn()
    console.log(quoteContent);

    if (quoteContent) {
        quote.textContent = quoteContent.data.content
        author.textContent = quoteContent.data.author
    } else {
        quote.textContent = "Failed to fetch quote.";
    }
}


const copyEvent = async () => {
    const text = `${quote.innerText} -${author.innerText}`;
    try {
        await navigator.clipboard.writeText(text)
        copyTip.setAttribute("data-tip", "copied!")
        cpButton.addEventListener("onmouseout", () => {
            copyTip.setAttribute("data-tip", "copy");
        });
        const resetTooltip = () => {
            copyTip.setAttribute("data-tip", "copy");
        };
        cpButton.addEventListener("mouseout", resetTooltip);
    } catch (error) {
        console.error("Failed to copy!");
    }
}

const quote = document.getElementById("quote");
const getQuote = document.getElementById("get-quote");
const author = document.getElementById("quote-author")
const cpButton = document.getElementById("copy-button")
const copyTip = document.getElementById("copy-tooltip")

getQuote.addEventListener("click", clickEvent);
cpButton.addEventListener("click", copyEvent);