const inputNombre = document.getElementById("inputNombre");
const inputEdad = document.getElementById("inputEdad");
const estudio = document.getElementById("estudio");
const btnGuardar = document.getElementById("guardar");

let editIndex = localStorage.getItem("personaEditar");

let estudios = JSON.parse(localStorage.getItem("estudios")) || [];

// Rellenar select de estudios
estudios.forEach((estudioObj) => {
    const option = document.createElement("option");
    option.value = estudioObj.nombre;
    option.textContent = estudioObj.nombre;
    estudio.appendChild(option);
});

// Si editIndex NO es null, estamos modificando
if (editIndex != null) {
    let personas = JSON.parse(localStorage.getItem("personas"));

    let persona = personas[editIndex];

    // Rellenar inputs
    inputNombre.value = persona.nombre;
    inputEdad.value = persona.edad;
    estudio.value = persona.estudio.nombre;
}

// Guardar nueva persona
btnGuardar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const nombre = inputNombre.value;
    const edad = inputEdad.value;
    const estudioNombre = estudio.value;

    // Validación básica
    if (!nombre || !edad || !estudioNombre) {
        alert("Por favor completa todos los campos.");
        return;
    }


    // Obtener lista anterior y agregar nuevo registro
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    if (editIndex != null) {
        personas[editIndex] = {
            nombre,
            edad,
            estudio: {
                nombre: estudioNombre
            }
        };
        localStorage.removeItem("personaEditar");
     }
    else{
        personas.push({
            nombre,
            edad,
            estudio: {
                nombre: estudioNombre
            }
        });
     }

    // Guardar lista actualizada
    localStorage.setItem("personas", JSON.stringify(personas));

    // Volver a la página principal
    window.location.href = "Persona.html";
});