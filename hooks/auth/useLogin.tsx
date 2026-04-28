import { LoginSchema, LoginSchemaType } from "@/schema/auth/login.schema"
import { fetchCurrentUser, loginUser, persistAuthToken } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useLogin = () => {
    const [submitted, setSubmitted] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

    async function onSubmit(data: LoginSchemaType) {
        setAuthError(null)
        setSubmitted(false)

        try {
            const token = await loginUser(data.email, data.password)
            persistAuthToken(token.access_token)

            const currentUser = await fetchCurrentUser(token.access_token)
            setUserName(currentUser.name)
            setSubmitted(true)
        } catch (error) {
            setUserName(null)
            setAuthError(error instanceof Error ? error.message : "Login failed")
        }
    }

    return {
        register,
        handleSubmit,
        submitted,
        onSubmit,
        errors,
        isSubmitting,
        authError,
        userName,
    }
}