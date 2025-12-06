import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Check, ArrowRight } from "lucide-react";

export default function Signup() {
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

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.business?.id) {
          localStorage.setItem("businessId", data.business.id);
        }
