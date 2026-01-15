// APIs (totes són GET)
const API_POSTS = "https://jsonplaceholder.typicode.com/posts?_limit=5";
const API_USER = (id) => `https://jsonplaceholder.typicode.com/users/${id}`;
const API_POKE = (name) => `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
const API_METEO = "<https://api.open-meteo.com/v1/forecast?latitude=42.5078&longitude=1.5211&current=temperature_2m,is_day&timezone=Europe%2FAndorra>";
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
  } else {
    pokeImg.src="";
    const pokeText = document.createElement("p");
    pokeText.textContent="Heu d'introduïr un nom correcte.";
    pokeBox.appendChild(pokeText);
  }
  // TODO 1: valida que hi hagi nom. Si no, missatge i return
  // TODO 2: pokeBox = "Carregant..." i posa una imatge buida (pokeImg.src = "")
  // TODO 3: fes getJSON(API_POKE(name))
  // TODO 4: mostra al pokeBox: id, name, height, weight, types (array)
  // TODO 5: posa la imatge: data.sprites.front_default
});

/* ==========================
   MISSIÓ 4 — GET Meteo Andorra
   ========================== */
btnMeteo.addEventListener("click", async () => {
  // TODO 1: meteoBox = "Carregant..."
  // TODO 2: fes getJSON(API_METEO)
  // TODO 3: del JSON, agafa data.current.temperature_2m i data.current.time
  // TODO 4: mostra un missatge: "A Andorra la Vella fa X°C (hora: ...)"
});

/* =============================
   MISSIÓ 5 — GET GitHub username
   ============================= */
btnGh.addEventListener("click", async () => {
  // TODO 1: valida username. Si no, missatge i return
  // TODO 2: ghBox = "Carregant..." i ghImg.src = ""
  // TODO 3: fes getJSON(API_GH(user))
  // TODO 4: mostra: login, name, public_repos, followers
  // TODO 5: posa avatar: data.avatar_url
});