"use client"

import { useRouter } from "next/navigation"
import { LogOut, ShieldCheck, User, Mail } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DashboardContent() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    router.push("/login")
    return null
  }

  function handleLogout() {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-card">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">Secure Auth</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only md:not-sr-only">Sign out</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            {"Welcome, "}{user.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            You have successfully signed in. This is your protected dashboard.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-md bg-muted px-4 py-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-muted px-4 py-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                <ShieldCheck className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>Authentication status</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-md bg-muted px-4 py-3">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium text-accent">Authenticated</p>
              </div>
              <div className="rounded-md bg-muted px-4 py-3">
                <p className="text-xs text-muted-foreground">Session</p>
                <p className="text-sm font-medium text-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
