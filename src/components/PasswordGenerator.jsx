import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const similarCharsRegex = /[Il1O0]/g;

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [avoidSimilar, setAvoidSimilar] = useState(false);
  const [password, setPassword] = useState("");

  const calcStrength = () => {
    let score = 0;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (length > 14) score++;

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score === 3)
      return { label: "Medium", color: "bg-yellow-500", width: "50%" };
    if (score === 4)
      return { label: "Strong", color: "bg-green-500", width: "75%" };
    return { label: "Very Strong", color: "bg-green-600", width: "100%" };
  };

  const generatePassword = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-={}[]<>?/";

    if (avoidSimilar) chars = chars.replace(similarCharsRegex, "");

    if (!chars.length) {
      toast.error("Please select at least one character set.");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast.success("Copied!");
  };

  const strength = calcStrength();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-[#0d0d0f] text-white">

      <div className="w-full max-w-lg p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl transition-all hover:shadow-[0_0_40px_rgba(0,255,170,0.2)]">

        <h1 className="text-3xl font-semibold text-center mb-6 text-white drop-shadow">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-lg opacity-90 select-all">
            {password || "Generate a password…"}
          </span>
          <button
            onClick={copyPassword}
            className="px-4 py-2 ml-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition font-semibold"
          >
            Copy
          </button>
        </div>

        {/* Strength Meter */}
        <div className="mt-4">
          <p className="text-sm mb-1 opacity-80">
            Strength: <b>{strength.label}</b>
          </p>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`${strength.color} h-full transition-all duration-300`}
              style={{ width: strength.width }}
            ></div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mt-6 space-y-5">

          {/* Length */}
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="opacity-80">Length</span>
              <span className="font-semibold">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() => setUppercase(!uppercase)}
                className="accent-emerald-500"
              />
              Uppercase
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() => setLowercase(!lowercase)}
                className="accent-emerald-500"
              />
              Lowercase
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers(!numbers)}
                className="accent-emerald-500"
              />
              Numbers
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={symbols}
                onChange={() => setSymbols(!symbols)}
                className="accent-emerald-500"
              />
              Symbols
            </label>

            <label className="flex items-center gap-3 cursor-pointer col-span-2">
              <input
                type="checkbox"
                checked={avoidSimilar}
                onChange={() => setAvoidSimilar(!avoidSimilar)}
                className="accent-emerald-500"
              />
              Avoid Similar Characters (I, l, 1, O, 0)
            </label>

          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-black font-bold text-lg shadow-lg hover:opacity-90 transition"
        >
          Generate Password
        </button>

        <ToastContainer position="bottom-center" theme="dark" />
      </div>

    </div>
  );
}
