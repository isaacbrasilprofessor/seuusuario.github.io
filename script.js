/* =========================================================
   Isaac Brasil — script do site
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURAÇÃO — edite aqui
   Insira seu e-mail profissional entre as aspas, por exemplo:
   const CONTACT_EMAIL = "contato@seudominio.com.br";
   Enquanto estiver vazio, o site oferece apenas a opção
   "Copiar mensagem" e o link para o LinkedIn.
   --------------------------------------------------------- */
const CONTACT_EMAIL = "";

(function () {
  "use strict";

  const email = CONTACT_EMAIL.trim();
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Menu móvel ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu-principal");

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".visually-hidden").textContent = "Abrir menu";
    nav.classList.remove("is-open");
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.querySelector(".visually-hidden").textContent = open ? "Abrir menu" : "Fechar menu";
    nav.classList.toggle("is-open", !open);
  });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
  });

  /* ---------- Cabeçalho e item ativo do menu ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          const active = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("is-active", active);
          if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));

    /* Animação discreta de entrada */
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Formulário de contato ---------- */
  const form = document.getElementById("form-contato");
  const fields = {
    nome: form.querySelector("#f-nome"),
    instituicao: form.querySelector("#f-instituicao"),
    email: form.querySelector("#f-email"),
    atividade: form.querySelector("#f-atividade"),
    modalidade: form.querySelector("#f-modalidade"),
    tema: form.querySelector("#f-tema"),
    data: form.querySelector("#f-data"),
    mensagem: form.querySelector("#f-mensagem"),
  };
  const btnEmail = form.querySelector('[data-action="email"]');
  const btnCopy = form.querySelector('[data-action="copy"]');
  const status = form.querySelector(".form-status");
  const preview = document.getElementById("preview-text");

  /* Exibe as opções de e-mail somente se um endereço válido foi configurado */
  if (hasEmail) {
    btnEmail.hidden = false;
    document.querySelectorAll("[data-if-email]").forEach((el) => { el.hidden = false; });
    document.querySelectorAll("[data-email-link]").forEach((a) => {
      a.href = "mailto:" + email;
      a.textContent = email;
    });
  } else {
    document.querySelectorAll("[data-if-email]").forEach((el) => { el.remove(); });
  }

  function formatDate(value) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }

  function buildSubject() {
    const inst = fields.instituicao.value.trim();
    return `Convite para ${fields.atividade.value.toLowerCase()}${inst ? " — " + inst : ""}`;
  }

  function buildMessage() {
    const lines = [
      "Olá, Isaac.",
      "",
      `Meu nome é ${fields.nome.value.trim() || "[seu nome]"}, da instituição ${fields.instituicao.value.trim() || "[instituição]"}.`,
      "",
      `Tipo de atividade: ${fields.atividade.value}`,
      `Tema de interesse: ${fields.tema.value}`,
      `Modalidade: ${fields.modalidade.value}`,
    ];
    if (fields.data.value) lines.push(`Data prevista: ${formatDate(fields.data.value)}`);
    lines.push("", fields.mensagem.value.trim() || "[sua mensagem]", "");
    lines.push(`E-mail para resposta: ${fields.email.value.trim() || "[seu e-mail]"}`);
    return lines.join("\n");
  }

  function updatePreview() { preview.textContent = buildMessage(); }
  form.addEventListener("input", (e) => {
    updatePreview();
    const el = e.target;
    if (el.getAttribute("aria-invalid") === "true" && el.value.trim() && el.checkValidity()) {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
      const err = document.getElementById(el.id + "-erro");
      if (err) err.remove();
    }
  });
  form.addEventListener("change", updatePreview);
  updatePreview();

  function setStatus(text, type) {
    status.textContent = text;
    status.className = "form-status" + (type ? " is-" + type : "");
  }

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((el) => el.remove());
    form.querySelectorAll("[aria-invalid]").forEach((el) => {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });
  }

  function validate() {
    clearErrors();
    const checks = [
      [fields.nome, "Informe seu nome."],
      [fields.instituicao, "Informe a instituição."],
      [fields.email, "Informe um e-mail válido para resposta."],
      [fields.mensagem, "Escreva uma mensagem sobre o evento."],
    ];
    let first = null;
    checks.forEach(([input, msg]) => {
      const empty = !input.value.trim();
      const badEmail = input.type === "email" && !empty && !input.checkValidity();
      if (empty || badEmail) {
        const err = document.createElement("span");
        err.className = "field-error";
        err.id = input.id + "-erro";
        err.textContent = msg;
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", err.id);
        input.insertAdjacentElement("afterend", err);
        if (!first) first = input;
      }
    });
    if (first) {
      first.focus();
      setStatus("Revise os campos destacados antes de continuar.", "error");
      return false;
    }
    return true;
  }

  /* Abrir no aplicativo de e-mail (mailto) */
  btnEmail.addEventListener("click", () => {
    if (!hasEmail || !validate()) return;
    const url = "mailto:" + email +
      "?subject=" + encodeURIComponent(buildSubject()) +
      "&body=" + encodeURIComponent(buildMessage());
    window.location.href = url;
    setStatus("Estamos abrindo seu aplicativo de e-mail com a mensagem preenchida. Se nada acontecer, use “Copiar mensagem”.", "");
  });

  /* Copiar mensagem para a área de transferência */
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }

  btnCopy.addEventListener("click", async () => {
    if (!validate()) return;
    const text = `Assunto: ${buildSubject()}\n\n${buildMessage()}`;
    try {
      const ok = await copyText(text);
      if (!ok) throw new Error("copy failed");
      setStatus(
        hasEmail
          ? `Mensagem copiada. Cole-a em um e-mail para ${email} ou envie pelo LinkedIn.`
          : "Mensagem copiada. Cole-a em uma mensagem pelo LinkedIn para enviar.",
        "ok"
      );
    } catch (err) {
      form.querySelector(".preview").open = true;
      setStatus("Não foi possível copiar automaticamente. Selecione o texto abaixo e copie manualmente.", "error");
    }
  });

  /* ---------- Botões "Consultar disponibilidade" ---------- */
  document.querySelectorAll("[data-tema]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tipo = btn.dataset.atividade === "oficina" ? "Oficina" : "Palestra";
      fields.atividade.value = tipo;
      const opt = [...fields.tema.options].find((o) => o.value === btn.dataset.tema);
      if (opt) fields.tema.value = opt.value;
      updatePreview();
      setStatus(`${tipo} selecionada: “${btn.dataset.tema}”. Complete os demais campos.`, "");
      const box = form;
      box.classList.remove("contact-flash");
      void box.offsetWidth;
      box.classList.add("contact-flash");
      setTimeout(() => fields.nome.focus({ preventScroll: true }), 500);
    });
  });
})();
