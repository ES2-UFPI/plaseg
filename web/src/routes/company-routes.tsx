import { Route, Routes } from "react-router";

import AddProduct from "@/pages/company/add-product";
import PriceRegistrationRecords from "@/pages/company/price-registration-records";
import Products from "@/pages/company/products";
import AddPriceRegistrationRecord from "@/pages/company/add-price-registration-record";
import News from "@/pages/company/news";
import NewsDetails from "@/pages/company/news-details";

export function CompanyRoutes() {
	return (
		<Routes>
			<Route path="noticias" element={<News />} />
			<Route path="noticia" element={<NewsDetails />} />
			<Route path="produtos" element={<Products />} />
			<Route path="adicionar-produto" element={<AddProduct />} />
			<Route
				path="atas-de-registro-de-preco"
				element={<PriceRegistrationRecords />}
			/>
			<Route
				path="adicionar-ata-de-registro-de-preco"
				element={<AddPriceRegistrationRecord />}
			/>
		</Routes>
	);
}
