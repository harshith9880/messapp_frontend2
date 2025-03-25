"use client";
import { useState } from "react";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    regNo: "",
    name: "",
    block: "",
    room: "",
    messName: "",
    messType: "Veg",
    category: "Quality",
    feedbackType: "Suggestion",
    comments: "",
    proof: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, proof: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "proof" && value) {
        formDataToSend.append(key, value);
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const response = await fetch("/api/submitFeedback", {
        method: "POST",
        body: formDataToSend,
      });
      
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFormData({
          regNo: "",
          name: "",
          block: "",
          room: "",
          messName: "",
          messType: "Veg",
          category: "Quality",
          feedbackType: "Suggestion",
          comments: "",
          proof: null,
        });
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center p-6">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-5xl font-bold mb-6 text-center text-yellow-400">Mess Feedback Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="regNo" placeholder="Reg No" value={formData.regNo} onChange={handleChange} className="input-field" required />
            <input type="text" name="name" placeholder="Student Name" value={formData.name} onChange={handleChange} className="input-field" required />
            <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} className="input-field" required />
            <input type="text" name="room" placeholder="Room No" value={formData.room} onChange={handleChange} className="input-field" required />
          </div>

          {/* Mess Info */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="messName" placeholder="Mess Name" value={formData.messName} onChange={handleChange} className="input-field" required />
            <select name="messType" value={formData.messType} onChange={handleChange} className="input-field">
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Special">Special</option>
              <option value="Night Mess">Night Mess</option>
            </select>
          </div>

          {/* Feedback Category */}
          <select name="category" value={formData.category} onChange={handleChange} className="input-field">
            <option value="Quality">Quality</option>
            <option value="Quantity">Quantity</option>
            <option value="Hygiene">Hygiene</option>
            <option value="Mess Timing">Mess Timing</option>
            <option value="Other">Other</option>
          </select>

          {/* Feedback Type */}
          <select name="feedbackType" value={formData.feedbackType} onChange={handleChange} className="input-field">
            <option value="Suggestion">Suggestion</option>
            <option value="Improvement">Improvement</option>
            <option value="Feedback">Feedback</option>
          </select>

          {/* Comments */}
          <textarea name="comments" placeholder="Enter comments..." value={formData.comments} onChange={handleChange} className="input-field h-28" required />

          {/* File Upload */}
          <input type="file" name="proof" onChange={handleFileChange} className="block w-full p-2 border rounded-md" />

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
