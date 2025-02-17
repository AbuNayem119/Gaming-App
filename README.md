
# Chill Gamer  

Chill Gamer is a dynamic and user-friendly platform designed for gaming enthusiasts who love to explore and share their insights about the world of gaming. This application serves as a hub where users can discover detailed reviews of popular games, share their own experiences, and connect with fellow gamers. With a focus on simplicity and functionality, Chill Gamer provides a seamless user experience, whether you're browsing through top-rated games, contributing reviews, or managing your personalized watchlist. It's not just a review platform—it's a vibrant community for gamers to celebrate their passion and stay updated with the latest in gaming.  

## Live Site URL  
[Visit Chill Gamer](#) *(Replace `#` with your live site URL)*  

## Features  
- **User Authentication**: Secure email/password login, Google or GitHub login integration, and dynamic navigation based on login state.  
- **Review Management**: Add, view, update, and delete game reviews with options to filter and sort based on rating, year, or genre.  
- **Responsive Design**: Fully responsive layout for seamless usage on mobile, tablet, and desktop devices.  
- **Game Watchlist**: Add games to your watchlist directly from the review details page and manage your list conveniently.  
- **Unique Design & Modern Animations**: Incorporates dark/light themes and interactive animations using modern React libraries like Lottie React and React Tooltip.  

## Pages Overview  
- **Home**:  
  - Slider/banner with meaningful content.  
  - Section displaying 6 highest-rated games with "Explore Details" buttons.  
  - Two extra sections with relevant gaming-related information.  

- **All Reviews**:  
  - Display all reviews in a card format.  
  - Sort and filter options based on rating, year, and genre.  

- **Review Details**:  
  - Show detailed information about a specific review.  
  - Option to add the game to the watchlist (private route).  

- **Add Review**:  
  - Form to add a new game review with fields like title, cover image, rating, genre, and description (private route).  

- **My Reviews**:  
  - View, update, or delete your own reviews in a tabular format (private route).  

- **Game Watchlist**:  
  - Manage games added to your watchlist with relevant details (private route).  

- **Authentication Pages**:  
  - Login and Register pages with password validation, error handling, and toast notifications for feedback.  

- **404 Page**:  
  - Custom-designed not-found page for invalid routes.  

## Technologies Used  
- **Frontend**: React, React Router, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Hosting**:  
  - Client: Netlify/Firebase  
  - Server: Vercel  
- **Authentication**: Firebase Authentication  

