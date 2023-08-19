const { TotalCostOfOwnership, Oekobilanz } = require("./logic.js")

function log(number, key) {
  // format 2 digits after comma
  const fnum = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)

  if (key) {
    console.log(key + ": " + fnum)
  } else {
    console.log(fnum)
  }
}

function logObj(obj) {
  for (let key in obj) {
    log(obj[key], key)
  }
  console.log()
}

function run(data) {
  console.log("####################################################################")
  logObj(elektro1)
  console.log("\nTCO --------------------------")

  log(new TotalCostOfOwnership(elektro1).AJ(), "AJ")
  log(new TotalCostOfOwnership(elektro1).Fbkj(), "Fbkj")
  log(new TotalCostOfOwnership(elektro1).A(), "A")
  log(new TotalCostOfOwnership(elektro1).FbkND(), "FbkND")
  log(new TotalCostOfOwnership(elektro1).W_fix * elektro1.ND, "W_fix * t1.ND")
  log(new TotalCostOfOwnership(elektro1).S_fix * elektro1.ND, "S_fix * t1.ND")
  log(new TotalCostOfOwnership(elektro1).V_fix * elektro1.ND, "V_fix * t1.ND")
  console.log()
  log(new TotalCostOfOwnership(elektro1).calc(), "TCO")
  console.log("---")
  console.log(new TotalCostOfOwnership(elektro1).log(), "log")
  console.log("---")

  console.log("\nOekobilanz --------------------------")
  log(new Oekobilanz(elektro1).co2jaehrlich(), "co2jaehrlich")
  log(new Oekobilanz(elektro1).calc(), "Oekobilanz")
  console.log("####################################################################")
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

console.log("--------------------")
const elektro1 = {
  AK: 100_000,
  ND: 8,
  KM: 80_000,
  V: 0.17,
  C: 0.44,
  W_fix: 250,
  P: 0.04,
  S_fix: 0.0,
  V_fix: 350,
  Co2EF: 0.434,
}

const wasserstof1 = {
  AK: 100_000,
  ND: 8,
  KM: 80_000,
  V: 0.01,
  C: 12.85,
  W_fix: 250,
  P: 0.04,
  S_fix: 0.0,
  V_fix: 350,
  Co2EF: 21.7,
}

// logObj(elektro1)
// console.log("\nTCO --------------------------")

// log(new TotalCostOfOwnership(elektro1).AJ(), "AJ")
// log(new TotalCostOfOwnership(elektro1).Fbkj(), "Fbkj")
// log(new TotalCostOfOwnership(elektro1).A(), "A")
// log(new TotalCostOfOwnership(elektro1).FbkND(), "FbkND")
// log(new TotalCostOfOwnership(elektro1).W_fix * elektro1.ND, "W_fix * t1.ND")
// log(new TotalCostOfOwnership(elektro1).S_fix * elektro1.ND, "S_fix * t1.ND")
// log(new TotalCostOfOwnership(elektro1).V_fix * elektro1.ND, "V_fix * t1.ND")
// console.log()
// log(new TotalCostOfOwnership(elektro1).calc(), "TCO")

// console.log("\nOekobilanz --------------------------")
// log(new Oekobilanz(elektro1).co2jaehrlich(), "co2jaehrlich")
// log(new Oekobilanz(elektro1).calc(), "Oekobilanz")
// console.log("--------------------")

// logObj(wasserstof1)
// console.log("\nTCO --------------------------")

// log(new TotalCostOfOwnership(wasserstof1).AJ(), "AJ")
// log(new TotalCostOfOwnership(wasserstof1).Fbkj(), "Fbkj")
// log(new TotalCostOfOwnership(wasserstof1).A(), "A")
// log(new TotalCostOfOwnership(wasserstof1).FbkND(), "FbkND")
// log(new TotalCostOfOwnership(wasserstof1).W_fix * wasserstof1.ND, "W_fix * t1.ND")
// log(new TotalCostOfOwnership(wasserstof1).S_fix * wasserstof1.ND, "S_fix * t1.ND")
// log(new TotalCostOfOwnership(wasserstof1).V_fix * wasserstof1.ND, "V_fix * t1.ND")
// console.log()
// log(new TotalCostOfOwnership(wasserstof1).calc(), "TCO")

// console.log("\nOekobilanz --------------------------")
// log(new Oekobilanz(wasserstof1).co2jaehrlich(), "co2jaehrlich")
// log(new Oekobilanz(wasserstof1).calc(), "Oekobilanz")
// console.log("--------------------")

console.log("Kurzstrecke Elektro")
run({
  AK: 100_000,
  C: 0.44,
  Co2EF: 0.434,
  KM: 80_000,
  ND: 8,
  P: 0.04,
  S_fix: 0,
  V: 0.17,
  V_fix: 350,
  W_fix: 250,
  _TYPE: "Elektro",
})
