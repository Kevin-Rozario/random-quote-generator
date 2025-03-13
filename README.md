# Random Quote Generator

## Overview
The **Random Quote Generator** is a simple web application that fetches and displays random quotes from an API. Users can generate a new quote at the click of a button and copy the quote to their clipboard with ease. The project is built using HTML, CSS (Tailwind), and JavaScript.

![Quote generator output](quote-output.png)

## Features
- Fetches random quotes from an API
- Displays quotes dynamically in a visually appealing interface
- Provides an option to copy the quote to the clipboard
- Implements a throttling mechanism to prevent excessive API calls
- Uses Tailwind CSS for styling and responsive design

## Technologies Used
- **HTML**: For structuring the webpage
- **CSS (Tailwind CSS)**: For styling and layout
- **JavaScript**: For dynamic functionality and API interaction

## Project Structure
```
random-quote-generator/
│-- public/
│   ├── quote-bg.jpg      # Background image
│   ├── copy.png          # Copy button icon
│-- output.css            # Compiled Tailwind CSS
│-- index.html            # Main HTML file
│-- script.js             # JavaScript functionality
│-- README.md             # Documentation
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/random-quote-generator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd random-quote-generator
   ```
3. Open `index.html` in a browser to run the application.

## Usage
- Click the **Get Quote** button to fetch and display a random quote.
- Click the **Copy** button to copy the displayed quote to the clipboard.
- Quotes are fetched from `https://api.freeapi.app/api/v1/public/quotes/quote/random`.

## JavaScript Functionality
- **Fetching Quotes**: The app uses the `fetchQuote()` function to retrieve quotes from the API asynchronously.
- **Throttling API Requests**: A throttling mechanism (`throttleFn()`) ensures that API requests are not made too frequently.
- **Updating the UI**: The fetched quote is dynamically displayed in the `#quote` and `#quote-author` elements.
- **Copying Quotes**: The copy button uses `navigator.clipboard.writeText()` to copy the quote to the clipboard and provides feedback with a tooltip.

## Future Enhancements
- Add categories for filtering quotes.
- Implement dark mode.
- Save favorite quotes locally using `localStorage`.
- Allow users to share quotes on social media.

## Contributing
Feel free to contribute by submitting pull requests or reporting issues.

## License
This project is licensed under the MIT License.

---
**Author**: Kevin Rozario
**GitHub**: [Your GitHub Profile](https://github.com/Kevin-Rozario)