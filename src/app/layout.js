import "./globals.css";

export const metadata = {
  title: "Renaissance Entertainment | Premium Film Production & Creative Agency",
  description:
    "Renaissance Entertainment is a premium film production, wedding cinematography, event management, and creative branding agency based in Delhi NCR. We create extraordinary visual experiences.",
  keywords:
    "film production, wedding cinematography, event management, celebrity management, branding, PR, Delhi NCR, Noida",
  openGraph: {
    title: "Renaissance Entertainment | We Create Experiences",
    description:
      "Premium film production & creative agency specializing in weddings, ad films, corporate events, and celebrity management.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
