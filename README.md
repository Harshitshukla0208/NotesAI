# Mini AI-Powered Notes App

## Overview
A responsive web application built using **Next.js** (TypeScript), **TailwindCSS**, and **Shadcn UI** components. This app allows users to create, edit, and delete notes, while providing an AI-powered summarization feature powered by the **Groq API**. The app uses **Supabase** for user authentication and data storage, with **React Query** for efficient data management.

## Features
- **User Authentication**: Sign up and log in using email/password or Google authentication.
- **Note Creation**: Create, edit, and delete notes.
- **AI Summarization**: Integrate the Groq API to summarize notes using AI.
- **State Management**: React Query for efficient data fetching and caching.
- **Responsive Design**: A clean, user-friendly, and responsive interface.

## Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Supabase for authentication and database management
- **AI Integration**: Groq API for summarizing notes
- **State Management**: React Query for data fetching and caching

## Getting Started

### Prerequisites
Before getting started, ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **Yarn** or **npm** package manager
- **Vercel** account (for deployment)

### Install Dependencies
Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd notes-app
npm install
```

or if you're using **Yarn**:

```bash
yarn install
```

### Environment Variables
Create a `.env.local` file in the root of your project and add the following keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

You can get these keys from:
- **Supabase**: https://supabase.io
- **Groq API**: https://groq.co

### Running the Development Server
To run the development server, use:

```bash
npm run dev
```

or with **Yarn**:

```bash
yarn dev
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Building for Production
To build the application for production:

```bash
npm run build
```

or with **Yarn**:

```bash
yarn build
```

### Deploying on Vercel
1. Create a **Vercel** account and link it to your GitHub.
2. Push your repository to GitHub.
3. On Vercel, click **New Project** and select the repository.
4. Configure the environment variables (Supabase and Groq API keys) on Vercel.

For more details on deployment, check out the [Vercel deployment documentation](https://vercel.com/docs).

## How to Use
1. **Sign Up/Login**: Use email/password or Google authentication to sign up or log in.
2. **Create Notes**: After logging in, you can create new notes, edit or delete existing notes.
3. **AI Summarization**: After writing a note, you can click the "Summarize" button to get an AI-generated summary of the note.

## Screenshots
![image](https://github.com/user-attachments/assets/8e920319-ce3b-4641-a66f-f83db74e05f2)
![image](https://github.com/user-attachments/assets/06d17d0c-d8d3-45e2-ab55-11351f7f4bdb)
![image](https://github.com/user-attachments/assets/624900d3-755f-4c2a-99cc-ccc145bb9a91)
![image](https://github.com/user-attachments/assets/1f95ce8d-62a7-4e98-9016-6c49c65a6695)



## Contributing
If you'd like to contribute to this project, feel free to fork the repository, submit a pull request, or open an issue with suggestions or bug reports.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
