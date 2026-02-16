"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus, Eye, EyeOff } from "lucide-react"

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

export function RegisterForm() {
  const { register } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const result = register(name, email, password)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error ?? "Registration failed.")
      }
      setIsSubmitting(false)
    }, 400)
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
          <UserPlus className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-balance">
          Create an account
        </CardTitle>
        <CardDescription>Fill in your details to get started</CardDescription>
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
            <Label htmlFor="register-name">Full name</Label>
            <Input
              id="register-name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="register-confirm">Confirm password</Label>
            <Input
              id="register-confirm"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {"Already have an account? "}
          <Link
            href="/login"
            className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
