import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          response.status === 401 &&
          data.message === "Please verify your email before logging in"
        ) {
          setShowOtp(true);
          setError(data.message);
          return;
        }

        throw new Error(data.message || "Login failed");
      }

      login(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setOtpLoading(true);

      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccess("Email verified successfully. Logging you in...");

      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login failed");
      }

      login(loginData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      setResendLoading(true);

      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setSuccess("A new OTP has been sent to your email.");
      setOtp("");
    } catch (error) {
      setError(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to your ShopGrid account</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        {success && <div className="login-success">{success}</div>}

        {!showOtp ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="login-form-group">
              <label htmlFor="otp">Verification OTP</label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                required
              />

              <small className="otp-info">
                Enter the OTP sent to <strong>{email}</strong>.
              </small>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={otpLoading}
            >
              {otpLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              className="resend-otp-btn"
              onClick={handleResendOtp}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>

            <button
              type="button"
              className="back-login-btn"
              onClick={() => {
                setShowOtp(false);
                setOtp("");
                setError("");
                setSuccess("");
              }}
            >
              ← Back to Login
            </button>
          </form>
        )}

        {!showOtp && (
          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default Login;