import { signUpRequestSchema } from "@/@schemas/auth";
import { signUp } from "@/api/auth/sign-up";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormMutation } from "../common/use-form-mutation";

export function useSignUp() {
	const navigate = useNavigate();

	const form = useFormMutation({
		schema: signUpRequestSchema,
		defaultValues: {
			name: "",
			document: "",
			email: "",
			password: "",
			phone: "",
			role: "MUNICIPALITY",
		},
		onSubmit(data) {
			signUpFn(data);
		},
	});

	const { mutateAsync: signUpFn, isPending: isLoadingSignUp } = useMutation({
		mutationKey: ["sign-up"],
		mutationFn: signUp,
		onSuccess: (response) => {
			if (response.success) {
				navigate(`/entrar?email=${form.watch("email")}`);
				return;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	return { form, isLoadingSignUp };
}
