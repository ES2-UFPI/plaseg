import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="grid gird-cols-1 md:grid-cols-3 h-screen w-full">
			<div className="hidden md:flex items-center justify-center w-full bg-muted">
				<h1 className="flex text-6xl font-semibold items-center text-slate-700">
					Pla<span className="text-primary">Seg</span>
				</h1>
			</div>

			<div className="col-span-2 flex items-center justify-center w-full bg-white">
				<div className="flex w-[400px] flex-col gap-24 items-center">
					<h1 className="md:hidden text-5xl font-semibold flex items-center text-slate-700">
						Pla<span className="text-primary">Seg</span>
					</h1>

					<Outlet />
				</div>
			</div>
		</div>
	);
}
