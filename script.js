// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

// Initialize all page elements
function initializePage() {
    // Set fund title and description
    document.getElementById('fundTitle').textContent = fundraisingData.fundTitle;
    document.getElementById('fundDescription').textContent = fundraisingData.fundDescription;
    document.getElementById('heroImage').src = fundraisingData.heroImage;
    
    // Calculate and display progress
    updateProgress();
    
    // Populate budget table
    populateBudgetTable();
    
    // Populate collected funds table
    populateCollectedTable();
    
    // Render donation cards
    renderDonationCards();
}

// Update progress bar and statistics
function updateProgress() {
    const totalBudget = calculateTotalBudget();
    const totalCollected = calculateTotalCollected();
    const progressPercentage = calculateProgress();
    
    // Format currency
    document.getElementById('goalAmount').textContent = formatCurrency(totalBudget);
    document.getElementById('collectedAmount').textContent = formatCurrency(totalCollected);
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressPercentage');
    
    // Cap the visual width at 100% but show actual percentage
    const visualWidth = Math.min(progressPercentage, 100);
    progressFill.style.width = visualWidth + '%';
    progressText.textContent = Math.round(progressPercentage) + '%';
    
    // Change color if overfunded
    if (progressPercentage >= 100) {
        progressFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
    }
}

// Populate budget table
function populateBudgetTable() {
    const tbody = document.getElementById('budgetTableBody');
    tbody.innerHTML = '';
    
    let subtotal = 0;
    
    fundraisingData.budgetItems.forEach(item => {
        const total = item.classesPerMonth * item.fundPerClass * item.months;
        subtotal += total;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.subject}</td>
            <td class="text-center">${item.classesPerMonth}</td>
            <td class="text-end">${formatCurrency(item.fundPerClass)}</td>
            <td class="text-center">${item.months}</td>
            <td class="text-end">${formatCurrency(total)}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update totals
    document.getElementById('budgetSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('additionalFundAmount').textContent = formatCurrency(fundraisingData.additionalFund);
    document.getElementById('budgetGrandTotal').textContent = formatCurrency(subtotal + fundraisingData.additionalFund);
}

// Populate collected funds table
function populateCollectedTable() {
    const tbody = document.getElementById('collectedTableBody');
    tbody.innerHTML = '';
    
    let grandTotal = 0;
    
    fundraisingData.collectedFunds.forEach(fund => {
        const total = fund.amount * fund.months;
        grandTotal += total;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fund.donor}</td>
            <td class="text-end">${formatCurrency(fund.amount)}</td>
            <td class="text-center">
                <span class="badge ${fund.isMonthly ? 'bg-primary' : 'bg-success'}">
                    ${fund.isMonthly ? 'Monthly' : 'One Time'}
                </span>
            </td>
            <td class="text-center">${fund.months}</td>
            <td class="text-end">${formatCurrency(total)}</td>
        `;
        tbody.appendChild(row);
    });
    
    // Update grand total
    document.getElementById('collectedGrandTotal').textContent = formatCurrency(grandTotal);
}

// Render donation cards grouped by amount
function renderDonationCards() {
    // Group cards by amount
    const cardsByAmount = {
        500: [],
        1000: [],
        2000: [],
        5000: []
    };
    
    fundraisingData.donationCards.forEach((card, index) => {
        cardsByAmount[card.amount].push({ ...card, index });
    });
    
    // Render each group
    Object.keys(cardsByAmount).forEach(amount => {
        const container = document.getElementById(`donationCards${amount}`);
        if (!container) return;
        
        container.innerHTML = '';
        
        cardsByAmount[amount].forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'donation-card' + (card.isCollected ? ' collected' : '');
            cardElement.dataset.index = card.index;
            
            cardElement.innerHTML = `
                <div class="donation-card-amount">${formatCurrency(card.amount)}</div>
                <div class="donation-card-label">${card.isCollected ? 'Collected' : 'Available'}</div>
                ${card.isCollected ? '<div class="donation-card-cross">✕</div>' : ''}
            `;
            
            // Add click event only for available cards
            if (!card.isCollected) {
                cardElement.addEventListener('click', function() {
                    openDonationModal(card.amount);
                });
            }
            
            container.appendChild(cardElement);
        });
    });
}

// Format currency
function formatCurrency(amount) {
    return 'Rs. ' + amount.toLocaleString('en-US');
}

// Setup event listeners
function setupEventListeners() {
    // Custom amount button
    document.getElementById('customAmountBtn').addEventListener('click', function() {
        openDonationModal(null);
    });
    
    // Donation amount select change
    document.getElementById('donationAmount').addEventListener('change', function() {
        const customDiv = document.getElementById('customAmountDiv');
        if (this.value === 'custom') {
            customDiv.style.display = 'block';
            document.getElementById('customAmountInput').required = true;
        } else {
            customDiv.style.display = 'none';
            document.getElementById('customAmountInput').required = false;
        }
    });
    
    // Donation type change
    document.querySelectorAll('input[name="donationType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const monthsDiv = document.getElementById('monthsDiv');
            if (this.value === 'monthly') {
                monthsDiv.style.display = 'block';
                document.getElementById('monthsCount').required = true;
            } else {
                monthsDiv.style.display = 'none';
                document.getElementById('monthsCount').required = false;
            }
        });
    });
    
    // Submit donation
    document.getElementById('submitDonation').addEventListener('click', handleDonationSubmit);
    
    // Mobile number validation
    document.getElementById('donorMobile').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// Open donation modal
function openDonationModal(presetAmount) {
    const modal = new bootstrap.Modal(document.getElementById('donationModal'));
    const form = document.getElementById('donationForm');
    const amountSelect = document.getElementById('donationAmount');
    const customDiv = document.getElementById('customAmountDiv');
    const monthsDiv = document.getElementById('monthsDiv');
    
    // Reset form
    form.reset();
    customDiv.style.display = 'none';
    monthsDiv.style.display = 'none';
    
    // Set preset amount if provided
    if (presetAmount) {
        amountSelect.value = presetAmount.toString();
    } else {
        amountSelect.value = 'custom';
        customDiv.style.display = 'block';
        document.getElementById('customAmountInput').required = true;
    }
    
    modal.show();
}

// Handle donation submission
function handleDonationSubmit() {
    const form = document.getElementById('donationForm');
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form values
    const donorName = document.getElementById('donorName').value.trim();
    const donorMobile = document.getElementById('donorMobile').value.trim();
    const amountSelect = document.getElementById('donationAmount').value;
    const customAmountInput = document.getElementById('customAmountInput').value;
    const donationType = document.querySelector('input[name="donationType"]:checked').value;
    const monthsCount = document.getElementById('monthsCount').value;
    
    // Validate mobile number
    if (!/^\d+$/.test(donorMobile)) {
        alert('Please enter a valid mobile number (numbers only)');
        return;
    }
    
    // Get final amount
    let finalAmount;
    let isCardDonation = false;
    if (amountSelect === 'custom') {
        finalAmount = parseInt(customAmountInput);
        if (!finalAmount || finalAmount < 100) {
            alert('Please enter a valid amount (minimum Rs. 100)');
            return;
        }
    } else {
        finalAmount = parseInt(amountSelect);
        // Check if this is a standard card amount
        isCardDonation = [500, 1000, 2000, 5000].includes(finalAmount);
    }
    
    // Create donation object
    const donation = {
        donor: donorName,
        amount: finalAmount,
        isMonthly: donationType === 'monthly',
        months: donationType === 'monthly' ? parseInt(monthsCount) : 1
    };
    
    // Add to collected funds
    fundraisingData.collectedFunds.push(donation);
    
    // If this is a card donation, mark the first available card as collected
    if (isCardDonation) {
        markCardAsCollected(finalAmount);
    }
    
    // Update the UI
    populateCollectedTable();
    updateProgress();
    renderDonationCards();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
    modal.hide();
    
    // Show success message
    showSuccessMessage(donorName, finalAmount, donation.isMonthly, donation.months);
}

// Mark the first available card of specified amount as collected
function markCardAsCollected(amount) {
    // Find the first card with matching amount that is not collected
    const cardIndex = fundraisingData.donationCards.findIndex(
        card => card.amount === amount && !card.isCollected
    );
    
    if (cardIndex !== -1) {
        fundraisingData.donationCards[cardIndex].isCollected = true;
    }
}

// Show success message
function showSuccessMessage(name, amount, isMonthly, months) {
    const totalAmount = amount * months;
    const message = `Thank you, ${name}! Your ${isMonthly ? 'monthly' : 'one-time'} donation of ${formatCurrency(amount)}${isMonthly ? ' for ' + months + ' months' : ''} (Total: ${formatCurrency(totalAmount)}) has been recorded. You will be contacted soon to arrange the payment.`;
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '90%';
    alertDiv.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        <strong>Success!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 8000);
}

// Utility function to handle modal cleanup
document.getElementById('donationModal').addEventListener('hidden.bs.modal', function() {
    const form = document.getElementById('donationForm');
    form.reset();
    document.getElementById('customAmountDiv').style.display = 'none';
    document.getElementById('monthsDiv').style.display = 'none';
});
