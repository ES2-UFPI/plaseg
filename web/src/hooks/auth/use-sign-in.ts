import { useFormMutation } from "../common/use-form-mutation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/sign-in";
import { useAuthStore } from "@/hooks/auth/use-auth";
import { toast } from "sonner";
import { signInRequestSchema } from "@/@schemas/auth";
import { useNavigate } from "react-router";

export function useSignIn() {
	const navigate = useNavigate();

	const { authenticate } = useAuthStore();

	const form = useFormMutation({
		schema: signInRequestSchema,
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: (data) => {
			signInFn({
				...data,
			});
		},
	});

	const { mutate: signInFn, isPending: isLoadingSignIn } = useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			if (response.success) {
				authenticate(response.data.accessToken, response.data.user.role);

				if (response.data.user.role === "MUNICIPALITY") {
					navigate("/oportunidades");
				}

				if (
					response.data.user.role === "ADMIN_MASTER" ||
					response.data.user.role === "ADMIN"
				) {
					navigate("/admin/dashboard");
				}

				return;
			}

			toast.warning(response.errors[0]);
		},
	});

	return {
		form,
		isLoadingSignIn,
	};
}
