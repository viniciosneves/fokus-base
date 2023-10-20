const formularioTarefa = document.querySelector('form.app__form-add-task')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const legendaFormulario = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')

const tarefas = []

btnAdicionarTarefa.addEventListener('click', () => {
    formularioTarefa.classList.toggle('hidden')
})

formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const descricao = textarea.value
    tarefas.push({
        descricao
    })
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})