function changeFahrzeug(type) {
  const section1 = document.getElementById("switch-1")
  const section2 = document.getElementById("switch-2")
  const section3 = document.getElementById("switch-3")

  if (type == "Elektro") {
    // Section 1
    section1.children[0].style = ""
    section1.children[1].style.display = "none"

    // Section 2
    section2.children[0].style = ""
    section2.children[1].style.display = "none"

    // Section 3
    section3.children[0].style = ""
    section3.children[1].style.display = "none"
  }
  if (type == "Wasserstoff") {
    // Section 1
    section1.children[0].style.display = "none"
    section1.children[1].style = ""

    // Section 2
    section2.children[0].style.display = "none"
    section2.children[1].style = ""

    // Section 3
    section3.children[0].style.display = "none"
    section3.children[1].style = ""
  }
}

// event listeners
const dropdownElement = document.getElementById("p-1")
const infoButtonElementList = document.getElementsByClassName("info-switch-button")
const infoMsgElementList = document.getElementsByClassName("info-switch-value")

function init() {
  // set fahrzeugart
  changeFahrzeug(dropdownElement.value)

  // hide all info values
  for (let j = 0; j < infoMsgElementList.length; j++) {
    infoMsgElementList[j].style.display = "none"
  }
}
init()

function listeners() {
  // set fahrzeugart
  dropdownElement.addEventListener("change", (e) => {
    changeFahrzeug(e.target.value)
  })

  // toggle all info values
  for (let i = 0; i < infoButtonElementList.length; i++) {
    const infoButtonElement = infoButtonElementList[i]

    infoButtonElement.style.cursor = "pointer"

    infoButtonElement.addEventListener("click", (e) => {
      for (let j = 0; j < infoMsgElementList.length; j++) {
        const infoMsg = infoMsgElementList[j]
        if (infoMsg.style.display != "none") {
          infoMsg.style.display = "none"
          for (let k = 0; k < infoButtonElementList.length; k++) {
            const infoButton = infoButtonElementList[k]
            infoButton.textContent = "Info"
          }
        } else {
          infoMsg.style = ""
          for (let k = 0; k < infoButtonElementList.length; k++) {
            const infoButton = infoButtonElementList[k]
            infoButton.textContent = "Schließen"
          }
        }
      }
    })
  }
}
listeners()
