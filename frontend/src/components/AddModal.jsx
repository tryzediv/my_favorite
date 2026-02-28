import { useState } from "react";

export default function AddModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          Добавить вариант
        </h2>

        <input
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
          >
            Отмена
          </button>

          <button
            onClick={() => onSave(title, description)}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}