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
  logObj(data)
  console.log("\nTCO --------------------------")

  log(new TotalCostOfOwnership(data).AJ(), "AJ")
  log(new TotalCostOfOwnership(data).Fbkj(), "Fbkj")
  log(new TotalCostOfOwnership(data).A(), "A")
  log(new TotalCostOfOwnership(data).FbkND(), "FbkND")
  log(new TotalCostOfOwnership(data).W_fix * data.ND, "W_fix * t1.ND")
  log(new TotalCostOfOwnership(data).S_fix * data.ND, "S_fix * t1.ND")
  log(new TotalCostOfOwnership(data).V_fix * data.ND, "V_fix * t1.ND")
  console.log()
  log(new TotalCostOfOwnership(data).calc(), "TCO")
  console.log("---")
  console.log(new TotalCostOfOwnership(data).log(), "log")
  console.log("---")

  console.log("\nOekobilanz --------------------------")
  log(new Oekobilanz(data).co2jaehrlich(), "co2jaehrlich")
  log(new Oekobilanz(data).calc(), "Oekobilanz")
  console.log("####################################################################")
}

// -------------------------------------------------------------------------------------------------------------------------------------

console.log("Kurzstrecke Elektro")
run({
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
})

console.log("Kurzstrecke Wasserstoff")
run({
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
})
