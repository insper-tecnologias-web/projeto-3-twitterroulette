# Twitter Roulette

Feito por Eduardo Cunha, Felipe Schiavinato, Paulo Falcão e Pedro Dannecker.

### [Jogar](https://twitter-roulette.herokuapp.com/)

### Descrição:
Twitter Roulette é um jogo multiplayer web, onde os jogadores entrarão numa sala adotando qualquer perfil aberto do Twitter. A cada rodada será disposto uma informação anônima sobre um dos usuários do jogo, como um tweet ou um retweet. O objetivo da rodada é adivinhar de que jogador é a informação disposta na tela, ou seja, quem fez aquele tweet, quem segue aquela conta, etc. Ao final de 10 rodadas a partida chegará ao fim, com um vencedor. 

### Como jogar:
Na tela inicial, cada jogador deverá fornecer um nome de usuário para se identificar, e qual conta do twitter ele quer usar, a verificação quanto ao fato dessa conta do twitter existir ou ser privada ainda está em desenvolvimento, portanto, deve-se escrever uma que exista para prosseguir com o jogo.
Alguns exemplos de usuarios para jogar rapidamente **(Observação: É necessário como o "@" assim como as letras maiúsculas!)**:
- @elonmusk
- @Anitta
- @neymarjr

Selecionada essas opções (as quais podem ser alteradas depois), o jogador deve criar ou entrar em uma sala de espera, nessas existe um chat que os jogadores podem usar para se comunicar, há também a possibilidade de cada jogador mudar seu avatar, nome ou usuário do twitter.
O jogo permanecerá nessa sala de espera até que o host da sala decida iniciar o jogo clicando em jogar. **(Observação: Ainda não foi implementado uma tela de carregamento, portanto após clicar em jogar espere alguns instantes que o jogo começará!)**

Assim, começam as rodadas, ao todo são 10 rodadas e ao fim de cada uma é mostrado o placar de pontuação, ao final do jogo, todos voltam para a sala de espera.

### Desenvolvimento e Repositórios:
Este foi um projeto da disciplina Tecnologias Web com auxilio dos professores Bárbara Tieko e Gustavo Calixto, o tema do projeto era livre desde que envolvesse alguma tecnologia web. Para o deploy da aplicação foi usado o Heroku junto de três repositórios:
- [Repositório relativo ao frontend (este repositório!)](https://github.com/insper-tecnologias-web/projeto-3-twitterroulette)
- [Repositório do servidor do jogo responsável pela atualização dos jogos](https://github.com/Paulofalcao2002/twitterRouletteSocket)
- [Repositório do backend para recolhimento de informações das contas do twitter](https://github.com/Paulofalcao2002/twitter_roulette_backend)

**Observação: Para recolher as informações no backend utilizou-se a seguinte API: [Twitter by social miner](https://rapidapi.com/socialminer/api/twitter32/)**

### Cronograma do desenvolvimento:
O projeto teve como prazo três semanas, e utilizou-se de sprints como metodologia de trabalho.

Primeira sprint: 
- Preparar uma api em django que devolve um tweet aleatório, uma conta seguida aleatória, um tweet curtido aleatório, um retweet aleatório.
- Iniciar a tela que será disposta toda rodada.
- Teste básico do sistema de multiplayer utilizado o socket.io

Segunda sprint:
- Tela das rodadas pronta e com os dados funcionando
- Integração do frontend com o socket.io
- Sistema de criação de salas implementado

Terceira sprint:
- Integração da criação de salas e multiplayer
- Telas adicionais (inicio e como jogar) 
