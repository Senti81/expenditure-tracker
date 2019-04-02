<template>
    <div class="container-fluid">
        <table class="table table-hover" style="marginTop:20px">
            <thead>
                <tr class="table-light">
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table" v-for="e in expenditures" :key="e._id" @dblclick="deleteEntry(e._id)">
                    <th scope="row">{{e.name}}</th>
                    <td>{{formatNumber(e.amount)}}</td>
                    <td>{{e.created}}</td>
                </tr>
                <tr class="table-light">
                    <th scope="col">Total</th>
                    <th scope="col">{{formatNumber(total)}}</th>
                    <th scope="col"></th>
                </tr>             
            </tbody>
        </table>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:8081/expenditures';

    export default {
        name: 'home',
        data: () => ({
            expenditures: [],
        }),
        computed: {
            total() {
                return this.expenditures.reduce((acc, cur) => acc + cur.amount, 0)                
            }
        },
        methods: {
            formatNumber(number) {
                return new Intl.NumberFormat('de-DE',{
                    style: 'currency',
                    currency: 'EUR'
                }).format(number)
            },
            deleteEntry(id) {
                console.log(`deleting entry with id ${id}`)
            }
        },
        async mounted() {
            const response = await fetch(API_URL)
            this.expenditures = await response.json()
        }
    };
</script>
