import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, CheckCircle, ShieldCheck, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    business_hours_start: "09:00",
    business_hours_end: "17:00",
    timezone: "America/Los_Angeles",
    greeting_message: "",
    ai_voice: "alloy",
    subscription_tier: "starter",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const business = await response.json();
        localStorage.setItem("businessId", business.id);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create account");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Subscription Tiers
  const subscriptionTiers = [
    {
      value: "starter",
      name: "Starter",
      price: "$49",
      minutes: 500,
      features: ["Custom greetings", "Email notifications", "Call history"],
    },
    {
      value: "pro",
      name: "Pro",
      price: "$149",
      minutes: 2000,
      features: ["All Starter features", "Appointment scheduling", "CRM integration", "Analytics"],
    },
    {
      value: "business",
      name: "Business",
      price: "$399",
      minutes: 6000,
      features: ["All Pro features", "Call forwarding", "Sentiment analysis", "API access"],
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SECTION — VALUE PROPS */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 bg-[#f8fafc] border-r border-slate-200">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-4 rounded-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, var(--teal-primary), var(--teal-medium))",
              }}
            >
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#0b1524]">AfterCallPro</h1>
          </div>

          <p className="text-xl font-semibold text-[#0b1524] mt-4">
            Your 24/7 AI Call Assistant for Small Businesses
          </p>
          <p className="text-slate-600 mt-2 leading-relaxed">
            Capture every lead. Never miss a call again. Automate your business communication with enterprise-level AI.
          </p>
        </div>

        <div className="space-y-6 text-slate-700 text-lg font-medium">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-teal-500 mt-1" />
            <p>Answers every call instantly — no missed opportunities</p>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-teal-500 mt-1" />
            <p>24/7 coverage for your business, even after hours</p>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-500 mt-1" />
            <p>Secure call handling with encrypted storage</p>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-teal-500 mt-1" />
            <p>Integrates with you
