// PEGANDO TODOS OS INPUTS REQUERIDOS
const fields = document.querySelectorAll('[required]')

//PEGANDO A MENSAGEM DO ERRO DE ACORDO COM O TIPO DO INPUT E O TIPO DO ERRO
const getMessage = (typeInput, typeError) => {
  const message = {
    email: {
      valueMissing: 'Email é obrigatório!',
      typeMismatch: 'Digite um email válido!'
    },
    password: {
      valueMissing: 'Por favor, preencha este campo'
    }
  }
  return message[typeInput][typeError]
}

//VALIDANDO O INPUT
const validateInputs = e => {
  //TIRANDO O BUBBLE PADRÃO
  e.preventDefault()
  let invalidInput = e.target
  let containsError = false
  let message

  //VERIFICANDO NO OBJETO VALIDITY SE HÁ ERROS
  for (let error in invalidInput.validity) {
    if (invalidInput.validity[error] && !invalidInput.validity.valid) {
      //SE HOUVER PEGAR A MENSAGEM DO ERRO
      message = getMessage(invalidInput.type, error)
      containsError = true
    }
  }

  //VERIFICANDO SE O EMAIL DIGITADO É VÁLIDO, COMO GMAIL, HOTMAIL, ETC
  if (
    !containsError &&
    !invalidInput.validity.typeMismatch &&
    invalidInput.type == 'email'
  ) {
    let email = invalidInput.value.split('@')[1]
    if (
      email != 'gmail.com' &&
      email != 'hotmail.com' &&
      email != 'outlook.com' &&
      email != 'yahoo.com'
    ) {
      message = getMessage(invalidInput.type, 'typeMismatch')
      containsError = true
    }
  }

  //SE HAVER ERRO MOSTRAR PARA O USUÁRIO COMO MENSAGEM NA TELA
  if (containsError) {
    showAlert.add(
      invalidInput.parentElement.parentElement.querySelector('p'),
      message
    )
  } else {
    showAlert.remove(
      invalidInput.parentElement.parentElement.querySelector('p')
    )
  }
}

//OBJETO DE ERROS COLOCANDO UMA BORDA VERMELHA E UMA MENSAGEM
const showAlert = {
  add(target, message) {
    target.parentElement.querySelector('.input-container').style.borderColor =
      '#FF5757'
    target.parentElement.querySelector('.input-container .icon').style.color =
      '#FF5757'
    target.classList.add('active')
    target.innerHTML = message
  },
  remove(target) {
    target.parentElement.querySelector('.input-container').style.borderColor =
      ''
    target.parentElement.querySelector('.input-container .icon').style.color =
      '#fff'
    target.classList.remove('active')
    setTimeout(() => {
      target.innerHTML = ''
    }, 500)
  }
}

//ADICIONANDO UM EVENTO DE CAMPO INVÁLIDO PARA CADA INPUT DO FORMULÁRIO
fields.forEach(field => {
  field.addEventListener('invalid', validateInputs)
  //VERIFICANDO AO DESFOCAR DO INPUT SE ELE É VÁLIDO
  field.addEventListener('blur', validateInputs)
})

// EVENTO PARA DETECTAR O ENVIO DO FORMULÁRIO, SE TIVER TUDO OK
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  // showAlert.remove()
  fields.forEach(field => {
    showAlert.remove(field.parentElement.parentElement.querySelector('p'))
    field.value = ''
  })
})
