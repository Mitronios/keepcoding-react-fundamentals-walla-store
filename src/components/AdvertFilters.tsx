import { useEffect, useState } from "react";

interface AdvertFiltersProps {
	onChange: (filters: {
		name?: string;
		sale?: boolean;
		price?: string;
	}) => void;
}

const AdvertFilters = ({ onChange }: AdvertFiltersProps) => {
	const [name, setName] = useState("");
	const [sale, setSale] = useState("all");
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;

		switch (name) {
			case "name":
				setName(value);
				break;
			case "sale":
				setSale(value);
				break;
			case "priceMin":
				setPriceMin(value);
				break;
			case "priceMax":
				setPriceMax(value);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const filters: { name?: string; sale?: boolean; price?: string } = {};

		const trimmedName = name.trim();
		if (trimmedName) {
			filters.name = trimmedName;
		}

		if (sale !== "all") {
			filters.sale = sale === "true";
		}

		if (priceMin || priceMax) {
			const priceRange = `${priceMin || 0}-${priceMax || ""}`;
			filters.price = priceRange;
		}

		onChange(filters);
	}, [name, sale, priceMin, priceMax]);

	return (
		<div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4 md:flex-row md:items-end">
			{/* Filter by name */}
			<div className="flex flex-col">
				<label className="text-sm font-medium text-gray-700">Nombre</label>
				<input
					type="text"
					value={name}
					onChange={handleOnChange}
					placeholder="Ej. Nintendo"
					className="border rounded p-2"
				/>
			</div>

			{/* Filter by type */}
			<div className="flex flex-col">
				<label className="text-sm font-medium text-gray-700">Tipo</label>
				<select
					value={sale}
					onChange={handleOnChange}
					className="border rounded p-2"
				>
					<option value="all">Todos</option>
					<option value="true">Venta</option>
					<option value="false">Compra</option>
				</select>
			</div>

			{/* Filter by price */}
			<div className="flex flex-col">
				<label className="text-sm font-medium text-gray-700">
					Precio mínimo
				</label>
				<input
					type="number"
					min="0"
					value={priceMin}
					onChange={handleOnChange}
					className="border rounded p-2"
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-sm font-medium text-gray-700">
					Precio máximo
				</label>
				<input
					type="number"
					min="0"
					value={priceMax}
					onChange={handleOnChange}
					className="border rounded p-2"
				/>
			</div>
		</div>
	);
};

export default AdvertFilters;
