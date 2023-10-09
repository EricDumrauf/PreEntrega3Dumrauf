document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  username && password ? llamadaProductos() : userLoggin(); 
})

function userLoggin(){
  let new_div = document.createElement("div")
  new_div.classList.add("pop-up-session")
  let pop_up_element = `
  <div class='pop-up-content card'>
      <h2>Debe iniciar sesión</h2>
      <div class="mt-3">
        <input type="text" id="user" placeholder="Usuario">
      </div>
      <div class="mt-3">
        <input type="password" id="password" placeholder="Contraseña">
      </div> 
      <div class="container text-center">
        <button class="disabled" id="btn-log">Login</button>
      </div>
  </div>
  `
  document.body.appendChild(new_div).innerHTML = pop_up_element
  const user = document.getElementById("user");
  const passw = document.getElementById("password");
  user.addEventListener("input", validarCampos);
  passw.addEventListener("input", validarCampos);
  const button_loggin = document.getElementById('btn-log');
  button_loggin.classList.add("disabled");
  button_loggin.setAttribute("disabled", true);
  
  function validarCampos() {

    user.value && passw.value
    ? (button_loggin.classList.remove("disabled"), button_loggin.removeAttribute("disabled"))
    : (button_loggin.classList.add("disabled"), button_loggin.setAttribute("disabled", true));

    button_loggin.addEventListener('click', () => {
      localStorage.setItem('username', user.value);
      localStorage.setItem('password', passw.value);
      document.querySelector('.pop-up-session').classList.add('d-none')
      llamadaProductos();
    })    
  }
}

function llamadaProductos(){
  fetch('data/productos.json')
        .then((response)=>{
          return response.json()
        })
        .then((data)=>{
          cargarProductos(data)
        })
        .catch((error)=>{
          console.log(error);
        })
}

function cargarProductos(productos) {
  const productos_inicio = document.querySelector('#inner-productos')

  let html_content = ""
  productos.forEach((producto) => {
    html_content += `
      <div class="card shadow">
          <img class="card-img" src="img/${producto.img}" alt="">
          <h2>${producto.name}</h2>
          <p>${producto.description}</p>
          <p class="p-price">$${producto.price}</p>
          <button class="font-pers">Agregar al carrito</button>
      </div>
    `
  });
  productos_inicio.innerHTML = html_content 
}