function typeSwitch({ type, a, b }) {
  if (type == "Elektro") {
    return a
  }
  if (type == "Wasserstoff") {
    return b
  }
}

function round(x) {
  return Number.parseFloat(x).toFixed(2) * 1
}

// Only run in browser
if (typeof document != "undefined") {
  const form = document.getElementById("form-form")
  const out_toc = document.getElementById("form-out-1")
  const out_oek = document.getElementById("form-out-2")
  form.addEventListener("submit", (e) => {
    console.log("submit")
    e.preventDefault()

    // Antriebsart
    const p1 = document.getElementById("p-1").value

    // Anschaffungskosten
    const p2 = document.getElementById("p-2").value

    // Gewichtsklasse
    const p3 = document.getElementById("p-3").value

    // Nutzungsdauer
    const p4 = document.getElementById("p-4").value

    // Jährliche Fahrleistung
    const p5 = document.getElementById("p-5").value

    // Verbrauch
    const p6a = document.getElementById("p-6a").value
    const p6b = document.getElementById("p-6b").value
    const p6_ = typeSwitch({ type: p1, a: p6a, b: p6b })

    // Preis pro km
    const p7a = document.getElementById("p-7a").value
    const p7b = document.getElementById("p-7b").value
    const p7_ = typeSwitch({ type: p1, a: p7a, b: p7b })

    // Zinssatz
    const p8 = document.getElementById("p-8").value

    // KFZ Steuer
    const p9 = document.getElementById("p-9").value

    // KFZ Versicherung
    const p10 = document.getElementById("p-10").value

    // CO2 Emissionsfaktor
    const p11a = document.getElementById("p-11a").value
    const p11b = document.getElementById("p-11b").value
    const p11_ = typeSwitch({ type: p1, a: p11a, b: p11b })

    // Wartungskosten
    const p12 = document.getElementById("p-12").value

    const data = {
      _TYPE: p1,
      AK: p2 * 1,
      ND: p4 * 1,
      KM: p5 * 1,
      V: p6_ * 1,
      C: p7_ * 1,
      W_fix: p12 * 1,
      P: p8 * 1,
      S_fix: p9 * 1,
      V_fix: p10 * 1,
      Co2EF: p11_ * 1,
    }

    // TODO: check if all values are set

    console.log(data)

    // calc & set output
    const toc = new TotalCostOfOwnership(data).calc()
    const tocFormate = new Intl.NumberFormat("de-DE", {
      currency: "EUR",
      style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(toc)

    out_toc.innerHTML = tocFormate

    const oek = new Oekobilanz(data).calc()
    const oekFormate =
      new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(oek) + " kg Co2"

    out_oek.innerHTML = oekFormate
  })
}

class TotalCostOfOwnership {
  constructor({ AK, ND, C, KM, V, W_fix, P, S_fix, V_fix }) {
    this.AK = AK // Anschaffungskosten
    this.ND = ND // Nutzungsdauer in Jahren
    this.C = C // Energiekosten je Kilometer
    this.KM = KM // Jährliche Fahrleistung in Kilometer
    this.V = V // Energie-Verbrauchsdaten je Kilometer
    this.W_fix = W_fix // Jährliche Wartungs- und Reparaturkosten:
    this.P = P // Zinssatz für die Finanzierung:
    this.S_fix = S_fix // Kfz-Steuer
    this.V_fix = V_fix // Kfz-Versicherung
  }

  /**
   * Jährliche Annuität (AJ)
   * @returns AJ
   */
  AJ() {
    const out = (this.AK * this.P) / (1 - Math.pow(1 + this.P, this.ND * -1))
    this._AJ = round(out)
    return round(out)
  }

  /**
   * Annuität über die gesamte Nutzungsdauer
   * @returns A
   */
  A() {
    const out = this.AJ() * this.ND
    this._A = round(out)
    return round(out)
  }

  /**
   *  Jährliche Fahrzeugbetriebskosten
   *  @returns Fbkj
   */
  Fbkj() {
    const out = this.V * this.C * this.KM
    this._Fbkj = round(out)
    return round(out)
  }

  /**
   * Fahrzeugbetriebskosten über die gesamte Nutzungsdauer:
   * @returns FbkND
   */
  FbkND() {
    const out = this.V * this.C * this.KM * this.ND
    this._FbkND = round(out)
    return round(out)
  }

  /**
   * Total Cost of Ownership
   * @returns Total Cost of Ownership
   */
  calc() {
    const out = this.A() + this.FbkND() + this.W_fix * this.ND + this.S_fix * this.ND + this.V_fix * this.ND
    this._calc = round(out)
    return round(out)
  }

  log() {
    this.calc()
    return this
  }
}

class Oekobilanz {
  constructor({ V, KM, Co2EF, ND }) {
    this.V = V // Energie-Verbrauchsdaten je Kilometer
    this.KM = KM // Jährliche Fahrleistung in Kilometer
    this.Co2EF = Co2EF
    this.ND = ND // Nutzungsdauer in Jahren
  }

  /**
   * CO2 pro Jahr
   * @returns co2jaehrlich
   */
  co2jaehrlich() {
    return this.V * this.KM * this.Co2EF
  }

  /**
   * CO2 gesamt
   * @returns Oekobilanz
   */

  calc() {
    return this.co2jaehrlich() * this.ND
  }
}

if (typeof document == "undefined") {
  module.exports = {
    TotalCostOfOwnership,
    Oekobilanz,
  }
}
