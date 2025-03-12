document.addEventListener("DOMContentLoaded", function () {
  // Mapeamento das categorias e produtos
  const categorias = {
    "Peixes Frescos": ["Sushi","Isca Crua","Tilapia Congelada","Costela Crua","Rabo Embalado Tambaqui"],
    "Frutos do Mar": ["Pirarucu com Alecrim"],
    "Temperados": ["Sushi","Costelinha Chimichurri"],
    "Pratos Prontos": ["Parmegiana", "Tambaqui Assado com Farofa", "Sanduiche"],
    "Derivados": ["Empanado", "Sanduiche"],
    "Tambaqui": ["File Tambaqui", "Costela Tambaqui", "Tambaqui Assado com Farofa", "Isca de Tambaqui"]
  };

  let contadorCarrinho = 0; // Contador de itens no carrinho

  // Adicionar data-categoria automaticamente nos produtos
  //pega nome dos produtos que esta no
  document.querySelectorAll(".produto").forEach(produto => {
    const nomeProduto = produto.querySelector("h3").innerText;
    for (let categoria in categorias) {
      if (categorias[categoria].includes(nomeProduto)) {
        produto.setAttribute("data-categoria", categoria.toLowerCase().replace(/\s/g, "-"));
      }
    }

    // Adicionar evento de clique ao botão "Comprar"
    const botaoComprar = produto.querySelector("button");
    botaoComprar.addEventListener("click", function() {
      contadorCarrinho++; // Incrementa o contador
      atualizarCarrinho(); // Atualiza a exibição do carrinho
    });
  });

  // Função para atualizar a exibição do carrinho
  function atualizarCarrinho() {
    document.getElementById("num-carrinho").innerText = contadorCarrinho; // Atualiza o número no carrinho
  }

  // Adicionar eventos de clique no menu lateral
  document.querySelectorAll(".sidebar nav ul li a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Impede o comportamento padrão do link
      const categoriaSelecionada = this.innerText.toLowerCase().replace(/\s/g, "-");

      if (categoriaSelecionada === "todos-os-produtos") {
        mostrarTodosOsProdutos();
      } else {
        filtrarProdutos(categoriaSelecionada);
      }
    });
  });

  // Adicionar eventos de clique nos botões da div "opcoes"
  document.querySelector(".opcoes button:nth-child(1)").addEventListener("click", mostrarTodosOsProdutos);
  document.querySelector(".opcoes button:nth-child(2)").addEventListener("click", () => filtrarProdutos("novidades"));
  document.querySelector(".opcoes button:nth-child(3)").addEventListener("click", () => filtrarProdutos("promocoes"));

  // Função para filtrar produtos por categoria
  function filtrarProdutos(categoria) {
    document.querySelectorAll(".produto").forEach(produto => {
      const categoriaProduto = produto.getAttribute("data-categoria");
      produto.style.display = categoriaProduto === categoria ?  "block" :"none";
    });
  }

  // Função para mostrar todos os produtos
  function mostrarTodosOsProdutos() {
    document.querySelectorAll(".produto").forEach(produto => {
      produto.style.display = "block";
    });
  }
});