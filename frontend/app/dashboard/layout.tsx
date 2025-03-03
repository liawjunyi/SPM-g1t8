import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { dashboardConfig } from "@/config/dashboard";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";
import React from "react";
import BreadcrumbLayout from "@/components/breadcrumb-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Get the current user
  const user = await getCurrentUser();

  // If the user is not found, return a not found page
  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col ">
      <header className="sticky top-0 z-40 border-b bg-background w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex h-16 justify-between items-center px-6"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="FlexiWork Logo"
              width={80}
              height={80}
              className="mr-2 pl-4 pr-2"
            />
            <span className="font-bold text-xl">FlexiWork</span>
          </Link>
          <div className="flex justify-end space-x-4">
            {/* Display MainNav only on mobile view */}
            <div className="md:hidden mt-1">
              <MainNav mainNav={dashboardConfig.mainNav} currentUser={user} />
            </div>
            <UserAccountNav user={user} />
          </div>
        </motion.div>
      </header>
      <div className="flex lg:grid-cols-[300px_1fr] flex-1">
        <aside className="hidden w-[200px] flex-col lg:block flex-shrink-0">
          <div className="fixed h-[calc(100vh)] overflow-y-auto bg-primary text-primary-foreground">
            <DashboardNav
              sideBarNav={dashboardConfig.sidebarNav}
              currentUser={user}
            />
          </div>
        </aside>
        <main className="w-full space-y-6 md:px-12 pt-3 bg-secondary">
          <div className="px-2 md:px-0">
            <BreadcrumbLayout />
          </div>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
