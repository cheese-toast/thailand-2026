function formatMoney(amount, currency) {
  if (amount === null || amount === undefined) return "TBC";
  return `${currency} ${amount.toLocaleString()}`;
}

function renderCost(cost) {
  const total = formatMoney(cost.total, cost.currency);
  const paid = formatMoney(cost.paid, cost.currency);
  const outstanding = formatMoney(cost.outstanding, cost.currency);
  return `
    <div class="cost-row">
      <span>Total: <strong>${total}</strong></span>
      <span>Paid: <strong>${paid}</strong></span>
      <span class="${cost.outstanding ? "outstanding" : ""}">
        Outstanding: <strong>${outstanding}</strong>
      </span>
    </div>
  `;
}

function renderDetails(details) {
  return Object.entries(details)
    .filter(([_, v]) => v !== undefined)
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase());
      const display = value === null ? "TODO" : value;
      const cls = value === null ? "todo" : "";
      return `<div class="detail-row ${cls}"><span>${label}</span><span>${display}</span></div>`;
    })
    .join("");
}

function renderStop(stop, index) {
  return `
    <div class="stop ${stop.type}">
      <div class="stop-marker">${stop.icon}</div>
      <div class="stop-content">
        <button class="stop-header" onclick="toggleDetails(${index})">
          <div>
            <div class="stop-title">${stop.title}</div>
            <div class="stop-date">${stop.dateRange}</div>
            <div class="stop-summary">${stop.summary}</div>
          </div>
          <span class="chevron" id="chevron-${index}">▾</span>
        </button>
        <div class="stop-details" id="details-${index}" hidden>
          ${renderDetails(stop.details)}
          ${renderCost(stop.cost)}
        </div>
      </div>
    </div>
  `;
}

function toggleDetails(index) {
  const details = document.getElementById(`details-${index}`);
  const chevron = document.getElementById(`chevron-${index}`);
  const isHidden = details.hasAttribute("hidden");
  if (isHidden) {
    details.removeAttribute("hidden");
    chevron.textContent = "▴";
  } else {
    details.setAttribute("hidden", "");
    chevron.textContent = "▾";
  }
}

document.getElementById("trip-title").textContent = tripData.title;
document.getElementById("trip-travellers").textContent = tripData.travellers;
document.getElementById("timeline").innerHTML = tripData.stops
  .map((stop, i) => renderStop(stop, i))
  .join("");