// ======================================
// Charts Controller
// ======================================

const Charts = {
  renderAll() {
    Charts.renderCategoryChart();

    Charts.renderMonthlyChart();
  },

  renderCategoryChart() {
    const canvas = document.getElementById("categoryChart");

    if (!canvas) return;

    if (AppState.charts.category) AppState.charts.category.destroy();

    const totals = {};

    AppState.expenses.forEach((expense) => {
      if (!totals[expense.category]) totals[expense.category] = 0;

      totals[expense.category] += Number(expense.amount);
    });

    AppState.charts.category = new Chart(canvas, {
      type: "pie",

      data: {
        labels: Object.keys(totals),

        datasets: [
          {
            data: Object.values(totals),

            backgroundColor: CHART_COLORS,
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  },

  renderMonthlyChart() {
    const canvas = document.getElementById("monthlyChart");

    if (!canvas) return;

    if (AppState.charts.monthly) AppState.charts.monthly.destroy();

    const months = {};

    AppState.expenses.forEach((expense) => {
      const month = expense.date.substring(0, 7);

      if (!months[month]) months[month] = 0;

      months[month] += Number(expense.amount);
    });

    AppState.charts.monthly = new Chart(canvas, {
      type: "bar",

      data: {
        labels: Object.keys(months),

        datasets: [
          {
            label: "Expenses",

            data: Object.values(months),
          },
        ],
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
};
