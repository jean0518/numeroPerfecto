const form = document.getElementById("formPerfecto");
const inputNumero = document.getElementById("numero");
const resultado = document.getElementById("resultado");
const contenedor = document.getElementById("contenedorGrupo");
const IMAGEN_DEFAULT = "img/default-user.png";
const grupoTrabajo = [
        {
            nombre: "Jean Michael Soto Ortiz",
            carrera: "Ingeniería de Sistemas",
            universidad: "Universidad Simon Bolivar",
            imagen: "img/jean.jpeg"
        },
        {
            nombre: "Jader Daniel Mejia Castro",
            carrera: "Ingeniería de Sistemas",
            universidad: "Universidad Simon Bolivar",
            imagen: "img/jader.jpeg"
        },
        {
            nombre: "Iber Alfonso Masco De La Cruz",
            carrera: "Ingeniería de Sistemas",
            universidad: "Universidad Simon Bolivar",
            imagen: "img/iber.jpeg"
        },
        {
            nombre: "Diver Miguel Campo Diaz",
            carrera: "Ingeniería de Sistemas",
            universidad: "Universidad Simon Bolivar",
            imagen: "img/diver.jpeg"
        },
        {
            nombre: "Alvaro Ernesto Jimenez Jacome",
            carrera: "Ingeniería de Sistemas",
            universidad: "Universidad Simon Bolivar",
            imagen: "img/alvaro.jpeg"
        }
    ];

    // Función principal
    function esNumeroPerfecto(numero) {
        let sumaDivisores = 0;
        let divisores = [];

        for (let i = 1; i < numero; i++) {
            if (numero % i === 0) {
                sumaDivisores += i;
                divisores.push(i);
            }
        }

        return {
            esPerfecto: sumaDivisores === numero,
            sumaDivisores,
            divisores
        };
    }

    // Evento del formulario
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const numero = Number(inputNumero.value);

        // Validaciones
        if (isNaN(numero)) {
            mostrarResultado("❌ Error: no ingresaste un número válido", "danger");
            return;
        }

        if (numero <= 0) {
            mostrarResultado("⚠️ El número debe ser mayor que cero", "warning");
            return;
        }

        // Lógica
        const resultadoCalculo = esNumeroPerfecto(numero);

        if (resultadoCalculo.esPerfecto) {
            mostrarResultado(
                `✅ El número <strong>${numero}</strong> es perfecto.<br>
                Divisores: ${resultadoCalculo.divisores.join(" + ")} = 
                <strong>${resultadoCalculo.sumaDivisores}</strong>`,
                "success"
            );
        } else {
            mostrarResultado(
                `❌ El número <strong>${numero}</strong> no es perfecto.<br>
                La suma de sus divisores es <strong>${resultadoCalculo.sumaDivisores}</strong>`,
                "danger"
            );
        }
    });

    // Función para mostrar resultados en el DOM
    function mostrarResultado(mensaje, tipo) {
        resultado.className = `alert alert-${tipo} mt-4`;
        resultado.innerHTML = mensaje;
        resultado.classList.remove("d-none");
    }

    function renderizarGrupo() {
        contenedor.innerHTML = "";

        grupoTrabajo.forEach(persona => {
            const imagen = persona.imagen?.trim() 
                ? persona.imagen 
                : IMAGEN_DEFAULT;

            contenedor.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card card-grupo text-center h-100 shadow-sm">

                    <div class="foto-wrapper">
                        <img 
                            src="${imagen}"
                            alt="Foto de ${persona.nombre}"
                            class="foto-participante"
                            onerror="this.onerror=null;this.src='${IMAGEN_DEFAULT}'"
                        >
                    </div>

                    <div class="card-body">
                        <h5 class="card-title">${persona.nombre}</h5>
                        <p class="card-text mb-1">${persona.carrera}</p>
                        <small class="text-muted">${persona.universidad}</small>
                    </div>
                </div>
            </div>
        `;
        });
    }

    renderizarGrupo();