const constraints = {
    pin: {
        presence: { allowEmpty: false, message: "^El PIN es obligatorio" },
        format: {
            pattern: "^[0-9]{4}$",
            message: "^El PIN debe tener exactamente 4 dígitos"
        }
    }
};

function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("toggleIcon");
    
    if (input.type === "password") {
        input.type = "text";
        icon.src = "IMG/pokebolaabierta.png";
    } else {
        input.type = "password";
        icon.src = "IMG/pokebolacerrada.png";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorDiv = document.getElementById("error-message");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        errorDiv.innerText = "";
        errorDiv.style.color = "#ff1c1c"; 

        const pinInput = passwordInput.value;
        const values = { pin: pinInput };

        const errors = validate(values, constraints);

        if (errors) {
            errorDiv.innerText = errors.pin[0];
            passwordInput.focus();
        } else {
            const PIN_CORRECTO = "1234";

            if (pinInput === PIN_CORRECTO) {
                errorDiv.style.color = "#28a745";
                errorDiv.innerText = "Acceso concedido...";
                
                if (typeof swal !== 'undefined') {
                    swal("¡Bienvenido Entrenador!", "Acceso correcto al Pokémon Bank", "success")
                    .then(() => {
                        window.location.href = "acciones.html";
                    });
                }
            } else {
                errorDiv.innerText = "PIN incorrecto. Intente de nuevo.";
                passwordInput.value = "";
                passwordInput.focus();
            }
        }
    });
});