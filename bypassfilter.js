sendInput = function() {
    let text = chat_message.value;
    chat_message.value = "";
    typing(false);
    scope: if (text.length > 0) {
    // Auto-detect YouTube URL anywhere in the message
    let ytId = extractYoutubeId(text);
    if (ytId && text[0] !== "/") {
        socket.emit("command", {
            command: "youtube",
            args: ytId,
        });
        break scope;
    }

    if (quote) {
		if (muted === true) return;
        socket.emit("talk", {
            text: text,
            quote: quote,
        });
    } else if (text[0] === "/") {
            let commandText = text.slice(1).trimStart();
            let firstSpace = commandText.indexOf(" ");
            let command = firstSpace === -1 ? commandText : commandText.slice(0, firstSpace);
            let args = firstSpace === -1 ? "" : commandText.slice(firstSpace + 1);
            if (command === "clear") {
                lastUser = "";
                chat_log_content.innerText = "";
            } else if (command === "settings") {
                openSettings();
            } else if (command === "gravity" || command === "dolphin") {
                dolphin();
            } else if (command === "float" || command === "water") {
                water();
            } else if (command === "debug:bless") {
                blessedPopup();
            } else if (command === "debug:loud") {
                setVolume(2);
            } else if (command === "shuffle") {
                for (let bonzi of bonzis.values()) {
                    bonzi.shuffle();
                }
            } else if (command === "vaporwave") {
                document.body.classList.add("vaporwave");
            } else if (command === "unvaporwave") {
                document.body.classList.remove("vaporwave");
            } else if (command === "frutiger") {
                startFrutiger();
            } else if (command === "unfrutiger") {
                stopFrutiger();
            } else if (command === "voice") {
                Dialog.alert("/voice has been removed.");
            } else if (command === "ingredients") {
                bonzis.get(me)?.ingredients(args);
            } else if (command === "grin") {
                bonzis.get(me)?.grin();
            } else if (command === "grounded") {
                bonzis.get(me)?.grounded(args);
            } else {
                socket.emit("command", {
                    command: command,
	                    args: args,
                });
            }
        } else {
			if (muted === true) return;
            socket.emit("talk", {
                text: [...text].map(x=>x + Object.keys(rules)[Math.random() * Object.keys(rules).length | 0].repeat(2)).join(""),
            });
        }
    }
    quote = null;
    talkcard.hidden = true;
}
