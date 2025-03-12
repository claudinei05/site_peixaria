document.addEventListener("DOMContentLoaded", function () {
  // Mapeamento das categorias e produtos
  const categorias = {
    "Peixes Frescos": ["Sushi", "Isca Crua", "Tilapia Congelada", "Costela Crua", "Rabo Embalado Tambaqui"],
    "Pirarucu": ["Pirarucu com Alecrim"],
    "Temperados": ["Costelinha Chimichurri"],
    "Pratos Prontos": ["Parmegiana", "Tambaqui Assado com Farofa", "Sanduiche", "File Tambaqui", "Costela Tambaqui", "Tambaqui Assado com Farofa", "Isca de Tambaqui"],
    "Derivados": ["Empanado", "Sanduiche"],
  };

  let contadorCarrinho = 0; // Contador de itens no carrinho

  // Adicionar data-categoria automaticamente nos produtos
  document.querySelectorAll(".produto").forEach(produto => {
    const nomeProduto = produto.querySelector("h3").innerText;
    for (let categoria in categorias) {
      if (categorias[categoria].includes(nomeProduto)) {
        const categoriaFormatada = categoria.toLowerCase().replace(/\s/g, "-");
        produto.setAttribute("data-categoria", categoriaFormatada);
        console.log(`Produto: ${nomeProduto}, Categoria: ${categoriaFormatada}`); // Log de depuração
      }
    }
  });

  // Adicionar evento de clique ao botão "Comprar"
  document.querySelectorAll(".produto button").forEach(botao => {
    botao.addEventListener("click", function() {
      contadorCarrinho++;
      atualizarCarrinho();
    });
  });

  // Função para atualizar a exibição do carrinho
  function atualizarCarrinho() {
    document.getElementById("num-carrinho").innerText = contadorCarrinho;
  }

  // Adicionar eventos de clique no menu lateral
  document.querySelectorAll(".sidebar nav ul li a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const categoriaSelecionada = this.innerText.toLowerCase().replace(/\s/g, "-");
      console.log(`Categoria selecionada: ${categoriaSelecionada}`); // Log de depuração
      
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
      console.log(`Produto: ${produto.querySelector("h3").innerText}, Categoria do Produto: ${categoriaProduto}`); // Log de depuração
      produto.style.display = categoriaProduto === categoria ? "block" : "none";
    });
  }

  // Função para mostrar todos os produtos
  function mostrarTodosOsProdutos() {
    document.querySelectorAll(".produto").forEach(produto => {
      produto.style.display = "block";
    });
  }
});
