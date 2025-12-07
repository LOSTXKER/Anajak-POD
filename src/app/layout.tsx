import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({ 
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Anajak POD - Print on Demand Platform",
  description: "แพลตฟอร์ม Print on Demand สำหรับการออกแบบและขายสินค้า",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        {/* Main App Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Designer Fonts - Thai */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,700&family=Mitr:wght@300;400;500;600;700&family=Pridi:wght@300;400;500;600;700&family=Itim&family=Mali:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Sriracha&family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=K2D:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Bai+Jamjuree:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Thasadith:ital,wght@0,400;0,700;1,400&family=Charm:wght@400;700&family=Charmonman:wght@400;700&family=Srisakdi:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Designer Fonts - English/Display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Lobster&family=Pacifico&family=Dancing+Script:wght@400;500;600;700&family=Righteous&family=Permanent+Marker&family=Bangers&family=Press+Start+2P&family=Creepster&family=Special+Elite&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${notoSansThai.className} antialiased`}>{children}</body>
    </html>
  );
}
