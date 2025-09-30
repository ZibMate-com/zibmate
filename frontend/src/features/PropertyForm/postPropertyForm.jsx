// PgForm.js
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Firedb } from "../firebase/firebaseconfig";
import { usePgForm } from "./viewmodels/usepgForm";
import { Loader } from "../../components/view/loader";

const PgForm = () => {
  const {
      formData,
    handleChange,
    handleSubmit,
    handleArrayChange,
    addArrayField,
    loading
  } = usePgForm()

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      {
        loading && <Loader/>
      }
      <h2 className="text-2xl font-bold mb-4">Add PG Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[ "name", "description", "price", "discount", "address", "locationLink", "occupancy", "lookingFor", "city"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field}
              className="w-full p-2 border rounded"
              required={field !== "discount"} 
            />
          )
        )}

        <div>
          <label className="font-semibold">Images</label>
          {formData.images.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => handleArrayChange(e, index, "images")}
              placeholder={`Image URL ${index + 1}`}
              className="w-full p-2 border rounded mt-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayField("images")}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Image
          </button>
        </div>

        <div>
          <label className="font-semibold">Facilities</label>
          {formData.facilities.map((facility, index) => (
            <input
              key={index}
              type="text"
              value={facility}
              onChange={(e) => handleArrayChange(e, index, "facilities")}
              placeholder={`Facility ${index + 1}`}
              className="w-full p-2 border rounded mt-2"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayField("facilities")}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Add Facility
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PgForm;
