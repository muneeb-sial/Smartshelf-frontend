import { SignupSchema, SignupSchemaType } from "@/schema/auth/signup.schema"
import { signupUser } from "@/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useSignup = () => {
	const [submitted, setSubmitted] = useState(false)
	const [signupError, setSignupError] = useState<string | null>(null)
	const [createdUserName, setCreatedUserName] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupSchemaType>({ resolver: zodResolver(SignupSchema) })

	async function onSubmit(data: SignupSchemaType) {
		setSignupError(null)
		setSubmitted(false)

		try {
			const user = await signupUser(data.name, data.email, data.password)
			setCreatedUserName(user.name)
			setSubmitted(true)
		} catch (error) {
			setCreatedUserName(null)
			setSignupError(error instanceof Error ? error.message : "Signup failed")
		}
	}

	return {
		register,
		handleSubmit,
		submitted,
		onSubmit,
		errors,
		isSubmitting,
		signupError,
		createdUserName,
	}
}
