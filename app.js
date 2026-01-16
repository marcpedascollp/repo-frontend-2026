// APIs (totes són GET)
const API_POSTS = "https://jsonplaceholder.typicode.com/posts?_limit=5";
const API_USER = (id) => `https://jsonplaceholder.typicode.com/users/${id}`;
const API_POKE = (name) => `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
const API_METEO = "https://api.open-meteo.com/v1/forecast?latitude=42.5078&longitude=1.5211&current=temperature_2m,is_day&timezone=Europe%2FAndorra";
const API_GH = (user) => `https://api.github.com/users/${user}`;

// Elements Missió 1
const btnPosts = document.querySelector("#btnPosts");
const postsList = document.querySelector("#postsList");

// Elements Missió 2
const userIdInput = document.querySelector("#userId");
const btnUser = document.querySelector("#btnUser");
const userBox = document.querySelector("#userBox");

// Elements Missió 3
const pokeNameInput = document.querySelector("#pokeName");
const btnPoke = document.querySelector("#btnPoke");
const pokeBox = document.querySelector("#pokeBox");
const pokeImg = document.querySelector("#pokeImg");

// Elements Missió 4
const btnMeteo = document.querySelector("#btnMeteo");
const meteoBox = document.querySelector("#meteoBox");

// Elements Missió 5
const ghUserInput = document.querySelector("#ghUser");
const btnGh = document.querySelector("#btnGh");
const ghBox = document.querySelector("#ghBox");
const ghImg = document.querySelector("#ghImg");

// Helper: GET + JSON + errors bàsics
async function getJSON(url) {
  const res = await fetch(url);

  // fetch NO peta sol amb 404/500, per això mirem ok
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

/* =====================
  MISSIÓ 1 — GET posts
   ===================== */
btnPosts.addEventListener("click", async () => {
  postsList.innerHTML = "";

  try {
    const posts = await getJSON(API_POSTS);


    for (const p of posts) {
      const li = document.createElement("li");
      li.textContent = `#${p.id} - ${p.title}`;
      postsList.appendChild(li);
    }
  } catch (e) {
    const li = document.createElement("li");
    li.textContent = `Error: ${e.message}`;
    postsList.appendChild(li);
  }
});

/* ==========================
   MISSIÓ 2 — GET user per ID
   ========================== */
btnUser.addEventListener("click", async () => {
  let inputId = userIdInput.value;
  console.log(inputId);
  userIdInput.value="";
  const textInsideBox = document.createElement("p");
  const textInsideBoxNew = document.createElement("p");
  if(inputId<=0){
    textInsideBox.textContent="Heu d'insertar un nombre vàlid."
  }else {
    textInsideBox.textContent="Carregant..."
  }
  userBox.appendChild(textInsideBox);
  userBox.appendChild(textInsideBoxNew);
  const get = await getJSON(API_USER(inputId));
  // console.log(get);
    textInsideBoxNew.textContent=get.name+", "+get.email+", "+get.address.city+".";
    textInsideBox.textContent=JSON.stringify(get, null, 2);
  });
/* =========================
   MISSIÓ 3 — GET Pokémon nom
   ========================= */
btnPoke.addEventListener("click", async () => {
  let inputName=pokeNameInput.value;
  pokeNameInput.value="";
  if(!!inputName){
    // console.log(inputName);
    const pokeText = document.createElement("p");
    pokeText.textContent="Carregant...";
    pokeBox.appendChild(pokeText);
    let data = await getJSON(API_POKE(inputName));
    console.log(data);
    pokeImg.src=data.sprites.front_shiny;
    let types = "";
    // console.log(data.types[0].type.name);
    for(let i=0;i<data.types.length;i++){
      let type = data.types[i].type.name+" ";
      types = types + type;
    }
    console.log(types);
    pokeText.textContent=data.name+", id: "+data.id+", altura: "+data.height+", pes: "+data.weight+", tipus: "+ types;
    
  } else {
    pokeImg.src="";
    const pokeText = document.createElement("p");
    pokeText.textContent="Heu d'introduïr un nom correcte.";
    pokeBox.appendChild(pokeText);
  }
});
/* ==========================
  MISSIÓ 4 — GET Meteo Andorra
  ========================== */
btnMeteo.addEventListener("click", async () => {
  const meteoText = document.createElement("p");
  const meteoText2 = document.createElement("p");
  meteoText.textContent="Carregant..."
  meteoBox.appendChild(meteoText);
  let data = await getJSON(API_METEO);
  console.log(data);
  meteoText.textContent="Avui fa una temperatura de "+data.current.temperature_2m+"ºC.";
  meteoText2.textContent=data.current.time;
  meteoBox.appendChild(meteoText2);
});
/* =============================
  MISSIÓ 5 — GET GitHub username
  ============================= */
btnGh.addEventListener("click", async () => {
  if (!!ghUserInput){
    ghText=document.createElement("p");
    ghText.textContent="Carregant...";
    ghBox.appendChild(ghText);
    ghImg.src="";
    try{
      let data = await getJSON(API_GH(ghUserInput.value));
      ghUserInput.value="";
      console.log(data);
      ghImg.src=data.avatar_url;
      ghText.textContent="Login: "+data.login+", name: "+data.name+", public repos: "+data.public_repos+", followers: "+data.followers+"." 
    } catch (e){
      ghText.textContent="Usuari no vàlid";
    }
    

  }
  // TODO 1: valida username. Si no, missatge i return
});