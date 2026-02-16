"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, Eye, EyeOff } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simulate a brief loading state
    setTimeout(() => {
      const result = login(email, password)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error ?? "Login failed.")
      }
      setIsSubmitting(false)
    }, 400)
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
          <LogIn className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-balance">
          Welcome back
        </CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
          >
            Create one
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
