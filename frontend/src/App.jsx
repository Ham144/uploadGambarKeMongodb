import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../constant.js";
import axios from "axios";

const App = () => {
	//states untuk Upload gambar
	const [selectedGambar, setselectedGambar] = useState();
	const [fromDBImage, setFromDBImage] = useState();

	async function handleUploadGambar() {
		const base64 = await convertToBase64(selectedGambar);
		const fileName = selectedGambar.name.split(".")[0];

		try {
			const response = await axios.post(
				`${BASE_BACKEND_URL}/api/gambar/uploadGambar`,
				{
					base64,
					fileName,
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	function decompileBase64(base64) {
		return atob(base64.split(",")[1]);
	}

	async function getGambarFromDatabase() {
		try {
			const response = await axios.get(
				`${BASE_BACKEND_URL}/api/gambar/getAllGambar`
			);
			setFromDBImage(response.data.data[0].base64);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getGambarFromDatabase();
	}, [selectedGambar]);

	return (
		<main className="flex flex-col justify-center items-center overflow-x-hidden   min-h-screen pt-12">
			<div className="flex  flex-col justify-center items-center h-72">
				<p className="text-2xl text-center font-bold ">
					Upload File Gambar Anda
				</p>
				<img src={fromDBImage} />
				<img
					src={selectedGambar ? URL?.createObjectURL(selectedGambar) : null}
					alt="gambar"
					className="w-72"
				/>
				<label htmlFor="upload " className={`relative max-auto`}>
					<p className="">Pilih gambar</p>

					<input
						type="file"
						id="upload"
						accept="image/*"
						className="mx-auto z-20    self-center"
						onChange={(e) => {
							setselectedGambar(e.target.files[0]);
						}}
					/>
				</label>
			</div>
			<button
				onClick={handleUploadGambar}
				className="btn text-center shadow-md rounded-md p-3  bg-green-400 translate-y-20"
			>
				Konfirmasi Upload
			</button>
		</main>
	);
};

export default App;
