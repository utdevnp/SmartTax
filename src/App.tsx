import { useState } from "react";
import { amountFormatter, calculateTax } from "./helper";

export default function App() {
  const [basicSalary, setBasicSalary] = useState(0);
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [otherAllowance, setOtherAllowance] = useState(0);
  const [festivalBonus, setFestivalBonus] = useState(0);
  const [otherBonus, setOtherBonus] = useState(0);

  const [providendFund, setProvidendFund] = useState(0);
  const [cit, setCit] = useState(0);
  const [lifeInsurance, setLifeInsurance] = useState(0);
  const [medicalInsurance, setMedicalInsurance] = useState(0);
  const [houseInsurance, setHouseInsurance] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("S");
  const [gender, setGender] = useState("M");

  const [annualIncome, setAnnualIncome] = useState(0);
  const [annualDeductions, setAnnualDeductions] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [taxDetail, setTaxDetail] = useState<any>([]);
  const [annualTax, setAnnualTax] = useState(0);

  const calculate = async () => {

    // convert monthly amount to yearly 
    const annualBasicSalary = basicSalary * 12;
    const annualDearnessAllowance = dearnessAllowance * 12;

    // Get annual income 
    const annualIncome = annualBasicSalary + annualDearnessAllowance + otherAllowance + festivalBonus + otherBonus;
    setAnnualIncome(annualIncome);

    // Convert deductions amount to yearly
    const annualProvidentFund = providendFund * 12;
    const annualCIT = cit * 12;

    let citAndSsfSum = annualProvidentFund + annualCIT;

    if (citAndSsfSum > 500000) {
      citAndSsfSum = 500000;
    } else {
      citAndSsfSum = annualProvidentFund + annualCIT;
    }
    
    let medicalInsuranceLimit = medicalInsurance;
    let lifeInsuranceLimit = lifeInsurance;
    let houseInsuranceLimit = houseInsurance;

    if (medicalInsurance > 20000) {
      medicalInsuranceLimit = 20000;
    }

    if (lifeInsurance > 40000) {
      lifeInsuranceLimit = 40000;
    }

    if (houseInsurance > 5000) {
      houseInsuranceLimit = 5000;
    }

    const annualDeductions = citAndSsfSum + houseInsuranceLimit + medicalInsuranceLimit + lifeInsuranceLimit;
    setAnnualDeductions(annualDeductions);

    let taxableIncome: number = annualIncome - annualDeductions; // Taxable income 
    setTaxableIncome(taxableIncome);

    const taxDetailArray = await calculateTax(taxableIncome, maritalStatus == "MA" ? false : true);
    setTaxDetail(taxDetailArray);

    const totalTax = taxDetailArray.reduce((sum, item: any) => {
      const taxValue = parseInt(item.tax, 10);
      return isNaN(taxValue) ? sum : sum + taxValue;
    }, 0);

    setAnnualTax(totalTax);

  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-3">

      <div className="container mx-auto px-4 justify-items-center mb-4">
        <h1 className="text-5xl font-semibold mb-4 text-center logo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12 text-green-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>

        </h1>
        <p className="text-center"> <strong>Smart Tax Calculator</strong> <br></br>is designed to compute personal income tax based on Nepal's taxation system (Budget announcement 2080/81 ). It incorporates tax brackets, deductions, and allowances to provide accurate calculations for both married and single individuals, as well as for male and female taxpayers.</p>
      </div>


      <div className="flex gap-6 w-full max-w-5xl">
        {/* Left Column */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow gap-3">
          <div className="flex justify-end space-x-6" style={{ borderBottom: "1px solid #dedede", padding: "0 0 15px 0", marginBottom: "21px" }}>
            <div className="space-y-2">
              <div className="flex space-x-4 w-full">
                <div>Are you ... </div>
                <div>
                  <input type="radio" id="married" onClick={() => { { setMaritalStatus("MA") } }} checked={maritalStatus == "MA"} name="maritalStatus" value="MA" className="mr-2" />
                  <label htmlFor="married">Married</label>
                </div>

                <div>
                  <input type="radio" id="single" name="maritalStatus" onClick={() => { { setMaritalStatus("S") } }} checked={maritalStatus == "S"} value="S" className="mr-2" />
                  <label htmlFor="single">Single</label>
                </div>
              </div>
            </div>
            <div> / </div>
            <div className="space-y-2">
              <div className="flex space-x-4">
                <div>
                  <input type="radio" id="male" onClick={() => { setGender("M") }} checked={gender == "M"} name="gender" value="M" className="mr-2" />
                  <label htmlFor="female">M</label>
                </div>

                <div>
                  <input type="radio" id="female" name="gender" onClick={() => { setGender("F") }} checked={gender == "F"} value="F" className="mr-2" />
                  <label htmlFor="female">F</label>
                </div>
              </div>
            </div>
          </div>

          <h4 className=" text-xl mb-1">Basic Details</h4>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="space-y-1">
              <label >Basic Salary (Monthly)</label>
              <input type="number" onChange={(e) => { setBasicSalary(parseInt(e.target.value)) }} className="w-full p-2 border rounded" value={basicSalary} />
            </div>
            <div>
              <div className="space-y-1">
                <label >Dearness Allowance (Monthly)</label>
                <input type="number" onChange={(e) => { setDearnessAllowance(parseInt(e.target.value)) }} className="w-full p-2 border rounded" value={dearnessAllowance} />
              </div>
            </div>
          </div>

          <h4 className=" text-xl mb-1">Additional Details</h4>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1">
              <label>Other Allowance (In Year)</label>
              <input type="number" onChange={(e) => { setOtherAllowance(parseInt(e.target.value)) }} className="w-full p-2 border rounded" value={otherAllowance} />
            </div>
            <div>
              <div className="space-y-1">
                <label>Festival Bonus</label>
                <input type="number" onChange={(e) => { setFestivalBonus(parseInt(e.target.value)) }} className="w-full p-2 border rounded" value={festivalBonus} />
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <label>Other Bonus (In Year)</label>
                <input type="number" onChange={(e) => { setOtherBonus(parseInt(e.target.value)) }} className="w-full p-2 border rounded" value={otherBonus} />
              </div>
            </div>
          </div>

          <hr className="my-6"></hr>

          <h4 className=" text-xl mb-1 mt-3">Deductions</h4>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1">
              <label>Provident Fund (Monthly) </label>
              <input type="number" onChange={(e) => setProvidendFund(parseInt(e.target.value))} className="w-full p-2 border rounded" value={providendFund} />
            </div>
            <div>
              <div className="space-y-1">
                <label>CIT (Monthly)</label>
                <input type="number" onChange={(e) => setCit(parseInt(e.target.value))} className="w-full p-2 border rounded" value={cit} />
              </div>
            </div>

            <div>
              <div className="space-y-1">
                <label>House Insurance</label>
                <input type="number" onChange={(e) => setHouseInsurance(parseInt(e.target.value))} className="w-full p-2 border rounded" value={houseInsurance} />
              </div>
            </div>

            <div>
              <div className="space-y-1">
                <label>Life Insurance</label>
                <input type="number" onChange={(e) => setLifeInsurance(parseInt(e.target.value))} className="w-full p-2 border rounded" value={lifeInsurance} />
              </div>
            </div>

            <div>
              <div className="space-y-1">
                <label>Medical Insurance</label>
                <input type="number" onChange={(e) => setMedicalInsurance(parseInt(e.target.value))} className="w-full p-2 border rounded" value={medicalInsurance} />
              </div>
            </div>
          </div>

          <div className="mt-6 mb-3">
            <div className="space-y-2">
              <button type="submit" onClick={calculate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Calculate</button>
            </div>
          </div>

          <div className="text-center">
            <hr className="my-4"></hr>
            <small><strong>Disclaimer: </strong>This Tax Calculator is intended for personal use only and is not meant for commercial purposes or as a substitute for professional tax advice. While efforts have been made to ensure accuracy based on Nepal's taxation system, the results should be cross-verified, and users should consult with a certified tax professional for official calculations and filings.</small>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow">
          {
            gender === "F" ? <div className="bg-[#83f0ab] p-3 rounded-lg justify-items-center mb-3 text-center">
              Female Tax Rebate <b className="text-xl">{amountFormatter(annualTax * 0.10)}</b><br></br>
              <small> <a href="" target="_blank" className="text-blue-600">How do you get rebate ?</a></small>
            </div> : ""
        }

          <div className="bg-[#f8f4f4] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Annual Income </h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-green-700">{amountFormatter(annualIncome)}</span>
            </div>
          </div>

          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Tax Exemption Deductions</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-red-700">{amountFormatter(annualDeductions)}</span>
            </div>
          </div>


          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Taxable Income</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{amountFormatter(taxableIncome)}</span>
            </div>
          </div>

          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Annual Tax</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{amountFormatter(annualTax)}</span>
            </div>
            <small className="text-blue-600">Monthly tax <b>{amountFormatter(annualTax / 12)}</b></small>
          </div>

          <table className="border-collapse border border-slate-400 w-full text-center ">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-300 p-2">Tax Slab</th>
                <th className="border border-slate-300 p-2">Percentage</th>
                <th className="border border-slate-300 p-2">Tax</th>
              </tr>
            </thead>
            <tbody>
              {taxDetail &&
                taxDetail.map((item: any) => (
                  item.percentage ? <tr key={item.upperLimit} className="hover:bg-slate-100">
                    <td className="border border-slate-300 p-2">{amountFormatter(item.taxableAmount)}</td>
                    <td className="border border-slate-300 p-2">{item.percentage}</td>
                    <td className="border border-slate-300 p-2">{amountFormatter(item.tax)}</td>
                  </tr>
                    : ""
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
