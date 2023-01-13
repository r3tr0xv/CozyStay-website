function deleteObject(id, key) {
    var tab = JSON.parse(localStorage.getItem(key) || "[]")
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;
        }
    }
    tab.splice(pos, 1)
    localStorage.setItem(key, JSON.stringify(tab))
    location.reload();
}
function searchPr(event) {
    var code = event.keyCode;
    if (code == 13) {
        var region = document.getElementById('search_input').value.toLowerCase();
        localStorage.setItem("regionToSearch", region);
        location.replace('searchResults.html');
    }
}
function displayResult() {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var region = localStorage.getItem("regionToSearch");
    var results = [];
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].region == region) {
            results.push(houses[i]);
        }
    }
    var showcase = ``;
    for (let i = 0; i < results.length; i++) {
        showcase += `
        <div class="card" style="width: 18rem;margin:10px;">
            <img src="${results[i].image}" class="card-img-top" style="height:150px;">
            <div class="card-body">
                <h5 class="card-title"><span style="color:#21cc7a">${results[i].houseName}</span></h5>
                <h5 class="card-title">Price : <span style="color:#21cc7a">${results[i].price} TND/Nuit </span></h5>
                <h6 style="color:black;">Rooms available : <span style="color:#21cc7a"> ${results[i].rooms} Rooms </span></h6>
                <h6 style="color:black;">Maximum adults : <span style="color:#21cc7a">${results[i].maxAdults} Adults</span></h6>
                <h6 style="color:black;">Maximum children : <span style="color:#21cc7a">${results[i].maxChildren} Children</span></h6>
                <h6 style="color:black;">Region : <span style="color:#21cc7a">${results[i].region}</span></h6>
                <p class="card-text">For further infos please contact the owner on this number : <span style="color:#21cc7a"> ${results[i].tel} </span></p>
                <div class="clearfix">
                <button type="submit" onclick="singleHouseDisplay(${results[i].id})" style="border-radius:10px 10px;" class="btn btn-success">View Details</button>
                </div>
                </div>
        </div>`;
    }
    document.getElementById('houses').innerHTML = showcase;
}
function dynamicHeader() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
    if (connectedUser) {
        switch (connectedUser.role) {
            case 'admin':
                var header = `
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="houses.html">Guest Houses</a></li>
                    <li class="nav-item active"><a class="nav-link" href="dashboardAdmin.html">Admin Dashboard</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="logout()" style="cursor: pointer;">Sign Out</a></li>`;
                break;
            case 'client':
                var header = `
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="houses.html">Our Houses</a></li>
                    <li class="nav-item active"><a class="nav-link" href="clientSpace.html">Client Space</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="logout()" style="cursor: pointer;">Sign Out</a></li>`;
                break;
            case 'owner':
                var header = `
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="houses.html">Guest Houses</a></li>
                    <li class="nav-item active"><a class="nav-link" href="houseOwnersSpace.html">Owner Space</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="logout()" style="cursor: pointer;">Sign Out</a></li>`;
                break;
        }
    } else {
        var header = `
                    <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="houses.html">Our Houses</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="signup.html">Sign Up</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Sign In</a></li>`;
    }
    document.getElementById('header').innerHTML = header;
}
function searchById(id, key) {
    var tab = JSON.parse(localStorage.getItem(key) || "[]")
    var obj;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            obj = tab[i]
            break;
        }
    }
    return obj;
}
function replaceCh(ch) {
    var newCh = ch.replace(/\\/g, "/");
    // replace it with your images folder path to work properly before you upload pictures
    var res = newCh.replace("fakepath", "/Users/block/OneDrive/Desktop/Projects/CozyStay/images");
    return res;
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function checkPassword(password) {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(password);
}
function emailExist(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]")
    var exist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            exist = true;
            break;
        }
    }
    return exist;
}
function signUp() {
    var validation = true;
    var firstName = document.getElementById("firstName").value;
    if (firstName.length < 3) {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 3 characters"
        document.getElementById("firstNameError").style.color = "red"
        validation = false;
    } else {
        document.getElementById("firstNameError").innerHTML = ""
    }
    var lastName = document.getElementById("lastName").value;
    if (lastName.length < 5) {
        document.getElementById("lastNameError").innerHTML = "Last Name must have at least 5 characters"
        document.getElementById("lastNameError").style.color = "red"
        validation = false;
    } else {
        document.getElementById("lastNameError").innerHTML = ""
    }
    var email = document.getElementById("email").value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById('emailError').innerHTML = ""
    } else {
        document.getElementById('emailError').innerHTML = "Invalid email ! form must be : example@domain.com"
        document.getElementById('emailError').style.color = "red"
        validation = false;
    }
    var verifEmailExist = emailExist(email);
    if (verifEmailExist) {
        document.getElementById('emailExistError').innerHTML = "Email already exists !"
        document.getElementById('emailExistError').style.color = "red"
        validation = false;
    } else {
        document.getElementById("emailExistError").innerHTML = ""
    }
    var password = document.getElementById('password').value;
    var verifPassword = checkPassword(password);
    if (verifPassword) {
        document.getElementById('passwordError').innerHTML = ""
    } else {
        document.getElementById('passwordError').innerHTML = "Invalid password : must include numbers, capital letters, @ and -"
        document.getElementById('passwordError').style.color = "red"
        validation = false;
    }
    var confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword == password) {
        document.getElementById('confirmPasswordError').innerHTML = ""
    } else {
        document.getElementById('confirmPasswordError').innerHTML = "Does not match the password"
        document.getElementById('confirmPasswordError').style.color = "red"
        validation = false;
    }
    var tel = document.getElementById('tel').value;
    if (isNaN(tel) || tel.length != 8) {
        document.getElementById('telError').innerHTML = "Invalid tel"
        document.getElementById('telError').style.color = "red"
        validation = false;
    } else {
        document.getElementById('telError').innerHTML = ""
    }
    var role = document.getElementById('role').value;
    if (validation) {
        if (role == "owner") {
            var ownerStatus = "unconfirmed";
            var license = document.getElementById('license').value;
            var bannedLicenses = JSON.parse(localStorage.getItem("bannedLicenses") || "[]");
            for(let i=0; i < bannedLicenses.length;i++){
                if(bannedLicenses[i] == license){
                    document.getElementById('licenseError').innerHTML = "This license is banned";
                    document.getElementById('licenseError').style.color = "red";
                }else{
                    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
                    var user = {
                        id: idUser,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        tel: tel,
                        role: role,
                        ownerStatus: ownerStatus,
                        license: license,
                    }
                    var users = JSON.parse(localStorage.getItem("users") || "[]")
                    users.push(user)
                    localStorage.setItem("users", JSON.stringify(users))
                    localStorage.setItem("idUser", idUser + 1)
                    location.replace('login.html');
                }
            }
        } else if (role == "client") {
            var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
            var user = {
                id: idUser,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                tel: tel,
                role: role,
            }
            var users = JSON.parse(localStorage.getItem("users") || "[]")
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("idUser", idUser + 1)
            location.replace('login.html');
        }
    }
}
function login() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var foundUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            foundUser = users[i];
        }
    }
    if (foundUser) {
        document.getElementById("msgError").innerHTML = "";
        switch (foundUser.role) {
            case "admin":
                localStorage.setItem("connectedUser", JSON.stringify(foundUser));
                location.replace('dashboardAdmin.html');
                break;
            case "owner":
                switch (foundUser.ownerStatus) {
                    case "unconfirmed":
                        document.getElementById("msgError").innerHTML = "Ownership uncofirmed ! please wait for confirmation";
                        document.getElementById("msgError").style.color = "red";
                        break;
                    case "confirmed":
                        localStorage.setItem("connectedUser", JSON.stringify(foundUser));
                        location.replace('houseOwnersSpace.html')
                        break;
                    case "declined":
                        document.getElementById("msgError").innerHTML = "Ownership rejected ! your license is not genuine";
                        document.getElementById("msgError").style.color = "red";
                        break;
                }
                break;
            case "client":
                localStorage.setItem("connectedUser", JSON.stringify(foundUser));
                location.replace('clientSpace.html')
                break;
        }
    } else {
        document.getElementById("msgError").innerHTML = "Wrong Credentials"
        document.getElementById("msgError").style.color = "red"
    }
}
function logout() {
    localStorage.removeItem("connectedUser");
    location.replace('index.html');
}
function initBanlist(){
    var bannedLicenses = JSON.parse(localStorage.getItem("bannedLicenses") || "[]");
    var init = {};
    bannedLicenses.push(init);
    localStorage.setItem("bannedLicenses",JSON.stringify(bannedLicenses));
    localStorage.setItem("banListExists", true);
}
function insertAdmins() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var admin1 = {
        id: 1,
        firstName: "admin1",
        lastName: "admin1",
        email: "Ayoub@admin.com",
        password: "admin1@2023",
        tel: "25150698",
        role: "admin",
    }
    users.push(admin1);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("adminsAdded", true);
}
function displayOwners() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var userstable = ``;
    if (connectedUser.role == "admin"){
        for (let i = 0; i < users.length; i++) {
            if (users[i].role == "owner") {
                var statusColor = "";
                if(users[i].ownerStatus == "unconfirmed"){
                    statusColor = "orange";
                }else if (users[i].ownerStatus == "confirmed"){
                    statusColor = "green";
                }else{
                    statusColor = "red";
                }
                userstable += `
                <tr>
                    <th scope="row">${i}</th>
                    <td>${users[i].firstName}</td>
                    <td>${users[i].lastName}</td>
                    <td>${users[i].email}</td>
                    <td>${users[i].tel}</td>
                    <td>${users[i].license}</td>
                    <td style="color:${statusColor}">${users[i].ownerStatus}</td>
                    <td>
                        <button onclick="confirmOwner(${users[i].id})" class="btn btn-success" style="border-radius:10px 10px;">Confirm</button>
                        <button onclick="declineOwner(${users[i].id})" class="btn btn-danger" style="border-radius:10px 10px;">Decline</button>    
                    </td>
                </tr>`;
            }
        }
    }
    document.getElementById("displayUsers").innerHTML = userstable;
}
function confirmOwner(id) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].ownerStatus = "confirmed";
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
function declineOwner(id) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var bannedLicenses = JSON.parse(localStorage.getItem("bannedLicenses") || "[]");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].ownerStatus = "declined";
            var license = users[i].license;
            bannedLicenses.push(license);
            localStorage.setItem("bannedLicenses",JSON.stringify(bannedLicenses));
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
function deleteUser(id) {
    var users = JSON.parse(localStorage.getItem('users') || "[]");
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var idHouse = JSON.parse(localStorage.getItem("idHouse") || "1");
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
    var newIdUser = Number(idUser) - 1 ;
    localStorage.setItem("idUser", JSON.stringify(newIdUser));
    var pos;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            pos = i;
            for (let i = 0; i < houses.length; i++) {
                if (houses[i].idOwner == id){
                    var newIdHouse = Number(idHouse) - Number(i);
                    localStorage.setItem("idHouse", JSON.stringify(newIdHouse));
                    deleteObject(houses[i].idOwner, "houses");
                }
            }
            break;
        }
    }
    users.splice(pos, 1);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("connectedUser");
    location.replace('index.html');
}
function addHouse() {
    var validateSubmit = true;
    var houseName = document.getElementById('houseName').value;
    if (houseName.length < 2) {
        document.getElementById('houseNameError').innerHTML = "House Name must not have less than 5 letters"
        document.getElementById('houseNameError').style.color = "red"
        validateSubmit = false;
    } else {
        document.getElementById('houseNameError').innerHTML = ""
    }
    var rooms = document.getElementById('rooms').value;
    if (rooms < 2) {
        document.getElementById('roomsError').innerHTML = "House must have at least 2 rooms"
        document.getElementById('roomsError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('roomsError').innerHTML = ""
    }
    var region = document.getElementById('region').value;
    if (region == "default") {
        document.getElementById('regionError').innerHTML = "Region is required !"
        document.getElementById('regionError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('regionError').innerHTML = ""
    }

    var maxAdults = document.getElementById('maxAdults').value;
    if (maxAdults < 2) {
        document.getElementById('maxAdultsError').innerHTML = "Maximum adults must be greater than 2 !"
        document.getElementById('maxAdultsError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('maxAdultsError').innerHTML = ""
    }

    var maxChildren = document.getElementById('maxChildren').value;
    if (maxChildren < 2) {
        document.getElementById('maxChildrenError').innerHTML = "Maximum children must be greater than 2 !"
        document.getElementById('maxChildrenError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('maxChildrenError').innerHTML = ""
    }
    var price = document.getElementById('price').value;
    if (price <= 0) {
        document.getElementById('priceError').innerHTML = "Price must be greater than 0 !"
        document.getElementById('priceError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('priceError').innerHTML = ""
    }
    var tel = document.getElementById('tel').value;
    if (isNaN(tel) || tel.length != 8) {
        document.getElementById('telError').innerHTML = "Invalid phone number !"
        document.getElementById('telError').style.color = "red"
        validateSubmit = false
    } else {
        document.getElementById('telError').innerHTML = ""
    }
    var img = document.getElementById('image').value;
    var image = replaceCh(img);
    if (validateSubmit) {
        var idHouse = JSON.parse(localStorage.getItem("idHouse") || "1")
        var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
        if (connectedUser.role == "owner") {
            var house = {
                id: idHouse,
                idOwner: connectedUser.id,
                rooms: rooms,
                houseName: houseName,
                region: region.toLowerCase(),
                maxAdults: maxAdults,
                maxChildren: maxChildren,
                price: price,
                tel: tel,
                image: image
            }
            var houses = JSON.parse(localStorage.getItem("houses") || "[]")
            houses.push(house)
            localStorage.setItem("houses", JSON.stringify(houses));
            localStorage.setItem("idHouse", idHouse + 1);
            location.reload();
        } else {
            document.getElementById("addError").innerHTML = "Please login to your owner-space first, you are not an owner !";
            document.getElementById("addError").style.color = "red";
        }
    }
}
function showcaseHouses() {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]")
    var showcase = ``;
    for (let i = 0; i < houses.length; i++) {
        showcase += `
        <div class="card text-center" style="width: 18rem;margin:10px;border-radius:20px 20px 20px 20px">
            <img src="${houses[i].image}" class="card-img-top"  style="height:150px;border-radius:20px 20px 0px 0px"">
            <div class="card-body">
                <h5 class="card-title"><span style="color:#21cc7a">${houses[i].houseName}</span></h5>
                <h5 class="card-title">Price : <span style="color:#21cc7a">${houses[i].price} TND/Nuit </span></h5>
                <h6 style="color:black;">Rooms available : <span style="color:#21cc7a"> ${houses[i].rooms} Rooms </span></h6>
                <h6 style="color:black;">Maximum adults : <span style="color:#21cc7a">${houses[i].maxAdults} Adults</span></h6>
                <h6 style="color:black;">Maximum children : <span style="color:#21cc7a">${houses[i].maxChildren} Children</span></h6>
                <h6 style="color:black;">Region : <span style="color:#21cc7a">${houses[i].region}</span></h6>
                <p class="card-text">For further infos please contact the owner on this number : <span style="color:#21cc7a"> ${houses[i].tel} </span></p>
                <div class="clearfix">
                <button type="submit" onclick="singleHouseDisplay(${houses[i].id})" style="border-radius:10px 10px;" class="btn btn-success">View Details</button>
                </div>
                </div>
        </div>`;
    }
    document.getElementById('houses').innerHTML = showcase;
}
function showcaseOwnerHouses() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var showcase = ``;
    for (let i = 0; i < houses.length; i++) {
        if (houses[i].idOwner == connectedUser.id) {
                showcase += `
                <div class="card" style="width: 25rem;margin:10px;border-radius:20px 20px 20px 20px">
                    <img src="${houses[i].image}" class="card-img-top" style="height:15rem;border-radius:20px 20px 0px 0px">
                    <div class="card-body text-center">
                        <h5 class="card-title"><span style="color:#21cc7a">${houses[i].houseName}</span></h5>
                        <h5 class="card-title">Price : <span style="color:#21cc7a">${houses[i].price} TND/Nuit </span></h5>
                        <h6 style="color:black;">Rooms available : <span style="color:#21cc7a"> ${houses[i].rooms} Rooms </span></h6>
                        <h6 style="color:black;">Maximum adults : <span style="color:#21cc7a">${houses[i].maxAdults} Adults</span></h6>
                        <h6 style="color:black;">Maximum children : <span style="color:#21cc7a">${houses[i].maxChildren} Children</span></h6>
                        <h6 style="color:black;">Region : <span style="color:#21cc7a">${houses[i].region}</span></h6>
                        <div class="clearfix" style="padding-top:20px;padding-bottom:20px">
                            <button type="submit" onclick="editHouse(${houses[i].id})" style="border-radius:10px 10px;margin-right:5px" class="btn btn-success">Update Details</button>
                            <button type="submit" onclick="deleteObject(${houses[i].id},'houses')" style="border-radius:10px 10px;" class="btn btn-danger">Remove House</button>
                        </div>
                        </div>
                </div>`;
        }
    }
    document.getElementById('houses').innerHTML = showcase;
}
function singleHouseDisplay(id) {
    localStorage.setItem('idPrToReserve', id);
    location.replace('displaySingleHouse.html');
}
function displayProductDetails() {
    var id = localStorage.getItem('idPrToReserve');
    var house = searchById(id, "houses");
    var displayImg = `<img src="${house.image}" class="room-img">`;
    document.getElementById("customImg").innerHTML = displayImg;
    document.getElementById('houseName').innerHTML = house.houseName;
    document.getElementById('price').innerHTML = house.price + " TND / Per Night";
    document.getElementById('availablity').innerHTML = house.rooms;
    document.getElementById('maxAdult').innerHTML = house.maxAdults + " adults";
    document.getElementById('maxChild').innerHTML = house.maxChildren + " children";
    document.getElementById('tel').innerHTML = house.tel;
}
function validateReservation() {
    var idHouse = localStorage.getItem('idPrToReserve');
    var house = searchById(idHouse, "houses");
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var validBook = true;
    var rooms = document.getElementById('rooms').value;
    if (rooms <= 0) {
        document.getElementById('roomsError').innerHTML = "Please choose a number of rooms";
        document.getElementById('roomsError').style.color = "red";
        validBook = false;
    } else if (+house.rooms < +rooms) {
        document.getElementById('roomsError').innerHTML = "Rooms not available";
        document.getElementById('roomsError').style.color = "red";
        validBook = false;
    } else {
        document.getElementById('roomsError').innerHTML = "";
    }
    var adults = document.getElementById('adults').value;
    if (adults <= 0) {
        document.getElementById('adultsError').innerHTML = "Please select adults";
        document.getElementById('adultsError').style.color = "red";
        validBook = false;
    } else {
        document.getElementById('adultsError').innerHTML = "";
    }
    var children = document.getElementById('children').value;
    const date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = `${day}-${month}-${year}`;
    var checkInDate = document.getElementById('checkIn').value;
    if(checkInDate < currentDate){
        document.getElementById('checkInError').innerHTML = "invalid date cannot be inferior than current date " + loginUrl;
        document.getElementById('checkInError').style.color = "red";
        validBook = false;
    }else{
        document.getElementById('checkInError').innerHTML = "";
    }
    var checkOutDate = document.getElementById('checkOut').value;
    if(checkOutDate < checkInDate){
        document.getElementById('checkOutError').innerHTML = "invalid date cannot be inferior than check in date ";
        document.getElementById('checkOutError').style.color = "red";
        validBook = false;
    }else{
        document.getElementById('checkOutError').innerHTML = "";
    }
    if (validBook) {
        if(localStorage.getItem("connectedUser") === null){
            var loginUrl = `<a href="login.html" class="link-info" style="color: #2f89fc ;">Login
            here</a>`;
            document.getElementById('reservationError').innerHTML = "Please sign in to book a reservation !";
            document.getElementById('reservationError').style.color = "red";
            document.getElementById('loginUrl').innerHTML = loginUrl;
        }else if (connectedUser.id == house.idOwner) {
            document.getElementById('reservationError').innerHTML = "You cannot book in your own house !";
            document.getElementById('reservationError').style.color = "red";
        }else{
            var reservationId = JSON.parse(localStorage.getItem('reservationId') || "1");
            var reservationStatus = "unconfirmed";
            var reservation = {
                id: reservationId,
                reservationStatus: reservationStatus,
                idUser: connectedUser.id,
                idHouse: house.id,
                idOwner: house.idOwner,
                rooms: rooms,
                adults: adults,
                children: children,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
            }
            var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
            reservations.push(reservation);
            localStorage.setItem("reservations", JSON.stringify(reservations));
            localStorage.setItem('reservationId', reservationId + 1);
            location.replace('clientReservations.html');
        }
    }
}
function consultReservations() {
    var reservations = JSON.parse(localStorage.getItem('reservations') || "[]");
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var consultReservations = ``;
    for (let i = 0; i < reservations.length; i++) {
        var house = searchById(reservations[i].idHouse, "houses");
        if (reservations[i].idUser == connectedUser.id) {
            let statusColor = ""
        if (reservations[i].reservationStatus == "unconfirmed") {
            statusColor = "orange"
        }
        else if (reservations[i].reservationStatus == "confirmed"){
            statusColor = "green"
        }else{
            statusColor = "red"
        }
        consultReservations += `
        <div class="card" style="width: 18rem;margin:10px;">
            <img src="${house.image}" class="card-img-top" style="height:150px;">
            <div class="card-body">
                <h5 class="card-title"><span style="color:#21cc7a">${house.houseName}</span></h5>
                <h5 class="card-title">Price : <span style="color:#21cc7a">${house.price} TND/Nuit </span></h5>
                <h6 style="color:black;">Rooms : <span style="color:#21cc7a"> ${reservations[i].rooms} Rooms </span></h6>
                <h6 style="color:black;">Adults : <span style="color:#21cc7a">${reservations[i].adults} Adults</span></h6>
                <h6 style="color:black;">Children : <span style="color:#21cc7a">${reservations[i].children} Children</span></h6>
                <h6 style="color:black;">Region : <span style="color:#21cc7a">${house.region}</span></h6>
                <h6 style="color:black;">Check-In Date : <span style="color:#21cc7a">${reservations[i].checkInDate}</span></h6>
                <h6 style="color:black;">Check-Out Date : <span style="color:#21cc7a">${reservations[i].checkInDate}</span></h6>
                <h6 style="color:black;">Status : <span id="status" style="color: ${statusColor}">${reservations[i].reservationStatus}</span></h6>
                <div class="clearfix">
                    <button class="btn btn-danger" onclick="cancelReservation(${reservations[i].id})" style="border-radius:10px 10px;">Cancel Reservation</button>
                </div>
                </div>
        </div>`;
        }
    }        
    document.getElementById('reservations').innerHTML = consultReservations;
}
function manageReservations() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");
    var reservations = JSON.parse(localStorage.getItem('reservations') || "[]");
    var display = ``;
    let statusColor = ""
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].idOwner == connectedUser.id) {
            var house = searchById(reservations[i].idHouse, "houses");
                if (reservations[i].reservationStatus == "unconfirmed") {
                    statusColor = "orange"
                }
                else if (reservations[i].reservationStatus == "confirmed"){
                    statusColor = "green"
                }else{
                    statusColor = "red"
                }
            display += `
            <div class="card" style="width: 18rem;margin:10px;">
                <img src="${house.image}" class="card-img-top" style="height:150px;">
                <div class="card-body" text-center">
                    <h5 class="card-title"><span style="color:#21cc7a">${house.houseName}</span></h5>
                    <h5 class="card-title">Price : <span style="color:#21cc7a">${house.price} TND/Nuit </span></h5>
                    <h6 style="color:black;">Rooms : <span style="color:#21cc7a"> ${reservations[i].rooms} Rooms </span></h6>
                    <h6 style="color:black;">Adults : <span style="color:#21cc7a">${reservations[i].adults} Adults</span></h6>
                    <h6 style="color:black;">Children : <span style="color:#21cc7a">${reservations[i].children} Children</span></h6>
                    <h6 style="color:black;">Region : <span style="color:#21cc7a">${house.region}</span></h6>
                    <h6 style="color:black;">Check-In Date : <span style="color:#21cc7a">${reservations[i].checkInDate}</span></h6>
                    <h6 style="color:black;">Check-Out Date : <span style="color:#21cc7a">${reservations[i].checkInDate}</span></h6>
                    <h6 style="color:black;">Status : <span style="color:${statusColor}">${reservations[i].reservationStatus}</span></h6>
                    <h6><span id="error"></span></h6>
                    <div class="clearfix text-center" style="padding-top:20px;padding-bottom:20px">
                        <button class="btn btn-success" style="border-radius:10px 10px;margin-bottom:5px"  onclick="confirmReservation(${reservations[i].id}, ${reservations[i].idHouse})">Confirm Reservation</button>
                        <button class="btn btn-danger" style="border-radius:10px 10px;" onclick="declineReservation(${reservations[i].id})">Decline Reservation</button>
                    </div>
                    </div>
            </div>`;
        }
    }
    document.getElementById('reservations').innerHTML = display;
}
function confirmReservation(id, idHouse) {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var reservations = JSON.parse(localStorage.getItem('reservations') || "[]");
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].id == id) {
            if(reservations[i].reservationStatus == "confirmed"){
                alert("Reservation is already confirmed !".toUpperCase())
            }else if (reservations[i].reservationStatus == "declined"){
                alert("Reservation is declined and cannot be confirmed !".toUpperCase())
            }else{
                reservations[i].reservationStatus = "confirmed";
                for (let i = 0; i < houses.length; i++) {
                    if (houses[i].id == idHouse) {
                        houses[i].rooms = Number(houses[i].rooms) - Number(reservations[i].rooms);
                        break;
                    }
                }
                localStorage.setItem("houses", JSON.stringify(houses));
                localStorage.setItem('reservations', JSON.stringify(reservations));
                location.reload();
            }
        }
    }
}
function declineReservation(id) {
    var reservations = JSON.parse(localStorage.getItem('reservations') || "[]");
    var houses = JSON.parse(localStorage.getItem('houses') || '[]');
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].id == id) {
            if(reservations[i].reservationStatus == "confirmed"){
                alert("Reservation is confirmed and cannot be declined !".toUpperCase())
            }else if (reservations[i].reservationStatus == "declined"){
                alert("Reservation is already declined !".toUpperCase())
            }else{
                reservations[i].reservationStatus = "declined";
                var idHouse = reservations[i].idHouse;
                var rooms = reservations[i].rooms;
                for (let i = 0; i < houses.length; i++) {
                    if (houses[i].id == idHouse) {
                        houses[i].rooms = Number(houses[i].rooms) + Number(rooms);
                        break;
                    }
                }
                localStorage.setItem("houses", JSON.stringify(houses));
                localStorage.setItem('reservations', JSON.stringify(reservations));
                location.reload();
            }
        }
    }
}
function cancelReservation(id) {
    var reservation = searchById(id, "reservations");
    var houses = JSON.parse(localStorage.getItem('houses') || '[]');
    for (let i = 0; i < houses.length; i++) {
        if(reservation.reservationStatus == "confirmed"){
            if (houses[i].id == reservation.idHouse) {
                houses[i].rooms = Number(houses[i].rooms) + Number(reservation.rooms)
            }
            localStorage.setItem("houses", JSON.stringify(houses))
            deleteObject(id, "reservations")
        }else{
            localStorage.setItem("houses", JSON.stringify(houses))
            deleteObject(id, "reservations")
        }
    }
    location.reload();
}
function displayDetails() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var details = `
        <table class="table">
            <thead style="color:#21cc7a;">
                <tr class="text-center">
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center">
                    <th>${connectedUser.firstName}</th>
                    <th>${connectedUser.lastName}</th>
                    <td>${connectedUser.email}</td>
                    <td>${connectedUser.tel}</td>
                </tr>
            </tbody>
        </table>
        <div class="col-sm-12 text-center">
            <button type="button" class="btn btn-success" style="border-radius:20px 20px 20px 20px;margin-top:10px;margin-bottom:50px" onclick="editDetails(${connectedUser.id})">Edit details</button>
            <button type="button" class="btn btn-danger" style="border-radius:20px 20px 20px 20px;margin-top:10px;margin-bottom:50px" onclick="deleteUser(${connectedUser.id})">Delete Account</button>
        </div>`;
    document.getElementById("accountDetails").innerHTML = details;
}
function editDetails(id) {
    var user = searchById(id, "users")
    var detailsForm = `
        <div class="login_form_inner text-center">
                <h3 style="color: #21cc7a" class="text-center" >Edit your details</h3>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">First Name : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="text" id="firstName" value="${user.firstName}" class="text-center" class=" form-control form-control-lg" placeholder="First Name" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                    <span id="firstNameError"></span>
                </div>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">Last Name : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="text" id="lastName" value="${user.lastName}" class="text-center" class="form-control form-control-lg" placeholder="Last Name" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                <span id="lastNameError"></span>
                </div>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">Email : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="email" id="email" value="${user.email}" class="text-center" class="form-control form-control-lg" placeholder="Email" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                <span id="emailError"></span>
                </div>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">Phone Number : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="tel" id="tel" value="${user.tel}" class="text-center" class="form-control form-control-lg" placeholder="Phone Number" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                <span id="telError"></span>
                </div>
                <div class="col-md-12 form-group">
                    <button type="button" class="btn btn-success" style="border-radius:20px 20px 20px 20px;margin-top:20px;" onclick="validateEditDetails(${id})">Validate Edits</button>
                </div>
        </div>`;
    document.getElementById('detailsForm').innerHTML = detailsForm;
}
function validateEditDetails(id) {
    var validateEdit = true;
    var newFirstName = document.getElementById('firstName').value;
    if (newFirstName.length < 3) {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 3 characters"
        document.getElementById("firstNameError").style.color = "red"
        validation = false;
    } else {
        document.getElementById("firstNameError").innerHTML = ""
    }
    var newLastName = document.getElementById('lastName').value;
    if (newLastName.length < 5) {
        document.getElementById("lastNameError").innerHTML = "Last Name must have at least 5 characters"
        document.getElementById("lastNameError").style.color = "red"
        validateEdit = false;
    } else {
        document.getElementById("lastNameError").innerHTML = ""
    }
    var newEmail = document.getElementById('email').value;
    var verifEmail = validateEmail(newEmail);
    if (verifEmail) {
        document.getElementById('emailError').innerHTML = ""
    } else {
        document.getElementById('emailError').innerHTML = "Invalid email ! form must be : example@domain.com"
        document.getElementById('emailError').style.color = "red"
        validateEdit = false;
    }
    var newTel = document.getElementById('tel').value;
    if (newTel.length != 8 || isNaN(newTel)) {
        document.getElementById('telError').innerHTML = "Invalid phone number"
        document.getElementById('telError').style.color = "red"
        validateEdit = false
    } else {
        document.getElementById('telError').innerHTML = ""
    }
    if (validateEdit) {
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].firstName = newFirstName;
                users[i].lastName = newLastName;
                users[i].email = newEmail;
                users[i].tel = newTel;
                localStorage.setItem("connectedUser", JSON.stringify(users[i]));
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
    }
}
function editHouse(id) {
    var house = searchById(id, "houses")
    var detailsForm = `
    <div class="card text-center col-lg-12" style="border-radius:20px 20px 20px 20px">
    <div class="card-body text-center">
            <div>
                <h3 style="color: #21cc7a">Edit your details</h3>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">Rooms : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="number" id="rooms" value="${house.rooms}" class="text-center" class=" form-control form-control-lg" placeholder="Rooms" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                    <span id="roomsError"></span>
                </div>
                <label style="color:#21cc7a;margin-top:20px;font-size:larger">Price : </label>
                <div class="form-outline mb-4" style="padding-top: 1%;">
                    <input type="number" id="price" value="${house.price}" class="text-center" class="form-control form-control-lg" placeholder="Price" style="border:0.2px solid grey;border-radius: 20px 20px;width:50%;" />
                <span id="priceError"></span>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-success" style="border-radius:20px 20px 20px 20px;margin-top:20px;" onclick="updateHouse(${id})">Validate Edits</button>
                </div>
            </div>  
        </div>
    </div>
   `;
    document.getElementById('houseForm').innerHTML = detailsForm;
}
function updateHouse(id) {
    var newRooms = document.getElementById('rooms').value;
    var newPrice = document.getElementById('price').value;
    if (newRooms > 0) {
        if (newPrice > 0) {
            var houses = JSON.parse(localStorage.getItem("houses") || "[]");
            for (let i = 0; i < houses.length; i++) {
                if (houses[i].id == id) {
                    houses[i].price = newPrice;
                    houses[i].rooms = newRooms;
                    break;
                }
            }
            localStorage.setItem('houses', JSON.stringify(houses));
            location.reload();
        }
    } else if (newRooms < 0) {
        document.getElementById("roomsError").innerHTML = "Invalid rooms number";
        document.getElementById("roomsError").style.color = "red";
    } else if (newPrice < 0) {
        document.getElementById("priceError").innerHTML = "Invalid price";
        document.getElementById("priceError").style.color = "red";
    }
}