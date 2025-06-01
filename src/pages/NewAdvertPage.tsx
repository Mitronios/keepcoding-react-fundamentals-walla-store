import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar
import type { AdvertCreatePayload } from "../interfaces/advert";
import { advertCreateService } from "../services/advertCreateService";

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
			// Redireccionar a la página del anuncio creado (suponiendo que devuelve un id o slug)
			navigate(`/adverts/${createdAdvert.id}`);
		} catch (error) {
			alert("Error al crear el anuncio. Intenta nuevamente.");
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Create a new advert</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name *</label>
					<input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>Type *</label>
					<label>
						<input
							type="radio"
							name="sale"
							value="true"
							checked={sale === "true"}
							onChange={() => setSale("true")}
						/>
						Sale
					</label>
					<label>
						<input
							type="radio"
							name="sale"
							value="false"
							checked={sale === "false"}
							onChange={() => setSale("false")}
						/>
						Buy
					</label>
				</div>

				<div>
					<label>Tags *</label>
					{availableTags.map((tag) => (
						<label
							key={tag}
							style={{ marginRight: "10px" }}
						>
							<input
								type="checkbox"
								value={tag}
								checked={tags.includes(tag)}
								onChange={() => handleTagChange(tag)}
							/>
							{tag}
						</label>
					))}
				</div>

				<div>
					<label htmlFor="price">Price *</label>
					<input
						id="price"
						type="number"
						min="0"
						step="0.01"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor="photo">Photo</label>
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
					/>
				</div>

				<button
					type="submit"
					disabled={!isFormValid}
				>
					Create
				</button>
			</form>
		</div>
	);
};
