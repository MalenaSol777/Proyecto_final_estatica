document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario-mensual'); 
    var listaTareasUl = document.getElementById('lista-tareas-mensuales');
    listaTareasUl.innerHTML = ''; 

    if (listaTareasUl.children.length === 0) {
        var mensajeVacio = document.createElement('li');
        mensajeVacio.id = 'mensaje-vacio-mensual';
        mensajeVacio.style.color = '#911e4eff';
        mensajeVacio.textContent = 'Aún no has registrado tareas bruh.';
        listaTareasUl.appendChild(mensajeVacio);
    }

    form.addEventListener('submit', agregarTareaMensual);
    listaTareasUl.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            marcarTareaMensual(event.target);
        }
    });
});

function agregarTareaMensual(event) {
    event.preventDefault();

    var mes = document.getElementById('mes').value; 
    var nombreTarea = document.getElementById('t1').value.trim();
    var cant = document.getElementById('cant').value;
    var listaTareasUl = document.getElementById('lista-tareas-mensuales');

    if (mes === '' || nombreTarea === '') {
        alert('⚠️ Selecciona un Mes y asigna un Nombre a la tarea mogolico.');
        return;
    }

    var mensajeVacio = document.getElementById('mensaje-vacio-mensual');
    if (mensajeVacio) {
        listaTareasUl.removeChild(mensajeVacio);
    }

    var nuevaTareaLi = document.createElement('li');
    nuevaTareaLi.className = 'tarea-item pendiente'; 
    nuevaTareaLi.style.padding = '8px 0';
    nuevaTareaLi.style.borderBottom = '1px dotted #ca8bb0ff';
 
    nuevaTareaLi.innerHTML = `
        <input type="checkbox" data-mes="${mes}" data-cant="${cant}"> 
        <span class="tarea-texto">
            [${mes} - ${cant} Veces] <strong>${nombreTarea}</strong>
        </span>
    `;

    listaTareasUl.prepend(nuevaTareaLi); 
    document.getElementById('t1').value = '';
    document.getElementById('cant').value = '1';
    document.getElementById('mes').value = ''; 
}

function marcarTareaMensual(checkbox) {
    var listItem = checkbox.closest('.tarea-item'); 
    var isChecked = checkbox.checked;
    var tareaTexto = listItem.querySelector('.tarea-texto');

    if (isChecked) {
  
        listItem.classList.remove('pendiente');
        listItem.classList.add('completada');
        listItem.style.textDecoration = 'line-through';
        tareaTexto.style.color = '#a51a70ff'; 
        listItem.style.backgroundColor = '#fce3f2ff'; 
    } else {
        listItem.classList.remove('completada');
        listItem.classList.add('pendiente');
        listItem.style.textDecoration = 'none';
        tareaTexto.style.color = 'black';
        listItem.style.backgroundColor = 'transparent'; 
    }
}