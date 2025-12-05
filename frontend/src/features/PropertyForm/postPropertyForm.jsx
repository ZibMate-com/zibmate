// PgForm.js
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Firedb } from "../firebase/firebaseconfig";
import { usePgForm } from "./viewmodels/usepgForm";
import { Loader } from "../../components/view/loader";
import PersonalDetailsForm from "./view/personal-detail-form";
import PropertyDetailsForm from "./view/property-detail-form";
import { ReviewandSubmit } from "./view/review-submit-form";
import { useVerificationForm } from "./viewmodels/use-verification-form";
import { useContext } from "react";
import Mycontext from "../context/mycontext";
import { ArrowBigLeft, MoveLeft } from "lucide-react";

const PgForm = () => {
  // const {
  //   formData,
  //   handleChange,
  //   handleSubmit,
  //   handleArrayChange,
  //   addArrayField,
  //   loading,
  //   activeStep
  // } = usePgForm();
  // const [activeStep , setActiveStep] = useState(1);
  const { activeStep, loading } = useContext(Mycontext);


  return (
    <section>
      
        <a href="/"> 
        <span className="flex text-orange-500 gap-4 text-xl items-center font-medium mt-5 ml-5 "> <MoveLeft className="size-8"  />Go back Home</span></a>

      <div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg">
        {
          loading && <Loader />
        }
        {/* <h2 className="text-2xl font-bold mb-4">Add PG Data</h2> */}
        {/* <form onSubmit={handleSubmit} className="space-y-4">
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
      </form> */}
        <div className="flex justify-center gap-5 items-center">
          <div className="flex flex-col items-center gap-2 ">
            <div className={`${activeStep == 0 ? "bg-orange-500 text-white" : ""} w-10 h-10 p-3 border-2 border-orange-500 flex justify-center items-center rounded-full text-xl`}>
              1
            </div>
            <span className="text-sm font-medium">Personal details</span>
          </div>
          <div className="h-1 w-20  bg-zinc-800 rounded-3xl" />
          <div className="flex flex-col items-center gap-2 ">
            <div className={`${activeStep == 1 ? "bg-orange-500 text-white" : ""} w-10 h-10 p-3 border-2 border-orange-500 flex justify-center items-center rounded-full text-xl`}>
              2
            </div>
            <span className="text-sm font-medium">Property details</span>
          </div>
          <div className="h-1 w-20  bg-zinc-800 rounded-3xl" />
          <div className="flex flex-col items-center gap-2 ">
            <div className={`${activeStep == 2 ? "bg-orange-500 text-white" : ""} w-10 h-10 p-3 border-2 border-orange-500 flex justify-center items-center rounded-full text-xl`}>
              3
            </div>
            <span className="text-sm font-medium">Review & Submit</span>
          </div>
        </div>
        {
          activeStep == 0 && <PersonalDetailsForm />
        }
        {
          activeStep == 1 && <PropertyDetailsForm />
        }
        {
          activeStep == 2 && <ReviewandSubmit />
        }


      </div>
    </section>
  );
};

export default PgForm;
