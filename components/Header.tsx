'use client';
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/clerk-react";
import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
  return (
    <div className={`p-4 flex items-center justify-between ${
        isHomePage ? "bg-blue-50" : "bg-white border-b border-blue-50"
    }`}>
        <Link href="/" className="flex items-center">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-xl font-semibold">
            My App
        </h1>
        </Link>
        <div className="flex items-center space-x-4">
            <SignedIn>
                <Link href="/receipts">
                    <Button variant="outline">Receipts</Button>
                </Link>
                <Link href="/manage-plan">
                    <Button >Manage Plan</Button>
                </Link>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button>Login</Button>
                </SignInButton>
            </SignedOut>
        </div>
    </div>
  )
}
export default Header