<template>
    <div>
        <div v-for="expenditure in expenditures" :key="expenditure._id" class="card border-primary mb-3" style="max-width: 20rem;">
            <div class="card-header">{{expenditure.name}}</div>
            <div class="card-body">
                <h4 class="card-title">{{expenditure.name}}</h4>
                <p class="card-text">Created at: {{expenditure.created}}</p>
            </div>
        </div>
    </div>
</template>

<script>

    const API_URL = 'http://localhost:8081/expenditures';

    export default {
        name: 'home',
        data: () => ({
            expenditures: [],
        }),
        async mounted() {
            const response = await fetch(API_URL)
            this.expenditures = await response.json()
        }
    };
</script>

