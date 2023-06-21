var cartelas = [];

var jogoAtivo = false;

function geraNumeroAleatorio (valorMinimo, valorMaximo) {
    return Math.floor(Math.random() * (valorMaximo - valorMinimo) + valorMinimo);
}

function geraNumerosAleatorios (tamanho, valorMinimo, valorMaximo) {
    var numeros = [];

    
    while (numeros.length < tamanho) {
        
        var numeroAleatorio = geraNumeroAleatorio(valorMinimo, valorMaximo);
        
        if (!numeros.includes(numeroAleatorio)){
            numeros.push(numeroAleatorio);
        }
    }
    
    return numeros;
}

function geraCartela () {

    
    if (jogoAtivo) {
        alert('Você não pode gerar cartelas enquanto o jogo estiver acontecendo.');
        return;
    }

    
    var nomeJogador = prompt('Digite o nome do jogador.');
    if(nomeJogador.length <=2) {
        alert('O nome do jogador não pode ser menor que três caracteres.');
        return;
    }

   
    var numeros = []
    numeros.push(geraNumerosAleatorios(5, 1, 15));
    numeros.push(geraNumerosAleatorios(5, 16, 30));
    numeros.push(geraNumerosAleatorios(5, 31, 45));
    numeros.push(geraNumerosAleatorios(5, 46, 60));
    numeros.push(geraNumerosAleatorios(5, 61, 75));

    var cartelaHTML = geraCartelaHTML(nomeJogador, numeros);

    var cartela = {
        nomeJogador: nomeJogador,
        cartela: cartelaHTML,
        jaJogou: false
    }
    cartelas.push(cartela); 

}

function geraCartelaNovamente(cartela) {
    
    var numeros = []
    numeros.push(geraNumerosAleatorios(5, 1, 15));
    numeros.push(geraNumerosAleatorios(5, 16, 30));
    numeros.push(geraNumerosAleatorios(5, 31, 45));
    numeros.push(geraNumerosAleatorios(5, 46, 60));
    numeros.push(geraNumerosAleatorios(5, 61, 75));

    var divCartela = cartela.cartela.parentElement.parentElement;

    divCartela.remove();

   var cartelaHTML = geraCartelaHTML(cartela.nomeJogador, numeros);

    
    cartela.cartela = cartelaHTML;

}

function geraCartelaHTML (nomeJogador, numeros) {

    var divCartelas = document.querySelector('#cartelas');

   var div = document.createElement('div')
    div.classList.add('cartela');

    var divCabecalho = document.createElement('div');
    divCabecalho.classList.add('cabecalho-cartela');
    divCabecalho.classList.add('flex-container');
    div.appendChild(divCabecalho);

    var h3 = document.createElement('h3');
    h3.innerText = nomeJogador;
    divCabecalho.appendChild(h3);

    var button = document.createElement('button');
    button.classList.add('button-normal');
    button.innerHTML = '<i class="fa-solid fa-trash"></i>';
    button.setAttribute('onclick', 'removeCartela(this.parentElement.parentElement)');
    divCabecalho.appendChild(button);              

    var table = document.createElement('table');
    table.innerHTML = '<thead><tr><td>B</td><td>I</td><td>N</td><td>G</td><td>O</td></tr></thead>';
    div.appendChild(table);

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let linha = 0; linha < 5; linha++) {
        var tr = document.createElement('tr');
        for (let coluna = 0; coluna < 5; coluna++) {
            var td = document.createElement('td');
            if (linha == 2 && coluna == 2) {
                td.innerHTML = '<i class="fa-solid fa-star"></i>';
                td.classList.add('preenchido');
            } else {
                td.innerText = numeros[coluna][linha];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

   
    divCartelas.appendChild(div);

   
    return tbody;

}

function removeCartela(divCartela) {

    
    if (jogoAtivo) {
        alert('Você não pode excluir uma cartela quanto o jogo está acontecendo.');
        return;
    }

   
    var confirmacao = confirm('Deseja deletar essa cartela? Essa ação não pode ser desfeita.');
    
    
    if (confirmacao == false && interno == (false || null)) {
        return;
    }

   
    var divCartelas = document.querySelector('#cartelas');

   
    var posicao = Array.prototype.indexOf.call(divCartelas.children, divCartela);
    
    
    cartelas.pop(cartelas[posicao]);

   
    divCartela.remove();
}

function removeCartelas() {

    
    if (jogoAtivo) {
        alert('Você não pode deletar todas as cartelas enquanto o jogo estiver acontecendo.');
        return;
    }

   
    var confirmacao = confirm('Deseja deletar todas as cartelas? Essa ação não pode ser desfeita.');
    if (confirmacao == false) {
        return;
    }
 
    
    cartelas = [];

   
    var divCartelas = document.querySelector('#cartelas');

  
    var cartelasHTML = document.querySelectorAll('#cartelas > div');

   
    cartelasHTML.forEach(function (cartela) {
            divCartelas.removeChild(cartela);
        }
    );

}

function removeNumerosSorteados() {
 
    var divNumerosSorteados = document.querySelector('#numeros-sorteados');
    var numerosSorteados = document.querySelectorAll('#numeros-sorteados > div');

   numerosSorteados.forEach(function (numeroSorteado) {
        divNumerosSorteados.removeChild(numeroSorteado);
    });
}

function removeGanhador () {
   
    var divGanhador = document.querySelector('#ganhador');

    
    if (divGanhador != null) {
        divGanhador.remove();
    }

}

function preencheCartelas(numeroSorteado) {

    var celulasTabela = document.querySelectorAll('td:not(.preenchido)');

    for (let i = 0; i < celulasTabela.length; i++) {
        const celula = celulasTabela[i];
        if (numeroSorteado == celula.innerText) {
            celula.classList.add('preenchido');
        }
    }

}

function verificaGanhador() {
     
    for (let numeroCartela = 0; numeroCartela < cartelas.length; numeroCartela++) {

        const cartela = cartelas[numeroCartela];
        const tbody = cartela.cartela;
        const linhas = tbody.childNodes;

        var celulasPreenchidasColuna = [0, 0, 0, 0, 0];
        var celulasPreenchidasDiagonal1 = 0;
        var celulasPreenchidasDiagonal2 = 0;

        const posicoesDiagonal1 = [ [0,0], [1,1], [2,2], [3,3], [4,4] ];
        const posicoesDiagonal2 = [ [0,4], [1,3], [2,2], [3,1], [4,0] ];

        
        for (let numeroLinha = 0; numeroLinha < linhas.length && jogoAtivo; numeroLinha++) {

            const linha = linhas[numeroLinha];
            const celulas = linha.childNodes;
            var celulasPreenchidas = 0;

           
            for (let numeroColuna = 0; numeroColuna < celulas.length; numeroColuna++) {

                const celula = celulas[numeroColuna];
                const posicao = [numeroLinha, numeroColuna];
                
             
                if (celula.classList.contains('preenchido')){
                    celulasPreenchidas++;
                    celulasPreenchidasColuna[numeroColuna] += 1;
                    
                    if (JSON.stringify(posicoesDiagonal1).includes(JSON.stringify(posicao))) {
                        celulasPreenchidasDiagonal1++;
                    } 
                    if (JSON.stringify(posicoesDiagonal2).includes(JSON.stringify(posicao))) {
                        celulasPreenchidasDiagonal2++;
                    }
                }

               
                if ((celulasPreenchidas == 5) || 
                    (celulasPreenchidasColuna[numeroColuna] == 5)|| 
                    (celulasPreenchidasDiagonal1 == 5) || 
                    (celulasPreenchidasDiagonal2 == 5)
                ) {

                    jogoAtivo = false;
                    exibeGanhador(cartela);
                    return;
                }

            }
        }
    }}

function exibeNumeroSorteado(numero) {

    var divNumerosSorteados = document.querySelector('#numeros-sorteados');

    var divNumero = document.createElement('div');
    divNumero.classList.add('numero-sorteado');

    var coluna = document.createElement('p');

    
    if (numero <= 15) {
        coluna.innerText = 'B';
        coluna.classList.add('coluna-b');
    } else if (numero > 15 && numero <= 30) {
        coluna.innerText = 'I';
        coluna.classList.add('coluna-i');
    } else if (numero > 30 && numero <= 45) {
        coluna.innerText = 'N';
        coluna.classList.add('coluna-n');
    } else if (numero > 45 && numero <= 60) {
        coluna.innerText = 'G';
        coluna.classList.add('coluna-g');
    } else if (numero > 60 && numero <= 75) {
        coluna.innerText = 'O';
        coluna.classList.add('coluna-o');
    }

    
    divNumero.appendChild(coluna);

    var numeroTexto = document.createElement('p');
    numeroTexto.innerText = numero;
    divNumero.appendChild(numeroTexto);

    divNumerosSorteados.insertBefore(divNumero, divNumerosSorteados.firstChild);

}

function esmaecerHTML(elemento) {  
    var opacidade = 0; 
    var intervalo = setInterval(
        function () {
            if (opacidade >= 1) {
                clearInterval(intervalo);
                return;
            }

            opacidade += 0.1;
            elemento.style.opacity = opacidade;
        },
        50
    );
}

function exibeGanhador(cartela) {

   
    var divGanhador = document.querySelector('#ganhador');

    if (divGanhador == null) {
        
        var divGanhador = document.createElement('div');
        divGanhador.id = 'ganhador';

        
        var iconeTrofeu = '<i class="fa-solid fa-trophy"></i>';
        divGanhador.innerHTML = iconeTrofeu;

        
        var divMensagem = document.createElement('div');
        divMensagem.id = 'ganhador-mensagem';
        divGanhador.appendChild(divMensagem);

      
        var h3 = document.createElement('h3');
        h3.innerText = 'Já temos um ganhador!';
        divMensagem.appendChild(h3);

        
        var paragrafo = document.createElement('p');
        divMensagem.appendChild(paragrafo);

       
        var main = document.querySelector('main');
        esmaecerHTML(main.insertBefore(divGanhador, main.firstChild));

    } else {
        
        var paragrafo = document.querySelector('#ganhador-mensagem > p');
    }

   
    paragrafo.innerText = `Parabéns, ${cartela.nomeJogador}! Você foi o vencedor.`;

}

function iniciaJogo() {

    
    if (jogoAtivo) {
        alert('Você não pode iniciar um jogo enquanto outro estiver acontecendo.');
        return;
    }

    
    if(cartelas.length < 2) {
        alert('São necessários, no mínimo, dois jogadores para iniciar o jogo.');
        return;
    }

   
    removeNumerosSorteados();

    
    removeGanhador();

   
    cartelas.forEach(
        function (cartela) {
            if (cartela.jaJogou) {
                geraCartelaNovamente(cartela);
            } 
            cartela.jaJogou = true;
        }
    )

    var botaoJogar = document.querySelector('#botao-jogar');
    botaoJogar.innerText = 'Jogar Novamente';

    var botaoAdicionar = document.querySelector('#botao-adicionar');
    var botaoLimpar = document.querySelector('#botao-limpar');

    botaoJogar.setAttribute('disabled', 'disabled');
    botaoAdicionar.setAttribute('disabled', 'disabled');
    botaoLimpar.setAttribute('disabled', 'disabled');

    
    jogoAtivo = true;

    var numerosSorteados = [];

    var intervalo = setInterval(
        function () {
       
            if (jogoAtivo == false) {
                clearInterval(intervalo);
                botaoJogar.removeAttribute('disabled');
                botaoAdicionar.removeAttribute('disabled');
                botaoLimpar.removeAttribute('disabled');
            }

            
            if (numerosSorteados.length <= 75) {
                
                var numeroAleatorio = geraNumeroAleatorio(1, 75);
    
                if (!numerosSorteados.includes(numeroAleatorio)){
                    numerosSorteados.push(numeroAleatorio);
                    exibeNumeroSorteado(numeroAleatorio);
                    preencheCartelas(numeroAleatorio);
                    verificaGanhador();
                }
            }
        },
        500
    );
}