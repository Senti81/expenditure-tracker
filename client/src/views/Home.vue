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

        <div class="row">
            <div v-for="user in users" :key="user.id" class="col-sm">
                <h4>{{user}}</h4>
                <table class="table table-hover" style="marginTop:20px">
                    <thead>
                        <tr class="table-light">
                            <th scope="col">Name</th>
                            <th class="amount" scope="col">Amount</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @dblclick="remove(e)" class="table" v-for="e in expenditures" :key="e._id">
                            <template v-if="e.name == user">
                                <th scope="row">{{e.name}}</th>
                                <td class="amount">{{formatNumber(e.amount)}}</td>
                                <td>{{e.created}}</td>
                            </template>
                        </tr>
                        <tr class="table-light">
                            <th scope="col">Total</th>
                            <th class="amount" scope="col">{{formatNumber(sum(user))}}</th>
                            <th scope="col"></th>
                        </tr>             
                    </tbody>
                </table>
            </div>
         </div>
    </div>
</template>

<script>
    const API_URL = 'http://localhost:8081/expenditures';

    export default {
        name: 'home',
        data: () => ({
            users: [],
            expenditures: [],
            expenditure: {
                name: '',
                amount: ''
            },
        }),
        methods: {
            sum: function (user) {
                return this.expenditures.reduce((acc, cur) => {
                    return cur.name == user ? acc + cur.amount : acc
                },0)                
            },            
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
                fetch(`${API_URL}/${e._id}`, {
                    method: 'DELETE'
                })

                const index = this.expenditures.indexOf(e)
                this.expenditures.splice(index, 1);
            }
        },
        async mounted() {
            const response = await fetch(API_URL)
            const result = await response.json()
            this.expenditures = result

            const set = new Set()
            result.forEach(e => set.add(e.name));
            this.users = set

        }
    };
</script>

<style>
    .amount {
        text-align: end
    }
</style>

