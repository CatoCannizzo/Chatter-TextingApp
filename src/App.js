import "./App.css";
import TextInput from "./Components/TextInput";
import { useState } from "react";
import Message from "./Components/Message";
import Camera from "react-snap-pic";
import NamePicker from "./Components/NamePicker";
import { Modal } from "./Components/Modal";

//React component (Custom element for our entire react chat app)
function App() {
	//useState creates a 'magic' variable, here, called messages (The difference here is State create a nonstandard variable)
	//the initial value is an empty array
	//also creates a function called setMessages that updates this variable
	const [messages, setMessages] = useState([]); //sets up messages as a state & setMessages as function
	const [name, setName] = useState("");
	const [showCamera, setShowCamera] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [Warning, setWarning] = useState([]);
	function takePicture(img) {
		console.log(img);
		setShowCamera(false);
	}
	//modal args froms https://javascript.plainenglish.io/how-to-create-a-popup-modal-in-react-39315907998e
	const openModal = () => {
		console.log("debugging sucks");
		setShowModal(true);
	};

	//"sendsMessage runs whenever we click the send button"
	function sendMessage(text) {
		//checks to make sure there is text being sent before continuing this function
		if (!text.trim()) {
			setWarning(["Please enter valid message.", ...messages]);
			openModal();
			return;
		}
		if (!name.trim()) {
			setWarning(["Please enter valid name.", ...messages]);
			openModal();
			return;
		}
		//creates a new message object
		const newMessage = {
			text,
			time: Date.now(),
			name,
		};
		//set the messages to be a new array that contains the new message + the old messages
		setMessages([newMessage, ...messages]); //the ... is called a spread all items from old array + new array
	}
	//everytime state changes, React re-renders running everything in this main app again.

	//Finally we return HTML
	return (
		<div className="App">
			<header className="header">
				<div className="logo" />
				<span className="title">CHATTER!</span>
				<NamePicker name={name} setName={setName} />
			</header>
			<div className="messages">
				{
					//blue curlies mean we jump to javascript
					//here we loop over every message in the 'messages' array and return a message component
					//This means map is a loop
				}
				{messages.map((msg, i) => {
					// if (msg.name == name) {
					// 	//we are spreading all the itesm in msg into the props
					// 	//key needs to be a unique calue for each item
					// 	return <Message {...msg} key={i} />;
					// } else {
					// 	setWarning([
					// 		"Incoming message from some other hooligan",
					// 		...messages,
					// 	]);
					// 	openModal();
					// 	return;
					// }
					return <Message {...msg} key={i} />;
				})}
			</div>
			{showCamera && <Camera takePicture={takePicture} />}
			{showModal ? (
				<Modal Warning={Warning} setShowModal={setShowModal} />
			) : null}
			{/*the sendMessage prop on TextInput = sendMessage function (thing in blue) Here we have them the same so for accessibility*/}
			<TextInput
				sendMessage={sendMessage}
				showCamera={() => setShowCamera(true)}
			/>
		</div>
	);
}

export default App;
