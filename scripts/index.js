const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
let navEnabled = true;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    
        navMenu.children.forEach(li => {
            li.setAttribute('tabindex', navEnabled ? '0' : '-1');
        });
    }          
})

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(pageId)) {
            link.classList.add('active');
        }
    });
    
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    window.scrollTo(0, 0);
}

function selectPlan(plan) {
    const planElement = document.getElementById('selected-plan');
    if (plan === 'basic') {
        planElement.textContent = 'Basic ($4.99/month)';
    } else if (plan === 'premium') {
        planElement.textContent = 'Premium ($9.99/month)';
    } else if (plan === 'family') {
        planElement.textContent = 'Family ($14.99/month)';
    }
}

function selectPayment(method) {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOption = document.querySelector(`.payment-option:nth-child(${method === 'credit' ? '1' : '2'})`);
    selectedOption.classList.add('active');
    
    const creditForm = document.getElementById('credit-payment');
    const paypalForm = document.getElementById('paypal-payment');
    
    if (method === 'credit') {
        creditForm.style.display = 'block';
        paypalForm.style.display = 'none';
    } else {
        creditForm.style.display = 'none';
        paypalForm.style.display = 'block';
    }
}

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const divH = document.querySelector('#credit-payment');
    const isHiddenH = getComputedStyle(divH).display === 'none';
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const ccv = document.getElementById('ccv').value;
    const payPalEmail = document.getElementById('paypal-email').value;
    const cardRegex = /^(?:\d[ -]*?){13,19}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const ccvRegex = /^\d{3,4}$/;

    if (!isHiddenH) {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        if (!cardRegex.test(cardNumber)) {
            alert('Enter a valid card.');
            return;
        } else {
    
            if (!expiryRegex.test(expiry)) {
                alert('Expiry MM/YY is invalid!');
                return;
            }
        
            if (!ccvRegex.test(ccv)) {
                alert('CCV is invalid!');
                return;
            }
        }
    } else {
        if (!payPalEmail) {
            alert('Add PayPal email');
            return;
        }
    }
    
    // Here you would normally send the data to your server
    alert('Account created successfully! Redirecting to dashboard...');

    const prices = {
        "Basic": 4.99,
        "Premium": 9.99,
        "Family": 14.99
    }

    console.log(document.getElementById('selected-plan'));

    const newUser = {
        id: 1000 + userData.length + 1,
        username: document.getElementById("username").value,
        created: new Date().toLocaleDateString(),
        subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        subscriptionType: document.getElementById('selected-plan').innerText.split(" ")[0],
        subscriptionPrice: prices[document.getElementById('selected-plan').innerText.split(" ")[0]],
        isActive: true
    };
        
    addUser(newUser);
    
    // Reset form
    registerForm.reset();
    
    // Redirect to home page (in a real app, would redirect to user dashboard)
    showPage('home');
});

// Sample user data - in a real application, this would come from an API or database
const userData = [
    {
        id: 1001,
        username: "johndoe",
        created: "03/15/2025",
        subscriptionEnd: "03/15/2026",
        subscriptionType: "Premium",
        subscriptionPrice: 9.99,
        isActive: true
    },
    {
        id: 1002,
        username: "janedoe",
        created: "03/20/2025",
        subscriptionEnd: "03/20/2026",
        subscriptionType: "Basic",
        subscriptionPrice: 4.99,
        isActive: true
    },
    {
        id: 1003,
        username: "mikesmith",
        created: "04/01/2025",
        subscriptionEnd: "07/01/2025",
        subscriptionType: "Premium",
        subscriptionPrice: 9.99,
        isActive: true
    },
    {
        id: 1004,
        username: "sarahlee",
        created: "02/15/2025",
        subscriptionEnd: "02/15/2026",
        subscriptionType: "Family",
        subscriptionPrice: 14.99,
        isActive: true
    },
    {
        id: 1005,
        username: "tomwilson",
        created: "01/10/2025",
        subscriptionEnd: "01/10/2025",
        subscriptionType: "Basic",
        subscriptionPrice: 4.99,
        isActive: false
    },
    {
        id: 1006,
        username: "amandabrown",
        created: "03/05/2025",
        subscriptionEnd: "03/05/2026",
        subscriptionType: "Family",
        subscriptionPrice: 14.99,
        isActive: true
    },
    {
        id: 1007,
        username: "robertjones",
        created: "04/12/2025",
        subscriptionEnd: "07/12/2025",
        subscriptionType: "Basic",
        subscriptionPrice: 4.99,
        isActive: true
    }
];

// Function to calculate dashboard statistics based on user data
function calculateStatistics() {
    // Calculate total users
    const totalUsers = userData.length;
    
    // Calculate active subscriptions (users whose subscription is active)
    const activeSubscriptions = userData.filter(user => user.isActive).length;
    
    // Calculate monthly revenue (sum of subscription prices for active users)
    const monthlyRevenue = userData
        .filter(user => user.isActive)
        .reduce((total, user) => total + user.subscriptionPrice, 0);
    
    // Calculate subscription type breakdown
    const subscriptionCounts = userData.reduce((counts, user) => {
        if (!counts[user.subscriptionType]) {
            counts[user.subscriptionType] = 0;
        }
        counts[user.subscriptionType]++;
        return counts;
    }, {});
    
    return {
        totalUsers,
        activeSubscriptions,
        monthlyRevenue,
        subscriptionCounts
    };
}

// Function to generate the user table
function generateUserTable() {
    const tableBody = document.querySelector("#admin-table tbody");
    if (!tableBody) return;
    
    // Clear existing table content
    tableBody.innerHTML = "";
    
    // Generate table rows
    userData.forEach(user => {
        const row = document.createElement("tr");
        
        // Add user data cells
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.created}</td>
            <td>${user.subscriptionEnd}</td>
            <td>${user.subscriptionType}</td>
            <td>${user.subscriptionPrice.toFixed(2)}</td>
            <td>${user.isActive ? '<span style="color: green;">Active</span>' : '<span style="color: red;">Inactive</span>'}</td>
            <td>
                <button class="btn btn-primary delete-user" data-id="${user.id}" style="padding: 5px 10px; font-size: 0.8rem; background-color: #ff006e;">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to buttons
    addButtonEventListeners();
}

// Function to update statistics display
function updateStatistics() {
    const stats = calculateStatistics();
    
    document.getElementById("total-users").textContent = stats.totalUsers;
    document.getElementById("active-subscriptions").textContent = stats.activeSubscriptions;
    document.getElementById("monthly-revenue").textContent = `${stats.monthlyRevenue.toFixed(2)}`;
    
    // Update subscription type breakdown
    const subscriptionBreakdownElement = document.getElementById("subscription-breakdown");
    if (subscriptionBreakdownElement) {
        subscriptionBreakdownElement.innerHTML = '';
        
        for (const [type, count] of Object.entries(stats.subscriptionCounts)) {
            const typeElement = document.createElement("div");
            typeElement.className = "subscription-type";
            typeElement.innerHTML = `
                <span class="type-name">${type}:</span>
                <span class="type-count">${count}</span>
            `;
            subscriptionBreakdownElement.appendChild(typeElement);
        }
    }
}

// Function to add event listeners to buttons
function addButtonEventListeners() {
    // Add event listeners to edit buttons
    document.querySelectorAll(".edit-user").forEach(button => {
        button.addEventListener("click", function() {
            const userId = this.getAttribute("data-id");
            editUser(userId);
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-user").forEach(button => {
        button.addEventListener("click", function() {
            const userId = this.getAttribute("data-id");
            deleteUser(userId);
        });
    });
}

// Function to handle deleting a user
function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user with ID: ${userId}?`)) {
        console.log(`Deleting user with ID: ${userId}`);
        
        // Find the index of the user in the array
        const userIndex = userData.findIndex(user => user.id == userId);
        
        if (userIndex !== -1) {
            // Remove user from array
            userData.splice(userIndex, 1);
            
            // Regenerate the table and update stats
            generateUserTable();
            updateStatistics();
        }
    }
}

// Function to add a new user
function addUser(user) {
    // Add the user to the array
    userData.push(user);
    
    // Regenerate the table and update stats
    generateUserTable();
    updateStatistics();
}

// Function to initialize the admin dashboard
function initAdminDashboard() {
    // Create the HTML structure
    const adminContainer = document.querySelector(".admin .container");
    if (!adminContainer) return;
    
    adminContainer.innerHTML = `
        <h2 class="section-title">Admin Dashboard</h2>
        <div class="admin-panel">
            <h3>User Management (scroll)</h3>
            <div class="table-container">
                <table id="admin-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Created</th>
                            <th>Subscription End</th>
                            <th>Subscription Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Table content will be generated dynamically -->
                    </tbody>
                </table>
            </div>
            
            <h3 style="margin-top: 30px;">Subscription Statistics</h3>
            <div class="pricing-plans">
                <div style="background-color: rgba(58, 134, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <h4>Total Users</h4>
                    <p id="total-users" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">0</p>
                </div>
                <div style="background-color: rgba(58, 134, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <h4>Active Subscriptions</h4>
                    <p id="active-subscriptions" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">0</p>
                </div>
                <div style="background-color: rgba(58, 134, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <h4>Monthly Revenue</h4>
                    <p id="monthly-revenue" style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">$0</p>
                </div>
            </div>
            
            <h3 style="margin-top: 30px;">Subscription Types</h3>
            <div id="subscription-breakdown" style="background-color: rgba(58, 134, 255, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <!-- Subscription type breakdown will be populated dynamically -->
            </div>
            
            <div style="margin-top: 20px; text-align: right;">
                <button id="add-user-btn" class="btn btn-primary" style="padding: 8px 15px;">Add New User</button>
            </div>
        </div>
    `;
    
    // Generate table and update statistics
    generateUserTable();
    updateStatistics();
    
    // Add event listener to the "Add New User" button
    document.getElementById("add-user-btn").addEventListener("click", function() {
        // In a real application, this would open a form or modal
        
        // Generate random subscription type
        const subscriptionTypes = ["Basic", "Premium", "Family"];
        const randomType = subscriptionTypes[Math.floor(Math.random() * subscriptionTypes.length)];
        
        // Set price based on subscription type
        let price = 4.99; // Basic price
        if (randomType === "Premium") price = 9.99;
        if (randomType === "Pro") price = 14.99;
        
        const newUser = {
            id: 1000 + userData.length + 1,
            username: "newuser" + (userData.length + 1),
            created: new Date().toLocaleDateString(),
            subscriptionEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
            subscriptionType: randomType,
            subscriptionPrice: price,
            isActive: true
        };
        
        addUser(newUser);
    });
}

// Initialize the admin dashboard when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initAdminDashboard);