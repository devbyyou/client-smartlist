import Navbar from '../Navbar';
import { ReactNode } from 'react';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
