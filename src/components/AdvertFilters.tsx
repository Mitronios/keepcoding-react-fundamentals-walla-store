import { useEffect, useState } from "react";
import type { filtersType } from "../interfaces/filtersType";
import { getAvailableTags } from "../services/advertServices";

interface AdvertFiltersProps {
	onChange: (filters: filtersType) => void;
}

const AdvertFilters = ({ onChange }: AdvertFiltersProps) => {
	const [sale, setSale] = useState("all");
	const [tags, setTags] = useState<string[]>([]);
	const [availableTags, setAvailableTags] = useState<string[]>([]);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const tagsFromServer = await getAvailableTags();
				setAvailableTags(tagsFromServer);
			} catch (error) {
				console.error("Error loading tags", error);
			}
		};
		fetchTags();
	}, []);

	useEffect(() => {
		const filters: filtersType = {};

		if (sale !== "all") {
			filters.sale = sale === "true";
		}

		if (tags.length > 0) {
			filters.tags = tags.join(",");
		}

		onChange(filters);
	}, [sale, tags]);

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const target = event.target as HTMLInputElement;
		const { name, value, checked } = target;

		switch (name) {
			case "sale":
				setSale(value);
				break;
			case "tags":
				if (checked) {
					setTags((prev) => [...prev, value]);
				} else {
					setTags((prev) => prev.filter((tag) => tag !== value));
				}
				break;
		}
	};

	return (
		<div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4 md:flex-row md:items-center md justify-center mx-auto max-w-md">
			{/* Filter by tags */}
			<div className="flex flex-col max-w-xs">
				<label className="text-sm font-medium text-gray-700 mb-1">Tags</label>
				<div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border rounded p-2">
					{availableTags.map((tag) => (
						<label
							key={tag}
							className="inline-flex items-center space-x-2 cursor-pointer"
						>
							<input
								type="checkbox"
								name="tags"
								value={tag}
								checked={tags.includes(tag)}
								onChange={handleOnChange}
								className="form-checkbox"
							/>
							<span className="text-gray-700 text-sm">{tag}</span>
						</label>
					))}
				</div>
			</div>

			{/* Filter by type */}
			<div className="flex flex-col">
				<label
					htmlFor="filter-sale"
					className="text-sm font-medium text-gray-700"
				>
					Type
				</label>
				<select
					id="filter-sale"
					name="sale"
					value={sale}
					onChange={handleOnChange}
					className="border rounded p-2"
					autoCapitalize="off"
				>
					<option value="all">All</option>
					<option value="true">Sale</option>
					<option value="false">Buy</option>
				</select>
			</div>
		</div>
	);
};

export default AdvertFilters;
