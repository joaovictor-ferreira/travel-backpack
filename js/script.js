//seleciona o formulário
const form = document.querySelector(".form");
//seleciona da ul do html
const ul = document.querySelector(".list");
//recupera os itens do local storage ou cria um array vazio
const items = JSON.parse(localStorage.getItem("items")) || [];

//percorre o array e invoca a funcao createElement para cada item
items.forEach(element => createElement(element))
console.log()
form.addEventListener("submit", (event) => {
    // faz o form não ser enviado, mudando seu comportamento padrão
    event.preventDefault();

    //pega os valores dos inputs usando a propriedade elements do formulario e usa para criar o objeto
    const itemName = event.target.elements["item-name"];

    const amount = event.target.elements["amount"];
    
    //cria o objeto item contendo os valores dos inputs
    const newItem = {
        "name": itemName.value,
        "amount": amount.value
    }
    //cria uma constante para verificar  se dentro do array items tem um elemento de nome que objeto
    const exist = items.find(element => element.name === newItem.name);

    if(exist){
        //atribui o id do item que já existe ao novo item 'exist'
        newItem.id = exist.id;
        //atualiza a quantidade do item
        updateElement(exist,newItem)
        //atualiza o item no array. 
        items[exist.id] = exist;
    }
    else{
        //atribui o id de acordo com o tamanho do array
        newItem.id = (items.length < 1) ? 0  : items.length;
        //invoca a funcao createElement e passa como parametro o objeto
        createElement(newItem);
        //adiciona o objeto ao array 'items'
        items.push(newItem);
    }
   
    //transforma o array inteiro em um 'JSON Object' e o armazena no localStorage
    localStorage.setItem("items", JSON.stringify(items));
    
    //esvazia os inputs
   event.target.reset()

})


function createElement(item){
    //cria o list item que vai receber os valores dos inputs
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    const button = document.createElement("button");
    button.classList.add("btn-remove");
    button.textContent = "X";
    //Usa a arrow function como funcao de callback para a funcao "deleteElement". Isso é feito para quando a funcao createElement for invocada, não invocar também, automaticamente, a funcao deleteElement
    button.addEventListener("click", () => deleteElement(item))
    strong.innerHTML = item.amount;
    //usa a propriedade dataset para criar um 'data-id'
    strong.dataset.id = item.id;
    //coloca o strong já com o a quantidade de itens dentro da li
    li.appendChild(strong);
    //adiciona o valor da propriedade nome do objeto
    li.innerHTML += item.name;
    li.appendChild(button);
    //add a classe item à li
    li.classList.add("item");
    //adiciona a li à ul
    ul.appendChild(li);
    
} 

function updateElement(exist,item){
    //seleciona o item que já existe de forma dinâmica, acessa a sua quantidade e atualiza
    const element = document.querySelector(`[data-id='${exist.id}']`);
    element.innerHTML = parseInt(element.innerHTML) + parseInt(item.amount);
}

function deleteElement(item){ 
    //remove do array o item na posicao items[item.id]
    items.splice(item.id,1);
    //sobrescreve o localStorage com array atual e o item removido
    localStorage.setItem("items",JSON.stringify(items));
    //toda vez que for manipular ou acessar o conteúdo html, use o query
    document.querySelector(`[data-id='${item.id}']`).parentNode.remove();
    
}