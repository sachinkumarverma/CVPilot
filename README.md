<div align="center">
  <img src="public/logo.png" alt="CVPilot Logo" width="120" />
  <h1>CVPilot</h1>
  <p><strong>The modern, AI-powered resume builder. Create professional, ATS-friendly resumes in minutes.</strong></p>
</div>

---

## 🌟 Features

- **🤖 AI Content Generator:** Instantly generate professional summaries, bullet points, and skills tailored to your target job title.
- **📄 ATS-Friendly Templates:** Choose from a variety of modern, clean templates specifically designed to pass Applicant Tracking Systems.
- **📈 Real-time Score:** Get instant feedback on your resume's strength and identify missing keywords based on job descriptions.
- **🔐 Secure Authentication:** Seamless and secure login using Google OAuth and email, powered by Supabase.
- **🎨 Beautiful UI & Dark Mode:** A stunning, highly responsive interface built with Tailwind CSS and Framer Motion, fully supporting light and dark themes.
- **🖨️ PDF Export:** Export your finished, perfectly formatted resume directly to PDF with one click.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Auth:** [Supabase](https://supabase.com/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account and project.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cvpilot.git
cd cvpilot
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

- `src/app`: Contains all Next.js pages, layouts, and API routes.
- `src/components`: Reusable UI components (Navbar, Footer, Hero, etc).
- `src/utils`: Utility functions, including the Supabase client initialization.
- `public`: Static assets like the logo and favicon.

## 📜 License

This project is licensed under the MIT License.
