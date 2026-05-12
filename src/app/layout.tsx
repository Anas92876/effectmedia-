import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Effect Media | إيفكت ميديا',
  description: 'Effect Media — We Create Impact. Integrated advertising and media solutions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
