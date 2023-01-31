// Selecionando o formulário da aplicação
const form = document.querySelector("#form-habits")
//Selecionando o botão plus que fica no header
const button = document.querySelector("header button")
//Incializando a biblioteca que será utilizada na aplicação - estou criando um novo objeto e guardando na variável nlwSetup
const nlwSetup = new NLWSetup(form)

button.addEventListener("click", add)
//Evento de change - significa sempre que houver mudança neste caso no formulário
form.addEventListener("change", save)


function add() {
  //Necessário que seja o dia de hoje
  //const today = "01/01"
  // Para pegar a data de hoje
  // new Date() = método do JS - toLocaleDateString (Pega a data loca - MM/DD/YY) - toLocaleDateString('pt-br') (DD/MM/YY) - slice (apartir do 0 ou seja primeiro elemento da string, retire os cinco ultimos -5) (slice so funciona com string)
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)

  //Método que verifica se o dia adcionado já existe (também da biblioteca)
  const dayExists = nlwSetup.dayExists(today)

  //Caso dayExists - seja verdadeiro
  if (dayExists) {
    alert("Dia já incluso 🛑")
    //Se for verdadeiro - return (Ou seja desconsidere o que vier abaixo)
    return
  }
  //Sendo falso que no caso que dizer que este dia não foi inserido - ele irá adcionar o today (hoje) na aplicação
  //Este método que é uma função dentro de um objeto neste caso da biblioteca criada (Cria um dia para os hábitos)
  nlwSetup.addDay(today)
  alert("Dia adicionado com sucesso ✅")
}
//Importante que o localStorage é uma banco de dados individual de cada navegador ou seja ele só irá armazenar o dados do navegador que utilizar a aplicação - sendo assim em outros dispositimo é como se fosse uma aplicação diferente
function save() {
  //localStorage é um objeto que guarda na memória do browser informações
  //E para guardar essa informações precisamos da funcionalidade do localStorage - chamada setItem que precisa de dois argumento (1º é uma chave que vai ser usada durante qualquer necessidade da aplicação e pode ser qualquer nome - 2º é o dado que será armazenado - neste caso em questão estamos utilizando um método da biblioteca que irá nos retornar um dado (data) em formato de objeto para armazenar a a data e o controle do habito como utilizamos no objeto la em baixo comentado - ele cria uma propriedade com valores que correspondem ao dia marcado const data {}) - pórem temos que transformar este objeto em string para que ele seja armazenado no localStorage (é necessário que seja string) e para isso usamos um método do JSON o .stringify (que ira transformar todo o objeto em string)
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
}

//Aqui nos criamos uma variável que irá armazenar este dado do localStorage - para criar a tabela dos hábitos no navegador através do método da biblioteca setData(que como argumento irá utilizar do dado armazenado no localStorage - nlwSetup.data) pórem para que esta construção ocorra é necessário que seja um objeto - e para isso usamos o localStorage e através do .getItem(que recebe como argumento a chave da aplicação criada na função save) para selecionar os elementos guardados na memória do navegador - e para transforma-los em objeto novamente utilizamos novamente o JSON, mas agora .parse (para transformar o dado do tipo string em objeto)
//Caso não tenha nada ||(ou) guarde um objeto vazio {} - para não acarretar erros no nlwSetup.setData(data)
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
//E para inicializar/carregar todo a aplicação utilizamos .load (método támbem da biblioteca para isso) - Ele carregará os dados internos e renderizará o layout que foi criado pelo setData acima atráves do data
nlwSetup.load()

//NÃO PODE SER INSERIDO MANUALMENTE E SIM POR FUNÇÕES CLICAVEIS
//Dados para construir a tabela de código - De acordo com a biblioteca estamos criando um objeto com propriedades que devem ter o mesmo nome do data-name (propriedade dos habit no HTML) no formato MM-DD (Mês-Dia) - Observação os dias estão sendo criados e de acordo com as datas inseridas nas propriedades do objeto elas ficam marcadas na aplicação
// const data = {
//   run: ["01-01", "01-02", "01-06"],
//   water: ["01-04", "01-08"],
//   food: ["01-05", "01-07"],
//   journal: ["01-03"],
//   takePills: ["01-02"]
// }

//Acessando a função dentro do objeto nlwSetup - para gerar a tabela do habitos no projeto - que utilizara o objeto 'data' acima como parametros para o código
// nlwSetup.setData(data)

//Ele carregará os dados internos e renderizará o layout que foi criado pelo setData acima atráves do data
// nlwSetup.load()
