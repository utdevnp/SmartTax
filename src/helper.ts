
export const taxBrackets = [
    { rate: 0.01, threshold: 500000, percentage: "1%" },
    { rate: 0.10, threshold: 700000, percentage: "10%" },
    { rate: 0.20, threshold: 1000000, percentage: "20%" },
    { rate: 0.30, threshold: 2000000, percentage: "30%" },
    { rate: 0.36, threshold: 5000000, percentage: "36%" },
    { rate: 0.39, threshold: Infinity, percentage: "39%" }
  ];


export const calculateTax = async (taxableAmount: number) => {

    let remainingAmount = taxableAmount;
    let totalTax = 0;
    const taxDetails = [];

    for (let i = 0; i < taxBrackets.length; i++) {
      const { rate, threshold, percentage } = taxBrackets[i];

      if (remainingAmount > 0) {
        const taxableInBracket = Math.min(remainingAmount, threshold - (taxDetails[i - 1]?.upperLimit || 0));
        const taxForBracket = taxableInBracket * rate;

        taxDetails.push({
          taxableAmount: taxableInBracket,
          tax: taxForBracket,
          percentage: percentage,
          upperLimit: threshold,
        });

        totalTax += taxForBracket;
        remainingAmount -= taxableInBracket;
      } else {
        taxDetails.push({
          taxableAmount: 0,
          tax: 0,
          percentage: percentage,
          upperLimit: threshold,
        });
      }
    }

    taxDetails.push({ totalTax });

    return taxDetails;
  }
