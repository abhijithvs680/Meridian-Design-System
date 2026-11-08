/* Local preview adapter. Applications can listen for meridian:compose. */
(() => {
  function init(root = document) {
    root.querySelectorAll('.mc').forEach(form => {
      if (form.dataset.ready) return;
      form.dataset.ready = 'true';

      const input = form.querySelector('textarea');
      const send = form.querySelector('.mc-send');
      const status = form.querySelector('.mc-status');
      const fileInput = form.querySelector('input[type=file]');
      const tray = form.querySelector('.mc-files');
      const settings = form.querySelector('.mc-options');
      const context = form.querySelector('[name=context]');
      const legacyContext = form.querySelector('[data-context]');
      const sendLabel = send.dataset.sendLabel || 'Run task';
      const sendIcon = send.querySelector('.mc-send-icon');
      const stopIcon = send.querySelector('.mc-stop-icon');
      const sendText = send.querySelector('.mc-send-text');
      const attachments = [];
      let busy = false;
      let timer;

      function update() {
        send.disabled = !busy && !input.value.trim();
        send.setAttribute('aria-label', busy ? 'Stop' : sendLabel);
        if (sendIcon && stopIcon) {
          sendIcon.hidden = busy;
          stopIcon.hidden = !busy;
          if (sendText) sendText.textContent = busy ? 'Stop' : sendLabel;
        } else {
          send.textContent = busy ? 'Stop ■' : sendLabel;
        }
      }

      function drawFiles() {
        tray.replaceChildren();
        attachments.forEach((file, index) => {
          const chip = document.createElement('span');
          chip.className = 'mc-file';
          chip.append(document.createTextNode(file.name));
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.textContent = '×';
          remove.setAttribute('aria-label', 'Remove ' + file.name);
          remove.onclick = () => {
            attachments.splice(index, 1);
            drawFiles();
            tray.querySelectorAll('button')[index]?.focus();
            if (!tray.contains(document.activeElement)) form.querySelector('[data-attach]').focus();
          };
          chip.append(remove);
          tray.append(chip);
        });
      }

      if (fileInput && tray) {
        form.querySelector('[data-attach]').onclick = () => fileInput.click();
        fileInput.onchange = () => {
          if (!fileInput.files.length) return;
          attachments.push(...fileInput.files);
          drawFiles();
          fileInput.value = '';
          status.textContent = 'Files attached locally.';
        };
      }

      // Keep previously exported composer markup compatible.
      form.querySelectorAll('[data-prompt]').forEach(button => {
        button.onclick = () => {
          input.value = button.dataset.prompt;
          input.focus();
          update();
        };
      });
      if (legacyContext) {
        legacyContext.onclick = () => {
          const active = legacyContext.getAttribute('aria-pressed') !== 'true';
          legacyContext.setAttribute('aria-pressed', String(active));
          form.querySelector('.mc-context').hidden = !active;
        };
      }

      settings?.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !settings.open || event.defaultPrevented) return;
        event.preventDefault();
        settings.open = false;
        settings.querySelector('summary').focus();
      });
      form.addEventListener('focusout', event => {
        if (settings?.open && event.relatedTarget && !settings.contains(event.relatedTarget)) settings.open = false;
      });
      input.addEventListener('input', update);
      input.addEventListener('keydown', event => {
        if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return;
        event.preventDefault();
        if (!busy && !send.disabled) form.requestSubmit();
      });
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (busy) {
          clearTimeout(timer);
          busy = false;
          status.textContent = 'Stopped. Draft preserved.';
          update();
          return;
        }
        if (!input.value.trim()) return;
        if (settings) settings.open = false;
        form.dispatchEvent(new CustomEvent('meridian:compose', {
          bubbles: true,
          detail: {
            text: input.value,
            files: [...attachments],
            model: form.querySelector('[name=model]')?.value || 'Balanced',
            mode: form.querySelector('[name=mode]')?.value || 'Ask',
            context: context?.checked ?? (legacyContext?.getAttribute('aria-pressed') === 'true'),
          },
        }));
        busy = true;
        status.textContent = 'Preparing task…';
        update();
        timer = setTimeout(() => {
          busy = false;
          status.textContent = 'Task prepared locally.';
          update();
        }, 1100);
      });
      update();
    });
  }

  window.MeridianComposer = { init };
  init();
})();
