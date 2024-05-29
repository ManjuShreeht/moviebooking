function getdata() {
    axios.get("https://crudcrud.com/api/268342d15efb4ca69da967ea6e71e630/movie1")
        .then(res => {
            const data = res.data;
            const container = document.getElementById('data-container');
            container.innerHTML = '';

            const seatFilter = document.getElementById('seat-filter').value;
            let filteredData;

            if (seatFilter) {
                filteredData = data.filter(item => item.seatNum === seatFilter);
            } else {
                filteredData = data;
            }

            filteredData.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('data-item');
                itemDiv.innerHTML = `
                    <p>Username: ${item.username}</p>
                    <p>Seat Number: ${item.seatNum}</p>
                    <button onclick="editData('${item._id}', '${item.username}', '${item.seatNum}')">Edit</button>
                    <button onclick="deleteData('${item._id}')">Delete</button>
                `;
                container.appendChild(itemDiv);
            });

            // Print the length of the filtered data
            const lengthContainer = document.getElementById('filtered-data-length');
            lengthContainer.textContent = `Total Items: ${filteredData.length}`;
        })
        .catch(err => console.error(err));
}

function booking(e) {
    e.preventDefault();
    const uname = document.getElementById('name').value;
    const seat = document.getElementById('number').value;
    axios.post("https://crudcrud.com/api/268342d15efb4ca69da967ea6e71e630/movie1", {
            username: uname,
            seatNum: seat
        })
        .then(res => {
            console.log(res);
            // After successful booking, refresh the data
            getdata();
        })
        .catch(err => console.error(err));
}

function editData(itemId, username, seatNum) {
    const newUsername = prompt("Enter new username:", username);
    const newSeatNum = prompt("Enter new seat number:", seatNum);
    
    if (newUsername !== null && newSeatNum !== null) {
        axios.put(`https://crudcrud.com/api/268342d15efb4ca69da967ea6e71e630/movie1/${itemId}`, {
                username: newUsername,
                seatNum: newSeatNum
            })
            .then(res => {
                console.log(res);
                // After successful edit, refresh the data
                getdata();
            })
            .catch(err => console.error(err));
    }
}

function deleteData(itemId) {
   
        axios.delete(`https://crudcrud.com/api/268342d15efb4ca69da967ea6e71e630/movie1/${itemId}`)
            .then(res => {
                console.log(res);
                // After successful deletion, refresh the data
                getdata();
            })
            .catch(err => console.error(err));
    
}

// Call the function to fetch and display data
getdata();
