let clientes = [];

async function carregarClientes() {
    const res = await fetch('clientes.json');
    clientes = await res.json();
    renderizarTabela();
}

function renderizarTabela(lista = clientes) {
    const tbody = document.getElementById('clientesBody');
    tbody.innerHTML = '';

    lista.forEach(cliente => {
        tbody.innerHTML += `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.empresa}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone ?? '-'}</td>
            <td>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        </tr>`;
    });
}

function excluirCliente(id) {
    if(!confirm("Tem certeza que deseja excluir?")) return;
    clientes = clientes.filter(c => c.id !== id);
    renderizarTabela();
}

function editarCliente(id) {
    const c = clientes.find(c => c.id === id);
    const novoNome = prompt("Editar nome:", c.nome);
    if(novoNome) {
        c.nome = novoNome;
        renderizarTabela();
    }
}

function filtrarClientes() {
    const nome = document.getElementById('fNome').value.toLowerCase();
    const empresa = document.getElementById('fEmpresa').value.toLowerCase();
    const email = document.getElementById('fEmail').value.toLowerCase();

    const filtrados = clientes.filter(c =>
        c.nome.toLowerCase().includes(nome) &&
        c.empresa.toLowerCase().includes(empresa) &&
        c.email.toLowerCase().includes(email)
    );

    renderizarTabela(filtrados);
}

carregarClientes();
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Empresa</th>
      <th>Email</th>
      <th>Telefone</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="clientesBody"></tbody>
</table>
<input id="fNome" oninput="filtrarClientes()" placeholder="Nome do Cliente">
<input id="fEmpresa" oninput="filtrarClientes()" placeholder="Empresa">
<input id="fEmail" oninput="filtrarClientes()" placeholder="E-mail">

    fetch("clientes.json")
.then(res => res.json()).
    .then(clientes => { const lista =
        document.getElementByid("lista-clientes");

          clientes.forEach(c => {
              const li =
                  document.createElement("li");
              li.textContent = '${c.nome} - $
              {c.empresa} - ${c.email} ' ;
                  lista.appenChild(li);
          });
                      })
.catch(err => console.error("error ao carregar clientes:", err));
