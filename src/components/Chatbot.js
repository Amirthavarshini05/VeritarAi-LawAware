import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:8000"; // backend URL

function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  // Handle Text Query
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const formData = new FormData();
    formData.append("text", input);

    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const aiMsg = { sender: "bot", text: JSON.stringify(data.analysis) };
    setMessages((prev) => [...prev, aiMsg]);
    setInput("");
  };

  // 🎙 Voice input using browser media recorder
  const toggleRecording = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.wav");

        const res = await fetch(`${API_BASE}/speech_to_text`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        const newText = data.text;
        setMessages((prev) => [...prev, { sender: "user", text: newText }]);

        // Analyze with LegalBERT
        const analyzeData = new FormData();
        analyzeData.append("text", newText);
        const analyzeRes = await fetch(`${API_BASE}/analyze`, {
          method: "POST",
          body: analyzeData,
        });
        const analyzeJson = await analyzeRes.json();
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: JSON.stringify(analyzeJson.analysis) },
        ]);
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setRecording(true);
    } else {
      recorder.stop();
      setRecording(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>⚖️ Veritar AI Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "5px",
            }}
          >
            <b>{m.sender === "user" ? "You" : "AI"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
        <button onClick={toggleRecording} style={styles.button}>
          {recording ? "Stop 🎙" : "Record 🎤"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { width: "60%", margin: "auto", padding: 20 },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: 8,
    height: "400px",
    overflowY: "scroll",
    padding: 10,
    marginBottom: 10,
  },
  inputBox: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "10px", fontSize: "16px" },
  button: { padding: "10px 15px", cursor: "pointer" },
};

export default ChatBot;
