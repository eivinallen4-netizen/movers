"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddressAutocomplete, { PlaceResult } from "@/components/AddressAutocomplete";

interface AddressField {
  value: string;
  placeData: PlaceResult | null;
  error: string;
}

interface ItemToMove {
  id: string;
  category: string;
  image: string | null;
}

interface FormData {
  moveDate: string;
  pickupTime: string;
  moveType: string;
  moveSize: string;
  inPersonQuote: string;
  storageNeeded: string;
  fromAddressType: string;
  toAddressType: string;
  toFloorLevel: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hearAboutUs: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

type StepType = "address" | "timing" | "contact" | "items" | "review";

function QuotePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState<StepType>("address");

  const [fromAddress, setFromAddress] = useState<AddressField>({
    value: "",
    placeData: null,
    error: "",
  });
  const [toAddress, setToAddress] = useState<AddressField>({
    value: "",
    placeData: null,
    error: "",
  });
  const [formData, setFormData] = useState<FormData>({
    moveDate: "",
    pickupTime: "",
    moveType: "",
    moveSize: "",
    inPersonQuote: "",
    storageNeeded: "",
    fromAddressType: "",
    toAddressType: "",
    toFloorLevel: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    hearAboutUs: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [items, setItems] = useState<ItemToMove[]>([]);

  const categories = [
    "Bedroom",
    "Living Room",
    "Kitchen",
    "Dining Room",
    "Home Office",
    "Bathroom",
    "Workout Equipment",
    "Electronics",
    "Antiques",
    "Fragile Items",
    "Other",
  ];

  const getPresetItemsBySize = (size: string): string[] => {
    const baseItems = ["Kitchen", "Living Room"];

    if (size === "studio") {
      return [...baseItems, "Bedroom"];
    } else if (size === "2br") {
      return [...baseItems, "Bedroom", "Bedroom", "Bathroom"];
    } else if (size === "4br") {
      return [...baseItems, "Bedroom", "Bedroom", "Bedroom", "Bathroom", "Home Office", "Dining Room"];
    }

    return baseItems;
  };

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (from) {
      setFromAddress({
        value: from,
        placeData: { formatted_address: from },
        error: "",
      });
    }
    if (to) {
      setToAddress({
        value: to,
        placeData: { formatted_address: to },
        error: "",
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentStep === "items" && items.length === 0 && formData.moveSize) {
      const presetItems = getPresetItemsBySize(formData.moveSize);
      const newItems = presetItems.map((category) => ({
        id: Date.now().toString() + Math.random(),
        category,
        image: null,
      }));
      setItems(newItems);
    }
  }, [currentStep, formData.moveSize]);

  const validateStep = (step: StepType): boolean => {
    const newErrors: FormErrors = {};

    if (step === "address") {
      if (!fromAddress.placeData) newErrors.fromAddress = "Please select a valid moving-from address";
      if (!toAddress.placeData) newErrors.toAddress = "Please select a valid moving-to address";
    } else if (step === "timing") {
      if (!formData.moveDate) newErrors.moveDate = "Move date is required";
      if (!formData.pickupTime) newErrors.pickupTime = "Preferred pickup time is required";
      if (!formData.moveType) newErrors.moveType = "Type of move is required";
      if (!formData.moveSize) newErrors.moveSize = "Size of move is required";
      if (!formData.inPersonQuote) newErrors.inPersonQuote = "Please select an option";
      if (!formData.storageNeeded) newErrors.storageNeeded = "Please select an option";
      if (!formData.fromAddressType) newErrors.fromAddressType = "Type of access is required";
      if (!formData.toAddressType) newErrors.toAddressType = "Type of access is required";
      if (!formData.toFloorLevel) newErrors.toFloorLevel = "Floor level is required";
    } else if (step === "contact") {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (!validateStep(currentStep)) return;

    const steps: StepType[] = ["address", "timing", "contact", "items", "review"];
    const nextIndex = steps.indexOf(currentStep) + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handlePrevStep = () => {
    const steps: StepType[] = ["address", "timing", "contact", "items", "review"];
    const prevIndex = steps.indexOf(currentStep) - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };


  const addItem = () => {
    const newItem: ItemToMove = {
      id: Date.now().toString(),
      category: "",
      image: null,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItemCategory = (id: string, category: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, category } : item))
    );
  };

  const handleImageCapture = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItems(
          items.map((item) =>
            item.id === id ? { ...item, image: reader.result as string } : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep("contact")) return;

    console.log("Form submitted:", {
      fromAddress: fromAddress.placeData,
      toAddress: toAddress.placeData,
      items: items.map((item) => ({
        category: item.category,
        hasImage: !!item.image,
      })),
      ...formData,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-navy-900 to-background flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-navy-800 rounded-xl p-8 md:p-12 text-center border border-navy-700">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="heading-xl mb-4">Thanks! We've got your details</h2>
          <p className="text-body-lg text-gray-300 mb-8">
            Our team will reach out soon with your free quote. In the meantime, if you have any questions, feel free to give us a call.
          </p>
          <button
            onClick={() => router.push("/")}
            className="btn-secondary text-lg font-bold"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-navy-900 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
            aria-label="Go back"
          >
            ← Back
          </button>
          <h1 className="heading-xl mb-2">
            {currentStep === "address" && "Confirm Your Addresses"}
            {currentStep === "timing" && "When & What Type of Move?"}
            {currentStep === "contact" && "Your Contact Information"}
            {currentStep === "items" && "What Are You Moving?"}
            {currentStep === "review" && "Review Your Information"}
          </h1>
          <p className="text-text-secondary">Step {["address", "timing", "contact", "items", "review"].indexOf(currentStep) + 1} of 5</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((["address", "timing", "contact", "items", "review"].indexOf(currentStep) + 1) / 5) * 100}%` }}
          />
        </div>

        <form onSubmit={handleFinalSubmit} className="space-y-8">
          {/* Step 1: Address */}
          {currentStep === "address" && (
            <div className="space-y-6">
              <AddressAutocomplete
                label="Moving from address *"
                placeholder="Enter your current address"
                value={fromAddress.value}
                error={fromAddress.error}
                onAddressChange={(value) => setFromAddress({ ...fromAddress, value, error: "" })}
                onAddressSelect={(placeData) => setFromAddress({ value: placeData.formatted_address, placeData, error: "" })}
                errorClassName="text-red-500 text-sm mt-1"
              />

              <AddressAutocomplete
                label="Moving to address *"
                placeholder="Enter your new address"
                value={toAddress.value}
                error={toAddress.error}
                onAddressChange={(value) => setToAddress({ ...toAddress, value, error: "" })}
                onAddressSelect={(placeData) => setToAddress({ value: placeData.formatted_address, placeData, error: "" })}
                errorClassName="text-red-500 text-sm mt-1"
              />
            </div>
          )}

          {/* Step 2: Timing & Estimates */}
          {currentStep === "timing" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="moveDate" className="block text-sm font-semibold mb-2">
                    Estimated move date *
                  </label>
                  <input
                    id="moveDate"
                    type="date"
                    name="moveDate"
                    value={formData.moveDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  {errors.moveDate && <p className="text-red-500 text-sm mt-1">{errors.moveDate}</p>}
                </div>

                <div>
                  <label htmlFor="pickupTime" className="block text-sm font-semibold mb-2">
                    Preferred pickup time *
                  </label>
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">Select a time</option>
                    <option value="early-morning">Early Morning (6am - 9am)</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 3pm)</option>
                    <option value="late-afternoon">Late Afternoon (3pm - 6pm)</option>
                  </select>
                  {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                </div>

                <div>
                  <label htmlFor="moveType" className="block text-sm font-semibold mb-2">
                    Type of move *
                  </label>
                  <select
                    id="moveType"
                    name="moveType"
                    value={formData.moveType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">Select move type</option>
                    <option value="local">Local Move</option>
                    <option value="long-distance">Long-Distance Move</option>
                    <option value="commercial">Commercial Move</option>
                  </select>
                  {errors.moveType && <p className="text-red-500 text-sm mt-1">{errors.moveType}</p>}
                </div>

                <div>
                  <label htmlFor="moveSize" className="block text-sm font-semibold mb-2">
                    Size of move *
                  </label>
                  <select
                    id="moveSize"
                    name="moveSize"
                    value={formData.moveSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">Select move size</option>
                    <option value="studio">Studio/1BR</option>
                    <option value="2br">2-3 Bedroom</option>
                    <option value="4br">4+ Bedroom</option>
                  </select>
                  {errors.moveSize && <p className="text-red-500 text-sm mt-1">{errors.moveSize}</p>}
                </div>
              </div>

              {/* Yes/No Questions */}
              <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Free in-person quote? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="inPersonQuote"
                        value="yes"
                        checked={formData.inPersonQuote === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="inPersonQuote"
                        value="no"
                        checked={formData.inPersonQuote === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.inPersonQuote && <p className="text-red-500 text-sm mt-1">{errors.inPersonQuote}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Storage services needed? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="storageNeeded"
                        value="yes"
                        checked={formData.storageNeeded === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="storageNeeded"
                        value="no"
                        checked={formData.storageNeeded === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.storageNeeded && <p className="text-red-500 text-sm mt-1">{errors.storageNeeded}</p>}
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
                <h3 className="heading-md">Address Details</h3>

                <div>
                  <label htmlFor="fromAddressType" className="block text-sm font-semibold mb-2">
                    From - Type of access *
                  </label>
                  <select
                    id="fromAddressType"
                    name="fromAddressType"
                    value={formData.fromAddressType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="">Select access type</option>
                    <option value="ground-floor">Ground Floor</option>
                    <option value="walkup">Walk-up (Stairs)</option>
                    <option value="elevator">Elevator</option>
                  </select>
                  {errors.fromAddressType && <p className="text-red-500 text-sm mt-1">{errors.fromAddressType}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="toAddressType" className="block text-sm font-semibold mb-2">
                      To - Type of access *
                    </label>
                    <select
                      id="toAddressType"
                      name="toAddressType"
                      value={formData.toAddressType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Select access type</option>
                      <option value="ground-floor">Ground Floor</option>
                      <option value="walkup">Walk-up (Stairs)</option>
                      <option value="elevator">Elevator</option>
                    </select>
                    {errors.toAddressType && <p className="text-red-500 text-sm mt-1">{errors.toAddressType}</p>}
                  </div>

                  <div>
                    <label htmlFor="toFloorLevel" className="block text-sm font-semibold mb-2">
                      To - Floor level *
                    </label>
                    <select
                      id="toFloorLevel"
                      name="toFloorLevel"
                      value={formData.toFloorLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Select floor</option>
                      <option value="ground">Ground Floor</option>
                      <option value="2nd">2nd Floor</option>
                      <option value="3rd">3rd Floor</option>
                      <option value="4th+">4th Floor or Higher</option>
                    </select>
                    {errors.toFloorLevel && <p className="text-red-500 text-sm mt-1">{errors.toFloorLevel}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === "contact" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                  First name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                  Last name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Items to Move */}
          {currentStep === "items" && (
            <div className="space-y-6">
              {/* Items List */}
              {items.length > 0 && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <div className="flex justify-between items-start mb-4">
                        <select
                          value={item.category}
                          onChange={(e) => updateItemCategory(item.id, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        >
                          <option value="">Select item type</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-red-600 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold">Add photo</label>
                        <div className="flex gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handleImageCapture(item.id, e)}
                            className="hidden"
                            id={`camera-${item.id}`}
                          />
                          <label
                            htmlFor={`camera-${item.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold cursor-pointer transition-colors text-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Camera
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageCapture(item.id, e)}
                            className="hidden"
                            id={`upload-${item.id}`}
                          />
                          <label
                            htmlFor={`upload-${item.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold cursor-pointer transition-colors text-sm"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Upload
                          </label>
                        </div>

                        {item.image && (
                          <div className="mt-3">
                            <img
                              src={item.image}
                              alt="Preview"
                              className="h-40 w-40 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Custom Item
              </button>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === "review" && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  ✓ We trust you to give us the details, you can trust us to get your quote right. If anything changes on-site, we'll tell you upfront before adjusting the price.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-3 border-b border-gray-300">
                  <span className="text-gray-600">From:</span>
                  <span className="font-semibold text-gray-900">{fromAddress.value}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-300">
                  <span className="text-gray-600">To:</span>
                  <span className="font-semibold text-gray-900">{toAddress.value}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-300">
                  <span className="text-gray-600">Move Date:</span>
                  <span className="font-semibold text-gray-900">{formData.moveDate}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-300">
                  <span className="text-gray-600">Contact:</span>
                  <span className="font-semibold text-gray-900">{formData.firstName} {formData.lastName} • {formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-semibold text-gray-900">{items.length} item{items.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 pt-8">
            {currentStep !== "address" && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary text-lg font-bold py-3 px-6"
              >
                ← Back
              </button>
            )}
            {currentStep !== "review" && (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 btn-cta text-lg font-bold py-3 px-6"
              >
                Next →
              </button>
            )}
            {currentStep === "review" && (
              <button
                type="submit"
                className="flex-1 btn-cta text-lg font-bold py-3 px-6"
              >
                Get My Quote
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="btn-secondary text-lg font-bold py-3 px-6"
            >
              Exit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function QuotePage() {
  return <QuotePageContent />;
}
