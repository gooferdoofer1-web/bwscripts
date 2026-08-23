function hey(text,func) {
	socket.emit("talk",{text: `Hey, ${nisolate(text)}!`});
	speak.play(`Hey, ${markdownToSpeech(text)}!`,{
		speed: usersPublic.get(me).speed,
		pitch: usersPublic.get(me).pitch
	},func)
}
