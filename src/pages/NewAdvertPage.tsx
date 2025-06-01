import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar
import type { AdvertCreatePayload } from "../interfaces/advert";
import { advertCreateService } from "../services/advertCreateService";
import {
	PlusCircle,
	Tag,
	Euro,
	CheckCircle,
	XCircle,
	Image,
} from "lucide-react";

const availableTags = ["mobile", "lifestyle", "motor", "work"]; // Ejemplo de tags disponibles

export const NewAdvertPage: React.FC = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [sale, setSale] = useState<"true" | "false">("true"); // Compra / Venta
	const [tags, setTags] = useState<string[]>([]);
	const [price, setPrice] = useState("");
	const [photo, setPhoto] = useState<File | null>(null);

	// Validations
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const isValid =
			name.trim().length > 0 &&
			(sale === "true" || sale === "false") &&
			tags.length > 0 &&
			price.trim().length > 0 &&
			!isNaN(Number(price)) &&
			Number(price) > 0;
		setIsFormValid(isValid);
	}, [name, sale, tags, price]);

	const handleTagChange = (tag: string) => {
		setTags((prevTags) =>
			prevTags.includes(tag)
				? prevTags.filter((t) => t !== tag)
				: [...prevTags, tag],
		);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!isFormValid) return;

		const advertData: AdvertCreatePayload = {
			name,
			sale: sale === "true",
			tags,
			price: Number(price),
			photo: photo || undefined,
		};

		try {
			const createdAdvert = await advertCreateService(advertData);
			navigate(`/adverts/${createdAdvert.id}`);
		} catch (error) {
			alert("Error al crear el anuncio. Intenta nuevamente.");
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
					<PlusCircle className="w-8 h-8 text-indigo-600" />
					Create new advert
				</h1>
				<form
					onSubmit={handleSubmit}
					className="space-y-5"
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Name *
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Advert Name"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Type *
						</label>
						<div className="flex items-center space-x-4 mt-2">
							<label className="inline-flex items-center cursor-pointer">
								<input
									type="radio"
									name="sale"
									value="true"
									checked={sale === "true"}
									onChange={() => setSale("true")}
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<span className="ml-2 text-gray-700">Sale</span>
							</label>
							<label className="inline-flex items-center cursor-pointer">
								<input
									type="radio"
									name="sale"
									value="false"
									checked={sale === "false"}
									onChange={() => setSale("false")}
									className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
								/>
								<span className="ml-2 text-gray-700">Buy</span>
							</label>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
							<Tag className="w-4 h-4 mr-1 text-gray-500" /> Tags *
						</label>
						<div className="flex flex-wrap gap-2 mt-2">
							{availableTags.map((tag) => (
								<label
									key={tag}
									className={`inline-flex items-center px-3 py-1 border rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 ease-in-out ${
										tags.includes(tag)
											? "bg-indigo-600 text-white border-indigo-600"
											: "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
									}`}
								>
									<input
										type="checkbox"
										value={tag}
										checked={tags.includes(tag)}
										onChange={() => handleTagChange(tag)}
										className="hidden"
									/>
									{tag}
								</label>
							))}
						</div>
					</div>

					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
						>
							<Euro className="w-4 h-4 mr-1 text-gray-500" /> Price *
						</label>
						<input
							id="price"
							type="number"
							min="0"
							step="0.01"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Ej: 99.99"
						/>
					</div>

					<div>
						<label
							htmlFor="photo"
							className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
						>
							<Image className="w-4 h-4 mr-1 text-gray-500" /> Photo
						</label>
						<input
							id="photo"
							type="file"
							accept="image/*"
							onChange={(e) => {
								if (e.target.files && e.target.files[0]) {
									setPhoto(e.target.files[0]);
								} else {
									setPhoto(null);
								}
							}}
							className="mt-1 block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
						/>
						{photo && (
							<p className="mt-2 text-sm text-gray-500">
								File Selected: <span className="font-medium">{photo.name}</span>
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!isFormValid}
						className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ease-in-out ${
							isFormValid
								? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								: "bg-gray-400 cursor-not-allowed"
						}`}
					>
						{isFormValid ? (
							<CheckCircle className="w-5 h-5 mr-2" />
						) : (
							<XCircle className="w-5 h-5 mr-2" />
						)}
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewAdvertPage;
