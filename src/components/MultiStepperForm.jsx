"use client";

import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { City, Country, State } from "country-state-city";
import UserDetails from "./UserDetails";
import Image from "next/image";

const steps = ["General Details", "Address Details", "Step 3", "Step 4"];

const MultiStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep - 1, 0));
    setCurrentStep((prev) => prev - 1);
  };

  const validate = (values) => {
    const errors = {};

    if (activeStep === 0) {
      if (!values.firstName) {
        errors.firstName = "Incorrect Entry";
      }
      if (!values.lastName) {
        errors.lastName = "Incorrect Entry";
      }
      if (!values.emailid) {
        errors.emailid = "Incorrect Entry";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailid)
      ) {
        errors.emailid = "Invalid email address";
      }
      if (!values.dob) {
        errors.dob = "Incorrect Entry";
      }
    }

    if (activeStep === 1) {
      if (!values.address1) {
        errors.address1 = "Required";
      }
      if (!values.country) {
        errors.country = "Required";
      }
      if (!values.state) {
        errors.state = "Required";
      }
      if (!values.city) {
        errors.city = "Required";
      }
      if (!values.pincode) {
        errors.pincode = "Required";
      }
    }

    return errors;
  };

  const isLastStep = activeStep === steps.length - 1;

  const handleSubmit = async (values) => {
    if (isLastStep) {
      console.log("Done!");
    } else {
      handleNext();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const Error = ({ name }) => (
    <Field
      name={name}
      subscription={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched &&
        error && (
          <span className="text-[#BA3B3B] font-medium text-[12px]">
            {error}
          </span>
        )
      }
    />
  );

  return (
    <>
      <Form
        initialValues={{}}
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="relative bg-white w-full sm:h-[540px] h-auto shadow-lg rounded-lg sm:pb-0 pb-10">
              <div className="px-4 py-3 border-b-2">
                <p className="text-black text-[16px] font-bold">
                  {activeStep === 2
                    ? "Your Profile"
                    : "Complete Student Profile"}
                </p>
              </div>

              {activeStep < 2 && (
                <div className="flex justify-center mt-4 px-4">
                  {steps?.map((step, i) => (
                    <>
                      {i < 2 ? (
                        <div
                          key={i}
                          className={`step-item ${
                            currentStep === i + 1 && "active"
                          } ${i + 1 < currentStep && "complete"} `}
                        >
                          <div className="step">
                            {i + 1 < currentStep ? (
                              <Image
                                src="assets/complete.svg"
                                width={24}
                                height={24}
                                alt="img"
                              />
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_8_13471)">
                                  <rect
                                    width="24"
                                    height="24"
                                    rx="12"
                                    fill="white"
                                  />
                                  <rect
                                    x="0.75"
                                    y="0.75"
                                    width="22.5"
                                    height="22.5"
                                    rx="11.25"
                                    stroke={`${
                                      currentStep === i + 1
                                        ? "#7F56D9"
                                        : "#EAECF0"
                                    }`}
                                    stroke-width="1.5"
                                  />
                                  {i + 1 < currentStep ? (
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M17.0963 7.38967L9.93626 14.2997L8.03626 12.2697C7.68626 11.9397 7.13626 11.9197 6.73626 12.1997C6.34626 12.4897 6.23626 12.9997 6.47626 13.4097L8.72626 17.0697C8.94626 17.4097 9.32626 17.6197 9.75626 17.6197C10.1663 17.6197 10.5563 17.4097 10.7763 17.0697C11.1363 16.5997 18.0063 8.40967 18.0063 8.40967C18.9063 7.48967 17.8163 6.67967 17.0963 7.37967V7.38967Z"
                                      fill="#7F56D9"
                                    />
                                  ) : (
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="3.75"
                                      fill={`${
                                        currentStep === i + 1
                                          ? "#7F56D9"
                                          : "#EAECF0"
                                      }`}
                                    />
                                  )}
                                </g>
                                <defs>
                                  <clipPath id="clip0_8_13471">
                                    <rect
                                      width="24"
                                      height="24"
                                      rx="12"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            )}
                          </div>
                          <p className="text-[#344054] font-semibold sm:text-[20px] text-[14px]">
                            {step}
                          </p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </div>
              )}

              <div className="px-4">
                {activeStep === 0 && (
                  <>
                    <p className="font-sans font-normal sm:text-xl text-base mt-4">
                      Let's Enter your Personal Details
                    </p>
                    <div className="mt-4 grid sm:grid-cols-3 grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="text"
                          placeholder="Enter your first name"
                        />
                        <Error name="firstName" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="text"
                          placeholder="Enter your last name"
                        />
                        <Error name="lastName" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Email ID
                        </label>
                        <Field
                          name="emailid"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="email"
                          placeholder="Enter your email id"
                        />
                        <Error name="emailid" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Date of Birth
                        </label>
                        <Field
                          name="dob"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="date"
                          placeholder="Enter your email id"
                        />
                        <Error name="dob" />
                      </div>
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <p className="font-sans font-normal sm:text-xl text-base mt-4">
                      Enter your current mailing address
                    </p>
                    <div className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Address Line 1
                        </label>
                        <Field
                          name="address1"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="text"
                          placeholder="Enter your address (Apt., suit, house no.)"
                        />
                        <Error name="address1" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Address Line 2{" "}
                          <span className="text-[#B3B2C2] font-normal">
                            (optional)
                          </span>
                        </label>
                        <Field
                          name="address2"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="text"
                          placeholder="Enter your address line"
                        />
                        <Error name="address2" />
                      </div>
                    </div>

                    <div className="mt-4 grid sm:grid-cols-3 grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[12px] font-semibold text-black">
                          Country
                        </label>
                        <Field
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          name="country"
                          component="select"
                          placeholder="Select Country"
                        >
                          <option value="">Select Country</option>
                          {Country.getAllCountries().map((country) => (
                            <option
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </option>
                          ))}
                        </Field>
                        <Error name="country" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black">
                          State
                        </label>
                        <Field
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          name="state"
                          component="select"
                          placeholder="Select State"
                        >
                          <option value="">Select State</option>
                          {State.getStatesOfCountry(
                            form.getState().values.country
                          ).map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <Error name="state" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black">
                          City
                        </label>
                        <Field
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          name="city"
                          component="select"
                          placeholder="Select City"
                        >
                          <option value="">Select City</option>
                          {City.getCitiesOfState(
                            form.getState().values.country,
                            form.getState().values.state
                          ).map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </Field>
                        <Error name="city" />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-black ">
                          Pincode
                        </label>
                        <Field
                          name="pincode"
                          className="w-full mt-1 sm:text-[14px] text-[12px] border-2 rounded px-3 py-2 text-black font-semibold placeholder:font-normal placeholder:text-[12px]"
                          component="input"
                          type="number"
                          placeholder="Enter pincode"
                        />
                        <Error name="pincode" />
                      </div>
                    </div>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <p className="mt-4 font-sans font-normal sm:text-xl text-base">
                      Personal Details
                    </p>

                    <div className="mt-4 flex sm:flex-row flex-col sm:gap-0 gap-2 justify-between">
                      <UserDetails
                        field="First Name"
                        value={form.getState().values.firstName}
                      />
                      <UserDetails
                        field="Last Name"
                        value={form.getState().values.lastName}
                      />
                      <UserDetails
                        field="Email ID"
                        value={form.getState().values.emailid}
                      />
                      <UserDetails
                        field="Date of Birth"
                        value={form.getState().values.dob}
                      />
                    </div>

                    <p className="mt-6 font-sans font-normal text-xl">
                      Mailing Address
                    </p>

                    <div className="mt-4 grid grid-cols-2">
                      <UserDetails
                        field="Address Line 1"
                        value={form.getState().values.address1}
                      />
                      <UserDetails
                        field="Address Line 2"
                        value={form.getState().values.address2}
                      />
                    </div>

                    <div className="mt-6 flex justify-between">
                      <UserDetails
                        field="Country"
                        value={
                          Country.getCountryByCode(`${values.country}`).name
                        }
                      />
                      <UserDetails
                        field="State"
                        value={
                          State.getStateByCodeAndCountry(
                            `${values.state}`,
                            `${values.country}`
                          ).name
                        }
                      />
                      <UserDetails
                        field="City"
                        value={form.getState().values.city}
                      />
                      <UserDetails
                        field="Pincode"
                        value={form.getState().values.pincode}
                      />
                    </div>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <div className="max-w-[856px] mx-auto mt-10 bg-[#F8FFEE] border border-[#B1EE80] rounded-lg">
                      <div className="py-7 flex flex-col items-center justify-center">
                        <Image
                          src="assets/star.svg"
                          width={32}
                          height={32}
                          alt="img"
                        />
                        <p className="mt-7 text-[#0D6008] text-[20px] font-bold">
                          That's all we need.
                        </p>
                        <p className="mt-4 text-[#0D6008] text-[20px] font-normal px-4 text-center">
                          Thank you for your time. We will get back soon
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {activeStep === 3 ? (
                <></>
              ) : (
                <div
                  className={`sm:absolute sm:mt-0 mt-4 bottom-0 w-full px-4 py-3 border-t-2 flex ${
                    activeStep > 0
                      ? "justify-between gap-[11px]"
                      : "sm:justify-end justify-center"
                  } `}
                >
                  {activeStep > 0 && (
                    <button
                      onClick={handleBack}
                      className="border border-[#443EFF] px-4 py-[10px] text-[#17154D] font-semibold text-sm rounded"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-12 py-[10px] bg-[#443EFF] text-white font-semibold text-sm rounded sm:w-1/4 w-full"
                  >
                    Save & Continue
                  </button>
                </div>
              )}
            </div>
          </form>
        )}
      />
    </>
  );
};

export default MultiStepperForm;
