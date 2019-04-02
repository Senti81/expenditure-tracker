<template>
    <div class="container-fluid">
        <form @submit.prevent="addExpenditure">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="expenditure.name" type="text" class="form-control" id="name" aria-describedby="emailHelp" required>
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
                <input v-model="expenditure.amount" type="number" class="form-control" id="amount" min="0" step="0.01" required>
            </div>
            <button type="submit" class="btn btn-primary">Ok</button>
        </form>
        <table class="table table-hover" style="marginTop:20px">
            <thead>
                <tr class="table-light">
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr @dblclick="remove(e)" class="table" v-for="e in expenditures" :key="e._id">
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
            expenditure: {
                name: '',
                amount: ''
            },
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
            async addExpenditure() {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.expenditure),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                this.expenditures.push(await response.json())
                this.expenditure.name = ''
                this.expenditure.amount = ''
            },
            async remove(e) {
                const index = this.expenditures.indexOf(e)

                fetch(`${API_URL}/${e._id}`, {
                    method: 'DELETE'
                })
                this.expenditures.splice(index, 1);
            }
        },
        async mounted() {
            const response = await fetch(API_URL)
            this.expenditures = await response.json()
        }
    };
</script>
