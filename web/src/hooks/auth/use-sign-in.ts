import { signInRequestSchema } from "@/@schemas/auth";
import { signIn } from "@/api/auth/sign-in";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormMutation } from "../common/use-form-mutation";

export function useSignIn() {
	const { authenticate } = useAuthStore();

	const form = useFormMutation({
		schema: signInRequestSchema,
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: (data) => {
			signInFn(data);
		},
	});

	const { mutate: signInFn, isPending: isLoadingSignIn } = useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			if (response.success) {
				authenticate(response.data.accessToken);
				return;
			}

			for (const error of response.errors) {
				toast.error(error);
			}
		},
	});

	return {
		form,
		isLoadingSignIn,
	};
}
