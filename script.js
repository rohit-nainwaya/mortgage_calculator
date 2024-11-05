// Mortgage Calculator
function calculateMortgage() {
    const amount = parseFloat(document.getElementById('mortgageAmount').value);
    const interest = parseFloat(document.getElementById('mortgageInterest').value) / 100 / 12;
    const years = parseFloat(document.getElementById('mortgageYears').value) * 12;

    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        document.getElementById('mortgageResult').innerText = "Please fill in all fields correctly.";
        return;
    }

    const x = Math.pow(1 + interest, years);
    const monthlyPayment = (amount * x * interest) / (x - 1);

    if (isFinite(monthlyPayment)) {
        document.getElementById('mortgageResult').innerText = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;

        // Generate Graph Data
        const labels = Array.from({ length: years / 12 }, (_, i) => i + 1);
        const data = labels.map(year => {
            const months = year * 12;
            const x = Math.pow(1 + interest, months);
            return (amount * x * interest) / (x - 1) * months;
        });

        // Create Chart
        const ctx = document.getElementById('mortgageChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Repayment Over Time',
                    data: data,
                    borderColor: '#1e90ff', /* Blue line color */
                    backgroundColor: 'rgba(30, 144, 255, 0.1)', /* Light blue fill */
                    borderWidth: 2,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Years', color: '#fff' } },
                    y: { title: { display: true, text: 'Total Repayment ($)', color: '#fff' }, beginAtZero: true }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff' /* White text for legend */
                        }
                    }
                }
            }
        });
    } else {
        document.getElementById('mortgageResult').innerText = "Calculation error. Please check your inputs.";
    }
}