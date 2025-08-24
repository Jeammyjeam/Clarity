import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar-nav';
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: 'Clarity AI',
  description: 'AI-Powered Mood Expression & Enlightenment App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <Logo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings />
                <span>Settings</span>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex items-center justify-between p-4 border-b md:justify-end">
               <SidebarTrigger className="md:hidden" />
               {/* Add any header elements here */}
            </header>
            <main className="p-4 md:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
