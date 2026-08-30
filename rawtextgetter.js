gettts = async function(text) {
	let out = '';
	function espeakFetch(arr) {
		return arr.map((url) => {
		return fetch(`/espeak-ng-data/${url}`)
					.then(data => data.arrayBuffer())
					.then(data => new Uint8Array(data));
		});
	};
	function timestamps() {
		return {
			timestamps: {
				access: new Date(),
				change: new Date(),
				modification: new Date(),
			},
		};
	};
	let [
		phontab,
		phondata,
		phonindex,
		intonations,
		en_dict,
		en_US,
	] = await Promise.all(espeakFetch([
		"phontab",
		"phondata",
		"phonindex",
		"intonations",
		"en_dict",
		"lang/gmw/en-US",
		]));
	const wasi = new WASI({
		args: [
			"speak-ng",
			"-x",
			"-v", "en-us",
			"-p", "50",
			"-s", "100",
			"--path=/espeak",
			"--",
			text,
         ],
		fs: {
			"/espeak/phontab": {
					path: "/espeak/phontab",
					...timestamps(),
					mode: "binary",
					content: phontab,
			},
			"/espeak/phondata": {
					path: "/espeak/phondata",
					...timestamps(),
					mode: "binary",
					content: phondata,
			},
			"/espeak/phonindex": {
					path: "/espeak/phonindex",
					...timestamps(),
					mode: "binary",
					content: phonindex,
			},
			"/espeak/intonations": {
					path: "/espeak/intonations",
					...timestamps(),
					mode: "binary",
					content: intonations,
			},
			"/espeak/en_dict": {
					path: "/espeak/en_dict",
					...timestamps(),
					mode: "binary",
					content: en_dict,
			},
			"/espeak/lang/gmw/en-US": {
					path: "/espeak/lang/gmw/en-US",
					...timestamps(),
					mode: "binary",
					content: en_US,
			},
		},
		stdout: o => out += o
	});

	const wasmBuffer = await fetch('/speak-ng.wasm').then(r => r.arrayBuffer());
	const wasm = await WebAssembly.instantiate(wasmBuffer, wasi.getImportObject());
	await wasi.start(wasm);
	return out
};
let { WASI } = await import("/lib/runno.js");
