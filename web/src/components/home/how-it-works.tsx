import { Link } from "react-router";
import { Steps } from "./how-it-works-card";
import { Button } from "../ui/button";

export function HowItWorks() {
	return (
		<section id="como-funciona">
			<div className="w-full py-36 bg-muted/30">
				<div className="flex w-[1200px] mx-auto items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-4 text-center">
						<h1 className="text-4xl font-bold leading-tight">Como Funciona?</h1>

						<div className="flex flex-col gap-4 mt-4 items-center">
							<Steps />

							<div
								className="mt-12 max-w-max flex items-center gap-12 p-4 rounded-full border
					font-medium text-sm"
							>
								Tudo simples, digital e eficiente. Comece agora mesmo!
								<Link to={"/cadastro"}>
									<Button className="font-bold px-8 rounded-full">
										Cadastre-se
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
