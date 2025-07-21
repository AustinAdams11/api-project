// Fetch and display the first 50 Pokémon items
async function fetchItemList() {
  const listDiv = document.getElementById('itemList');
  try {
    const res = await fetch('https://pokeapi.co/api/v2/item?limit=50');
    const data = await res.json();

    listDiv.innerHTML = data.results.map(item => `
      <div class="item-name" onclick="fetchItem('${item.name}')">
        ${item.name}
      </div>
    `).join('');
  } catch (err) {
    listDiv.innerHTML = '<p style="color:red;">Failed to load item list</p>';
    console.error("Error fetching item list:", err);
  }
}

// Fetch and display individual item details
async function fetchItem(itemName = null) {
  const input = itemName || document.getElementById('itemInput').value.toLowerCase().trim();
  const display = document.getElementById('itemDisplay');
  if (!input) return;

  display.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/item/${input}`);
    if (!res.ok) throw new Error("Item not found");

    const data = await res.json();
    const name = data.name;
    const img = data.sprites?.default || '';
    const effect = data.effect_entries.find(e => e.language.name === 'en')?.short_effect || 'No effect info.';

    display.innerHTML = `
      <h2>${name}</h2>
      ${img ? `<img src="${img}" alt="${name}" class="item-img" />` : ''}
      <p class="effect">${effect}</p>
    `;
  } catch (error) {
    display.innerHTML = `<p style="color: red;">${error.message}</p>`;
    console.error("Error fetching item:", error);
  }
}

// Load the list when the page loads
window.onload = fetchItemList;