const d = document,
  $form = d.getElementById("form"),
  $inputs = d.querySelectorAll("#form input");

const expression = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const fields = {
	name: false,
	email: false
}

// Función para hacer que coincida el evento con el campo del formulario.
const validateForm = (e) => {
  switch (e.target.name) {
    case "name":
      validateField(expression.name, e.target, e.target.name);
    break;
    case "email":
      validateField(expression.email, e.target, e.target.name);
    break;
  }
}

// Función para validar cada campo del formulario.
const validateField = (expression, input, field) => {
  // Valida que la regex coincida con el input de entrada del formulario.
  if (expression.test(input.value)) {
    d.getElementById(`group__${field}`).classList.remove("form__group-incorrect");
    d.getElementById(`group__${field}`).classList.add("form__group-correct");
    d.querySelector(`#group__${field} i`).classList.remove("fa-circle-xmark");
    d.querySelector(`#group__${field} i`).classList.add("fa-circle-check");
    fields[field] = true;
  } else {
    d.getElementById(`group__${field}`).classList.add("form__group-incorrect");
    d.getElementById(`group__${field}`).classList.remove("form__group-correct");
    d.querySelector(`#group__${field} i`).classList.add("fa-circle-xmark");
    d.querySelector(`#group__${field} i`).classList.remove("fa-circle-check");
    fields[field] = false;
  }
}

$inputs.forEach((input) => {
  // Agrega el evento keyup y blur a cada input del formulario.
  input.addEventListener("keyup", validateForm);
  input.addEventListener("blur", validateForm);
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validar nuevamente los campos antes de mostrar el mensaje de éxito o error.
  const nameIsValid = expression.name.test($inputs[0].value.trim());
  const emailIsValid = expression.email.test($inputs[1].value.trim());

  // if (fields.name && fields.email) {
  if (nameIsValid && emailIsValid) {
    $form.reset();
    // Agrega mensaje de exito.
    d.getElementById("form__message-success").classList.add("form__message-success-active");
    // Remueve el mensaje de exito en 5s.
    setTimeout(() => {
      d.getElementById("form__message-success").classList.remove("form__message-success-active");
    }, 5000);
    //Remueve icono de exito.
    d.querySelectorAll(".form__group").forEach(icono => {
      icono.classList.remove("form__group-correct");
    });
    
  } else {
    // Agrega mensaje de error.
    d.getElementById("form__message-error").classList.add("form__message-error-active");
    // Remueve el mensaje de exito en 5s.
    setTimeout(() => {
      d.getElementById("form__message-error").classList.remove("form__message-error-active");
    }, 5000);
  }
});
