import React, { useCallback, useEffect, useState, useRef } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const App = () => {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [IsNumber, setIsNumber] = useState(true);
  const [IsChar, setIsChar] = useState(true);
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (IsNumber) str += "0123456789";
    if (IsChar) str += "`~@#$%^&*_-+=";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, IsNumber, IsChar]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [IsNumber, IsChar, length, passwordGenerator]);

  const getPasswordStrength = () => {
    if (length < 8) return { text: "Weak", color: "text-red-500", bg: "bg-red-500" };
    if (length < 12 || (!IsNumber && !IsChar)) return { text: "Medium", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { text: "Strong", color: "text-green-500", bg: "bg-green-500" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Password Generator
            </h1>
            <p className="text-center text-indigo-100 text-sm md:text-base">
              Create secure passwords instantly
            </p>
          </div>

          <div className="p-6 md:p-8">
            {/* Password Display */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={password}
                  ref={passwordRef}
                  readOnly
                  className="w-full px-4 text-black py-4 md:py-5 text-lg md:text-xl font-mono bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors pr-24"
                  placeholder="Your password"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    onClick={passwordGenerator}
                    className="p-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105"
                    title="Generate new password"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyPasswordToClipboard}
                    className={`p-2.5 rounded-lg transition-all duration-200 hover:scale-105 ${
                      copied
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 hover:bg-purple-200 text-purple-600"
                    }`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Strength Indicator */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Password Strength:</span>
                <span className={`text-sm font-semibold ${strength.color}`}>
                  {strength.text}
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.bg} transition-all duration-300`}
                  style={{
                    width: strength.text === "Weak" ? "33%" : strength.text === "Medium" ? "66%" : "100%"
                  }}
                />
              </div>
            </div>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-700 font-medium">Password Length</label>
                <span className="text-2xl font-bold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-lg">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="32"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((length - 6) / 26) * 100}%, #e5e7eb ${((length - 6) / 26) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6</span>
                <span>32</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-7 rounded-full transition-colors ${IsNumber ? "bg-indigo-600" : "bg-gray-300"} relative`}>
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${IsNumber ? "translate-x-5" : ""}`} />
                  </div>
                  <span className="text-gray-700 font-medium">Include Numbers</span>
                </div>
                <span className="text-gray-400 font-mono text-sm">0-9</span>
                <input
                  type="checkbox"
                  checked={IsNumber}
                  onChange={(prev) => setIsNumber(!IsNumber)}
                  className="hidden"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-7 rounded-full transition-colors ${IsChar ? "bg-indigo-600" : "bg-gray-300"} relative`}>
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${IsChar ? "translate-x-5" : ""}`} />
                  </div>
                  <span className="text-gray-700 font-medium">Include Symbols</span>
                </div>
                <span className="text-gray-400 font-mono text-sm">@#$%</span>
                <input
                  type="checkbox"
                  checked={IsChar}
                  onChange={(prev) => setIsChar(!IsChar)}
                  className="hidden"
                />
              </label>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-900 text-center">
                💡 Use a mix of length and character types for stronger passwords
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;