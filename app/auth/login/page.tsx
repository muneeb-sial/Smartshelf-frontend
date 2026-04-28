"use client"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/auth/useLogin"

export default function LoginPage() {
    const { submitted, handleSubmit, errors, isSubmitting, onSubmit, register, authError, userName } = useLogin()


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg p-8 shadow">
                <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full rounded border px-3 py-2 text-sm"
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="w-full rounded border px-3 py-2 text-sm"
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>

                {authError && (
                    <p className="mt-4 text-sm text-destructive">{authError}</p>
                )}

                {submitted && (
                    <p className="mt-4 text-sm text-green-600">
                        Signed in successfully{userName ? ` as ${userName}` : ""}.
                    </p>
                )}

                <p className="mt-6 text-sm text-muted-foreground">
                    Don&apos;t have an account? <a href="/auth/signup" className="text-primary underline">Create one</a>
                </p>
            </div>
        </div>
    )
}
