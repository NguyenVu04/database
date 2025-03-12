# Travel Social Media

This project is a social media platform for travelers, built using Next.js, PostgreSQL, and NextAuth for authentication. It allows users to share their travel experiences, connect with other travelers, and discover new destinations.

## Features

- **User Profiles**: Create and customize your profile to showcase your travel history and interests.
- **Posts and Comments**: Share your travel stories, photos, and videos. Engage with other users through comments.
- **Explore Destinations**: Discover new travel destinations based on user posts and recommendations.
- **Follow and Connect**: Follow other travelers to stay updated with their adventures.
- **Secure Authentication**: User authentication powered by NextAuth.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (used for both frontend and backend)
- **Database**: PostgreSQL
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (>= 12.x)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NguyenVu04/travel-social-media.git
   cd travel-social-media
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Run database migrations:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit up
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Deployment

The application is deployed to Vercel. You can access it at [database-sigma.vercel.app](https://database-sigma.vercel.app/).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please reach out to [NguyenVu04](https://github.com/NguyenVu04).
