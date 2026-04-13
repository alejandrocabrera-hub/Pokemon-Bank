document.addEventListener('DOMContentLoaded', () => {
    cargarTransacciones();
});

/**
 * Carga las transacciones desde localStorage o usa datos de prueba si está vacío
 */
function cargarTransacciones() {
    let transacciones = JSON.parse(localStorage.getItem('transacciones'));

    // Datos de prueba (Mock data) si no hay nada guardado
    if (!transacciones || transacciones.length === 0) {
        transacciones = [
            { tipo: 'Depósito', monto: 1200.00, fecha: '2024-03-15 10:30:22' },
            { tipo: 'Retiro', monto: 150.00, fecha: '2024-03-20 14:15:05' },
            { tipo: 'Pago', monto: 65.40, fecha: '2024-03-25 09:45:10' },
            { tipo: 'Depósito', monto: 300.00, fecha: '2024-04-01 16:20:00' },
            { tipo: 'Pago', monto: 120.00, fecha: '2024-04-05 11:05:30' }
        ];
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }

    renderizarTabla(transacciones);
}

/**
 * Renderiza dinámicamente las filas de la tabla
 * @param {Array} transacciones 
 */
function renderizarTabla(transacciones) {
    const tbody = document.getElementById('tbody-historial');
    tbody.innerHTML = '';

    transacciones.forEach(t => {
        const tr = document.createElement('tr');

        // Determinar clase de badge según el tipo
        let badgeClass = 'badge-pago';
        if (t.tipo.toLowerCase().includes('depo')) badgeClass = 'badge-deposito';
        if (t.tipo.toLowerCase().includes('retir')) badgeClass = 'badge-retiro';

        tr.innerHTML = `
            <td data-label="TIPO"><span class="badge-tipo ${badgeClass}">${t.tipo}</span></td>
            <td data-label="MONTO" class="monto-valor">$${parseFloat(t.monto).toFixed(2)}</td>
            <td data-label="FECHA">${t.fecha}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Genera un reporte PDF usando la librería jsPDF
 */
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

    // Título y Encabezado
    doc.setFontSize(22);
    doc.setTextColor(255, 28, 28); // Rojo Pokémon
    doc.text('POKÉMON BANK - REPORTE', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text('Historial de Transacciones', 105, 30, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Usuario: Juan Pokemon`, 20, 45);
    doc.text(`Fecha de impresión: ${new Date().toLocaleString()}`, 20, 50);

    // Línea divisoria
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 55, 190, 55);

    // Tabla manual simple
    let y = 65;
    doc.setFont(undefined, 'bold');
    doc.text('Tipo', 25, y);
    doc.text('Monto', 85, y);
    doc.text('Fecha', 135, y);
    doc.setFont(undefined, 'normal');

    y += 10;

    transacciones.forEach((t, i) => {
        if (y > 270) { // Nueva página si es necesario
            doc.addPage();
            y = 20;
        }
        doc.text(t.tipo, 25, y);
        doc.text(`$${parseFloat(t.monto).toFixed(2)}`, 85, y);
        doc.text(t.fecha, 130, y);
        y += 8;
    });

    doc.save('Historial_Pokemon_Bank.pdf');
}

/**
 * Regresa a la pantalla del dashboard
 */
function regresar() {
    window.location.href = 'dashboard.html';
}
