"use client"
import { Button } from "@/components/ui/button"
import { useSignup } from "@/hooks/auth/useSignup"

export default function SignupPage() {
    const { submitted, handleSubmit, errors, isSubmitting, onSubmit, register, signupError, createdUserName } = useSignup()


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg p-8 shadow">
                <h1 className="text-2xl font-semibold mb-4">Create account</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <input id="name" {...register("name")} className="w-full rounded border px-3 py-2 text-sm" />
                        {errors.name && (
                            <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                        )}
                    </div>

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
                            {isSubmitting ? "Creating..." : "Create account"}
                        </Button>
                    </div>
                </form>

                {signupError && (
                    <p className="mt-4 text-sm text-destructive">{signupError}</p>
                )}

                {submitted && (
                    <p className="mt-4 text-sm text-green-600">
                        Account created successfully{createdUserName ? ` for ${createdUserName}` : ""}.
                    </p>
                )}

                <p className="mt-6 text-sm text-muted-foreground">
                    Already have an account? <a href="/auth/login" className="text-primary underline">Sign in</a>
                </p>
            </div>
        </div>
    )
}
