/**
 * Formats value to currency
 *
 * @param {Number|String} value Value to format
 */
const formatCurrency = (value) => {
    if (value === "") return "";
    return (
        value
            .toString()
            // remove leading zeros
            .replace(/^0+(?=\d)/, "")
            // filter not allowed characters
            .replace(/[^0-9,.]+/g, "")
            // replace all commas to periods
            .replace(/,/g, ".")
            // keep only last period (if present)
            .replace(/[.](?=.*[.])/g, "")
            // group thousands
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")
    );
};

export default formatCurrency;
