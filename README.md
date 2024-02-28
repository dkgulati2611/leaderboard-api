# Leaderboard API

This is a Node.js API for managing a leaderboard stored in MongoDB. It provides endpoints to display the current week leaderboard, last week leaderboard by country, and fetch user rank.

## Features

- Display current week leaderboard (Top 200)
- Display last week leaderboard by country (Top 200)
- Fetch user rank by user ID

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/leaderboard-api.git
2. Install dependencies:
   ```bash
   cd leaderboard-api
   npm install
3. Configure environment variables:
   Create a .env file in the root directory and provide the following variables:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_connection_uri

4. Run the application:
   ```bash
   npm start
   
## Endpoints

  1. Display Current Week Leaderboard
      * URL: /leaderboard/current-week
      * Method: GET
      * Description: Displays the current week leaderboard (Top 200).
     
  2. Display Last Week Leaderboard by Country
      * URL: /leaderboard/last-week/:country
      * Method: GET
      * Description: Displays the last week leaderboard for the specified country (Top 200). Provide the country name as a parameter.

  3. Fetch User Rank
      * URL: /user/rank/:userId
      * Method: GET
      * Description: Fetches the user's rank based on the provided user ID.
  
### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

  ```javascript
  Replace the placeholders (`yourusername`, `your_mongodb_connection_uri`) with your actual information.
