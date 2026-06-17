// Inovar Construções - Landing Page Interactions

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const quoteForm = document.getElementById("quoteForm");
  const serviceSelect = document.getElementById("servico");
  const successMessage = document.getElementById("successMessage");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile menu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        const headerOffset = 92;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });


  // Service information modals
  const serviceModal = document.getElementById("serviceModal");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTasks = document.getElementById("modalTasks");

  const serviceDetails = {
    "remodelacoes": {
      icon: "🏗️",
      title: "Remodelações completas",
      description: "A remodelação completa é indicada para quem pretende renovar o imóvel de forma integrada, com planeamento, coordenação das várias especialidades e atenção aos detalhes finais.",
      tasks: ["Demolições e preparação do espaço", "Coordenação de eletricidade e canalização", "Aplicação de pavimentos e revestimentos", "Pinturas e acabamentos finais", "Entrega do espaço pronto a utilizar"]
    },
    "cozinhas": {
      icon: "🍽️",
      title: "Cozinhas",
      description: "Renovamos cozinhas para criar espaços mais práticos, modernos e resistentes ao uso diário, sempre com foco na funcionalidade e na boa execução técnica.",
      tasks: ["Remoção da cozinha antiga", "Preparação de pontos de água e eletricidade", "Aplicação de revestimentos", "Apoio na instalação de mobiliário e bancada", "Acabamentos e remates finais"]
    },
    "casas-banho": {
      icon: "🚿",
      title: "Casas de banho",
      description: "Transformamos casas de banho antigas em espaços confortáveis, seguros e fáceis de manter, com materiais adequados à humidade e ao uso frequente.",
      tasks: ["Substituição de loiças sanitárias", "Instalação de base de duche ou banheira", "Canalização e esgotos", "Revestimentos cerâmicos", "Iluminação e acabamentos"]
    },
    "pinturas": {
      icon: "🎨",
      title: "Pinturas",
      description: "Realizamos pinturas interiores e exteriores com preparação correta das superfícies, garantindo um resultado uniforme, limpo e duradouro.",
      tasks: ["Proteção do espaço de trabalho", "Reparação de pequenas imperfeições", "Preparação e lixagem de paredes", "Aplicação de primário quando necessário", "Pintura final com acabamento cuidado"]
    },
    "pavimentos": {
      icon: "🧱",
      title: "Pavimentos",
      description: "Instalamos pavimentos e acabamentos com rigor, ajudando a melhorar o conforto, a resistência e a imagem geral do imóvel.",
      tasks: ["Remoção de pavimento existente", "Preparação e nivelamento da base", "Instalação de pavimento flutuante ou cerâmico", "Aplicação de rodapés", "Remates e limpeza final"]
    },
    "eletricidade": {
      icon: "💡",
      title: "Eletricidade",
      description: "Executamos trabalhos elétricos em remodelações e intervenções pontuais, procurando melhorar a segurança, a funcionalidade e a organização da instalação.",
      tasks: ["Criação de novos pontos de luz", "Instalação de tomadas e interruptores", "Organização de circuitos", "Apoio elétrico em cozinhas e casas de banho", "Verificação final dos trabalhos"]
    },
    "canalizacao": {
      icon: "🔧",
      title: "Canalização",
      description: "Tratamos de trabalhos de canalização em obras, remodelações e reparações, com atenção à fiabilidade das ligações e à prevenção de problemas futuros.",
      tasks: ["Substituição de tubagens", "Criação de pontos de água", "Ligações de esgoto", "Reparação de fugas", "Testes e verificação final"]
    },
    "pequenas-obras": {
      icon: "🛠️",
      title: "Pequenas obras",
      description: "As pequenas obras são ideais para resolver intervenções rápidas, melhorias pontuais e reparações que exigem uma execução profissional.",
      tasks: ["Reparações em paredes e tetos", "Pequenos acabamentos", "Montagens e ajustes", "Melhorias em divisões", "Intervenções rápidas em casa"]
    }
  };

  function openServiceModal(serviceKey) {
    const details = serviceDetails[serviceKey];
    if (!details || !serviceModal) return;

    modalIcon.textContent = details.icon;
    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;
    modalTasks.innerHTML = details.tasks.map((task) => `<li>${task}</li>`).join("");

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeServiceModal() {
    if (!serviceModal) return;

    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-service-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      openServiceModal(button.dataset.serviceModal);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeServiceModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServiceModal();
    }
  });

  // Send quote form to Google Sheets via Google Apps Script
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLDI3H7pzGHBYmL94mcYRhiEOPQr_btjzZbw9MLc8ZUZF5E_8SJ4AFwlodd2Vj_Nd7Qg/exec";
  const defaultSubmitText = "Pedir Orçamento Gratuito";
  const errorMessageText = "Não foi possível enviar o pedido. Por favor, tente novamente ou contacte-nos por telefone.";
  const successMessageText = "Obrigado! Recebemos o seu pedido de orçamento e entraremos em contacto em breve.";

  function showFormMessage(message, type = "success") {
    if (!successMessage) return;

    successMessage.textContent = message;
    successMessage.classList.add("show");
    successMessage.classList.toggle("error", type === "error");
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = quoteForm.querySelector('button[type="submit"]');

      const lead = {
        nome: quoteForm.nome.value.trim(),
        telemovel: quoteForm.telemovel.value.trim(),
        email: quoteForm.email.value.trim(),
        localidade: quoteForm.localidade.value.trim(),
        servico: quoteForm.servico.value,
        orcamento: quoteForm.orcamento.value,
        mensagem: quoteForm.mensagem.value.trim(),
        pagina: window.location.href,
        userAgent: navigator.userAgent,
      };

      const backupLead = {
        ...lead,
        id: crypto.randomUUID ? crypto.randomUUID() : `lead-${Date.now()}`,
        data: new Date().toISOString(),
      };

      const storedLeads = JSON.parse(localStorage.getItem("inovarConstrucoesLeads") || "[]");
      storedLeads.push(backupLead);
      localStorage.setItem("inovarConstrucoesLeads", JSON.stringify(storedLeads));

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "A enviar...";
        submitButton.setAttribute("aria-busy", "true");
      }

      if (successMessage) {
        successMessage.classList.remove("show", "error");
      }

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(lead),
        });

        console.log("Lead enviada com sucesso para Google Sheets.");
        console.log("Nova lead Inovar Construções:", lead);

        quoteForm.reset();
        showFormMessage(successMessageText, "success");
      } catch (error) {
        console.error("Erro ao enviar lead para Google Sheets:", error);
        showFormMessage(errorMessageText, "error");
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultSubmitText;
          submitButton.removeAttribute("aria-busy");
        }
      }
    });
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("active"));
  }

  // Track important CTA clicks in console for debugging
  document.querySelectorAll(".btn, .mobile-cta a").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("CTA click:", {
        texto: button.textContent.trim(),
        destino: button.getAttribute("href"),
        data: new Date().toISOString(),
      });
    });
  });
});
