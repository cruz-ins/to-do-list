const produtos = {};
let totalPrice = 0.00;

//Incluir produto na lista, verificando se é nulo, 
// se o preço é um número e se o produto já está cadastrado
function incluirLista() {
    let nome = document.getElementById("nomeProduto");
    let preco = document.getElementById("valorProduto");
    if(!nome.value && !preco.value) {
        alert("Preencha os campos");
        return;        
    } else if (!(typeof(parseFloat(preco.value)) === 'number') || isNaN(parseFloat(preco.value))){
        alert("Preencha o campo preço com um número");
    } else if(produtos[nome.value]){
            alert("Produto já cadastrado");
    } else {
        produtos[nome.value] = preco.value;
        totalPrice += parseFloat(preco.value);
        exibirValor();
    }
    exibirLista();
}

//Exibir e atualizar a lista, criada pois o codigo executa mais de uma vez
function exibirLista() {
    let lista = document.getElementById("to-do-list");
    lista.innerHTML = "";
    for (let produto in produtos) {
        lista.innerHTML += 
        `<li>${produto} - R$${parseFloat(produtos[produto]).toFixed(2)}
        <button data-id="${produto}" onclick="excluirLista(this)" class = "botao2">Retirar da Lista</button>
        </li>`;
    }
}
//Evento para selecionar produtos que contenham a string digitada no campo select
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("select").addEventListener("input", selectLista);
});

//Seleciona produtos que contenham a string digitada no campo select
function selectLista() {
    let select = document.getElementById("select").value.toLowerCase();
    let lista = document.getElementById("to-do-list");
    lista.innerHTML = "";

    for(let produto in produtos) {
        if (produto.toLowerCase().includes(select)) {
            lista.innerHTML += 
            `<li>${produto} - R$${parseFloat(produtos[produto]).toFixed(2)}
            <button data-id="${produto}" onclick="excluirLista(this)" class = "botao2">Retirar da Lista</button>
            </li>`;
        }
    }
}

//Excluir produto da lista
function excluirLista(botao) {
    let id = botao.getAttribute("data-id");
    totalPrice -= parseFloat(produtos[id]);
    exibirValor();
    delete produtos[id];
    exibirLista();
}
//Exibir valor total da lista, foi criado pois executa a linha de codigo mais de uma vez
function exibirValor() {
    document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);
}	

//Apagar lista
function apagarLista() {
    let lista = document.getElementById("to-do-list");
    lista.innerHTML = "";
    for (let produto in produtos) {
        delete produtos[produto];
    }
    exibirLista();
    totalPrice = 0.00;
    exibirValor();
}
