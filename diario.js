document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formulario-diario'); 
    var listaTareasUl = document.getElementById('lista-tareas-diarias');

    listaTareasUl.innerHTML = ''; 
    if (listaTareasUl.children.length === 0) {
        var mensajeVacio = document.createElement('li');
        mensajeVacio.id = 'mensaje-vacio-diario';
        mensajeVacio.style.color = '#911e4eff';
        mensajeVacio.textContent = 'Pone algo wachin';
        listaTareasUl.appendChild(mensajeVacio);
    }

    form.addEventListener('submit', agregarTareaDiaria);
    listaTareasUl.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            marcarTareaDiaria(event.target);
        }
    });
});

function agregarTareaDiaria(event) {
    event.preventDefault();

    var dia = document.getElementById('dia').value; 
    var nombreTarea = document.getElementById('t1').value.trim();
    var tiempoInput = document.getElementById('cant').value;
    var listaTareasUl = document.getElementById('lista-tareas-diarias');

    if (dia === '' || nombreTarea === '') {
        alert('⚠️ Selecciona un Día y asigna un Nombre a la tarea xd.');
        return;
    }
    
    var tiempo = parseFloat(tiempoInput).toFixed(1); 
    var mensajeVacio = document.getElementById('mensaje-vacio-diario');
    if (mensajeVacio) {
        listaTareasUl.removeChild(mensajeVacio);
    }

    var nuevaTareaLi = document.createElement('li');
    nuevaTareaLi.className = 'tarea-item pendiente'; 
    nuevaTareaLi.style.padding = '8px 0';
    nuevaTareaLi.style.borderBottom = '1px dotted #ac4076ff';
    
    nuevaTareaLi.innerHTML = `
        <input type="checkbox" data-dia="${dia}" data-tiempo="${tiempo}"> 
        <span class="tarea-texto">
            [${dia} - ${tiempo} hrs] <strong>${nombreTarea}</strong>
        </span>
    `;

    listaTareasUl.prepend(nuevaTareaLi); 
    document.getElementById('t1').value = '';
    document.getElementById('cant').value = '1.0'; 
    document.getElementById('dia').value = ''; 
}

function marcarTareaDiaria(checkbox) {
    var listItem = checkbox.closest('.tarea-item'); 
    var isChecked = checkbox.checked;
    var tareaTexto = listItem.querySelector('.tarea-texto');

    if (isChecked) {
        listItem.classList.remove('pendiente');
        listItem.classList.add('completada');
        listItem.style.textDecoration = 'line-through';
        tareaTexto.style.color = '#9b1d51ff'; 
        listItem.style.backgroundColor = '#ffddedff';

    } else {
        listItem.classList.remove('completada');
        listItem.classList.add('pendiente');
        listItem.style.textDecoration = 'none';
        tareaTexto.style.color = 'black';
        listItem.style.backgroundColor = 'transparent'; 
    }
}