export default {
   filters: {
      amountFormatter(val) {
         return new Intl.NumberFormat().format(val);
      }
   }
}