const tablaPersonas=document.getElementById("tabla");
const btnAgregar=document.getElementById("btnAgregar");

class Estudio {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

localStorage.setItem("estudios", JSON.stringify([
    new Estudio("Jardín de infancia"),
    new Estudio("Primaria"),
    new Estudio("Secundaria"),
    new Estudio("Universidad"),
    new Estudio("Posgrado")
]));

class Persona {
    constructor(nombre, edad, estudio) {
        this.nombre = nombre;
        this.edad = edad;
        this.estudio = estudio; // Objeto Estudio
    }
}
let personas = JSON.parse(localStorage.getItem("personas")) || [];

personas.forEach((persona, index) => {
    const fila = document.createElement("tr");  
    fila.innerHTML = `
        <td>${persona.nombre}</td>
        <td>${persona.edad}</td>
        <td>${persona.estudio?.nombre || "Sin estudio"}</td>
        <td><button class="btnEliminar" data-index="${index}">Eliminar</button></td>
        <td><button class="btnModificar" data-index="${index}">Modificar</button></td>
    `;
    tablaPersonas.appendChild(fila);
});
btnAgregar.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.location.href = "editar.html";
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
        const index = e.target.getAttribute("data-index");
        
        // Eliminar del array
        personas.splice(index, 1);

        // Guardar en localStorage
        localStorage.setItem("personas", JSON.stringify(personas));

        // Recargar la página para actualizar la tabla
        window.location.reload();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnModificar")) {
        const index = e.target.dataset.index;

        // Guardar el índice de la persona que se va a modificar
        localStorage.setItem("personaEditar", index);

        // Ir a la página de edición
        window.location.href = "editar.html";
    }
});