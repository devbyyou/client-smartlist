
import "./styles/globals.css";
import Navbar from './components/Navbar';
import { Providers } from './store/provider';


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }> | any) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
