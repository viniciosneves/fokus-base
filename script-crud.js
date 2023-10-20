const formularioTarefa = document.querySelector('form.app__form-add-task')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const legendaFormulario = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

const svg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`



const limparFormulario = () => {
    textarea.value = ''
    formularioTarefa.classList.add('hidden')
}

const atualizarLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function adicionarTarefaNaLista(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const icone = document.createElement('svg')
    icone.innerHTML = svg

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    const imgEditar = document.createElement('img')
    imgEditar.setAttribute('src', '/imagens/edit.png')

    botao.onclick = () => {
        const descricao = prompt("Qual é o novo nome da tarefa?")
        // console.log('valor atual da descricao: ', descricao)
        // debugger
        if (descricao) {
            paragrafo.textContent = descricao
            tarefa.descricao = descricao
            atualizarLocalStorage()
        }
    }

    botao.append(imgEditar)

    li.append(icone)
    li.append(paragrafo)
    li.append(botao)

    ulTarefas.append(li)

}

btnAdicionarTarefa.addEventListener('click', () => {
    formularioTarefa.classList.toggle('hidden')
})

formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    atualizarLocalStorage()
    adicionarTarefaNaLista(tarefa)
    limparFormulario()
})

tarefas.forEach(tarefa => adicionarTarefaNaLista(tarefa))

btnCancelar.addEventListener('click', limparFormulario)
