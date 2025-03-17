# Random Quote Generator

## Overview

The **Random Quote Generator** is a lightweight and interactive web application designed to fetch and display random quotes from an API. Users can generate new quotes, copy them to their clipboard, and even share them directly on Twitter. The project utilizes HTML, Tailwind CSS, and JavaScript to create a visually engaging and responsive experience.

![Quote Generator Preview](quote-output.png)

## Features

- 🔄 Fetches random quotes from an API with a single click
- ✨ Dynamic background image that changes with each new quote
- 📋 Copy quotes to the clipboard with a single button click
- 🐦 Share quotes directly to Twitter
- ⏳ Implements API request throttling to prevent excessive calls
- 🎨 Responsive and modern UI using Tailwind CSS

## Technologies Used

- **HTML** – Structuring the webpage
- **Tailwind CSS** – Styling and responsiveness
- **JavaScript** – Dynamic functionality and API interactions

## Project Structure

```
random-quote-generator/
│-- public/
│   ├── bg1.jpg       # Background images
│   ├── bg2.jpg       # Background images
│   ├── copy.png      # Copy button icon
│-- output.css        # Tailwind compiled CSS
│-- index.html        # Main HTML file
│-- script.js         # JavaScript logic
│-- README.md         # Project documentation
```

## Installation & Setup

### 🔧 Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/random-quote-generator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd random-quote-generator
   ```
3. Open `index.html` in your browser to use the application.

## Usage Guide

- Click **New Quote** to fetch a random quote.
- Click **Copy** to copy the displayed quote to your clipboard.
- Click **Tweet Quote** to share it directly on Twitter.
- Background image updates dynamically with each quote.

## JavaScript Functionality

### 🛠 Core Functions

- **Fetching Quotes**: Uses `fetchQuote()` to retrieve random quotes asynchronously.
- **Throttling Requests**: `throttleFn()` prevents API overload by limiting request frequency.
- **Updating UI**: Dynamically displays quotes in `#quote` and `#quote-author`.
- **Copy to Clipboard**: Uses `navigator.clipboard.writeText()` for easy copying.
- **Changing Backgrounds**: Selects a random background image on each new quote.

## Future Enhancements 🚀

- 🔍 **Category-based filtering** for quotes
- 🌙 **Dark mode** support
- 📌 **Save favorite quotes** using localStorage
- 🔗 **Social media sharing** beyond Twitter
- 🎶 **Text-to-speech feature** for listening to quotes

## Contributing 🤝

Contributions are welcome! Feel free to fork the repository, submit pull requests, or report issues.

## License 📜

This project is licensed under the **MIT License**.

---

### 👤 Author: Kevin Rozario

🔗 **GitHub**: [Kevin-Rozario](https://github.com/Kevin-Rozario)

Happy Coding! 🎉
