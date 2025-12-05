import { useContext } from "react"
import { useVerificationForm } from "../viewmodels/use-verification-form"
import Mycontext from "../../context/mycontext"

export const ReviewandSubmit = () => {
    const perosonalDetails = JSON.parse(sessionStorage.getItem("personal-details"))
    const propertyDetaiils = JSON.parse(sessionStorage.getItem("property-details"))
    const { setActiveStep } = useContext(Mycontext)
    const {handleFinalSubmit} = useVerificationForm()
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-orange-600 mb-6 mt-6 text-center">
                Review and Submit
            </h2>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-2 text-orange-500">Personal Details</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  font-medium text-gray-600">
                    <div>First name:
                        <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.firstname || "N/A"}   </h1>
                    </div>
                    <div>Last name: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.lastname || "N/A"}</h1></div>
                    <div>Email: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.email || "N/A"}</h1></div>
                    <div>Phone: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.phone || "N/A"}</h1></div>
                    <div>Gender: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.gender || "N/A"}</h1></div>
                    <div>Aadhar: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.aadhar || "N/A"}</h1></div>
                    <div>Nationality: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{perosonalDetails.nationality || "-"}</h1></div>
                </div>
                <h1 className="text-lg cursor-pointer text-orange-500 font-semibold mt-4 underline" onClick={() => setActiveStep(0)}>Edit</h1>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-2 text-orange-500">Property Details</h3>
                <div  className="grid grid-cols-1 sm:grid-cols-2 gap-2  font-medium text-gray-600">
                    <div>Property Name: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.propertyName || "N/A"}</h1></div>
                    <div>House/Flat No.: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.houseNumber || "N/A"}</h1></div>
                    <div>Street: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.street || "N/A"}</h1></div>
                    <div>Landmark: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.landmark || "N/A"}</h1></div>
                    <div>City: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.city || "N/A"}</h1></div>
                    <div>State: <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.state || "N/A"}</h1></div>
                    <div>ZIP:  <h1 className="font-semibold text-gray-900 mt-1 text-lg">{propertyDetaiils.zip || "N/A"}</h1></div>
                </div>
                <h1 className="text-lg cursor-pointer text-orange-500 font-semibold mt-4 underline" onClick={() => setActiveStep(1)}>Edit</h1>
            </div>

            <div className=" p-4">
                <input type="checkbox"  className="scale-150 mr-4" name="agree" id="" />
                Accept terms and Conditions
            </div>

            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600"
                onClick={handleFinalSubmit}
            >
                Submit  Details
            </button>
        </div>
    )
}