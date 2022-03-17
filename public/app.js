//Globals
let tableBody = document.getElementById("tBody");

const getData = () => {
  fetch("/exercises")
    .then((response) => response.json())
    .then((data) => { 
      buildCard(data);
    });
};

const newEntry = () => {
  let formEl = document.querySelector(".exer-form");

  formEl.addEventListener("submit", (e) => {
    const data = new FormData(e.target);
    const entryData = {
      date: data.get("date"),
      name: data.get("name"),
      weight: data.get("weight"),
      sets: data.get("sets"),
      reps: data.get("reps"),
    };
    var requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    };

    fetch("/", requestOptions)
      .then((res) => res.json())
      .catch((error) => console.log("error", error));
    getData() 
  });
};

const buildCard = (data) => {
  const bodyEl = document.getElementById("tBody");
  clearChildElements(bodyEl);
  for (const item of data) {
    let result = `<tr class="selected-row">
        <th scope="row" class="id" id="db-id">${item.id}</th>
        <td class ="date">${item.date}</td>
        <td class ="name">${item.name}</td>
        <td class ="weight">${item.weight}</td>
        <td class ="sets">${item.sets}</td>
        <td class ="reps">${item.reps}</td>
        <td class ="td-btns" style="width: 180px;">
            <button class="btn btn-outline-dark">EDIT</button>
            <button class="btn btn-outline-dark">DELETE</button>
        </td>
        </tr>`;
    bodyEl.insertAdjacentHTML("beforeend", result);
  }
};


tableBody.addEventListener("click", (e) => {
  if ((e.target.tagName = "button")) {
    const button = e.target;
    const selectedRow = button.parentNode.parentNode;
    const tBodyEl = selectedRow.parentNode;
    if (button.textContent === "DELETE") {
      deleteRow(selectedRow);
    } else if (button.textContent === "EDIT") {
      button.textContent = 'SAVE';  
      editRow(selectedRow);
    } else if(button.textContent ==="SAVE"){
        saveRow(selectedRow);
    }
  }
});

const saveRow = (selectedRow) => {
    const [date, name, weight, sets, reps] = 
    [selectedRow.querySelector("#dateInputID"),
    selectedRow.querySelector("#exerInputID"),
    selectedRow.querySelector("#weightInputID"),
    selectedRow.querySelector("#setsInputID"),
    selectedRow.querySelector("#repsInputID")]

    const id = selectedRow.querySelector("#db-id").textContent;
    const updatedData = {
        date: date.value,
        name: name.value,
        weight: weight.value,
        sets: sets.value,
        reps: reps.value,
      };
    var requestOptions = {
        method: "PATCH",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    };

    fetch(`/exercises/${id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => getData())
        .catch((error) => console.log("error", error));
}


const editRow = (selectedRow) => {
  dateData = selectedRow.querySelector(".date");
  idData = selectedRow.querySelector(".id");
  exerNameData = selectedRow.querySelector(".name");
  weightData = selectedRow.querySelector(".weight");
  setsData = selectedRow.querySelector(".sets");
  repsData = selectedRow.querySelector(".reps");

  const dateInput = `<td><input class="input-group-text" id="dateInputID" type="date" value="${dateData.textContent}"></input></td>`;
  dateData.insertAdjacentHTML("beforebegin", dateInput);
  selectedRow.removeChild(dateData);

  const exerInput = `<td><input class="input-group-text" id="exerInputID" type="text" value="${exerNameData.textContent}"></input></td>`;
  exerNameData.insertAdjacentHTML("beforebegin", exerInput);
  selectedRow.removeChild(exerNameData);

  const weightInput = `<td><input class="input-group-text" id="weightInputID" type="number" value="${weightData.textContent}"></input></td>`;
  weightData.insertAdjacentHTML("beforebegin", weightInput);
  selectedRow.removeChild(weightData);

  const setsInput = `<td><input class="input-group-text" id="setsInputID" type="number" value="${setsData.textContent}"></input></td>`;
  setsData.insertAdjacentHTML("beforebegin", setsInput);
  selectedRow.removeChild(setsData);

  const repsInput = `<td><input class="input-group-text" id="repsInputID" type="number" value="${repsData.textContent}"></input></td>`;
  repsData.insertAdjacentHTML("beforebegin", repsInput);
  selectedRow.removeChild(repsData);
};

const deleteRow = (selectedRow) => {
  const tBodyEl = selectedRow.parentNode;
  const id = selectedRow.querySelector("#db-id").textContent

  //add fetch for delete and pass specific id
  fetch(`/exercises/${id}`, { method: 'DELETE' })
    .then(() => getData());
};

function clearChildElements(parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
}

getData();
newEntry();
