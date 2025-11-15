// Sample data for fundraising website
const fundraisingData = {
    // Fund Title and Description
    fundTitle: "O/L Class Support 2025",
    fundDescription: "Help us provide quality Ordinary Level education through classes organized by the School Development Association in collaboration with Generous Hand Community Support Group. Your contribution will directly support students' academic success.",
    
    // Hero Image URL
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=300&fit=crop",
    
    // Number of months for the program
    programMonths: 6,
    
    // Budget breakdown by subject
    budgetItems: [
        {
            subject: "Mathematics",
            classesPerMonth: 8,
            fundPerClass: 2500,
            months: 6
        },
        {
            subject: "Science",
            classesPerMonth: 8,
            fundPerClass: 3000,
            months: 6
        },
        {
            subject: "English",
            classesPerMonth: 6,
            fundPerClass: 2000,
            months: 6
        },
        {
            subject: "Sinhala",
            classesPerMonth: 4,
            fundPerClass: 1500,
            months: 6
        },
        {
            subject: "History",
            classesPerMonth: 4,
            fundPerClass: 1500,
            months: 6
        }
    ],
    
    // Additional fund for materials, transport, etc.
    additionalFund: 25000,
    
    // Collected funds from donors
    collectedFunds: [
        {
            donor: "Amara Silva",
            amount: 5000,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Nimal Perera",
            amount: 10000,
            isMonthly: false,
            months: 1
        },
        {
            donor: "Chamari Fernando",
            amount: 2000,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Kasun Rajapaksa",
            amount: 5000,
            isMonthly: false,
            months: 1
        },
        {
            donor: "Dilini Wickramasinghe",
            amount: 1000,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Roshan De Silva",
            amount: 2000,
            isMonthly: false,
            months: 1
        },
        {
            donor: "Priya Jayawardena",
            amount: 500,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Tharindu Bandara",
            amount: 3000,
            isMonthly: false,
            months: 1
        },
        {
            donor: "Malini Gunawardena",
            amount: 1000,
            isMonthly: true,
            months: 4
        },
        {
            donor: "Kamal Dissanayake",
            amount: 2000,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Sanduni Jayasinghe",
            amount: 5000,
            isMonthly: true,
            months: 3
        },
        {
            donor: "Nuwan Ratnayake",
            amount: 1000,
            isMonthly: false,
            months: 1
        },
        {
            donor: "Ishara Mendis",
            amount: 500,
            isMonthly: true,
            months: 6
        },
        {
            donor: "Lakmal Abeysekara",
            amount: 2000,
            isMonthly: false,
            months: 1
        }
    ],
    
    // Donation cards - pre-defined denominations
    // Each card represents one donation slot
    donationCards: [
        // Rs. 500 cards (20 cards)
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: true },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        { amount: 500, isCollected: false },
        
        // Rs. 1000 cards (15 cards)
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: true },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        { amount: 1000, isCollected: false },
        
        // Rs. 2000 cards (12 cards)
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: true },
        { amount: 2000, isCollected: false },
        { amount: 2000, isCollected: false },
        { amount: 2000, isCollected: false },
        { amount: 2000, isCollected: false },
        
        // Rs. 5000 cards (8 cards)
        { amount: 5000, isCollected: true },
        { amount: 5000, isCollected: true },
        { amount: 5000, isCollected: true },
        { amount: 5000, isCollected: true },
        { amount: 5000, isCollected: false },
        { amount: 5000, isCollected: false },
        { amount: 5000, isCollected: false },
        { amount: 5000, isCollected: false }
    ]
};

// Helper functions for calculations
function calculateTotalBudget() {
    let total = 0;
    fundraisingData.budgetItems.forEach(item => {
        total += item.classesPerMonth * item.fundPerClass * item.months;
    });
    return total + fundraisingData.additionalFund;
}

function calculateTotalCollected() {
    let total = 0;
    fundraisingData.collectedFunds.forEach(fund => {
        total += fund.amount * fund.months;
    });
    return total;
}

function calculateProgress() {
    const budget = calculateTotalBudget();
    const collected = calculateTotalCollected();
    return budget > 0 ? (collected / budget) * 100 : 0;
}
