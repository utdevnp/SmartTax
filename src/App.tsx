import { useState } from "react";
import { calculateTax } from "./helper";

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
  const [maritalStatus, setMaritalStatus] = useState("MA");
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
    setAnnualIncome(annualBasicSalary + annualDearnessAllowance + otherAllowance + festivalBonus + otherBonus);

    // Convert deductions amount to yearly
    const annualProvidentFund = providendFund * 12;
    const annualCIT = cit * 12;

    let citAndSsfSum = annualProvidentFund + annualCIT;

    if (citAndSsfSum > 500000) {
      citAndSsfSum = 500000;
    } else {
      citAndSsfSum = annualProvidentFund + annualCIT;
    }

    if (medicalInsurance > 20000) {
      setMedicalInsurance(20000)
    }

    if (lifeInsurance > 40000) {
      setLifeInsurance(20000)
    }

    if (houseInsurance > 5000) {
      setHouseInsurance(5000)
    }

    const annualDeductions = citAndSsfSum + houseInsurance + medicalInsurance + lifeInsurance;
    setAnnualDeductions(annualDeductions);

    let taxableIncome: number = annualIncome - annualDeductions; // Taxable income 
    setTaxableIncome(taxableIncome);

    const taxDetailArray = await calculateTax(taxableIncome);
    setTaxDetail(taxDetailArray);

    const totalTax = taxDetailArray.reduce((sum, item: any) => {
      const taxValue = parseInt(item.tax, 10);
      return isNaN(taxValue) ? sum : sum + taxValue;
    }, 0);

    setAnnualTax(totalTax);

  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-3">
      <h1 className="text-xl font-semibold mb-4 text-center">Smart Tax Calculator</h1>

      <div className="flex gap-6 w-full max-w-5xl">
        {/* Left Column */}
        <div className="w-2/3 bg-white p-4 rounded-lg shadow gap-3">
          <div className="flex justify-end space-x-6" style={{ borderBottom: "1px solid #dedede", padding: "0 0 15px 0", marginBottom: "21px" }}>
            <div className="space-y-2">
              <div className="flex space-x-4 w-full">
                <div>Are you ... </div>
                <div>
                  <input type="radio" id="married"  onClick={() => {{setMaritalStatus("MA") }}} name="maritalStatus" value="MA" className="mr-2" />
                  <label htmlFor="married">Married</label>
                </div>

                <div>
                  <input type="radio" id="single" name="maritalStatus" onClick={() => {{setMaritalStatus("S") }}}  value="S" className="mr-2" />
                  <label htmlFor="single">Single</label>
                </div>
              </div>
            </div>
            <div> / </div>
            <div className="space-y-2">
              <div className="flex space-x-4">
                <div>
                  <input type="radio" id="male" onClick={(e) => {setGender("M") }} name="gender" value="M" className="mr-2" />
                  <label htmlFor="female">M</label>
                </div>

                <div>
                  <input type="radio" id="female" name="gender" onClick={(e) => {setGender("F") }} value="F" className="mr-2" />
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

          <h4 className=" text-xl mb-1 mt-3">Deductions</h4>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1">
              <label>Provident Fund (Monthly)</label>
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
        </div>

        {/* Right Column */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow">

          <div className="bg-[#f8f4f4] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Annual Income </h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-green-700">{annualIncome}</span>
            </div>
          </div>

          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Total Deductions</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl text-red-700">{annualDeductions}</span>
            </div>
          </div>


          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Taxable Income</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{taxableIncome}</span>
            </div>
          </div>

          <div className="bg-[#f8f4f4a3] p-3 rounded-lg  justify-items-center mb-3">
            <h3 className="text-xl font-semibold mb-4">Total Tax</h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{annualTax}</span>
            </div>
          </div>

          <table className="border-collapse border border-slate-400 w-full text-center ">
            <thead>
              <tr className="bg-slate-200">
              <th className="border border-slate-300 p-2">Income</th>
                <th className="border border-slate-300 p-2">Percentage</th>
                <th className="border border-slate-300 p-2">Tax Slab</th>
              </tr>
            </thead>
            <tbody>
              {taxDetail &&
                taxDetail.map((item: any) => (
                  <tr key={item.percentage} className="hover:bg-slate-100">
                     <td className="border border-slate-300 p-2">{item.tax}</td>
                    <td className="border border-slate-300 p-2">{item.percentage}</td>
                    <td className="border border-slate-300 p-2">{item.taxableAmount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
