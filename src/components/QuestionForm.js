import React, { useState } from "react";

function QuestionForm() {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "correctIndex") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    } else if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      setFormData((prevData) => ({
        ...prevData,
        answers: prevData.answers.map((answer, i) =>
          i === index ? value : answer
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("New question created:", data))
      .catch((error) => console.error("Error creating question:", error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[1, 2, 3, 4].map((i) => (
          <label key={i}>
            Answer {i}:
            <input
              type="text"
              name={`answer${i}`}
              value={formData.answers[i - 1]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
