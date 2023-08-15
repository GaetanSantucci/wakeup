//~ NEW DATE (Format)
const today = new Date();
const year = today.toLocaleString('en-EN', { year: 'numeric' });
const month = today.toLocaleString('en-EN', { month: 'numeric' });
const day = today.toLocaleString('en-EN', { day: 'numeric' });
const yearPayment = today.toLocaleString('en-EN', { year: '2-digit' });
const monthPayment = today.toLocaleString('en-EN', { month: '2-digit' });
const dayPayment = today.toLocaleString('en-EN', { day: '2-digit' });
const hours = today.toLocaleString('en-EN', { hour: '2-digit', hour12: false });
const minutes = today.toLocaleString('en-EN', { minute: '2-digit' });
const seconds = today.toLocaleString('en-EN', { second: '2-digit' });
const formattedDate = [year, month, day].join('-');
const formattedPaymentDate = parseInt(yearPayment + monthPayment + dayPayment + hours + minutes + seconds);
export { formattedDate, formattedPaymentDate };
