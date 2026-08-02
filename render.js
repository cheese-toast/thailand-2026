let thbToGbpRate = null;

function formatMoney(amount, currency) {
  if (amount === null || amount === undefined) return "TBC";
  return `${currency} ${amount.toLocaleString()}`;
}

function toGbp(thbAmount) {
  if (!thbAmount || thbToGbpRate === null) return "";
  const gbp = (thbAmount / thbToGbpRate).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  });
  return `<span class="gbp-equiv">≈ GBP ${gbp}</span>`;
}

function renderCost(cost) {
  const total = formatMoney(cost.total, cost.currency);
  const paid = formatMoney(cost.paid, cost.currency);
  const outstanding = formatMoney(cost.outstanding, cost.currency);
  const equiv = cost.currency === "THB" ? toGbp(cost.total) : "";
  return `
    <div class="cost-row">
      <span>Total: <strong>${total}</strong>${equiv ? " " + equiv : ""}</span>
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

function renderCostsSummary() {
  const typeLabels = {
    flight: "✈️ Flights",
    accommodation: "🏨 Accommodation",
    transfer: "🚐 Transfers",
    tour: "🚣 Tours",
  };

  const byType = {};
  const byCurrency = {};

  tripData.stops.forEach(({ type, cost }) => {
    const cur = cost.currency;
    if (!byType[type]) byType[type] = {};
    if (!byType[type][cur]) byType[type][cur] = { known: 0, tbc: 0 };
    if (!byCurrency[cur]) byCurrency[cur] = { known: 0, tbc: 0 };

    if (cost.total !== null) {
      byType[type][cur].known += cost.total;
      byCurrency[cur].known += cost.total;
    } else {
      byType[type][cur].tbc++;
      byCurrency[cur].tbc++;
    }
  });

  function fmtGroup(cur, { known, tbc }) {
    const parts = [];
    if (known > 0) {
      const equiv = cur === "THB" ? " " + toGbp(known) : "";
      parts.push(`${cur} ${known.toLocaleString()}${equiv}`);
    }
    if (tbc > 0) parts.push(`<em>+${tbc} TBC</em>`);
    return parts.length ? parts.join(" ") : `<em>TBC</em>`;
  }

  const typeRows = Object.keys(typeLabels)
    .filter((t) => byType[t])
    .map((t) => {
      const amounts = Object.entries(byType[t])
        .map(([cur, g]) => fmtGroup(cur, g))
        .join("  ");
      return `<div class="totals-row">
          <span class="type-label">${typeLabels[t]}</span>
          <span class="type-amount">${amounts}</span>
        </div>`;
    })
    .join("");

  const grandTotal = Object.entries(byCurrency)
    .map(([cur, g]) => fmtGroup(cur, g))
    .join("  ·  ");

  return `
    <h2 class="summary-heading">Cost Totals</h2>
    <div class="totals-card">
      ${typeRows}
      <div class="totals-row totals-grand">
        <span class="type-label">Total</span>
        <span class="type-amount">${grandTotal}</span>
      </div>
    </div>`;
}

(async () => {
  try {
    const resp = await fetch("https://open.er-api.com/v6/latest/GBP");
    if (resp.ok) {
      const data = await resp.json();
      thbToGbpRate = data.rates.THB;
      const date = new Date(data.time_last_update_utc).toISOString().slice(0, 10);
      const note = document.createElement("p");
      note.className = "rate-note";
      note.textContent = `1 GBP = ${thbToGbpRate.toFixed(2)} THB (${date})`;
      document.querySelector("header").appendChild(note);
    }
  } catch (_) {
    // rate unavailable — GBP equivalents hidden
  }

  document.getElementById("trip-title").textContent = tripData.title;
  document.getElementById("trip-travellers").textContent = tripData.travellers;
  document.getElementById("timeline").innerHTML = tripData.stops
    .map((stop, i) => renderStop(stop, i))
    .join("");
  document.getElementById("costs-summary").innerHTML = renderCostsSummary();
})();