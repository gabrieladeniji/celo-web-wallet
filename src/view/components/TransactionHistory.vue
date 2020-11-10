<template>
    <div>
        <div class="body-2 font-weight-bold pt-5 pb-2">My transactions history</div>
        <div class="table-responsive" style="border: 1px solid rgb(236 236 236);font-size: 13px;">
            <table class="table table-hover">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Transaction type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">TX hash</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td title="Jul-12-2020 06:16 PM">26/07/2020</td>
                    <td title="Airpod (qty 1), Infinix Phone (qty 1)">Receive</td>
                    <td>0.39439 Clo</td>
                    <td>0x81899bD8A5EdeEB8060fA2Da7912Cc52F54BC9D7</td>
                    <td class=" text-success">Successful</td>
                    <td><i class="mdi mdi-dots-horizontal"></i></td>
                </tr>
                <tr>
                    <td title="Jul-12-2020 06:16 PM">26/07/2020</td>
                    <td title="Airpod (qty 1), Infinix Phone (qty 1)">Send</td>
                    <td>0.39439 Clo</td>
                    <td>0x81899bD8A5EdeEB8060fA2Da7912Cc52F54BC9D7</td>
                    <td class=" text-warning">Pending</td>
                    <td><i class="mdi mdi-dots-horizontal"></i></td>
                </tr>
                <tr>
                    <td title="Jul-12-2020 06:16 PM">26/07/2020</td>
                    <td title="Airpod (qty 1), Infinix Phone (qty 1)">Send</td>
                    <td>0.39439 Clo</td>
                    <td>0x81899bD8A5EdeEB8060fA2Da7912Cc52F54BC9D7</td>
                    <td class=" text-warning">Pending</td>
                    <td><i class="mdi mdi-dots-horizontal"></i></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
   export default {
      name: "TransactionHistory"
   }
</script>

<style scoped>

</style>