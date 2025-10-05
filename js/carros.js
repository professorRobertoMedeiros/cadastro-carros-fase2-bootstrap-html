let carroId = -1;

function adicionarCarro() {
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    const anoInput = document.getElementById('ano');
    const quilometragemInput = document.getElementById('quilometragem');

    const carrosStore = JSON.parse(localStorage.getItem('carros-db')) || [];
    if (carroId !== -1) {
        carrosStore[carroId] = {
            marca: marcaInput.value,
            modelo: modeloInput.value,
            ano: anoInput.value,
            quilometragem: quilometragemInput.value
        };
    } else {
        const novoCarro = {
            marca: marcaInput.value,
            modelo: modeloInput.value,
            ano: anoInput.value,
            quilometragem: quilometragemInput.value
        };

        carrosStore.push(novoCarro);
    }

    localStorage.setItem('carros-db', JSON.stringify(carrosStore));

    marcaInput.value = '';
    modeloInput.value = '';
    anoInput.value = '';
    quilometragemInput.value = '';

    carroId= -1;

    $('#cadastroCarroModal').modal('hide');

    carregarCarros();
}

function carregarCarros() {
    const carrosStore = JSON.parse(localStorage.getItem('carros-db')) || [];
    const tabela = document.getElementById('tabelaCarros');
    const tbody = tabela.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    carrosStore.forEach((carro, index) => {
        const row = tbody.insertRow();

        const acoes = row.insertCell(0);
        const marca = row.insertCell(1);
        const modelo = row.insertCell(2);
        const ano = row.insertCell(3);
        const quilometragem = row.insertCell(4);

        acoes.innerHTML = `
            <button class="btn btn-sm btn-outline-primary mr-2" onclick="editarCarro(${index})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="excluirCarro(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;

        marca.innerHTML = carro.marca;
        modelo.innerHTML = carro.modelo;
        ano.innerHTML = carro.ano;
        quilometragem.innerHTML = carro.quilometragem;
    });
}

function editarCarro(index) {
    const carrosStore = JSON.parse(localStorage.getItem('carros-db')) || [];
    const carro = carrosStore[index];

    carroId = index;

    document.getElementById('marca').value = carro.marca;
    document.getElementById('modelo').value = carro.modelo;
    document.getElementById('ano').value = carro.ano;
    document.getElementById('quilometragem').value = carro.quilometragem;

    $('#cadastroCarroModal').modal('show');
}

function excluirCarro(index) {
    if (confirm('Tem certeza que deseja excluir este carro?')) {
        const carrosStore = JSON.parse(localStorage.getItem('carros-db')) || [];
        carrosStore.splice(index, 1);
        localStorage.setItem('carros-db', JSON.stringify(carrosStore));
        carregarCarros();
    }
}