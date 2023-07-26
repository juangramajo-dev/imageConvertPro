/// Función para la conversión de imágenes a diferentes formatos
function convertImage() {
  try {
    const imagePreview = document.getElementById("imagePreview");

    if (!imagePreview.src || imagePreview.src === "") {
      throw new Error("Selecciona una imagen primero.");
    }

    const formatSelect = document.getElementById("formatSelect");
    const selectedFormat = formatSelect.value;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const fileName = "imagen_convertida." + selectedFormat;
        saveAs(blob, fileName);
      });
    };

    img.src = imagePreview.src;
  } catch (error) {
    console.error("Error en la conversión de imágenes:", error.message);
    alert("Ha ocurrido un error en la conversión de imágenes. Por favor, asegúrate de seleccionar una imagen válida.");
  }
}

// Función para manejar el evento de cambio de imagen seleccionada
function handleImageInput(event) {
  const imagePreview = document.getElementById("imagePreview");
  const convertButton = document.getElementById("convertButton");

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    imagePreview.src = e.target.result;
    imagePreview.classList.remove("d-none");
    convertButton.classList.remove("d-none");
  };

  reader.readAsDataURL(file);
}

// Función para manejar el evento de soltar imagen en la zona de arrastrar y soltar
function handleDrop(event) {
  event.preventDefault();

  const dropZone = document.getElementById("dropZone");
  dropZone.classList.remove("drop-zone-active");

  const file = event.dataTransfer.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.src = e.target.result;
    imagePreview.classList.remove("d-none");

    const convertButton = document.getElementById("convertButton");
    convertButton.classList.remove("d-none");
  };

  reader.readAsDataURL(file);
}

// Función para manejar los eventos de arrastrar y salir de la zona de arrastrar y soltar
function handleDrag(event) {
  event.preventDefault();
  const dropZone = document.getElementById("dropZone");
  dropZone.classList.add("drop-zone-active");
}

function handleDragLeave(event) {
  event.preventDefault();
  const dropZone = document.getElementById("dropZone");
  dropZone.classList.remove("drop-zone-active");
}

// Asignar los manejadores de eventos a la zona de arrastrar y soltar
const dropZone = document.getElementById("dropZone");
dropZone.addEventListener("dragover", handleDrag);
dropZone.addEventListener("dragenter", handleDrag);
dropZone.addEventListener("dragleave", handleDragLeave);
dropZone.addEventListener("drop", handleDrop);

// Asignar el manejador de evento para la selección de imagen
const imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", handleImageInput);


  const convertButton = document.getElementById("convertButton");
  convertButton.addEventListener("click", convertImage);