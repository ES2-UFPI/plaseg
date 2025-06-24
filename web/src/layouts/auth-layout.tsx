import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div className="grid grid-cols-3 h-screen w-full">
			<div className="flex items-center justify-center w-full bg-muted">
				<h1 className="text-6xl font-semibold flex items-center">
					Pla<span className="text-blue-500">Seg</span>
				</h1>
			</div>

			<div className="col-span-2 flex items-center justify-center w-full bg-white">
				<div className="w-[400px]">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
