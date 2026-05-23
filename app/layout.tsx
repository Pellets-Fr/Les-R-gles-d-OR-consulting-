import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "H Courtage AI — Votre courtier intelligent, vos économies en 3 minutes",
  description:
    "Le premier courtier québécois augmenté par IA. Analyse votre profil, compare 18 assureurs et négocie vos rabais. Affilié au Groupe Jetté Assurances inc.",
  keywords: "assurance québec, courtier assurance, assurance auto, assurance habitation, assurance cybersécurité",
  authors: [{ name: "Houssem El Ghoul" }],
  openGraph: {
    title: "H Courtage AI — Votre courtier intelligent",
    description: "L'IA analyse, compare 18 assureurs et négocie pour vous. Économisez jusqu'à 1 240 $/an.",
    type: "website",
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-CA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
