import Link from "next/link"
import { ShieldCheck, LogIn, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <ShieldCheck className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
            Secure Auth
          </h1>
          <p className="max-w-md text-muted-foreground leading-relaxed">
            A simple authentication system. Register a new account, sign in, and access your protected dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">
              <UserPlus className="h-4 w-4" />
              Create account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
