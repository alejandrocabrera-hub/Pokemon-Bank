/**
 * Navigation.js - Control de navegación para Pokémon Bank
 * Funciones para navegar entre pantallas (login, dashboard, y acciones)
 */

/**
 * Redirige a la pantalla del dashboard
 */
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

/**
 * Cierra la sesión y redirige al login
 */
function logout() {
    // Limpiar almacenamiento local y de sesión
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirigir a la pantalla de login (index.html)
    window.location.href = 'index.html';
}

/**
 * Manejador para botón Depositar
 */
function handleDeposit() {
    alert('Funcionalidad de Depósito - Próximamente disponible');
    // En futuro: window.location.href = 'deposit.html';
}

/**
 * Manejador para botón Retirar
 */
function handleWithdraw() {
    alert('Funcionalidad de Retiro - Próximamente disponible');
    // En futuro: window.location.href = 'withdraw.html';
}

/**
 * Manejador para botón Consultar Saldo
 */
function handleBalance() {
    alert('Funcionalidad de Consulta de Saldo - Próximamente disponible');
    // En futuro: window.location.href = 'balance.html';
}

/**
 * Manejador para botón Pagar Servicios
 */
function handlePayServices() {
    abrirServicios();
}

/**
 * Abrir modal de servicios
 */
function abrirServicios() {
    document.getElementById('modalServicios').style.display = 'flex';
}

// Empresas por servicio
const companies = {
    agua: ['ANDA'],
    electricidad: ['AES', 'DELSUR', 'CLESA'],
    telefonia: ['Claro', 'Tigo', 'Movistar'],
    internet: ['Claro', 'Tigo', 'Movistar', 'Cable & Wireless']
};

function updateCompanies() {
    const serviceType = document.getElementById('serviceType').value;
    const companySelect = document.getElementById('company');

    // Limpiar opciones anteriores
    companySelect.innerHTML = '<option value="">Seleccione una empresa</option>';

    if (serviceType && companies[serviceType]) {
        companies[serviceType].forEach(company => {
            const option = document.createElement('option');
            option.value = company.toLowerCase();
            option.textContent = company;
            companySelect.appendChild(option);
        });
        companySelect.disabled = false;
    } else {
        companySelect.disabled = true;
    }
}

function simulatePayment() {
    const serviceType = document.getElementById('serviceType').value;
    const company = document.getElementById('company').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!serviceType || !company || !accountNumber || !amount || amount <= 0) {
        swal("Error", "Por favor complete todos los campos correctamente.", "error");
        return;
    }

    if (amount > saldoActual) {
        swal("Error", "Saldo insuficiente para realizar el pago.", "error");
        return;
    }

    // Simular pago
    saldoActual -= amount;

    const serviceNames = {
        agua: 'Agua',
        electricidad: 'Electricidad',
        telefonia: 'Telefonía',
        internet: 'Internet'
    };

    swal("¡Pago Exitoso!", `Has pagado $${amount.toFixed(2)} por ${serviceNames[serviceType]} (${company.toUpperCase()}).\nNuevo saldo: $${saldoActual.toFixed(2)}`, "success")
        .then(() => {
            // Limpiar formulario
            document.getElementById('serviceType').value = '';
            document.getElementById('company').innerHTML = '<option value="">Seleccione una empresa</option>';
            document.getElementById('company').disabled = true;
            document.getElementById('accountNumber').value = '';
            document.getElementById('amount').value = '';
            cerrarModal('modalServicios');
        });
}
