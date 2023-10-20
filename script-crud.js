const formularioTarefa = document.querySelector('form.app__form-add-task')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const legendaFormulario = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')

const tarefas = []

const svg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

function adicionarTarefaNaLista(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcon = document.createElement('svg')
    svgIcon.innerHTML = svg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')
    paragraph.textContent = tarefa.descricao

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', '/imagens/edit.png')

    li.append(svgIcon)
    li.append(paragraph)
    li.append(button)

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
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    adicionarTarefaNaLista(tarefa)
})

