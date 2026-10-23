import {
    auth,
    provider,
    signInWithPopup,
    onAuthStateChanged
} from "./firebase.js";

const loginButton = document.getElementById("google-sign-in");

if (loginButton) {
    loginButton.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            console.log("Firebase user:", result.user);

            window.location.href = "profile.html";

        } catch (error) {
            console.error("Google sign-in failed:", error);

            const status = document.getElementById("auth-status");

            if (status) {
                status.textContent = "Google sign-in failed. Please try again.";
            }
        }
    });
}