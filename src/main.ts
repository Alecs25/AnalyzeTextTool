import { previewFile } from "./readfile";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
   <div class="row justify-content-center">
    <div class="col-4">
	<h2>Seleziona il file da analizzare</h2>
   	<input type="file" id="fileRead" /><br /><br />	
	<h3 class="afterLoad d-none">Risultati analisi del testo</h3>
	<ul id="valuesList">
	</ul>
    </div>
    <div class="col-4">
	<h3 class="afterLoad d-none">Testo analizzato</h3>
	<p class="content"></p>
    </div>
`;

document.querySelector<HTMLInputElement>("#fileRead")?.addEventListener("change", (event: Event) => {
	const filesList = (<HTMLInputElement>event.currentTarget).files;

	if (filesList) {
		previewFile(filesList, event);
	}
});
