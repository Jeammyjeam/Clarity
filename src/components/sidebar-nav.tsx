'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookHeart, Wind, BookOpen, LucideIcon } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: BookHeart },
  { href: '/breathe', label: 'Breathe', icon: Wind },
  { href: '/insights', label: 'Insights', icon: BookOpen },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
              <a>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
