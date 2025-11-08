document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario-contacto');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        if (validarFormulario()) {
            
        }
        
    });

   function limpiarErrores(elementId) {
        var errorMsg = document.getElementById(`error-${elementId}`);
        if (errorMsg) errorMsg.innerHTML = '';
        var input = document.getElementById(elementId);
    } 

    function mostrarError(elementId, mensaje) {
        var errorMsg = document.getElementById(`error-${elementId}`);
        if (errorMsg) errorMsg.innerHTML = `<span style="color: purple; font-weight: bold;">⚠️ ${mensaje}</span>`;
        var input = document.getElementById(elementId);
        if (input) input.style.border = '2px solid pink';
    }
    
    function validarFormulario() {
        var esValido = true; 

        var campos = [
            { id: 'nombre', requerido: true, tipo: 'texto', mensaje: 'El nombre es obligatorio capo.' },
            { id: 'email', requerido: true, tipo: 'email', mensaje: 'El correo electrónico es obligatorio wachin.' },
            { id: 'mensaje', requerido: true, tipo: 'mensaje', mensaje: 'El mensaje es obligatorio rey.' },
            { id: 'prioridad-consulta', requerido: true, tipo: 'num-entero', mensaje: 'La prioridad de consulta es obligatoria y debe ser obviamente positiva no seas bld.' },
            { id: 'asunto', requerido: false, tipo: 'texto' },
            { id: 'fecha-visita', requerido: false, tipo: 'fecha' },
        ];

        campos.forEach(campo => {
            var input = document.getElementById(campo.id);
            var valor = input.value.trim();
            limpiarErrores(campo.id); 

            if (campo.requerido && valor === '') {
                mostrarError(campo.id, campo.mensaje);
                esValido = false; 
                return;
            }
            
            if (!campo.requerido && valor === '') {
                return; 
            }

            switch (campo.tipo) {
                case 'email':
                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(valor)) {
                        mostrarError(campo.id, 'Elegi bien el formato rey (ej: TragaLeche777@gmail.com).');
                        esValido = false;
                    }
                    break;
                    
                case 'num-entero':
                    var numEntero = parseInt(valor);
                    if (isNaN(numEntero) || !Number.isInteger(numEntero) || numEntero <= 0) {
                         mostrarError(campo.id, 'Debe ser un número entero positivo (mayor a cero), ya te dije, pesado de mrd.');
                        esValido = false;
                    }
                    break;

                case 'num-decimal':
                    var numDecimal = parseFloat(valor.replace(',', '.'));
                    if (valor !== '' && isNaN(numDecimal)) {
                        mostrarError(campo.id, 'Debe ser un número decimal válido gil.');
                        esValido = false;
                    }
                    break;
        };
        return esValido;
        })}})