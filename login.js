const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

if (showSignup) {
  showSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  });
}

if (showLogin) {
  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please fill in all login fields.");
      return;
    }

    try {
      const res = await fetch(
        "https://taskflow-backend-sthf.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("currentUser", data.user.name);

        window.location.href = "index.html";
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Login failed. Please try again.");
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all signup fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
     const res = await fetch(
       "https://taskflow-backend-sthf.onrender.com/signup",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, password }),
       },
     );
      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        signupForm.reset();
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
      }
    } catch (error) {
      console.log("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  });
}
