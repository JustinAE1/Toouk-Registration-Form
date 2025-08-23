import React, { useState } from "react";
import "../Styles/PropertyTokenForm.css";
import WalletModal from "./SuccessModal";
import AppButton from "../Common/AppButton";
import AppInput, { AppSelect } from "../Common/AppInput";
import { MenuItem } from "@mui/material";


const steps = ["Property Details", "Ownership Docs", "Token Parameters", "KYC"];

export default function PropertyTokenForm() {
  const [step, setStep] = useState(0);
  const [open, isOpen] = useState(false)
  const [formData, setFormData] = useState({
    propertyType: "",
    address: "",
    country: "",
    state: "",
    postalCode: "",
    yearBuilt: "",
    size: "",
    photos: [],
    description: "",
    ownerEntity: "",
    titleDeed: null,
    appraisalReport: null,
    valuerName: "",
    rentalIncome: "",
    occupancy: "",
    majorLeases: "",
    targetAmount: "",
    minInvestment: "",
    maxInvestment: "",
    totalTokenSupply: "",
    tokenizedPercentage: "",
    saleFee: "",
    vestingPeriod: "",
    kycType: "",
    name: "",
    kycDetails: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  // console.log("formdata",formData);


const handleSubmit = async (e) => {
    e.preventDefault();
    // isOpen(!open)
    if (step < steps.length - 1) return;
    console.log("Form Submitted", formData);
    const API = "https://4br9gafbh5.execute-api.eu-north-1.amazonaws.com/prod"
    const res = await fetch(`${API}/api/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const { id } = await res.json();
    console.log("Saved with id:", id);
    // const response = await fetch("http://localhost:3001/api/form", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    // const result = await response.json();
    // console.log(result);
  };

  const handleOpenSuccessModal = () => {
    isOpen(!open)
  }

  const onClickClose = () => {
    isOpen(false)
  }

  return (
    <div className="kyc-container">
      <div className="kyc-wrapper">
        {/* Stepper */}
        <div className="stepper">
          {steps.map((label, i) => (
            <div key={i} className="step-item">
              <div
                className={`step-circle ${i === step ? "active" : i < step ? "completed" : "inactive"
                  }`}
              >
                {i + 1}
              </div>
              <p className="step-label">{label}</p>
            </div>
          ))}
        </div>
        <div className="kyc-form-container">
          <div className="form-group">
            <div className="kyc-form">
              <form onSubmit={handleSubmit} className="form-content">
                {step === 0 && (
                  <>
                    <div className="form-group">
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        placeholder="Property Type"
                        className="form-select"
                        required
                      >
                        <option value="">Property Type</option>
                        <option value="male">Builing</option>
                        <option value="female">Car</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <input className="form-input" name="address" onChange={handleChange} placeholder="Address" />
                    <input className="form-input" name="country" onChange={handleChange} placeholder="Country" />
                    <input className="form-input" name="state" onChange={handleChange} placeholder="State" />
                    <input className="form-input" name="postalCode" onChange={handleChange} placeholder="Postal Code" />
                    <input className="form-input" name="yearBuilt" onChange={handleChange} placeholder="Year Built" />
                    <div class="upload-container">
                      <label for="fileUpload" class="upload-box">
                        <div class="upload-content">
                          <span class="upload-icon">📷</span>
                          <p>Click or drag & drop images here</p>
                          <small>(Min 3 images)</small>
                        </div>
                        <input name="photos" type="file" id="fileUpload" accept="image/*" multiple />
                      </label>
                      <div id="preview" class="preview"></div>
                    </div>
                    <input className="form-input" name="size" onChange={handleChange} placeholder="Size (sqm)" />
                    <textarea className="form-input" name="description" onChange={handleChange} placeholder="Short Description" />
                  </>
                )}

                {/* Step 2: Ownership */}
                {step === 1 && (
                  <>
                    <select name="ownerEntity" onChange={handleChange}>
                      <option value="">Select Owner Type</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                    </select>
                    <label className="form-label">Proof of Ownership</label>
                    <div class="upload-container">
                      <label for="titleDeed" class="upload-box">
                        <div class="upload-content">
                          <span class="upload-icon">📷</span>
                          <p>Click or drag & drop images here</p>
                          {/* <small>(Min 3 images)</small> */}
                        </div>
                        <input name="titleDeed" type="file" id="titleDeed" accept="image/*" multiple />
                      </label>
                      <div id="preview" class="preview"></div>
                    </div>
                    <label className="form-label">Upraisal Report</label>
                    <div class="upload-container">
                      <label for="appraisalReport" class="upload-box">
                        <div class="upload-content">
                          <span class="upload-icon">📷</span>
                          <p>Click or drag & drop images here</p>
                          {/* <small>(Min 3 images)</small> */}
                        </div>
                        <input name="appraisalReport" type="file" id="appraisalReport" accept="image/*" multiple />
                      </label>
                      <div id="preview" class="preview"></div>
                    </div>
                    <input className="form-input" name="valuerName" onChange={handleChange} placeholder="Valuer Name" />
                    <input className="form-input" name="rentalIncome" onChange={handleChange} placeholder="Monthly Rental Income" />
                    <input className="form-input" name="occupancy" onChange={handleChange} placeholder="Occupancy %" />
                    <input className="form-input" name="majorLeases" onChange={handleChange} placeholder="Major Leases" />
                  </>
                )}

                {/* Step 3: Token Parameters */}
                {step === 2 && (
                  <>
                    <input className="form-input" name="targetAmount" onChange={handleChange} placeholder="Target Amount ($)" />
                    <input className="form-input" name="minInvestment" onChange={handleChange} placeholder="Min per Investor ($)" />
                    <input className="form-input" name="maxInvestment" onChange={handleChange} placeholder="Max per Investor ($)" />
                    <input className="form-input" name="totalTokenSupply" onChange={handleChange} placeholder="Total Token Supply" />
                    <input className="form-input" name="tokenizedPercentage" onChange={handleChange} placeholder="% of Property Tokenized" />
                    <input className="form-input" name="saleFee" onChange={handleChange} placeholder="Primary Sale Fee %" />
                    <input className="form-input" name="vestingPeriod" onChange={handleChange} placeholder="Vesting / Lockup Period" />
                  </>
                )}

                {/* Step 4: KYC */}
                {step === 3 && (
                  <>
                    <select name="kycType" onChange={handleChange}>
                      <option value="">Select Type</option>
                      <option value="person">Person</option>
                      <option value="entity">Entity</option>
                    </select>
                    <input className="form-input" name="name" onChange={handleChange} placeholder="Full Name" />
                    <textarea className="form-input" name="kycDetails" onChange={handleChange} placeholder="Other KYC Details" />
                    <div class="wallet-option">
                      <input type="radio" id="wallet2" name="consent" />
                      <label for="wallet2" class="wallet-label">
                        <span>I consent to KYC verification</span>
                      </label>
                    </div>

                  </>
                )}

                {/* Navigation */}
                <div className="form-nav">
                  {step > 0 && (
                    <AppButton variant="back" onClick={prevStep}>Back</AppButton>
                  )}
                  {step < steps.length - 1 ? (
                    <AppButton variant="next" onClick={nextStep}>Next</AppButton>

                  ) : (
                    <button onClick={handleOpenSuccessModal} type="submit" className="btn submit">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      {isOpen &&
        <WalletModal isOpen={open} onClose={onClickClose} />
      }
    </div>
  );
}
