import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Theme State: Loads saved theme or defaults to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "light";
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("react_pdf_todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Sync theme changes to localStorage
  useEffect(() => {
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("react_pdf_todos", JSON.stringify(todos));
  }, [todos]);

  // Handler: Flips theme string state
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    let pdfData = null;
    let pdfName = "";

    if (selectedFile) {
      pdfData = await convertToBase64(selectedFile);
      pdfName = selectedFile.name;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      pdf: pdfData,
      pdfName: pdfName,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
    setSelectedFile(null);
    e.target.reset();
  };

  const openPdf = (base64Data) => {
    const newTab = window.open();
    newTab.document.write(
      `<iframe src="${base64Data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="todo-container">
        <div className="header-section">
          <h1>To-Do List</h1>
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />

          <div className="file-input-wrapper">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="file-label">
              {selectedFile ? `📎 ${selectedFile.name.substring(0, 8)}...` : "📁 PDF"}
            </label>
          </div>

          <button type="submit" className="submit-btn">Add</button>
        </form>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">No tasks yet.</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <div className="todo-text-section" onClick={() => toggleComplete(todo.id)}>
                  <span className="todo-text">{todo.text}</span>
                  {todo.pdf && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPdf(todo.pdf);
                      }}
                      className="pdf-view-btn"
                    >
                      📄 Open PDF
                    </button>
                  )}
                </div>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
