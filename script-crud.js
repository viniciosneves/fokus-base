const formularioTarefa = document.querySelector('form.app__form-add-task')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const legendaFormulario = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const indicadorTarefaSelecionada = document.querySelector('.app__section-active-task-description')

const btnDeletarConcluidas = document.querySelector('#btn-remover-concluidas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

let tarefaSelecionada = null
let itemTarefaSelecionada = null

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

    if (tarefa.concluida) {
        botao.setAttribute('disabled', true)
        li.classList.add('app__section-task-list-item-complete')
    } else {
        li.onclick = () => {
            indicadorTarefaSelecionada.textContent = tarefa.descricao
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(function (elemento) {
                    elemento.classList.remove('app__section-task-list-item-active');
                });
    
            if (tarefaSelecionada === tarefa) {
                tarefaSelecionada = null
                itemTarefaSelecionada = null
                indicadorTarefaSelecionada.textContent = ''
                return
            }
            tarefaSelecionada = tarefa
            itemTarefaSelecionada = li
            li.classList.add('app__section-task-list-item-active')
        }
    }


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


document.addEventListener("TarefaFinalizada", function (e) {
    if (tarefaSelecionada) {
        tarefaSelecionada.concluida = true
        itemTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        itemTarefaSelecionada.querySelector('button').setAttribute('disabled', true)
    }
});


document.addEventListener("TarefaFinalizada", function (e) {
    if (tarefaSelecionada) {
        tarefaSelecionada.concluida = true
        itemTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        itemTarefaSelecionada.querySelector('button').setAttribute('disabled', true)
        itemTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        atualizarLocalStorage()
    }
});

const removerTarefas = () => {
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach((element) => {
        element.remove();
    });

    tarefas = tarefas.filter(t => !t.concluida)
    atualizarLocalStorage()
}

btnDeletarConcluidas.addEventListener('click', () => removerTarefas())
