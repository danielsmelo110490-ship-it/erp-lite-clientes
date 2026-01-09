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
