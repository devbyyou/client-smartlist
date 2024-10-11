
import "./styles/globals.css";
import { Providers } from './store/provider';


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }> | any) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
