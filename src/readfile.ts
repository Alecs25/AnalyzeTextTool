export function previewFile(filesList: Object[], event: any) {
	const content: HTMLElement = document.querySelector(".content")!;
	const file: File = filesList[0];
	const reader = new FileReader();

	reader.addEventListener(
		"load",
		() => {
			content.innerText = reader.result as string;
			analyzeTextFile(reader.result as string);
			//reset input value
			(event.target as HTMLInputElement).value = null!;
			//show titles
			const elementsToShow = document.querySelectorAll(".afterLoad");
			elementsToShow.forEach((e) => {
				e.classList.remove("d-none");
			});
		},
		false
	);

	if (file) {
		reader.readAsText(file);
	}
}

async function analyzeTextFile(file: string) {
	const matchWords = () => Promise.resolve(file.split(/\s+/g));
	const matchLetters = () => Promise.resolve(file.match(/\w/g));
	const matchWhiteSpaces = () => Promise.resolve(file.match(/\s/g));
	const init = async () => {
		const matchedWords = await matchWords();
		const matchedLetters = await matchLetters();
		const matchedWhiteSpaces = await matchWhiteSpaces();
		let totalMatches = [];
		const values = [
			{ value: matchedLetters, name: "Lettere" },
			{ value: matchedWhiteSpaces, name: "Spazi vuoti" },
			{ value: matchedWords, name: "Parole" },
			{ value: totalMatches, name: "Parole ripetute" },
		];

		matchedWords.forEach((word) => {
			let perWordMatches = 0;
			const matchesOfWords = matchedWords.filter((words) => (words === word ? perWordMatches++ : ""));
			return perWordMatches > 10 ? totalMatches.push(`La parola ${word} è ripetuta ${perWordMatches} volte\n`) : "";
		});
		populateList(values);
	};
	init();
}

function populateList(values) {
	const uList = document.querySelector("#valuesList");
	console.log(values);
	values.forEach((i) => {
		const node = document.createElement("li");
		node.innerHTML = `<h4>Numero di ${i.name}: ${i.value.length}</h4>`;
		uList?.appendChild(node);
		if (i.name === "Parole ripetute") {

			i.value.forEach((w) => {
				const wordNode = document.createElement("li");
				wordNode.innerText = w;
				uList?.appendChild(wordNode);
			});
		}
	});
}
