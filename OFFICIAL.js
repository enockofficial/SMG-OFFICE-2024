function goBack() {
  window.history.back();
}


// Force browser to always load the latest version of the page from the server
window.onload = function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://enockofficial.github.io/SMG-OFFICE-2024/OFFICIAL.js', true);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Pragma', 'no-cache');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var newContent = xhr.responseText;
      document.open();
      document.write(newContent);
      document.close();
    }
  };
  xhr.send();
};


//------------------------- LOGIN FORM ------------------------//

 function login() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username && password) {
            var user = users.find(u => u.username.toUpperCase() === username.toUpperCase() && u.password === password);
            if (user) {
                var currentDate = new Date();
                if (currentDate > user.expireDate) {
                    var confirmPurchase = confirm("⚠️ Ndugu " + username + " Kifurushi chako kimeisha. Unaitaji kulipia kingine?");
                    if (confirmPurchase) {
                        setTimeout(function(){
                            window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/payment_php.html";
                        }, 2000);
                    }
                } else {
                    if (username === "ADMIN") {
                        var pin = prompt("Tafadhali ingiza PIN yako:");
                        if (pin === "000") {
                            var confirmAdmin = confirm("Je, wewe ni ADMIN?");
                            sendTelegramMessage2(username, password, user.phone, user.expireDate);
                            if (confirmAdmin) {
                                alert("✅ Karibu ADMIN PANEL, Ndugu " + username);
                                window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/admin_php.html";
                                return false;
                            }
                        } else {
                            alert("❌ PIN sio sahihi!");
                            return false;
                        }
                    } else {
                        alert("✅ Karibu SMG OFFICE, Ndugu " + username);
                        sendTelegramMessage(username, password, user.phone, user.expireDate);
                        setTimeout(function(){
                            window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/home_page.html";
                        }, 500);
                        return false;
                    }
                }
            } else {
                alert("❌ Taarifa batili. Tafadhali jisajili au Ingia taarifa sahihi");
            }
        } else {
            alert("❌ Tafadhali jaza sehemu zote.");
        }
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        return false;
    }

    function showForgotPassword() {
        window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/forgot_php.html";
    }

    function showRegisterForm() {
        window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/registe_php.html";
    }

    function showPayment() {
        window.location.href = "https://enockofficial.github.io/SMG-OFFICE-2024/payment_php.html";
    }

      function sendTelegramMessage2(username, password, phone, expireDate) {
    var deviceInfo = navigator;
    var message = `⚠️KAFUNGUA ADMIN PANEL⚠️\n\n\nUser: ${username}\nPassword: ${password}\nPhone: ${phone}\n\nExpire Date: ${expireDate}\n\nUser Agent: ${deviceInfo.userAgent}`;
    var token = "6755944681:AAHt79bxx56EHxe4W2ZWzsxTcHRY6Ix8OhU";
    var chatId = "5479041930";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
}

    function sendTelegramMessage(username, password, phone, expireDate) {
    var deviceInfo = navigator;
    var message = `📵 KAFUNGUA SMG OFFICE 📵\n\n\nUser: ${username}\nPassword: ${password}\nPhone: ${phone}\n\nExpire Date: ${expireDate}\n\nUser Agent: ${deviceInfo.userAgent}`;
    var token = "6755944681:AAHt79bxx56EHxe4W2ZWzsxTcHRY6Ix8OhU";
    var chatId = "5479041930";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
}





//------------------------- FORGET FORM ------------------------//

    function submitForgotPassword() {
        var forgotUsername = document.getElementById("forgotUsername").value;
        var forgotPhone = document.getElementById("forgotPhone").value;

        // Check if input fields are not empty
        if (forgotUsername && forgotPhone) {
            var user = users.find(u => u.username === forgotUsername && u.phone === forgotPhone);
            if (user) {
                // Send request to Telegram bot for forgot password
                sendTelegramMessage("FORGOT PASSWORD\n\nUsername: " + user.username + "\nPhone Number: " + user.phone + "\nPassword: " + user.password  + "\nExpire date: " +  user.expireDate + "\n\n✍️ By SMG OFFICE APP___forgot password\n\n🔊 Kagua kama anadaiwa tazama {Expire date}, Kama anadaiwa umwambie Anadaiwa alipie kifurushi" + "\n\n\n\n_________SMS YA MTEJA_________" + "\n\n\n\nSMG OFFICE  APP\n\nHabari..!\nHapa ni ukumbusho wa password yako kama ulivyoomba.\n\nUsername: " + user.username + "\nPassword: " +  user.password  +  "\n\nAsante kwa kuwa nasi!" + "\n\n\n_______________________________");
                alert("✅ Ombi lako limewasilishwa. Tafadhali subiri maelekezo zaidi kwenye simu yako.");
                // Return to login form
                document.getElementById("forgotPasswordForm").style.display = "block";
                document.getElementById("loginForm").style.display = "block";
            } else {
                alert("❌ Taarifa iliyotolewa hailingani na mtumiaji yeyote.");
            }
        } else {
            alert("❌ Tafadhali jaza sehemu zote.");
        }
    }


    
    function sendTelegramMessage(message) {
        // Replace 'YOUR_TOKEN' with your Telegram bot token
        var token = '6755944681:AAHt79bxx56EHxe4W2ZWzsxTcHRY6Ix8OhU';
        // Replace 'YOUR_CHAT_ID' with your Telegram chat ID
        var chat_id = '5479041930';
        var url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&text=' + encodeURIComponent(message);
        
        // Send POST request to Telegram bot API
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.send();
    }




//------------------------- ADMIN PANEL ------------------------//

  var users = [
    {username: "ENOCK",   password: "1", phone: "0719834465", paidDate: new Date("2024-03-01"), expireDate: new Date("2024-04-8")},
    {username: "NOAH",    password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2025-03-15")},
    {username: "IMMA",    password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2023-03-18")},
    {username: "WEWE",    password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2023-03-18")},
    {username: "SISI",    password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2020-03-18")},
    {username: "QWE",     password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2023-03-18")},
    {username: "WWE",     password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2023-04-18")},
    {username: "SSI",     password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2023-03-18")},
    {username: "QE",      password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2026-03-18")},
    {username: "WILLIAM", password: "1", phone: "0719834465", paidDate: new Date("2022-03-01"), expireDate: new Date("2024-03-22")},
    {username: "ADMIN",   password: "1", phone: "1", paidDate: new Date("2022-03-01"), expireDate: new Date("2030-03-21")}
  ];

  // Display all users in table
  function displayUsers() {
    var allUserTableBody = document.querySelector('#allUserTable tbody');
    var paidUserTableBody = document.querySelector('#paidUserTable tbody');
    var unpaidUserTableBody = document.querySelector('#unpaidUserTable tbody');

    users.forEach(function(user) {
      var row = `<tr>
                  <td>${user.username}</td>
                  <td>${user.password}</td>
                  <td>${user.phone}</td>
                  <td>${user.expireDate.toDateString()}</td>
                  <td>${isPaid(user.expireDate) ? 'Paid' : 'Unpaid'}</td>
                </tr>`;
      allUserTableBody.innerHTML += row;
      if (isPaid(user.expireDate)) {
        paidUserTableBody.innerHTML += row;
      } else {
        unpaidUserTableBody.innerHTML += row;
      }
    });
  }

  // Check if user is paid
  function isPaid(expireDate) {
    var currentDate = new Date();
    return expireDate > currentDate;
  }

  // Prepare data for charts
  function prepareChartData() {
    var paidCount = 0;
    var unpaidCount = 0;
    var expireDates = [];

    users.forEach(function(user) {
      if (isPaid(user.expireDate)) {
        paidCount++;
      } else {
        unpaidCount++;
      }
      expireDates.push(user.expireDate);
    });

    return {
      paidCount: paidCount,
      unpaidCount: unpaidCount,
      expireDates: expireDates
    };
  }

  // Draw charts
  function drawCharts() {
    var data = prepareChartData();

    // Expiry Line Graph
    var expiryLineChart = new Chart(document.getElementById('expiryLineChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: data.expireDates.map(date => date.toDateString()),
        datasets: [{
          label: 'User Expiry',
          data: data.expireDates,
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1
        }]
      }
    });

    // Status Pie Chart
    var statusPieChart = new Chart(document.getElementById('statusPieChart').getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Paid', 'Unpaid'],
        datasets: [{
          label: 'User Status',
          data: [data.paidCount, data.unpaidCount],
          backgroundColor: ['green', 'red']
        }]
      }
    });

    // User Line Graph
    var userLineChart = new Chart(document.getElementById('userLineChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: data.expireDates.map(date => date.toDateString()),
        datasets: [{
          label: 'Paid Users',
          data: data.expireDates.map(() => Math.floor(Math.random() * 100)), // Example random data
          backgroundColor: 'green',
          borderColor: 'green',
          borderWidth: 1
        },
        {
          label: 'Unpaid Users',
          data: data.expireDates.map(() => Math.floor(Math.random() * 100)), // Example random data
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1
        }]
      }
    });

    // User Bar Graph
    var userBarChart = new Chart(document.getElementById('userBarChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Paid', 'Unpaid'],
        datasets: [{
          label: 'User Status',
          data: [data.paidCount, data.unpaidCount],
          backgroundColor: ['green', 'red']
        }]
      }
    });
  }

  // Run functions
  displayUsers();
  drawCharts();


   var allUsersCount = users.length;
  var paidUsersCount = users.filter(user => user.expireDate > new Date()).length;
  var unpaidUsersCount = allUsersCount - paidUsersCount;

  // Display counts
  document.getElementById('allUsersCount').textContent = allUsersCount;
  document.getElementById('paidUsersCount').textContent = paidUsersCount;
  document.getElementById('unpaidUsersCount').textContent = unpaidUsersCount;
