<template>
    <div class="container-fluid">
        <form @submit.prevent="insert">
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

        <div v-for="n in 12" :key="n.id" class="card border-primary mb-3" style="max-width: 50rem;">
            <div class="card-header">{{months[n-1]}}</div>
            <div class="card-body">
                <div class="row">
                    <div v-for="user in users" :key="user.id" class="col-sm">
                        <h5>{{user}}</h5>
                        <table class="table table-hover" style="marginTop:20px">
                            <thead>
                                <tr class="table-light">
                                    <th class="amount" scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table" v-for="e in expenditures" :key="e._id">
                                    <template v-if="e.month == n">
                                        <template v-if="e.name == user">
                                            <td class="amount">{{formatNumber(e.amount)}}</td>
                                            <td>{{e.created}}</td>
                                            <td>
                                                <button @click="remove(e)" type="button" class="btn btn-danger">X</button>
                                            </td>
                                        </template>
                                    </template>
                                </tr>
                                <tr class="table">
                                    <th class="amount" scope="col">{{formatNumber(sum(user, n))}}</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>             
                            </tbody>
                        </table>
                    </div>
                </div>
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
            months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            expenditures: [],
            expenditure: {
                name: '',
                amount: ''
            },
        }),
        methods: {
            sum: function (user, month) {
                return this.expenditures.reduce((acc, cur) => 
                    cur.name == user && cur.month == month ? acc + cur.amount : acc
                ,0)                
            },            
            formatNumber(number) {
                return new Intl.NumberFormat('de-DE',{
                    style: 'currency',
                    currency: 'EUR'
                }).format(number)
            },
            async insert() {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(this.expenditure),
                    headers: {
                        'content-type': 'application/json'
                    }
                })

                const result = await response.json();
                this.expenditures.push(result)
                this.users.add(result.name)
                this.expenditure.name = ''
                this.expenditure.amount = ''
            },
            async remove(e) {
                fetch(`${API_URL}/${e._id}`, { method: 'DELETE' })

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

