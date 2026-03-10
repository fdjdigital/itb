(function () {
  'use strict';

  var WEBHOOK_URL = 'https://n8n.srv1139867.hstgr.cloud/webhook/itb-trabalhe-conosco';

  // Máscara de telefone
  var telInput = document.getElementById('telefone');
  telInput.addEventListener('input', function (e) {
    var v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
    else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
    e.target.value = v;
  });

  // Mostrar/ocultar campo "Período em curso"
  document.getElementById('formacao').addEventListener('change', function (e) {
    var group = document.getElementById('periodoCursoGroup');
    var input = document.getElementById('periodo_curso');
    if (e.target.value === 'Pedagogia em curso') {
      group.style.display = 'block';
      input.required = true;
    } else {
      group.style.display = 'none';
      input.required = false;
      input.value = '';
    }
  });

  // Envio do formulário
  document.getElementById('trabalheConoscoForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    var nome = document.getElementById('nome').value.trim();
    var telefoneRaw = telInput.value.replace(/\D/g, '');
    var formacao = document.getElementById('formacao').value;
    var modalidade = document.getElementById('modalidade').value;
    var faculdade = document.getElementById('faculdade').value.trim();
    var periodoCurso = document.getElementById('periodo_curso').value.trim();
    var bncc = (document.querySelector('input[name="bncc"]:checked') || {}).value || '';
    var conhecimento_0_3 = (document.querySelector('input[name="conhecimento_0_3"]:checked') || {}).value || '';
    var conhecimento_4_7 = (document.querySelector('input[name="conhecimento_4_7"]:checked') || {}).value || '';
    var justificativa = document.getElementById('justificativa').value.trim();
    var valores = document.getElementById('valores').value.trim();
    var valoresConflito = document.getElementById('valores_conflito').value.trim();
    var valeTransporte = (document.querySelector('input[name="vale_transporte"]:checked') || {}).value || '';
    var turno = (document.querySelector('input[name="turno"]:checked') || {}).value || '';
    var lgpd = document.getElementById('lgpd').checked;

    // Limpar erros anteriores
    clearErrors();

    // Validação
    if (nome.length < 3) { showError('nome', 'Informe seu nome completo.'); return; }
    if (telefoneRaw.length !== 11) { showError('telefone', 'Informe um WhatsApp válido com DDD.'); return; }
    if (!formacao) { showError('formacao', 'Selecione sua formação.'); return; }
    if (!modalidade) { showError('modalidade', 'Selecione a modalidade.'); return; }
    if (faculdade.length < 2) { showError('faculdade', 'Informe o nome da faculdade.'); return; }
    if (formacao === 'Pedagogia em curso' && !periodoCurso) { showError('periodo_curso', 'Informe o período em curso.'); return; }
    if (!bncc) { showRadioError('bncc', 'Selecione uma opção.'); return; }
    if (!conhecimento_0_3) { showRadioError('conhecimento_0_3', 'Selecione uma opção.'); return; }
    if (!conhecimento_4_7) { showRadioError('conhecimento_4_7', 'Selecione uma opção.'); return; }
    if (justificativa.length < 20) { showError('justificativa', 'Escreva pelo menos 20 caracteres.'); return; }
    if (valores.length < 20) { showError('valores', 'Escreva pelo menos 20 caracteres.'); return; }
    if (valoresConflito.length < 20) { showError('valores_conflito', 'Escreva pelo menos 20 caracteres.'); return; }
    if (!valeTransporte) { showRadioError('vale_transporte', 'Selecione uma opção.'); return; }
    if (!turno) { showRadioError('turno', 'Selecione uma opção.'); return; }
    if (!lgpd) { showError('lgpd', 'Você precisa concordar com a Política de Privacidade.'); return; }

    var btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    var dados = {
      nome: nome,
      telefone: '55' + telefoneRaw,
      formacao: formacao,
      modalidade: modalidade,
      faculdade: faculdade,
      periodo_curso: periodoCurso,
      bncc: bncc,
      conhecimento_0_3: conhecimento_0_3,
      conhecimento_4_7: conhecimento_4_7,
      justificativa: justificativa,
      valores: valores,
      valores_conflito: valoresConflito,
      vale_transporte: valeTransporte,
      turno: turno
    };

    try {
      var response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        mostrarConfirmacao(nome);
      } else {
        throw new Error('Erro no envio');
      }
    } catch (err) {
      alert('Houve um erro ao enviar sua candidatura. Por favor, tente novamente ou entre em contato pelo telefone (31) 3286-1915.');
      btn.disabled = false;
      btn.textContent = 'Enviar Candidatura';
    }
  });

  function clearErrors() {
    var msgs = document.querySelectorAll('.form-error-msg');
    for (var i = 0; i < msgs.length; i++) msgs[i].remove();
  }

  function showError(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    var span = document.createElement('span');
    span.className = 'form-error-msg';
    span.textContent = msg;
    el.parentElement.appendChild(span);
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();
  }

  function showRadioError(name, msg) {
    var first = document.querySelector('input[name="' + name + '"]');
    if (!first) return;
    var group = first.closest('.form-group');
    var span = document.createElement('span');
    span.className = 'form-error-msg';
    span.textContent = msg;
    group.appendChild(span);
    group.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function mostrarConfirmacao(nome) {
    var formSection = document.querySelector('.section--secondary');
    formSection.innerHTML =
      '<div class="container">' +
        '<div class="confirmation">' +
          '<div class="confirmation__icon">' +
            '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>' +
              '<polyline points="22 4 12 14.01 9 11.01"/>' +
            '</svg>' +
          '</div>' +
          '<h2 class="confirmation__title">Candidatura enviada com sucesso!</h2>' +
          '<p class="confirmation__text">' +
            '<strong>' + nome + '</strong>, recebemos suas informações.<br>' +
            'Obrigado pelo interesse em fazer parte da equipe ITB!' +
          '</p>' +
          '<p class="confirmation__text">' +
            'Verifique seu WhatsApp — enviamos uma mensagem com instruções ' +
            'para enviar seu currículo e vídeo de apresentação.' +
          '</p>' +
          '<a href="../index.html" class="btn btn--primary">Voltar para o site</a>' +
        '</div>' +
      '</div>';

    window.scrollTo({ top: formSection.offsetTop - 80, behavior: 'smooth' });
  }
})();
