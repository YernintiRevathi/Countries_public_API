// This line imports two fonts from Google Fonts via the next/font helper.
// It's a modern way to handle fonts for good performance.
// - Geist: A modern sans-serif font created by Vercel (the makers of Next.js).
// - Geist_Mono: The monospaced version of the Geist font (for code, etc.).
import { Geist, Geist_Mono } from "next/font/google";

// This imports your global stylesheet, where you can apply the font variables.
// Styles here will apply to the entire application.
import "./globals.css";

// This initializes the main sans-serif font.
const geistSans = Geist({
  // This is the key difference! Instead of a simple className, you're telling
  // the font helper to create and provide a CSS variable named '--font-geist-sans'.
  // This variable can then be used anywhere in your CSS.
  variable: "--font-geist-sans",
  // This specifies which character sets to include for the font.
  subsets: ["latin"],
});

// This does the exact same thing for the monospaced font, creating a
// different CSS variable for it.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This is the 'metadata' object. Next.js uses this to set the <title> and
// <meta name="description"> tags in the page's <head>. This is important for
// browser tabs and for search engine optimization (SEO).
export const metadata = {
  title: "Countries of the World",
  description: "An app to explore countries, built with Next.js",
};

// This is the RootLayout component, the main shell for your entire application.
// The `children` prop is a special prop in React. In this case, `children`
// will be your `page.js` component, and any other pages you might create.
export default function RootLayout({ children }) {
  return (
    // The <html> tag, with the language set to English.
    <html lang="en">
      {/* The <body> tag. We apply the fonts' CSS class to the body,
          so the font is used throughout the entire application. */}
      <body
        // This uses a JavaScript template literal (the backticks ``) to combine multiple strings.
        // - `${geistSans.variable}`: This inserts the string '--font-geist-sans'.
        // - `${geistMono.variable}`: This inserts the string '--font-geist-mono'.
        // - `antialiased`: This is a Tailwind CSS utility class that applies font-smoothing
        //   for crisper, more readable text.
        // The final result on the <body> tag will be something like:
        // class="--font-geist-sans --font-geist-mono antialiased"
        // This makes the CSS variables available to all child elements.
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* This is where your page content (like page.js) will be rendered. */}
        {children}
      </body>
    </html>
  );
}