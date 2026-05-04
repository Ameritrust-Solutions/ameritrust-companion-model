const helperReplies = {
  proof: "For this income step, proof might include a recent pay stub, an employer letter, a benefits statement, or another approved document that shows the amount and source.",
  why: "This information helps match your household to the right program rules. I can explain the question, but I cannot decide eligibility or change your answers for you.",
  next: "Next, finish income information. After that, you will review your household and contact details, then check for any missing documents before submission.",
  state: "For personal, medical, eligibility, or case-specific help, contact your state benefits office or use the official state application portal. This chat is only for general guidance.",
  sensitive: "Please do not enter personal, medical, or case-specific details here. For help with your own case, contact your state benefits office or use the official state application portal.",
  default: "I can answer general questions about this step. For personal, medical, eligibility, or case-specific help, contact your state benefits office."
};

const conversation = document.querySelector("#conversation");
const promptForm = document.querySelector("#promptForm");
const promptInput = document.querySelector("#promptInput");
const companion = document.querySelector(".companion");
const companionToggle = document.querySelector("#companionToggle");
const closeCompanion = document.querySelector("#closeCompanion");

function addMessage(role, text) {
  const article = document.createElement("article");
  article.className = `message ${role}-message`;

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "You" : "AT";

  const body = document.createElement("div");
  body.className = "message-body";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  body.append(paragraph);
  article.append(avatar, body);
  conversation.append(article);
  conversation.scrollTop = conversation.scrollHeight;
}

function replyForPrompt(prompt) {
  const value = prompt.toLowerCase();

  if (containsSensitiveDetails(value)) {
    return helperReplies.sensitive;
  }

  if (value.includes("state") || value.includes("case") || value.includes("eligib") || value.includes("personal") || value.includes("medical") || value.includes("health")) {
    return helperReplies.state;
  }

  if (value.includes("proof") || value.includes("document") || value.includes("upload")) {
    return helperReplies.proof;
  }

  if (value.includes("next") || value.includes("happen")) {
    return helperReplies.next;
  }

  if (value.includes("why") || value.includes("need")) {
    return helperReplies.why;
  }

  return helperReplies.default;
}

function containsSensitiveDetails(value) {
  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/,
    /\b\d{9}\b/,
    /\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/,
    /@/,
    /\b(diagnosed|diagnosis|pregnant|pregnancy|medication|prescription|doctor|hospital|disability|ssn|social security|case number|member id|medicaid id)\b/
  ];

  return sensitivePatterns.some((pattern) => pattern.test(value));
}

function handlePrompt(prompt) {
  const cleanedPrompt = prompt.trim();

  if (!cleanedPrompt) {
    return;
  }

  if (containsSensitiveDetails(cleanedPrompt.toLowerCase())) {
    addMessage("user", "Sensitive details removed");
    addMessage("assistant", helperReplies.sensitive);
    promptInput.value = "";
    return;
  }

  addMessage("user", cleanedPrompt);
  addMessage("assistant", replyForPrompt(cleanedPrompt));
  promptInput.value = "";
}

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    handlePrompt(button.dataset.prompt);
  });
});

promptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handlePrompt(promptInput.value);
});

closeCompanion.addEventListener("click", () => {
  companion.classList.add("collapsed");
  companion.classList.remove("expanded");
  companionToggle.setAttribute("aria-expanded", "false");
});

companionToggle.addEventListener("click", () => {
  companion.classList.remove("collapsed");
  companion.classList.add("expanded");
  companionToggle.setAttribute("aria-expanded", "true");
  promptInput.focus();
});
